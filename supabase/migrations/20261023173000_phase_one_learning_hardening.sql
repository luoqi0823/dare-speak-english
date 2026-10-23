-- Keep the public promise, course data and player on the same six-minute duration.
update public.lessons
set duration_minutes = 6,
    updated_at = timezone('utc', now())
where slug like 'survival-%'
  and duration_minutes <> 6;

-- Make the illustration bucket reproducible in new Supabase projects.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('course-illustrations', 'course-illustrations', true, 5242880, array['image/webp']::text[])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.complete_lesson_item(
  p_lesson_id bigint,
  p_lesson_item_id bigint
)
returns table (completed_item_ids bigint[], completed_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_current_lesson_id bigint;
  v_completed_item_ids bigint[];
  v_completed_at timestamptz;
  v_total_items integer;
begin
  if v_user_id is null then
    raise exception 'UNAUTHENTICATED' using errcode = '42501';
  end if;

  if not exists (
    select 1
    from public.lesson_items as item
    join public.lessons as lesson on lesson.id = item.lesson_id
    where item.id = p_lesson_item_id
      and item.lesson_id = p_lesson_id
      and lesson.status = 'published'
  ) then
    raise exception 'LESSON_ITEM_NOT_FOUND' using errcode = 'P0002';
  end if;

  select progress.completed_item_ids, progress.completed_at
  into v_completed_item_ids, v_completed_at
  from public.user_lesson_progress as progress
  where progress.user_id = v_user_id
    and progress.lesson_id = p_lesson_id;

  -- A retry of an already accepted item is idempotent, including after the lesson advances.
  if p_lesson_item_id = any(coalesce(v_completed_item_ids, '{}'::bigint[])) then
    return query select v_completed_item_ids, v_completed_at;
    return;
  end if;

  select lesson.id
  into v_current_lesson_id
  from public.lessons as lesson
  left join public.user_lesson_progress as progress
    on progress.lesson_id = lesson.id
   and progress.user_id = v_user_id
  where lesson.status = 'published'
    and progress.completed_at is null
  order by lesson.course_order
  limit 1;

  if v_current_lesson_id is null then
    raise exception 'COURSE_COMPLETE' using errcode = 'P0001';
  end if;

  if v_current_lesson_id <> p_lesson_id then
    raise exception 'NOT_CURRENT_LESSON' using errcode = 'P0001';
  end if;

  insert into public.user_lesson_progress (user_id, lesson_id, completed_item_ids, last_opened_at)
  values (v_user_id, p_lesson_id, '{}'::bigint[], timezone('utc', now()))
  on conflict (user_id, lesson_id) do nothing;

  select progress.completed_item_ids
  into v_completed_item_ids
  from public.user_lesson_progress as progress
  where progress.user_id = v_user_id
    and progress.lesson_id = p_lesson_id
  for update;

  if not p_lesson_item_id = any(v_completed_item_ids) then
    v_completed_item_ids := array_append(v_completed_item_ids, p_lesson_item_id);
  end if;

  select count(*)::integer
  into v_total_items
  from public.lesson_items
  where lesson_id = p_lesson_id;

  v_completed_at := case
    when cardinality(v_completed_item_ids) >= v_total_items then timezone('utc', now())
    else null
  end;

  update public.user_lesson_progress as progress
  set completed_item_ids = v_completed_item_ids,
      completed_at = v_completed_at,
      last_opened_at = timezone('utc', now())
  where progress.user_id = v_user_id
    and progress.lesson_id = p_lesson_id;

  return query select v_completed_item_ids, v_completed_at;
end;
$$;

create or replace function public.record_lesson_mistake(
  p_lesson_item_id bigint,
  p_wrong_answer text
)
returns table (mistake_id bigint, wrong_count integer, status text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_current_lesson_id bigint;
  v_item_lesson_id bigint;
  v_correct_answer text;
  v_mistake_id bigint;
  v_wrong_count integer;
  v_status text;
begin
  if v_user_id is null then
    raise exception 'UNAUTHENTICATED' using errcode = '42501';
  end if;

  select item.lesson_id, item.correct_answer
  into v_item_lesson_id, v_correct_answer
  from public.lesson_items as item
  join public.lessons as lesson on lesson.id = item.lesson_id
  where item.id = p_lesson_item_id
    and item.kind in ('quiz', 'comprehension')
    and lesson.status = 'published';

  if v_item_lesson_id is null or v_correct_answer is null then
    raise exception 'QUIZ_ITEM_NOT_FOUND' using errcode = 'P0002';
  end if;

  select lesson.id
  into v_current_lesson_id
  from public.lessons as lesson
  left join public.user_lesson_progress as progress
    on progress.lesson_id = lesson.id
   and progress.user_id = v_user_id
  where lesson.status = 'published'
    and progress.completed_at is null
  order by lesson.course_order
  limit 1;

  if v_current_lesson_id is null or v_current_lesson_id <> v_item_lesson_id then
    raise exception 'NOT_CURRENT_LESSON' using errcode = 'P0001';
  end if;

  if lower(btrim(p_wrong_answer)) = lower(btrim(v_correct_answer)) then
    raise exception 'ANSWER_IS_CORRECT' using errcode = 'P0001';
  end if;

  insert into public.mistake_book as mistake (
    user_id,
    lesson_item_id,
    wrong_count,
    last_wrong_answer,
    last_wrong_at,
    status,
    mastered_at
  ) values (
    v_user_id,
    p_lesson_item_id,
    1,
    btrim(p_wrong_answer),
    timezone('utc', now()),
    'learning',
    null
  )
  on conflict (user_id, lesson_item_id) do update set
    wrong_count = mistake.wrong_count + 1,
    last_wrong_answer = excluded.last_wrong_answer,
    last_wrong_at = excluded.last_wrong_at,
    status = 'learning',
    mastered_at = null
  returning mistake.id, mistake.wrong_count, mistake.status
  into v_mistake_id, v_wrong_count, v_status;

  return query select v_mistake_id, v_wrong_count, v_status;
end;
$$;

create or replace function public.mark_mistake_mastered(p_mistake_id bigint)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_mistake_id bigint;
begin
  if v_user_id is null then
    raise exception 'UNAUTHENTICATED' using errcode = '42501';
  end if;

  update public.mistake_book as mistake
  set status = 'mastered',
      mastered_at = timezone('utc', now())
  where mistake.id = p_mistake_id
    and mistake.user_id = v_user_id
  returning mistake.id into v_mistake_id;

  if v_mistake_id is null then
    raise exception 'MISTAKE_NOT_FOUND' using errcode = 'P0002';
  end if;

  return v_mistake_id;
end;
$$;

-- All mutations go through the functions above. Users retain read access to their own rows.
revoke insert, update on table public.user_lesson_progress, public.mistake_book from authenticated;
drop policy if exists "users create own progress" on public.user_lesson_progress;
drop policy if exists "users update own progress" on public.user_lesson_progress;
drop policy if exists "users create own mistakes" on public.mistake_book;
drop policy if exists "users update own mistakes" on public.mistake_book;

revoke all on function public.complete_lesson_item(bigint, bigint) from public, anon, authenticated;
revoke all on function public.record_lesson_mistake(bigint, text) from public, anon, authenticated;
revoke all on function public.mark_mistake_mastered(bigint) from public, anon, authenticated;
grant execute on function public.complete_lesson_item(bigint, bigint) to authenticated;
grant execute on function public.record_lesson_mistake(bigint, text) to authenticated;
grant execute on function public.mark_mistake_mastered(bigint) to authenticated;

comment on function public.complete_lesson_item(bigint, bigint) is '原子完成当前课程学习项并在全部完成时结课';
comment on function public.record_lesson_mistake(bigint, text) is '原子记录当前课程错题并恢复 learning 状态';
comment on function public.mark_mistake_mastered(bigint) is '将当前用户自己的错题标记为已掌握';

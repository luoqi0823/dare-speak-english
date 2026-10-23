create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.lessons (
  id bigint generated always as identity primary key,
  slug text not null unique,
  lesson_date date not null unique,
  title text not null,
  summary text not null,
  duration_minutes integer not null default 6 check (duration_minutes between 1 and 30),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.lesson_items (
  id bigint generated always as identity primary key,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  position smallint not null check (position > 0),
  kind text not null check (kind in ('word', 'phrase', 'quiz')),
  english text not null,
  chinese text not null,
  phonetic text,
  image_key text,
  mnemonic text,
  prompt text,
  correct_answer text,
  distractors text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (lesson_id, position)
);

create table public.user_lesson_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  completed_item_ids bigint[] not null default '{}',
  completed_at timestamptz,
  last_opened_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, lesson_id)
);

create table public.mistake_book (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_item_id bigint not null references public.lesson_items(id) on delete cascade,
  wrong_count integer not null default 1 check (wrong_count > 0),
  last_wrong_answer text,
  status text not null default 'learning' check (status in ('learning', 'mastered')),
  last_wrong_at timestamptz not null default timezone('utc', now()),
  mastered_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, lesson_item_id)
);

create index lessons_published_date_idx on public.lessons (status, lesson_date desc);
create index lesson_items_lesson_position_idx on public.lesson_items (lesson_id, position);
create index user_lesson_progress_user_idx on public.user_lesson_progress (user_id, updated_at desc);
create index mistake_book_user_status_idx on public.mistake_book (user_id, status, last_wrong_at desc);

create trigger lessons_set_updated_at before update on public.lessons
for each row execute function public.set_updated_at();
create trigger lesson_items_set_updated_at before update on public.lesson_items
for each row execute function public.set_updated_at();
create trigger user_lesson_progress_set_updated_at before update on public.user_lesson_progress
for each row execute function public.set_updated_at();
create trigger mistake_book_set_updated_at before update on public.mistake_book
for each row execute function public.set_updated_at();

alter table public.lessons enable row level security;
alter table public.lesson_items enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.mistake_book enable row level security;

revoke all on table public.lessons, public.lesson_items, public.user_lesson_progress, public.mistake_book from anon, authenticated;
grant select on table public.lessons, public.lesson_items to authenticated;
grant select, insert, update on table public.user_lesson_progress, public.mistake_book to authenticated;
grant usage, select on sequence public.user_lesson_progress_id_seq, public.mistake_book_id_seq to authenticated;

create policy "authenticated users read published lessons"
on public.lessons for select to authenticated
using (status = 'published');

create policy "authenticated users read published lesson items"
on public.lesson_items for select to authenticated
using (
  exists (
    select 1 from public.lessons
    where lessons.id = lesson_items.lesson_id
      and lessons.status = 'published'
  )
);

create policy "users read own progress"
on public.user_lesson_progress for select to authenticated
using ((select auth.uid()) = user_id);
create policy "users create own progress"
on public.user_lesson_progress for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "users update own progress"
on public.user_lesson_progress for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "users read own mistakes"
on public.mistake_book for select to authenticated
using ((select auth.uid()) = user_id);
create policy "users create own mistakes"
on public.mistake_book for insert to authenticated
with check ((select auth.uid()) = user_id);
create policy "users update own mistakes"
on public.mistake_book for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

comment on table public.lessons is '每日英语课程';
comment on table public.lesson_items is '课程内的单词、短语与测验项';
comment on table public.user_lesson_progress is '用户跨设备同步的课程进度';
comment on table public.mistake_book is '用户个人错题本';

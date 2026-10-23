begin;

create extension if not exists pgtap with schema extensions;
select extensions.plan(20);

insert into auth.users (id, aud, role, email, created_at, updated_at)
values
  ('10000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated', 'phase-one-a@example.test', now(), now()),
  ('10000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated', 'phase-one-b@example.test', now(), now());

select extensions.has_function('public', 'complete_lesson_item', array['bigint', 'bigint'], 'complete_lesson_item exists');
select extensions.has_function('public', 'record_lesson_mistake', array['bigint', 'text'], 'record_lesson_mistake exists');
select extensions.has_function('public', 'mark_mistake_mastered', array['bigint'], 'mark_mistake_mastered exists');
select extensions.ok(not has_table_privilege('authenticated', 'public.user_lesson_progress', 'INSERT'), 'authenticated cannot insert progress directly');
select extensions.ok(not has_table_privilege('authenticated', 'public.user_lesson_progress', 'UPDATE'), 'authenticated cannot update progress directly');
select extensions.ok(not has_table_privilege('authenticated', 'public.mistake_book', 'INSERT'), 'authenticated cannot insert mistakes directly');
select extensions.ok(not has_table_privilege('authenticated', 'public.mistake_book', 'UPDATE'), 'authenticated cannot update mistakes directly');

select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000001', true);
set local role authenticated;

select extensions.throws_ok(
  $$ select public.complete_lesson_item(
    (select id from public.lessons where course_order = 2),
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 2 order by item.position limit 1)
  ) $$,
  'P0001',
  'NOT_CURRENT_LESSON',
  'future lessons cannot be completed'
);

select extensions.throws_ok(
  $$ select public.record_lesson_mistake(
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 and item.kind = 'word' order by item.position limit 1),
    'wrong'
  ) $$,
  'P0002',
  'QUIZ_ITEM_NOT_FOUND',
  'knowledge items cannot be recorded as mistakes'
);

select extensions.throws_ok(
  $$ select public.record_lesson_mistake(
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 and item.kind = 'quiz' order by item.position limit 1),
    (select item.correct_answer from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 and item.kind = 'quiz' order by item.position limit 1)
  ) $$,
  'P0001',
  'ANSWER_IS_CORRECT',
  'correct answers cannot be recorded as mistakes'
);

select extensions.is(
  (select wrong_count from public.record_lesson_mistake(
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 and item.kind = 'quiz' order by item.position limit 1),
    'definitely wrong'
  )),
  1,
  'first wrong answer creates one mistake'
);

select extensions.is(
  (select wrong_count from public.record_lesson_mistake(
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 and item.kind = 'quiz' order by item.position limit 1),
    'still wrong'
  )),
  2,
  'repeated wrong answers increment atomically'
);

select extensions.is(
  public.mark_mistake_mastered((select id from public.mistake_book where user_id = auth.uid() limit 1)),
  (select id from public.mistake_book where user_id = auth.uid() limit 1),
  'users can master their own mistake'
);

select extensions.is(
  (select status from public.mistake_book where user_id = auth.uid() limit 1),
  'mastered',
  'mastered status is stored'
);

do $$
begin
  perform public.record_lesson_mistake(
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 and item.kind = 'quiz' order by item.position limit 1),
    'wrong again'
  );
end;
$$;

select extensions.results_eq(
  $$ select wrong_count, status, mastered_at is null from public.mistake_book where user_id = auth.uid() $$,
  $$ values (3, 'learning'::text, true) $$,
  'a new wrong answer restores learning status'
);

select extensions.is(
  (select cardinality(completed_item_ids) from public.complete_lesson_item(
    (select id from public.lessons where course_order = 1),
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 order by item.position limit 1)
  )),
  1,
  'first completion stores one item'
);

select extensions.is(
  (select cardinality(completed_item_ids) from public.complete_lesson_item(
    (select id from public.lessons where course_order = 1),
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 1 order by item.position limit 1)
  )),
  1,
  'retrying the same completion is idempotent'
);

do $$
declare
  v_lesson_id bigint;
  v_item_id bigint;
begin
  select id into v_lesson_id from public.lessons where course_order = 1;
  for v_item_id in
    select id from public.lesson_items where lesson_id = v_lesson_id order by position offset 1
  loop
    perform public.complete_lesson_item(v_lesson_id, v_item_id);
  end loop;
end;
$$;

select extensions.ok(
  (select completed_at is not null from public.user_lesson_progress where user_id = auth.uid() and lesson_id = (select id from public.lessons where course_order = 1)),
  'all lesson items complete the lesson'
);

select extensions.lives_ok(
  $$ select public.complete_lesson_item(
    (select id from public.lessons where course_order = 2),
    (select item.id from public.lesson_items as item join public.lessons as lesson on lesson.id = item.lesson_id where lesson.course_order = 2 order by item.position limit 1)
  ) $$,
  'the next lesson becomes available'
);

reset role;
select set_config('request.jwt.claim.sub', '10000000-0000-0000-0000-000000000002', true);
set local role authenticated;

select extensions.throws_ok(
  $$ select public.mark_mistake_mastered((select id from public.mistake_book order by id limit 1)) $$,
  'P0002',
  'MISTAKE_NOT_FOUND',
  'users cannot master another users mistake'
);

select * from extensions.finish();
rollback;

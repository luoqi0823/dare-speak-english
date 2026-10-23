select '1..7';

select case
  when to_regprocedure('public.complete_lesson_item(bigint,bigint)') is not null
    then 'ok 1 - complete_lesson_item exists'
  else 'not ok 1 - complete_lesson_item is missing'
end;

select case
  when to_regprocedure('public.record_lesson_mistake(bigint,text)') is not null
    then 'ok 2 - record_lesson_mistake exists'
  else 'not ok 2 - record_lesson_mistake is missing'
end;

select case
  when to_regprocedure('public.mark_mistake_mastered(bigint)') is not null
    then 'ok 3 - mark_mistake_mastered exists'
  else 'not ok 3 - mark_mistake_mastered is missing'
end;

select case
  when not has_table_privilege('authenticated', 'public.user_lesson_progress', 'INSERT')
    then 'ok 4 - authenticated cannot insert progress directly'
  else 'not ok 4 - authenticated still has direct progress insert access'
end;

select case
  when not has_table_privilege('authenticated', 'public.user_lesson_progress', 'UPDATE')
    then 'ok 5 - authenticated cannot update progress directly'
  else 'not ok 5 - authenticated still has direct progress update access'
end;

select case
  when not has_table_privilege('authenticated', 'public.mistake_book', 'INSERT')
    then 'ok 6 - authenticated cannot insert mistakes directly'
  else 'not ok 6 - authenticated still has direct mistake insert access'
end;

select case
  when not has_table_privilege('authenticated', 'public.mistake_book', 'UPDATE')
    then 'ok 7 - authenticated cannot update mistakes directly'
  else 'not ok 7 - authenticated still has direct mistake update access'
end;


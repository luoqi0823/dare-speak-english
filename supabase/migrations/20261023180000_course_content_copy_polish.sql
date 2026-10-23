update public.lesson_items
set prompt = '饭后她把什么收进包里？',
    updated_at = timezone('utc', now())
where lesson_id = (select id from public.lessons where slug = 'survival-10')
  and position = 12
  and prompt <> '饭后她把什么收进包里？';

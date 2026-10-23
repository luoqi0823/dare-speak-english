alter table public.lessons drop constraint if exists lessons_lesson_date_key;
alter table public.lessons alter column lesson_date drop not null;

alter table public.lessons
  add column if not exists course_order integer,
  add column if not exists unit_order integer,
  add column if not exists unit_title text,
  add column if not exists scene_title text,
  add column if not exists grammar jsonb not null default '{}'::jsonb,
  add column if not exists dialogue jsonb not null default '[]'::jsonb,
  add column if not exists story_title text,
  add column if not exists story_english text,
  add column if not exists story_chinese text,
  add column if not exists content_version integer not null default 1;

update public.lessons
set course_order = coalesce(course_order, id::integer),
    unit_order = coalesce(unit_order, 1),
    unit_title = coalesce(unit_title, '开始学习'),
    scene_title = coalesce(scene_title, title),
    story_title = coalesce(story_title, title),
    story_english = coalesce(story_english, ''),
    story_chinese = coalesce(story_chinese, '')
where course_order is null
   or unit_order is null
   or unit_title is null
   or scene_title is null
   or story_title is null
   or story_english is null
   or story_chinese is null;

-- Keep any earlier demo lesson for audit/history, but remove it from the ordered course.
update public.lessons
set status = 'draft',
    course_order = 10000 + id::integer
where slug not like 'survival-%';

alter table public.lessons
  alter column course_order set not null,
  alter column unit_order set not null,
  alter column unit_title set not null,
  alter column scene_title set not null,
  alter column story_title set not null,
  alter column story_english set not null,
  alter column story_chinese set not null;

create unique index if not exists lessons_course_order_key on public.lessons (course_order);
create index if not exists lessons_unit_order_idx on public.lessons (unit_order, course_order);

alter table public.lesson_items drop constraint if exists lesson_items_kind_check;
alter table public.lesson_items
  add constraint lesson_items_kind_check check (kind in ('word', 'phrase', 'quiz', 'comprehension'));
alter table public.lesson_items add column if not exists visual text;

comment on column public.lessons.course_order is '课程日顺序，从 1 开始；用户按此顺序学习';
comment on column public.lessons.unit_order is '所属单元顺序';
comment on column public.lessons.unit_title is '所属单元标题';
comment on column public.lessons.scene_title is '本课生活场景标题';
comment on column public.lessons.grammar is '微语法内容 JSON：标题、句型、解释和例句';
comment on column public.lessons.dialogue is '场景对话 JSON 数组';
comment on column public.lessons.story_title is '微文章标题';
comment on column public.lessons.story_english is '微文章英文正文';
comment on column public.lessons.story_chinese is '微文章中文释义';
comment on column public.lessons.content_version is '课程内容版本号';
comment on column public.lesson_items.visual is '原创视觉记忆符号或 emoji';

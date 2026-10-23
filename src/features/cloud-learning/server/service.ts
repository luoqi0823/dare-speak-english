import type { SupabaseClient } from "@supabase/supabase-js";

import { resolveLessonIllustration } from "@/features/learning/model/illustrations";
import type { MemoryImage } from "@/features/learning/model/types";

import type { CloudLessonItem, CourseLearningState, LessonItemKind, MistakeEntry, MistakeStatus } from "../model/types";

interface LessonRow {
  id: number;
  slug: string;
  course_order: number;
  unit_order: number;
  unit_title: string;
  scene_title: string;
  title: string;
  summary: string;
  duration_minutes: number;
  grammar: {
    title: string;
    pattern: string;
    explanation: string;
    exampleEnglish: string;
    exampleChinese: string;
  };
  dialogue: Array<{ speaker: string; english: string; chinese: string }>;
  story_title: string;
  story_english: string;
  story_chinese: string;
}

interface LessonItemRow {
  id: number;
  position: number;
  kind: LessonItemKind;
  english: string;
  chinese: string;
  phonetic: string | null;
  image_key: MemoryImage | null;
  visual: string | null;
  mnemonic: string | null;
  prompt: string | null;
  correct_answer: string | null;
  distractors: string[] | null;
}

interface ProgressRow {
  lesson_id: number;
  completed_item_ids: number[] | null;
  completed_at: string | null;
}

interface MistakeRow {
  id: number;
  wrong_count: number;
  last_wrong_answer: string | null;
  last_wrong_at: string;
  status: MistakeStatus;
  lesson_items: {
    id: number;
    english: string;
    chinese: string;
    prompt: string | null;
    correct_answer: string | null;
    image_key: MemoryImage | null;
    visual: string | null;
  } | null;
}

function mapLessonItem(item: LessonItemRow): CloudLessonItem {
  return {
    id: item.id,
    position: item.position,
    kind: item.kind,
    english: item.english,
    chinese: item.chinese,
    phonetic: item.phonetic,
    imageKey: resolveLessonIllustration(item.english, item.image_key),
    visual: item.visual,
    mnemonic: item.mnemonic,
    prompt: item.prompt,
    correctAnswer: item.correct_answer,
    distractors: item.distractors ?? [],
  };
}

export async function getCurrentLesson(supabase: SupabaseClient, userId: string): Promise<CourseLearningState> {
  const [lessonListResult, progressListResult] = await Promise.all([
    supabase.from("lessons").select("id, course_order").order("course_order"),
    supabase.from("user_lesson_progress").select("lesson_id, completed_item_ids, completed_at").eq("user_id", userId),
  ]);

  if (lessonListResult.error) throw lessonListResult.error;
  if (progressListResult.error) throw progressListResult.error;

  const lessons = (lessonListResult.data ?? []) as Array<{ id: number; course_order: number }>;
  const progressRows = (progressListResult.data ?? []) as ProgressRow[];
  const progressByLesson = new Map(progressRows.map((row) => [row.lesson_id, row]));
  const current = lessons.find((item) => !progressByLesson.get(item.id)?.completed_at);
  const completedLessons = lessons.filter((item) => Boolean(progressByLesson.get(item.id)?.completed_at)).length;

  if (!current) {
    return { lesson: null, courseCompleted: lessons.length > 0, completedLessons, totalLessons: lessons.length };
  }

  const [lessonResult, itemsResult] = await Promise.all([
    supabase
      .from("lessons")
      .select("id, slug, course_order, unit_order, unit_title, scene_title, title, summary, duration_minutes, grammar, dialogue, story_title, story_english, story_chinese")
      .eq("id", current.id)
      .single(),
    supabase
      .from("lesson_items")
      .select("id, position, kind, english, chinese, phonetic, image_key, visual, mnemonic, prompt, correct_answer, distractors")
      .eq("lesson_id", current.id)
      .order("position"),
  ]);

  if (lessonResult.error) throw lessonResult.error;
  if (itemsResult.error) throw itemsResult.error;

  const lesson = lessonResult.data as LessonRow;
  const progress = progressByLesson.get(lesson.id);
  return {
    lesson: {
      id: lesson.id,
      slug: lesson.slug,
      courseOrder: lesson.course_order,
      unitOrder: lesson.unit_order,
      unitTitle: lesson.unit_title,
      sceneTitle: lesson.scene_title,
      title: lesson.title,
      summary: lesson.summary,
      durationMinutes: lesson.duration_minutes,
      completedItemIds: progress?.completed_item_ids ?? [],
      completedAt: progress?.completed_at ?? null,
      grammar: lesson.grammar,
      dialogue: lesson.dialogue,
      storyTitle: lesson.story_title,
      storyEnglish: lesson.story_english,
      storyChinese: lesson.story_chinese,
      items: ((itemsResult.data ?? []) as LessonItemRow[]).map(mapLessonItem),
    },
    courseCompleted: false,
    completedLessons,
    totalLessons: lessons.length,
  };
}

export async function getMistakes(supabase: SupabaseClient, userId: string): Promise<MistakeEntry[]> {
  const { data, error } = await supabase
    .from("mistake_book")
    .select("id, wrong_count, last_wrong_answer, last_wrong_at, status, lesson_items(id, english, chinese, prompt, correct_answer, image_key, visual)")
    .eq("user_id", userId)
    .order("last_wrong_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as unknown as MistakeRow[])
    .filter((row) => row.lesson_items)
    .map((row) => ({
      id: row.id,
      wrongCount: row.wrong_count,
      lastWrongAnswer: row.last_wrong_answer,
      lastWrongAt: row.last_wrong_at,
      status: row.status,
      item: {
        id: row.lesson_items!.id,
        english: row.lesson_items!.english,
        chinese: row.lesson_items!.chinese,
        prompt: row.lesson_items!.prompt,
        correctAnswer: row.lesson_items!.correct_answer,
        imageKey: resolveLessonIllustration(row.lesson_items!.english, row.lesson_items!.image_key),
        visual: row.lesson_items!.visual,
      },
    }));
}

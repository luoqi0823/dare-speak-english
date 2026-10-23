import type { MemoryImage } from "@/features/learning/model/types";

export type LessonItemKind = "word" | "phrase" | "quiz" | "comprehension";
export type MistakeStatus = "learning" | "mastered";

export interface CloudLessonItem {
  id: number;
  position: number;
  kind: LessonItemKind;
  english: string;
  chinese: string;
  phonetic: string | null;
  imageKey: MemoryImage | null;
  visual: string | null;
  mnemonic: string | null;
  prompt: string | null;
  correctAnswer: string | null;
  distractors: string[];
}

export interface CloudLesson {
  id: number;
  slug: string;
  courseOrder: number;
  unitOrder: number;
  unitTitle: string;
  sceneTitle: string;
  title: string;
  summary: string;
  durationMinutes: number;
  completedItemIds: number[];
  completedAt: string | null;
  grammar: {
    title: string;
    pattern: string;
    explanation: string;
    exampleEnglish: string;
    exampleChinese: string;
  };
  dialogue: Array<{ speaker: string; english: string; chinese: string }>;
  storyTitle: string;
  storyEnglish: string;
  storyChinese: string;
  items: CloudLessonItem[];
}

export interface CourseLearningState {
  lesson: CloudLesson | null;
  courseCompleted: boolean;
  completedLessons: number;
  totalLessons: number;
}

export interface MistakeEntry {
  id: number;
  wrongCount: number;
  lastWrongAnswer: string | null;
  lastWrongAt: string;
  status: MistakeStatus;
  item: {
    id: number;
    english: string;
    chinese: string;
    prompt: string | null;
    correctAnswer: string | null;
    imageKey: MemoryImage | null;
    visual: string | null;
  };
}

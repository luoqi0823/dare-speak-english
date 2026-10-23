export type LearningView = "today" | "travel" | "review";

export type MemoryImage = string;

export interface LearningStep {
  id: "image" | "number" | "scene";
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  tone: "coral" | "blue" | "yellow";
}

export interface PersistedLearningState {
  version: 1;
  completedSteps: boolean[];
  lastCheckIn: string | null;
}

import type { MemoryImage } from "@/features/learning/model/types";

export type TravelSceneKind = "primary" | "quick" | "destination";

export interface TravelPhrase {
  english: string;
  chinese: string;
}

export interface TravelWord {
  english: string;
  chinese: string;
}

export interface TravelDialogueLine extends TravelPhrase {
  speaker: "你" | "对方";
}

export interface TravelMission {
  id: string;
  title: string;
  description: string;
  phrases: readonly TravelPhrase[];
  words: readonly TravelWord[];
  dialogue: readonly TravelDialogueLine[];
}

export interface TravelScene {
  id: string;
  index: string;
  kind: TravelSceneKind;
  title: string;
  englishTitle: string;
  topics: string;
  sentence: string;
  sentenceChinese: string;
  tagline: string;
  description: string;
  image?: MemoryImage;
  stamp: string;
  missions: readonly TravelMission[];
}

"use client";

import { speakEnglish } from "@/features/learning/lib/speech";

import styles from "./travel.module.css";

interface PhrasePlayerProps {
  english: string;
  compact?: boolean;
}

export function PhrasePlayer({ english, compact = false }: PhrasePlayerProps) {
  return (
    <button
      aria-label={`试听：${english}`}
      className={compact ? styles.compactListenButton : styles.listenButton}
      onClick={() => speakEnglish(english)}
      type="button"
    >
      <span aria-hidden="true">▶</span>
      {compact ? "听" : "听整句"}
    </button>
  );
}

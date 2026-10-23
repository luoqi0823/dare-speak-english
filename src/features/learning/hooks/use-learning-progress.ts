"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { PersistedLearningState } from "../model/types";

const STORAGE_KEY = "dare-speak-english:learning-state";
const EMPTY_STATE: PersistedLearningState = {
  version: 1,
  completedSteps: [false, false, false],
  lastCheckIn: null,
};

let cachedState = EMPTY_STATE;
let hasReadStorage = false;
const listeners = new Set<() => void>();

function readPersistedState(): PersistedLearningState {
  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) return EMPTY_STATE;

    const parsed = JSON.parse(rawState) as Partial<PersistedLearningState>;
    if (parsed.version !== 1 || !Array.isArray(parsed.completedSteps)) return EMPTY_STATE;

    return {
      version: 1,
      completedSteps: [0, 1, 2].map((index) => Boolean(parsed.completedSteps?.[index])),
      lastCheckIn: typeof parsed.lastCheckIn === "string" ? parsed.lastCheckIn : null,
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function useLearningProgress() {
  const state = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => {
      if (!hasReadStorage) {
        cachedState = readPersistedState();
        hasReadStorage = true;
      }
      return cachedState;
    },
    () => EMPTY_STATE,
  );

  const persist = useCallback((nextState: PersistedLearningState) => {
    cachedState = nextState;
    hasReadStorage = true;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    listeners.forEach((listener) => listener());
  }, []);

  const completeStep = useCallback(
    (index: number) => {
      if (cachedState.completedSteps[index]) return;
      const completedSteps = [...cachedState.completedSteps];
      completedSteps[index] = true;
      persist({ ...cachedState, completedSteps });
    },
    [persist],
  );

  const checkInToday = useCallback(() => {
    const today = new Date().toLocaleDateString("en-CA");
    persist({ version: 1, completedSteps: [true, true, true], lastCheckIn: today });
  }, [persist]);

  const today = new Date().toLocaleDateString("en-CA");
  const completedCount = state.completedSteps.reduce((count, completed) => count + Number(completed), 0);

  return {
    completedSteps: state.completedSteps,
    completedCount,
    checkedInToday: state.lastCheckIn === today,
    completeStep,
    checkInToday,
  };
}

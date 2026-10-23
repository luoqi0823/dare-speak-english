"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";

import { useLearningProgress } from "../hooks/use-learning-progress";
import type { LearningView } from "../model/types";
import { HeroSection } from "./hero-section";
import { MemoryLab } from "./memory-lab";
import { ReviewSection } from "./review-section";
import { SiteHeader } from "./site-header";
import { TodayPlan } from "./today-plan";
import { TravelSection } from "./travel-section";
import styles from "./learning.module.css";

export function LearningExperience() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<LearningView>("today");
  const progress = useLearningProgress();

  const changeView = useCallback((view: LearningView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openLesson = useCallback(() => router.push("/learn"), [router]);

  return (
    <>
      <div aria-hidden="true" className={styles.paperNoise} />
      <SiteHeader activeView={activeView} onViewChange={changeView} />
      <main className={styles.pageShell}>
        {activeView === "today" ? (
          <>
            <HeroSection onStartLesson={openLesson} />
            <TodayPlan
              completedCount={progress.completedCount}
              completedSteps={progress.completedSteps}
              onCompleteStep={progress.completeStep}
              onOpenLesson={openLesson}
            />
            <MemoryLab />
          </>
        ) : null}
        {activeView === "travel" ? <TravelSection /> : null}
        {activeView === "review" ? <ReviewSection checkedInToday={progress.checkedInToday} onCheckIn={progress.checkInToday} /> : null}
      </main>
      <footer className={styles.footer}>
        <BrandLogo size="small" />
        <p>少一点负担，多一次想起来。</p><small>原创学习体验 · 不复制第三方教材图片</small>
      </footer>
    </>
  );
}

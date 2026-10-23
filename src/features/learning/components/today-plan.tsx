import type { CSSProperties } from "react";

import { learningSteps } from "../model/content";
import { MemoryImage } from "./memory-image";
import styles from "./learning.module.css";

interface TodayPlanProps {
  completedSteps: boolean[];
  completedCount: number;
  onCompleteStep: (index: number) => void;
  onOpenLesson: () => void;
}

export function TodayPlan({ completedSteps, completedCount, onCompleteStep, onOpenLesson }: TodayPlanProps) {
  const progressStyle = { "--progress": `${completedCount * 120}deg` } as CSSProperties;

  const handleStep = (index: number) => {
    onCompleteStep(index);
    onOpenLesson();
  };

  return (
    <section className={styles.todayPlan}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}><span />ONE LESSON, THREE LAYERS</p><h2>一课分成三小步</h2></div>
        <div aria-label={`已完成 ${completedCount} 项，共 3 项`} className={styles.progressRing} style={progressStyle}><span>{completedCount}/3</span></div>
      </div>
      <div className={styles.stepsGrid}>
        {learningSteps.map((step, index) => (
          <article className={`${styles.stepCard} ${styles[step.tone]} ${completedSteps[index] ? styles.complete : ""}`} key={step.id}>
            <div className={styles.stepTop}><span className={styles.stepNumber}>{step.eyebrow}</span><span className={styles.stepTime}>4 MIN</span></div>
            {step.id === "image" ? <MemoryImage className={styles.miniImage} image="apple" label="苹果插图" /> : null}
            {step.id === "number" ? <div className={styles.numberMemory}><span>2</span><i>一段小故事</i></div> : null}
            {step.id === "scene" ? <div className={styles.speechScene}><span className={styles.speechBubble}>An apple,<br />please.</span><span aria-hidden="true">🍎</span></div> : null}
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <button className={styles.stepButton} onClick={() => handleStep(index)} type="button">
              进入完整课程<span>→</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

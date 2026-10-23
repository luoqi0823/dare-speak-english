"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { MemoryImage } from "@/features/learning/components/memory-image";
import { speakEnglish } from "@/features/learning/lib/speech";

import type { CourseLearningState } from "../model/types";
import styles from "./cloud-learning.module.css";

interface LearningDashboardProps {
  email: string;
  courseState: CourseLearningState;
  mistakeCount: number;
}

interface Feedback {
  itemId: number;
  correct: boolean;
  message: string;
}

interface ProgressResponse {
  data?: {
    completedAt: string | null;
    completedItemIds: number[];
  };
  message?: string;
}

async function readMessage(response: Response, fallback: string) {
  const payload = (await response.json().catch(() => null)) as { message?: string } | null;
  return payload?.message ?? fallback;
}

export function LearningDashboard({ courseState, email, mistakeCount }: LearningDashboardProps) {
  const { lesson } = courseState;
  const router = useRouter();
  const [completedItemIds, setCompletedItemIds] = useState<number[]>(lesson?.completedItemIds ?? []);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [savingItemId, setSavingItemId] = useState<number | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const completedSet = useMemo(() => new Set(completedItemIds), [completedItemIds]);
  const totalItems = lesson?.items.length ?? 0;
  const progress = totalItems === 0 ? 0 : Math.round((completedItemIds.length / totalItems) * 100);
  const knowledgeItems = lesson?.items.filter((item) => item.kind === "word" || item.kind === "phrase") ?? [];
  const exerciseItems = lesson?.items.filter((item) => item.kind === "quiz" || item.kind === "comprehension") ?? [];

  async function markCompleted(itemId: number) {
    if (!lesson || completedSet.has(itemId)) return;
    setSavingItemId(itemId);
    try {
      const response = await fetch("/api/learning/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, completedItemId: itemId }),
      });

      if (!response.ok) {
        setFeedback({ itemId, correct: false, message: await readMessage(response, "进度保存失败，请重试") });
        return;
      }

      const result = (await response.json().catch(() => null)) as ProgressResponse | null;
      setCompletedItemIds(result?.data?.completedItemIds ?? ((current) => Array.from(new Set([...current, itemId]))));
      setFeedback({ itemId, correct: true, message: "记住啦，已同步到云端。" });
    } catch {
      setFeedback({ itemId, correct: false, message: "网络没有连接好，进度未保存，请重试。" });
    } finally {
      setSavingItemId(null);
    }
  }

  async function answer(itemId: number, selected: string, correctAnswer: string) {
    if (selected === correctAnswer) {
      await markCompleted(itemId);
      return;
    }

    setSavingItemId(itemId);
    try {
      const response = await fetch("/api/learning/mistakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonItemId: itemId, wrongAnswer: selected }),
      });
      setFeedback({
        itemId,
        correct: false,
        message: response.ok ? `先不急，正确答案是 ${correctAnswer}。这题已放进错题本。` : await readMessage(response, "错题记录失败，请重试"),
      });
    } catch {
      setFeedback({ itemId, correct: false, message: "网络没有连接好，错题没有记录，请重试。" });
    } finally {
      setSavingItemId(null);
    }
  }

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  return (
    <main className={styles.cloudPage}>
      <header className={styles.cloudHeader}>
        <Link aria-label="返回敢说英语首页" className={styles.brandLink} href="/">
          <BrandLogo compactOnSmall size="small" />
        </Link>
        <nav aria-label="学习中心导航" className={styles.cloudNav}>
          <Link aria-current="page" href="/learn">今日课程</Link>
          <Link href="/mistakes">错题本 <b>{mistakeCount}</b></Link>
          <button disabled={loggingOut} onClick={logout} type="button">{loggingOut ? "退出中…" : "退出"}</button>
        </nav>
      </header>

      <section className={styles.dashboardHero}>
        <div>
          <p className={styles.kicker}>{lesson ? `COURSE DAY ${String(lesson.courseOrder).padStart(2, "0")} · 单元 ${lesson.unitOrder} ${lesson.unitTitle}` : "30 DAYS · 生存英语第一阶段"}</p>
          <h1>{lesson?.title ?? (courseState.courseCompleted ? "30节课，真的走完了。" : "课程还在准备中")}</h1>
          <p>{lesson ? `${lesson.sceneTitle} · ${lesson.summary}` : courseState.courseCompleted ? "你已经完成第一阶段。单词可能还会忘，但你已经知道怎样继续开口。" : "课程发布后会自动出现在这里。"}</p>
          <small>已登录：{email}</small>
        </div>
        {lesson ? (
          <div aria-label={`今日课程完成 ${progress}%`} className={styles.progressCard}>
            <div className={styles.progressNumber}>{progress}<sup>%</sup></div>
            <p>{completedItemIds.length}/{totalItems} 个记忆点</p>
            <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
            <small>{progress === 100 ? "本课完成，可以进入下一课 ✓" : `预计 ${lesson.durationMinutes} 分钟 · 总进度 ${courseState.completedLessons}/${courseState.totalLessons} 课`}</small>
          </div>
        ) : null}
      </section>

      {lesson ? (
        <>
          <section className={styles.sectionIntro}>
            <span>01</span><div><p className={styles.kicker}>WORDS & PHRASES</p><h2>先挂住 7 个记忆点</h2><p>不抄写。看画面、听一遍，再亲手确认。</p></div>
          </section>
          <section className={styles.knowledgeGrid}>
          {knowledgeItems.map((item) => {
            const done = completedSet.has(item.id);
            return (
              <article className={`${styles.knowledgeCard} ${done ? styles.lessonCardDone : ""}`} key={item.id}>
                <div className={styles.cardIndex}>{String(item.position).padStart(2, "0")}</div>
                <div className={styles.visualMemory}>{item.imageKey ? <MemoryImage className={styles.lessonImage} image={item.imageKey} label={item.chinese} /> : <span aria-hidden="true" className={styles.visualFallback}>{item.english.slice(0, 1).toUpperCase()}</span>}</div>
                <div className={styles.knowledgeCopy}>
                  <p className={styles.itemKind}>{item.kind === "phrase" ? "实用短语" : "图像单词"}</p>
                  <h2>{item.english}</h2>
                  <p className={styles.translation}>{item.phonetic ? `${item.phonetic} · ` : ""}{item.chinese}</p>
                  {item.mnemonic ? <div className={styles.mnemonic}><b>记忆钩子</b>{item.mnemonic}</div> : null}
                  <div className={styles.cardActions}><button aria-label={`朗读 ${item.english}`} onClick={() => speakEnglish(item.english)} type="button">▶ 听</button><button disabled={savingItemId === item.id || done} onClick={() => markCompleted(item.id)} type="button">{done ? "已记住 ✓" : savingItemId === item.id ? "同步中…" : "我记住了"}</button></div>
                  {feedback?.itemId === item.id ? <p className={feedback.correct ? styles.goodFeedback : styles.badFeedback}>{feedback.message}</p> : null}
                </div>
              </article>
            );
          })}
          </section>

          <section className={styles.storyStage}>
            <div className={styles.grammarNote}>
              <p className={styles.kicker}>02 · MICRO GRAMMAR</p><h2>{lesson.grammar.title}</h2><code>{lesson.grammar.pattern}</code><p>{lesson.grammar.explanation}</p><blockquote><b>{lesson.grammar.exampleEnglish}</b><span>{lesson.grammar.exampleChinese}</span></blockquote>
            </div>
            <div className={styles.dialogueNote}>
              <p className={styles.kicker}>03 · SCENE DIALOGUE</p><h2>{lesson.sceneTitle}</h2>
              {lesson.dialogue.map((line, index) => <button key={`${line.speaker}-${index}`} onClick={() => speakEnglish(line.english)} type="button"><b>{line.speaker}</b><span>{line.english}<small>{line.chinese}</small></span><i>▶</i></button>)}
            </div>
          </section>

          <article className={styles.storyPaper}>
            <div><p className={styles.kicker}>04 · MINI STORY</p><h2>{lesson.storyTitle}</h2></div>
            <button onClick={() => speakEnglish(lesson.storyEnglish, 0.72)} type="button">▶ 慢速听全文</button>
            <p className={styles.englishStory}>{lesson.storyEnglish}</p><p className={styles.chineseStory}>{lesson.storyChinese}</p>
          </article>

          <section className={styles.exerciseSection}>
            <div className={styles.sectionIntro}><span>05</span><div><p className={styles.kicker}>RECALL TEST</p><h2>不看答案，主动想起来</h2><p>答错会自动进入错题本，忘记本来就是学习的一部分。</p></div></div>
            <div className={styles.exerciseGrid}>{exerciseItems.map((item) => {
              const done = completedSet.has(item.id);
              const options = item.correctAnswer ? [item.correctAnswer, ...item.distractors].toSorted((a, b) => a.localeCompare(b)) : [];
              return <article className={`${styles.exerciseCard} ${done ? styles.lessonCardDone : ""}`} key={item.id}><small>{item.kind === "comprehension" ? "文章理解" : "单词回想"}</small><h3>{item.prompt}</h3><div className={styles.answerList}>{options.map((option) => <button disabled={savingItemId === item.id || done} key={option} onClick={() => answer(item.id, option, item.correctAnswer!)} type="button">{option}</button>)}</div>{feedback?.itemId === item.id ? <p className={feedback.correct ? styles.goodFeedback : styles.badFeedback}>{feedback.message}</p> : null}</article>;
            })}</div>
          </section>

          {progress === 100 ? <section className={styles.lessonComplete}><span>✓</span><div><p>COURSE DAY {lesson.courseOrder} COMPLETE</p><h2>{lesson.courseOrder === courseState.totalLessons ? "第一阶段完成" : "今天学到这里，刚刚好。"}</h2></div><button onClick={() => router.refresh()} type="button">{lesson.courseOrder === courseState.totalLessons ? "查看结业页" : "进入下一课 →"}</button></section> : null}
        </>
      ) : courseState.courseCompleted ? <div className={styles.graduation}><span>30</span><h2>你已经完成生存英语第一阶段</h2><p>150个核心词、60个短语、30篇微文章，都已经真正走过一遍。</p><Link href="/mistakes">去复习错题 →</Link></div> : <div className={styles.emptyState}>课程发布后会自动出现在这里。</div>}
    </main>
  );
}

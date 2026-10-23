"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { MemoryImage } from "@/features/learning/components/memory-image";
import { speakEnglish } from "@/features/learning/lib/speech";

import type { MistakeEntry } from "../model/types";
import styles from "./cloud-learning.module.css";

interface MistakeListProps {
  entries: MistakeEntry[];
}

export function MistakeList({ entries }: MistakeListProps) {
  const router = useRouter();
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function markMastered(id: number) {
    setSavingId(id);
    setMessage(null);
    try {
      const response = await fetch(`/api/learning/mistakes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "mastered" }),
      });
      if (response.ok) {
        router.refresh();
        return;
      }

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      setMessage(result?.message ?? "更新失败，请重试");
    } catch {
      setMessage("网络没有连接好，掌握状态未保存，请重试。");
    } finally {
      setSavingId(null);
    }
  }

  const learningEntries = entries.filter((entry) => entry.status === "learning");
  const masteredEntries = entries.filter((entry) => entry.status === "mastered");

  return (
    <main className={styles.cloudPage}>
      <header className={styles.cloudHeader}>
        <Link aria-label="返回敢说英语首页" className={styles.brandLink} href="/"><BrandLogo compactOnSmall size="small" /></Link>
        <nav aria-label="错题本导航" className={styles.cloudNav}><Link href="/learn">← 返回今日课程</Link></nav>
      </header>
      <section className={styles.mistakeHero}>
        <p className={styles.kicker}>REVIEW · 忘记不是失败</p>
        <h1>把错过的，再遇见一次。</h1>
        <p>每次答错都会自动留下来。真正记住后，再亲手把它划掉。</p>
      </section>
      {message ? <p aria-live="polite" className={styles.requestError}>{message}</p> : null}

      {learningEntries.length === 0 ? (
        <section className={styles.emptyNotebook}>
          <span>✓</span><h2>错题本是空的</h2><p>去完成今天的课程吧，答错也完全没关系。</p><Link href="/learn">开始学习</Link>
        </section>
      ) : (
        <section className={styles.mistakeGrid}>
          {learningEntries.map((entry) => (
            <article className={styles.mistakeCard} key={entry.id}>
              {entry.item.imageKey ? <MemoryImage className={styles.mistakeImage} image={entry.item.imageKey} label={entry.item.chinese} /> : <span aria-label={entry.item.chinese} className={styles.mistakeVisual} role="img">Aa</span>}
              <div>
                <small>错过 {entry.wrongCount} 次</small>
                <h2>{entry.item.english}</h2>
                <p>{entry.item.chinese}</p>
                {entry.item.prompt ? <p><b>题目：</b>{entry.item.prompt}</p> : null}
                {entry.lastWrongAnswer ? <p className={styles.wrongAnswer}>上次选了：{entry.lastWrongAnswer}</p> : null}
                {entry.item.correctAnswer ? <p className={styles.correctAnswer}>正确答案：{entry.item.correctAnswer}</p> : null}
                <div className={styles.mistakeActions}>
                  <button onClick={() => speakEnglish(entry.item.english)} type="button">▶ 再听一遍</button>
                  <button disabled={savingId === entry.id} onClick={() => markMastered(entry.id)} type="button">{savingId === entry.id ? "保存中…" : "我已掌握 ✓"}</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {masteredEntries.length > 0 ? <p className={styles.masteredCount}>已经掌握 {masteredEntries.length} 道题，做得很好。</p> : null}
    </main>
  );
}

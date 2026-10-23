"use client";

import { useState } from "react";

import { speakEnglish } from "../lib/speech";
import { MemoryImage } from "./memory-image";
import styles from "./learning.module.css";

const memoryHooks = [
  { id: "image", index: "01", title: "图像", detail: "红色、缺一口" },
  { id: "sound", index: "02", title: "声音", detail: "apple 的 a 像张嘴" },
  { id: "scene", index: "03", title: "场景", detail: "在早餐店点苹果" },
] as const;

export function MemoryLab() {
  const [activeHook, setActiveHook] = useState("image");
  const [flipped, setFlipped] = useState(false);

  const selectHook = (hookId: string) => {
    setActiveHook(hookId);
    if (hookId === "sound") speakEnglish("apple");
    if (hookId === "scene") speakEnglish("Can I have an apple?");
  };

  return (
    <section className={styles.memoryLab}>
      <div className={styles.lessonCopy}>
        <p className={styles.eyebrow}><span />MEMORY LAB</p>
        <h2>一张图，三条记忆线</h2>
        <p>不要一次背十遍。先看，再遮住，再从脑海里“捞”出来。</p>
        <div className={styles.memoryHooks}>
          {memoryHooks.map((hook) => (
            <button className={`${styles.hook} ${activeHook === hook.id ? styles.hookActive : ""}`} key={hook.id} onClick={() => selectHook(hook.id)} type="button">
              <b>{hook.index}</b><span><strong>{hook.title}</strong>{hook.detail}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.flipWrap}>
        <button aria-label="翻转单词卡" className={`${styles.wordCard} ${flipped ? styles.wordCardFlipped : ""}`} onClick={() => setFlipped((current) => !current)} type="button">
          <span className={`${styles.cardFace} ${styles.cardFront}`}>
            <MemoryImage className={styles.cardImage} image="apple" />
            <span className={styles.tapHint}>点一下，遮住图片回忆</span>
          </span>
          <span className={`${styles.cardFace} ${styles.cardBack}`}>
            <span className={styles.hugeWord}>apple</span><span className={styles.phonetic}>/ˈæp.əl/</span>
            <span className={styles.example}>Can I have an apple?</span><span className={styles.translation}>我可以要一个苹果吗？</span>
            <span className={styles.tapHint}>点一下，再看图片</span>
          </span>
        </button>
        <button className={styles.listenPill} onClick={() => speakEnglish("Apple. Can I have an apple?")} type="button">▶ 听发音</button>
      </div>
    </section>
  );
}

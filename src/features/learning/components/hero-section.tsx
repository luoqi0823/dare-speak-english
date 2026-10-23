import { MemoryImage } from "./memory-image";
import { speakEnglish } from "../lib/speech";
import styles from "./learning.module.css";

interface HeroSectionProps {
  onStartLesson: () => void;
}

export function HeroSection({ onStartLesson }: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><span />30 COURSE DAYS · 从一句敢开口开始</p>
        <h1>不用死记，<br /><em>看见</em>就想起来。</h1>
        <p className={styles.heroIntro}>给总是“背了又忘”的你。每天 6 分钟，用图像、短语、微语法和小文章，把英语挂在真实场景里。</p>
        <div className={styles.heroActions}>
          <button className={styles.primaryButton} onClick={onStartLesson} type="button">开始第一阶段课程 <span>→</span></button>
          <button
            aria-label="听一句英语"
            className={styles.soundButton}
            onClick={() => speakEnglish("Hello. You do not need perfect English. You only need to start.")}
            type="button"
          >
            <span aria-hidden="true">◖))</span> 先听一句
          </button>
        </div>
        <p className={styles.gentleNote}>断了也没关系。回来，就算继续。</p>
      </div>
      <div aria-label="今日学习卡片预览" className={styles.heroVisual}>
        <div className={styles.sunSticker}>6<small>MIN</small></div>
        <div className={styles.mainPostcard}>
          <MemoryImage className={styles.postcardImage} image="apple" label="被咬了一口的红苹果插图" />
          <div className={styles.postcardCopy}>
            <span className={styles.tinyLabel}>TODAY&apos;S WORD</span>
            <strong>apple</strong>
            <span className={styles.phonetic}>/ˈæp.əl/ · 苹果</span>
          </div>
        </div>
        <div aria-hidden="true" className={styles.tape} />
        <div className={styles.scribble}>咬一口，<br />记住 <b>a</b> 的嘴型！</div>
        <div aria-hidden="true" className={styles.doodleArrow}>↗</div>
      </div>
    </section>
  );
}

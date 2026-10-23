import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";

import { travelScenes } from "../model/content";
import type { TravelPhrase, TravelScene } from "../model/types";
import { PhrasePlayer } from "./phrase-player";
import styles from "./travel.module.css";

interface TravelScenePageProps {
  scene: TravelScene;
}

function getEmergencyPhrases(scene: TravelScene): readonly TravelPhrase[] {
  const phrases = scene.missions.flatMap((item) => item.phrases);
  const missionSize = scene.missions[0]?.phrases.length ?? 0;
  return [phrases[0], phrases[missionSize], phrases[missionSize * 2], phrases[1]].filter(
    (item): item is TravelPhrase => Boolean(item),
  );
}

export function TravelScenePage({ scene }: TravelScenePageProps) {
  const emergencyPhrases = getEmergencyPhrases(scene);
  const relatedScenes = travelScenes.filter((item) => item.id !== scene.id).slice(0, 3);

  return (
    <div className={styles.page}>
      <div aria-hidden="true" className={styles.paperNoise} />
      <header className={styles.header}>
        <Link aria-label="返回首页" className={styles.brandLink} href="/"><BrandLogo size="small" /></Link>
        <Link className={styles.backLink} href="/">← 返回首页</Link>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span />TRAVEL FIRST-AID KIT · {scene.index}</p>
            <div className={styles.titleRow}>
              <span className={styles.sceneStamp}>{scene.stamp}</span>
              <div><h1>{scene.title}</h1><p className={styles.englishTitle}>{scene.englishTitle}</p></div>
            </div>
            <h2>{scene.tagline}</h2>
            <p className={styles.heroDescription}>{scene.description}</p>
            <div className={styles.sceneMeta}>
              <span>3 个真实任务</span><span>12 句常用语</span><span>18 个替换词</span>
            </div>
          </div>

          <aside className={styles.emergencyCard}>
            <p className={styles.cardLabel}>OPEN &amp; SPEAK</p>
            <h2>现在先记住这 4 句</h2>
            <div className={styles.emergencyList}>
              {emergencyPhrases.map((item, index) => (
                <div className={styles.emergencyPhrase} key={item.english}>
                  <span className={styles.phraseIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{item.english}</strong><small>{item.chinese}</small></div>
                  <PhrasePlayer compact english={item.english} />
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.routeSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}><span />YOUR ROUTE</p>
            <h2>一次只解决一件事</h2>
            <p>不用按顺序上课。到哪个环节，就直接打开哪个任务。</p>
          </div>

          <div className={styles.missionList}>
            {scene.missions.map((item, missionIndex) => (
              <article className={styles.mission} key={item.id}>
                <header className={styles.missionHeader}>
                  <span>{String(missionIndex + 1).padStart(2, "0")}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  <small>约 3 分钟</small>
                </header>

                <div className={styles.missionBody}>
                  <div className={styles.phrasePanel}>
                    <h4>直接照着说</h4>
                    <div className={styles.phraseList}>
                      {item.phrases.map((itemPhrase) => (
                        <div className={styles.phraseRow} key={itemPhrase.english}>
                          <div><strong>{itemPhrase.english}</strong><span>{itemPhrase.chinese}</span></div>
                          <PhrasePlayer english={itemPhrase.english} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.sidePanel}>
                    <div>
                      <h4>替换这几个词</h4>
                      <div className={styles.wordList}>
                        {item.words.map((itemWord) => <span key={itemWord.english}><b>{itemWord.english}</b>{itemWord.chinese}</span>)}
                      </div>
                    </div>
                    <div className={styles.dialogue}>
                      <h4>把它说进对话</h4>
                      {item.dialogue.map((dialogueLine, index) => (
                        <div className={dialogueLine.speaker === "你" ? styles.youLine : styles.otherLine} key={`${dialogueLine.english}-${index}`}>
                          <small>{dialogueLine.speaker}</small>
                          <p>{dialogueLine.english}</p>
                          <span>{dialogueLine.chinese}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.practiceSection}>
          <div><p className={styles.eyebrow}><span />3-MINUTE PRACTICE</p><h2>真正开口，只做三遍</h2></div>
          <ol>
            <li><b>第一遍</b><span>听整句，看着英文跟读。</span></li>
            <li><b>第二遍</b><span>换掉一个地点、时间或数量。</span></li>
            <li><b>第三遍</b><span>遮住英文，只看中文说出来。</span></li>
          </ol>
        </section>

        <section className={styles.relatedSection}>
          <p className={styles.eyebrow}><span />KEEP MOVING</p>
          <h2>接下来可能会用到</h2>
          <div className={styles.relatedGrid}>
            {relatedScenes.map((item) => (
              <Link href={`/travel/${item.id}`} key={item.id}>
                <span>{item.stamp}</span><div><strong>{item.title}</strong><small>{item.topics}</small></div><b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <BrandLogo size="small" />
        <p>场景急救包与 30 节课程独立，随时打开，随时开口。</p>
      </footer>
    </div>
  );
}

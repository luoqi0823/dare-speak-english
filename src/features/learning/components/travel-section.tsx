import Link from "next/link";

import {
  destinationTravelScenes,
  primaryTravelScenes,
  quickTravelScenes,
} from "@/features/travel/model/content";

import { speakEnglish } from "../lib/speech";
import { MemoryImage } from "./memory-image";
import styles from "./learning.module.css";

export function TravelSection() {
  const destination = destinationTravelScenes[0];

  return (
    <section className={styles.contentSection}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}><span />TRAVEL ENGLISH</p><h2>先学落地就能用的</h2></div>
        <p className={styles.sectionSidecopy}>不从语法名词开始，先从你会遇到的那一刻开始。场景包与 30 节课程独立，打开就能听、照着说。</p>
      </div>
      <div className={styles.travelGrid}>
        {primaryTravelScenes.map((scene) => (
          <article className={styles.travelCard} key={scene.id}>
            <Link aria-label={`进入${scene.title}场景急救包`} className={styles.travelCardMain} href={`/travel/${scene.id}`}>
              {scene.image ? <MemoryImage className={styles.travelIllustration} image={scene.image} /> : null}
              <span className={styles.travelIndex}>{scene.index}</span>
              <strong>{scene.title}</strong><small>{scene.topics}</small><i>{scene.sentence}</i>
              <span className={styles.travelEntry}>打开急救包 <b aria-hidden="true">→</b></span>
            </Link>
            <button aria-label={`试听：${scene.sentence}`} className={styles.travelListen} onClick={() => speakEnglish(scene.sentence)} type="button">▶ 听整句</button>
          </article>
        ))}
      </div>

      <div className={styles.travelSubheading}>
        <p className={styles.eyebrow}><span />ON THE ROAD</p>
        <h3>人在路上，更容易突然卡住</h3>
      </div>
      <div className={styles.travelQuickGrid}>
        {quickTravelScenes.map((scene) => (
          <Link className={styles.travelQuickCard} href={`/travel/${scene.id}`} key={scene.id}>
            <span className={styles.travelQuickStamp}>{scene.stamp}</span>
            <span><strong>{scene.title}</strong><small>{scene.topics}</small></span>
            <i>{scene.sentence}</i>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>

      {destination ? (
        <Link className={styles.destinationCard} href={`/travel/${destination.id}`}>
          <span className={styles.destinationMap} aria-hidden="true"><b>64°N</b><i>ICE<br />LAND</i><small>IS · 01</small></span>
          <span className={styles.destinationCopy}>
            <small>DESTINATION FIELD GUIDE</small>
            <strong>{destination.title}</strong>
            <p>{destination.tagline}</p>
            <i>{destination.sentence}</i>
            <span>打开目的地实战包 <b aria-hidden="true">→</b></span>
          </span>
        </Link>
      ) : null}
    </section>
  );
}

import { reviewMoments } from "../model/content";
import styles from "./learning.module.css";

interface ReviewSectionProps {
  checkedInToday: boolean;
  onCheckIn: () => void;
}

export function ReviewSection({ checkedInToday, onCheckIn }: ReviewSectionProps) {
  return (
    <section className={styles.contentSection}>
      <div className={styles.sectionHeading}>
        <div><p className={styles.eyebrow}><span />COME BACK, NOT START OVER</p><h2>忘记，是下一次记住的入口</h2></div>
      </div>
      <div className={styles.reviewLayout}>
        <div className={styles.reviewTimeline}>
          <div aria-hidden="true" className={styles.timelineLine} />
          {reviewMoments.map(([title, detail], index) => (
            <div className={`${styles.reviewNode} ${index === 0 ? styles.reviewNodeDone : ""}`} key={title}><b>{title}</b><span>{detail}</span></div>
          ))}
        </div>
        <div className={styles.restartCard}>
          <span aria-hidden="true" className={styles.restartPlant}>🌱</span>
          <p>你不需要补回错过的每一天。</p>
          <h3>今天学 1 个词，<br />也算重新连接。</h3>
          <button className={styles.primaryButton} disabled={checkedInToday} onClick={onCheckIn} type="button">
            {checkedInToday ? "今天已连接 ✓" : "完成今日学习"}
          </button>
          <small>{checkedInToday ? "今天已经完成，明天见" : "今天还没有打卡"}</small>
        </div>
      </div>
    </section>
  );
}

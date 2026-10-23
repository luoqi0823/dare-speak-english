import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";

import type { LearningView } from "../model/types";
import styles from "./learning.module.css";

interface SiteHeaderProps {
  activeView: LearningView;
  onViewChange: (view: LearningView) => void;
}

const navigationItems: Array<{ label: string; view: LearningView }> = [
  { label: "今天", view: "today" },
  { label: "旅行", view: "travel" },
  { label: "复习", view: "review" },
];

export function SiteHeader({ activeView, onViewChange }: SiteHeaderProps) {
  return (
    <header className={styles.topbar}>
      <button aria-label="返回今天的学习内容" className={styles.brandButton} onClick={() => onViewChange("today")} type="button">
        <BrandLogo compactOnSmall size="small" />
      </button>
      <nav aria-label="主导航" className={styles.navigation}>
        {navigationItems.map((item) => (
          <button
            aria-current={activeView === item.view ? "page" : undefined}
            className={`${styles.navLink} ${activeView === item.view ? styles.navLinkActive : ""}`}
            key={item.view}
            onClick={() => onViewChange(item.view)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <Link aria-label="登录并同步学习进度" className={styles.profileBadge} href="/login">登录</Link>
    </header>
  );
}

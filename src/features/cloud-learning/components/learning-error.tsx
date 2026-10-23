"use client";

import Link from "next/link";
import { useEffect } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";

import styles from "./cloud-learning.module.css";

interface LearningErrorProps {
  error: unknown;
  retry: () => void;
}

export function LearningError({ error, retry }: LearningErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.cloudPage}>
      <header className={styles.cloudHeader}>
        <Link aria-label="返回敢说英语首页" className={styles.brandLink} href="/">
          <BrandLogo compactOnSmall size="small" />
        </Link>
      </header>
      <section className={styles.learningError}>
        <span aria-hidden="true">↻</span>
        <p className={styles.kicker}>TEMPORARY PAUSE · 暂时停一下</p>
        <h1>课程没有加载出来</h1>
        <p>学习记录还在云端。可以重新加载，或者先返回首页。</p>
        <div>
          <button onClick={retry} type="button">重新加载</button>
          <Link href="/">返回首页</Link>
        </div>
      </section>
    </main>
  );
}

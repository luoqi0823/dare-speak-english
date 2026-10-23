import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { AuthForm } from "@/features/auth/components/auth-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

import styles from "./page.module.css";

interface LoginIntroProps {
  configured: boolean;
}

function LoginIntro({ configured }: LoginIntroProps) {
  return (
    <section className={styles.intro}>
      <BrandLogo priority size="large" tagline="每天 6 分钟，敢说一点点" />
      <p className={styles.eyebrow}>CLOUD LEARNING · 云端学习空间</p>
      <h1>
        {configured ? <>换一台设备，<br />也从上次<span>继续</span>。</> : <>连接云端后，<br />就能接着<span>学习</span>。</>}
      </h1>
      <p className={styles.description}>
        {configured
          ? "登录后同步每日课程、完成进度和错题。中断几天不会清零，回来就继续。"
          : "配置本地或 Vercel 的 Supabase 环境变量，再执行数据库迁移与种子脚本即可开启登录。"}
      </p>
      <div aria-label="云端同步内容" className={styles.syncItems}>
        <span>每日课程</span><span>完成进度</span><span>个人错题</span>
      </div>
      <Link href="/">{configured ? "先看看学习方式 →" : "返回体验页 →"}</Link>
    </section>
  );
}

export default async function LoginPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className={styles.loginPage}>
        <LoginIntro configured={false} />
      </main>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/learn");

  return (
    <main className={styles.loginPage}>
      <LoginIntro configured />
      <Suspense fallback={<div className={styles.formPlaceholder}>正在准备登录…</div>}><AuthForm /></Suspense>
    </main>
  );
}

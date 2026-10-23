import Link from "next/link";
import { redirect } from "next/navigation";

import { BrandLogo } from "@/components/brand/brand-logo";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

import styles from "../login/page.module.css";

export default async function ResetPasswordPage() {
  if (!isSupabaseConfigured()) redirect("/login");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login?error=invalid_recovery");

  return (
    <main className={styles.loginPage}>
      <section className={styles.intro}>
        <BrandLogo priority size="large" tagline="每天 6 分钟，敢说一点点" />
        <p className={styles.eyebrow}>ACCOUNT RECOVERY · 找回学习进度</p>
        <h1>换一个密码，<br />继续上次的<span>课程</span>。</h1>
        <p className={styles.description}>新密码只用于登录。课程进度和错题记录不会受到影响。</p>
        <Link href="/login">← 返回登录</Link>
      </section>
      <ResetPasswordForm />
    </main>
  );
}

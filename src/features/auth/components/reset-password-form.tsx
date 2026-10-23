"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import styles from "./auth.module.css";

export function ResetPasswordForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmation = String(formData.get("confirmation") ?? "");

    if (password !== confirmation) {
      setMessage("两次输入的密码不一致");
      setPending(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string; success?: boolean } | null;
      if (!response.ok || !result?.success) {
        setMessage(result?.message ?? "密码更新失败，请重试");
        return;
      }

      router.replace("/learn");
      router.refresh();
    } catch {
      setMessage("网络没有连接好，请稍后重试");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={styles.authCard}>
      <h2>设置新密码</h2>
      <p className={styles.formIntro}>使用至少 8 位的新密码，更新后会直接回到学习中心。</p>
      <form onSubmit={submit}>
        <label htmlFor="password">新密码</label>
        <input autoComplete="new-password" id="password" minLength={8} name="password" required type="password" />
        <label htmlFor="confirmation">再次输入</label>
        <input autoComplete="new-password" id="confirmation" minLength={8} name="confirmation" required type="password" />
        <button className={styles.submitButton} disabled={pending} type="submit">{pending ? "正在更新…" : "保存新密码"}</button>
      </form>
      {message ? <p aria-live="polite" className={styles.message}>{message}</p> : null}
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import styles from "./auth.module.css";

type AuthMode = "forgot-password" | "login" | "signup";

const errorMessages: Record<string, string> = {
  confirmation_failed: "确认链接已失效，请重新登录或注册。",
  invalid_confirmation: "确认链接不完整，请重新申请。",
  invalid_recovery: "密码重设链接已失效，请重新申请。",
  missing_code: "确认链接不完整，请重新申请。",
};

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("login");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    let response: Response;
    let result: { success: boolean; message?: string; requiresConfirmation?: boolean };
    try {
      response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      result = (await response.json().catch(() => ({ success: false }))) as typeof result;
    } catch {
      setMessage("网络没有连接好，请稍后重试");
      setPending(false);
      return;
    }
    setPending(false);

    if (!response.ok || !result.success) {
      setMessage(result.message ?? "操作失败，请稍后重试");
      return;
    }

    if (mode === "forgot-password" || (mode === "signup" && result.requiresConfirmation)) {
      setMessage(result.message ?? "确认邮件已发送，请前往邮箱完成注册");
      return;
    }

    const requestedPath = searchParams.get("next");
    const destination = requestedPath?.startsWith("/") && !requestedPath.startsWith("//") ? requestedPath : "/learn";
    router.replace(destination);
    router.refresh();
  };

  const queryError = searchParams.get("error");
  const visibleMessage = message ?? (queryError ? errorMessages[queryError] : null);

  return (
    <div className={styles.authCard}>
      {mode === "forgot-password" ? (
        <button className={styles.backButton} onClick={() => { setMode("login"); setMessage(null); }} type="button">← 返回登录</button>
      ) : (
        <div className={styles.tabs}>
          <button className={mode === "login" ? styles.activeTab : ""} onClick={() => { setMode("login"); setMessage(null); }} type="button">登录</button>
          <button className={mode === "signup" ? styles.activeTab : ""} onClick={() => { setMode("signup"); setMessage(null); }} type="button">注册</button>
        </div>
      )}
      {mode === "forgot-password" ? <><h2>找回密码</h2><p className={styles.formIntro}>输入注册邮箱，我们会发送一封密码重设邮件。</p></> : null}
      <form onSubmit={submit}>
        <label htmlFor="email">邮箱</label>
        <input autoComplete="email" id="email" name="email" placeholder="you@example.com" required type="email" />
        {mode !== "forgot-password" ? <><label htmlFor="password">密码</label><input autoComplete={mode === "login" ? "current-password" : "new-password"} id="password" minLength={8} name="password" placeholder="至少 8 位" required type="password" /></> : null}
        <button className={styles.submitButton} disabled={pending} type="submit">
          {pending ? "正在连接…" : mode === "login" ? "登录并同步进度" : mode === "signup" ? "创建学习账号" : "发送重设邮件"}
        </button>
      </form>
      {mode === "login" ? <button className={styles.forgotButton} onClick={() => { setMode("forgot-password"); setMessage(null); }} type="button">忘记密码？</button> : null}
      {visibleMessage ? <p aria-live="polite" className={styles.message}>{visibleMessage}</p> : null}
      <small>账号只用于同步学习进度与错题，不会公开个人信息。</small>
    </div>
  );
}

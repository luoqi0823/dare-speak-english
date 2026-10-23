import { z } from "zod";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const requestSchema = z.object({ email: z.email().trim() });

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return Response.json({ success: false, message: "Supabase 尚未配置" }, { status: 503 });

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ success: false, message: "请输入有效邮箱" }, { status: 400 });

  const origin = new URL(request.url).origin;
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  // Always return the same response so the endpoint does not reveal registered emails.
  return Response.json({ success: true, message: "如果该邮箱已注册，密码重设邮件会很快送达。" });
}

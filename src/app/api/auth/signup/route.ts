import { z } from "zod";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({ email: z.email().trim(), password: z.string().min(8).max(128) });

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return Response.json({ success: false, message: "Supabase 尚未配置" }, { status: 503 });
  const parsed = credentialsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ success: false, message: "请输入有效邮箱和至少 8 位密码" }, { status: 400 });

  const supabase = await createClient();
  const origin = new URL(request.url).origin;
  const { data, error } = await supabase.auth.signUp({ ...parsed.data, options: { emailRedirectTo: `${origin}/auth/callback` } });
  if (error) return Response.json({ success: false, message: error.message }, { status: 400 });
  const requiresConfirmation = !data.session;
  return Response.json({
    success: true,
    requiresConfirmation,
    message: requiresConfirmation ? "确认邮件已发送，请前往邮箱完成注册" : "账号已创建",
  });
}

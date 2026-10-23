import { z } from "zod";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const credentialsSchema = z.object({ email: z.email().trim(), password: z.string().min(8).max(128) });

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return Response.json({ success: false, message: "Supabase 尚未配置" }, { status: 503 });
  const parsed = credentialsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ success: false, message: "请输入有效邮箱和至少 8 位密码" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return Response.json({ success: false, message: "邮箱或密码不正确" }, { status: 401 });
  return Response.json({ success: true });
}

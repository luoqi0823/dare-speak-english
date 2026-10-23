import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const requestSchema = z.object({ password: z.string().min(8).max(128) });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ success: false, message: "新密码至少需要 8 位" }, { status: 400 });

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return Response.json({ success: false, message: "重设链接已失效，请重新申请" }, { status: 401 });

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return Response.json({ success: false, message: "密码更新失败，请重新申请重设邮件" }, { status: 400 });

  return Response.json({ success: true });
}

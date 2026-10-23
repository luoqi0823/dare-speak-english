import { NextResponse } from "next/server";
import { z } from "zod";

import { resolveLearningRpcError } from "@/features/cloud-learning/server/rpc-error";
import { createClient } from "@/lib/supabase/server";

const mistakeSchema = z.object({
  lessonItemId: z.number().int().positive(),
  wrongAnswer: z.string().trim().min(1).max(200),
});

export async function POST(request: Request) {
  const parsed = mistakeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "错题信息格式不正确" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 });
  }

  const { error } = await supabase.rpc("record_lesson_mistake", {
    p_lesson_item_id: parsed.data.lessonItemId,
    p_wrong_answer: parsed.data.wrongAnswer,
  });

  if (error) {
    const resolved = resolveLearningRpcError(error, "错题记录失败，请重试");
    return NextResponse.json({ success: false, message: resolved.message }, { status: resolved.status });
  }

  return NextResponse.json({ success: true });
}

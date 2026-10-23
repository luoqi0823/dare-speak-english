import { NextResponse } from "next/server";
import { z } from "zod";

import { resolveLearningRpcError } from "@/features/cloud-learning/server/rpc-error";
import { createClient } from "@/lib/supabase/server";

const progressSchema = z.object({
  lessonId: z.number().int().positive(),
  completedItemId: z.number().int().positive(),
});

export async function POST(request: Request) {
  const parsed = progressSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "学习进度格式不正确" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("complete_lesson_item", {
    p_lesson_id: parsed.data.lessonId,
    p_lesson_item_id: parsed.data.completedItemId,
  });

  if (error) {
    const resolved = resolveLearningRpcError(error, "学习进度保存失败，请重试");
    return NextResponse.json({ success: false, message: resolved.message }, { status: resolved.status });
  }

  const result = (data?.[0] ?? null) as {
    completed_at: string | null;
    completed_item_ids: number[];
  } | null;
  const completedItemIds = result?.completed_item_ids ?? [];
  const completedAt = result?.completed_at ?? null;
  return NextResponse.json({ success: true, data: { completedItemIds, completedAt } });
}

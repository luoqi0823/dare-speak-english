import { NextResponse } from "next/server";
import { z } from "zod";

import { resolveLearningRpcError } from "@/features/cloud-learning/server/rpc-error";
import { createClient } from "@/lib/supabase/server";

const paramsSchema = z.object({ id: z.coerce.number().int().positive() });
const updateSchema = z.object({ status: z.literal("mastered") });

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = paramsSchema.safeParse(await context.params);
  const body = updateSchema.safeParse(await request.json().catch(() => null));
  if (!params.success || !body.success) {
    return NextResponse.json({ success: false, message: "请求格式不正确" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    return NextResponse.json({ success: false, message: "请先登录" }, { status: 401 });
  }

  const { error } = await supabase.rpc("mark_mistake_mastered", {
    p_mistake_id: params.data.id,
  });

  if (error) {
    const resolved = resolveLearningRpcError(error, "更新失败，请重试");
    return NextResponse.json({ success: false, message: resolved.message }, { status: resolved.status });
  }

  return NextResponse.json({ success: true });
}

import { redirect } from "next/navigation";

import { LearningDashboard } from "@/features/cloud-learning/components/learning-dashboard";
import { getCurrentLesson, getMistakes } from "@/features/cloud-learning/server/service";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function LearnPage() {
  if (!isSupabaseConfigured()) redirect("/login");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login");

  const [courseState, mistakes] = await Promise.all([
    getCurrentLesson(supabase, data.user.id),
    getMistakes(supabase, data.user.id),
  ]);

  return <LearningDashboard courseState={courseState} email={data.user.email ?? "学习者"} key={courseState.lesson?.id ?? "complete"} mistakeCount={mistakes.filter((entry) => entry.status === "learning").length} />;
}

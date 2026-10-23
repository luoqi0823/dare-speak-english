import { redirect } from "next/navigation";

import { MistakeList } from "@/features/cloud-learning/components/mistake-list";
import { getMistakes } from "@/features/cloud-learning/server/service";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function MistakesPage() {
  if (!isSupabaseConfigured()) redirect("/login");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login");

  const mistakes = await getMistakes(supabase, data.user.id);
  return <MistakeList entries={mistakes} />;
}

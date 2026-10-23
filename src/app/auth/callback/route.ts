import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const requestedPath = url.searchParams.get("next");
  const destinationPath = requestedPath?.startsWith("/") && !requestedPath.startsWith("//") ? requestedPath : "/learn";
  const destination = new URL(destinationPath, url.origin);
  if (!code) return NextResponse.redirect(new URL("/login?error=missing_code", url.origin));

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  return NextResponse.redirect(error ? new URL("/login?error=confirmation_failed", url.origin) : destination);
}

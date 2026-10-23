import type { MemoryImage } from "./types";

const courseIllustrations: Readonly<Record<string, MemoryImage>> = {
  hello: "v1/survival-01/01-hello.webp",
  name: "v1/survival-01/02-name.webp",
  meet: "v1/survival-01/03-meet.webp",
  from: "v1/survival-01/04-from.webp",
  friend: "v1/survival-01/05-friend.webp",
  "Nice to meet you.": "v1/survival-01/06-nice-to-meet-you.webp",
};

const storageObjectPrefix = "/storage/v1/object/public/course-illustrations/";

export function getCourseIllustrationUrl(image: MemoryImage): string | null {
  if (!image.includes("/")) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl) return null;

  const objectPath = image.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl}${storageObjectPrefix}${objectPath}`;
}

export function resolveLessonIllustration(english: string, imageKey: MemoryImage | null): MemoryImage | null {
  return imageKey ?? courseIllustrations[english] ?? null;
}

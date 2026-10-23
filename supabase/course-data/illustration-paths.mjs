export const COURSE_ILLUSTRATION_BUCKET = "course-illustrations";
export const COURSE_ILLUSTRATION_VERSION = "v1";

export function illustrationSlug(value) {
  const slug = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "scene";
}

export function getCourseIllustrationPath(courseOrder, position, english) {
  const lesson = `survival-${String(courseOrder).padStart(2, "0")}`;
  const item = `${String(position).padStart(2, "0")}-${illustrationSlug(english)}.webp`;
  return `${COURSE_ILLUSTRATION_VERSION}/${lesson}-${item}`;
}

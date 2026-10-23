import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { firstThirtyLessons } from "../supabase/course-data/first-30-lessons.mjs";
import { getCourseIllustrationPath } from "../supabase/course-data/illustration-paths.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(projectRoot, "assets/course-illustrations/source");
const uploadRoot = resolve(projectRoot, "assets/course-illustrations/upload");
const manifestPath = resolve(projectRoot, "assets/course-illustrations/manifest.json");
const maxBytes = 5 * 1024 * 1024;

const manifest = [];
for (const course of firstThirtyLessons) {
  const lessonSlug = `survival-${String(course.order).padStart(2, "0")}`;
  const source = resolve(sourceRoot, `${lessonSlug}.png`);
  await stat(source);

  const items = [...course.words, course.phrases[0]];
  for (const [index, item] of items.entries()) {
    const position = index + 1;
    const objectPath = getCourseIllustrationPath(course.order, position, item.english);
    const output = resolve(uploadRoot, objectPath);
    const column = index % 3;
    const row = Math.floor(index / 3);

    await mkdir(dirname(output), { recursive: true });
    const crop = row === 0
      ? { left: column * 512 + 8, top: 0, width: 487, height: 487 }
      : { left: column * 512 + 8, top: 512, width: 487, height: 512 };

    await sharp(source)
      .extract(crop)
      .resize(512, 512, { fit: "fill" })
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toFile(output);

    const file = await stat(output);
    if (file.size > maxBytes) throw new Error(`${objectPath} exceeds the 5 MB bucket limit`);
    manifest.push({
      lesson: lessonSlug,
      position,
      english: item.english,
      chinese: item.chinese,
      objectPath,
      bytes: file.size,
    });
  }
}

await writeFile(manifestPath, `${JSON.stringify({ version: 1, count: manifest.length, files: manifest }, null, 2)}\n`);
console.log(`Built ${manifest.length} WebP illustrations in ${uploadRoot}`);

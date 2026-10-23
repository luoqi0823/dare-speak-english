import assert from "node:assert/strict";
import { stat, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import {
  firstThirtyLessons,
  validateFirstThirtyLessons,
} from "../supabase/course-data/first-30-lessons.mjs";
import { getCourseIllustrationPath } from "../supabase/course-data/illustration-paths.mjs";

test("第一阶段课程结构与内容校验通过", () => {
  assert.deepEqual(validateFirstThirtyLessons(), []);
  assert.equal(firstThirtyLessons.length, 30);
  assert.equal(firstThirtyLessons.flatMap((lesson) => lesson.words).length, 150);
  assert.equal(firstThirtyLessons.flatMap((lesson) => lesson.phrases).length, 60);
  assert.equal(firstThirtyLessons.flatMap((lesson) => lesson.checks).length, 60);
});

test("理解题题干全局唯一且答案不出现在干扰项中", () => {
  const checks = firstThirtyLessons.flatMap((lesson) => lesson.checks);
  assert.equal(new Set(checks.map((check) => check.prompt)).size, checks.length);
  for (const check of checks) {
    assert.equal(check.distractors.includes(check.answer), false);
  }
});

test("180 个课程插图路径与资源清单一一对应", async () => {
  const expectedPaths = firstThirtyLessons.flatMap((lesson) => {
    const items = [...lesson.words, lesson.phrases[0]];
    return items.map((item, index) => getCourseIllustrationPath(lesson.order, index + 1, item.english));
  });
  const manifest = JSON.parse(await readFile(resolve("assets/course-illustrations/manifest.json"), "utf8"));
  const manifestPaths = manifest.files.map((file) => file.objectPath);

  assert.equal(expectedPaths.length, 180);
  assert.equal(new Set(expectedPaths).size, 180);
  assert.deepEqual(manifestPaths, expectedPaths);

  for (const objectPath of expectedPaths) {
    const file = await stat(resolve("assets/course-illustrations/upload", objectPath));
    assert.ok(file.size > 0 && file.size <= 5 * 1024 * 1024, `${objectPath} 文件大小不符合要求`);
  }
});

test("生成后的课程数据统一为每天 6 分钟", async () => {
  const seed = await readFile(resolve("supabase/seed.sql"), "utf8");
  const sixMinuteRows = seed.match(/, 6, 'published', timezone\('utc', now\(\)\)/g) ?? [];
  assert.equal(sixMinuteRows.length, 30);
  assert.equal(seed.includes(", 12, 'published',"), false);
});

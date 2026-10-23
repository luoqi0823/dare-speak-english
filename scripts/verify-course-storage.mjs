import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
if (!supabaseUrl) throw new Error("缺少 NEXT_PUBLIC_SUPABASE_URL");

const manifest = JSON.parse(await readFile(resolve("assets/course-illustrations/manifest.json"), "utf8"));
const failures = [];

for (let index = 0; index < manifest.files.length; index += 20) {
  const batch = manifest.files.slice(index, index + 20);
  const results = await Promise.all(batch.map(async (file) => {
    const objectPath = file.objectPath.split("/").map(encodeURIComponent).join("/");
    const response = await fetch(`${supabaseUrl}/storage/v1/object/public/course-illustrations/${objectPath}`, { method: "HEAD" });
    return {
      bytes: Number(response.headers.get("content-length") ?? 0),
      contentType: response.headers.get("content-type"),
      objectPath: file.objectPath,
      status: response.status,
    };
  }));

  failures.push(...results.filter((item) => item.status !== 200 || item.contentType !== "image/webp" || item.bytes > 5 * 1024 * 1024));
}

if (failures.length > 0) {
  throw new Error(`课程插图远端校验失败：\n${failures.map((item) => `${item.objectPath}: ${item.status} ${item.contentType ?? "unknown"} ${item.bytes}`).join("\n")}`);
}

console.log(`Verified ${manifest.files.length} remote course illustrations`);

# 云端学习架构

```text
浏览器
  ├─ Next.js 页面（Vercel CDN / Server Components）
  ├─ 认证请求 → Vercel Route Handlers
  └─ 学习写入 → Vercel Route Handlers
                     ↓
                Supabase Auth
                     ↓
              Supabase PostgreSQL
                     ↓
             Row Level Security
```

## 边界

- `src/app`：路由、页面和 API 接口。
- `src/lib/supabase`：Supabase 浏览器端、服务端和 Proxy 客户端。
- `src/features/auth`：登录与注册交互。
- `src/features/cloud-learning`：每日课程、云端进度和错题本。
- `supabase/migrations`：数据库结构、索引、约束与 RLS。
- `supabase/course-data`：30 节课程的版本化内容真源。
- `scripts/generate-course-seed.mjs`：课程结构校验与幂等 SQL 生成。
- `supabase/seed.sql`：可重复执行的正式课程数据。

## 课程推进

服务端只查询课程 id、顺序和用户完成状态，选择第一节未完成课程后，再并行读取该课详情和学习项。浏览器始终只收到当前一课；完成当前课后重新读取下一课。课程初始化只 upsert `lessons` 与 `lesson_items`，不会修改 `user_lesson_progress` 或 `mistake_book`。

## 安全模型

- 登录会话通过 HttpOnly Cookie 在浏览器和 Next.js 服务端之间同步。
- 所有写接口均在服务端重新校验用户身份。
- Supabase RLS 是数据隔离的最终边界；进度和错题只能由所属用户读写。
- 浏览器仅使用 Supabase Publishable Key，不使用 `service_role`。

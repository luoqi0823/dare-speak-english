# 敢说英语

为英语基础薄弱、容易遗忘且难以长期坚持的学习者设计的图像记忆英语网站。

## 本地运行

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:3000`。

未配置 Supabase 时，公开体验页仍可使用；登录、云端同步和错题本会显示配置提示。

## 开启登录与跨设备同步

1. 在 Supabase 新建项目。
2. 复制 `.env.example` 为 `.env.local`，填入 Project URL 与 Publishable Key。
3. 在 Supabase SQL Editor 依次执行：
   - `supabase/migrations/20261023090000_learning_core.sql`
   - `supabase/migrations/20261023110000_course_content_v2.sql`
   - `supabase/migrations/20261023153000_course_illustration_keys.sql`
   - `supabase/migrations/20261023160000_flatten_course_illustration_paths.sql`
   - `supabase/migrations/20261023173000_phase_one_learning_hardening.sql`
   - `supabase/migrations/20261023180000_course_content_copy_polish.sql`
   - `supabase/seed.sql`
4. 使用已关联的 Supabase CLI 上传并核对课程插图：

   ```bash
   pnpm course:upload
   pnpm course:storage:verify
   ```

5. 在 Supabase Auth 的 URL Configuration 中加入本地和线上回调地址：
   - `http://localhost:3000/auth/callback`
   - `https://你的域名/auth/callback`
6. 重启开发服务，访问 `/login` 注册账号。

部署到 v0 / Vercel 时，在项目的 Environment Variables 中配置同样两个变量。Vercel 承载 Next.js 页面和接口，Supabase 承载账号与 PostgreSQL 数据；重新部署前端不会清空学习数据。

## 项目结构

```text
src/app/                         Next.js 页面、布局与全局样式
src/features/learning/           英语学习功能域
  components/                    页面区域与交互组件
  hooks/                         学习进度与持久化状态
  lib/                           浏览器能力封装（语音等）
  model/                         类型与静态课程内容
src/features/auth/               登录与注册
src/features/cloud-learning/     每日课程、云端进度与错题本
src/lib/supabase/                浏览器端、服务端与会话刷新客户端
supabase/migrations/             数据表、索引、约束与 RLS
supabase/course-data/            30 节课程的版本化内容真源
scripts/generate-course-seed.mjs 校验内容并生成幂等 seed
supabase/seed.sql                生成后的 30 节数据库初始化脚本
public/images/                   原创学习插图
```

## 第一阶段课程

- 6 个单元、30 个课程日
- 每天 6 分钟；每课 5 个图像单词、2 个短语、1 个微语法、1 组对话、1 篇微文章、5 道练习
- 共 150 个单词学习位（复习课会再次出现核心词）、60 个短语、30 篇文章、30 组对话和 150 道练习
- 课程按个人进度推进，中断后继续第一节未完成课程，不按日历跳课

修改课程源数据后重新生成 SQL：

```bash
pnpm course:validate
pnpm course:generate
```

## 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm course:validate
pnpm test
pnpm test:db
pnpm test:db:remote-smoke
pnpm course:storage:verify
pnpm build
```

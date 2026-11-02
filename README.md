# fullstack

基于 **Nuxt 4 + Tailwind CSS v4 + Pinia** 的全栈起步项目：同一个工程里写前端页面和 Nitro 后端接口。

## 技术栈

| 分类     | 选型                                    |
| -------- | --------------------------------------- |
| 框架     | Nuxt 4（Vue 3 + Vue Router + Nitro）    |
| 样式     | Tailwind CSS v4（`@tailwindcss/vite`）  |
| 状态     | Pinia（`@pinia/nuxt`）                  |
| 代码质量 | ESLint 10（`@nuxt/eslint`）+ Prettier   |
| 测试     | Vitest（单元 + `@nuxt/test-utils` e2e） |
| 包管理   | pnpm                                    |

## 环境要求

- Node.js >= 24（开发环境实测 v24）
- pnpm >= 12

## 快速开始

```bash
pnpm install      # 安装依赖，postinstall 会自动执行 nuxt prepare
cp .env.example .env
pnpm dev          # http://localhost:3000
```

## 常用命令

| 命令                | 说明                                    |
| ------------------- | --------------------------------------- |
| `pnpm dev`          | 启动开发服务器                          |
| `pnpm build`        | 生产构建，产物在 `.output/`             |
| `pnpm preview`      | 本地运行构建产物                        |
| `pnpm generate`     | 生成静态站点                            |
| `pnpm lint`         | ESLint 检查                             |
| `pnpm lint:fix`     | ESLint 自动修复                         |
| `pnpm format`       | Prettier 格式化全项目                   |
| `pnpm format:check` | 只检查格式                              |
| `pnpm typecheck`    | vue-tsc 类型检查                        |
| `pnpm test`         | 跑全部测试（unit + e2e）                |
| `pnpm test:unit`    | 只跑 `test/unit`（纯逻辑，毫秒级）      |
| `pnpm test:e2e`     | 只跑 `test/e2e`（会真实构建并启动服务） |
| `pnpm test:watch`   | watch 模式                              |

## 目录结构

```
app/                    # 前端源码（Nuxt 4 的 srcDir，别名 ~ 和 @）
├── app.vue             # 根组件：<NuxtLayout><NuxtPage /></NuxtLayout>
├── assets/css/main.css # Tailwind 入口：@import "tailwindcss";
├── layouts/default.vue # 默认布局（页头 + 内容容器）
├── pages/index.vue     # 路由页面，文件即路由
└── stores/counter.ts   # Pinia store 示例
server/                 # Nitro 后端
└── api/hello.ts        # 自动映射为 GET /api/hello
public/                 # 静态资源，原样直出
test/
├── unit/               # 纯 Node 环境单元测试
└── e2e/                # @nuxt/test-utils e2e（真实构建 + 请求）
nuxt.config.ts          # Nuxt 配置
vitest.config.ts        # Vitest 配置（unit / e2e 两个 project）
eslint.config.mjs       # Flat config，由 .nuxt/eslint.config.mjs 生成扩展
.prettierrc.json        # 格式化规则
```

## 约定

**新增页面**：在 `app/pages/` 下建 `.vue` 文件，路径即路由（`app/pages/about.vue` → `/about`）。页面会自动套用 `layouts/default.vue`。

**新增接口**：在 `server/api/` 下建文件（`server/api/users/index.get.ts` → `GET /api/users`）。Nitro 支持 `.get/.post/.put/.delete` 后缀区分方法。

**数据获取**：SSR 场景用 `useFetch` / `useAsyncData`，不要直接在组件顶层用裸 `$fetch`（会重复请求）。

**Tailwind v4**：不需要 `tailwind.config.ts`。自定义主题写在 `app/assets/css/main.css`：

```css
@import 'tailwindcss';

@theme {
  --color-brand: #2dd4bf;
}
```

**代码风格**：Prettier 负责格式（无分号、单引号、100 列），ESLint 只做质量规则（`stylistic: false`），避免两者打架。提交前建议跑 `pnpm lint && pnpm test:unit`。

## 环境变量

`.env.example` 里是模板，类型定义在 `nuxt.config.ts` 的 `runtimeConfig`：

| 变量名                  | 可见范围        | 说明                   |
| ----------------------- | --------------- | ---------------------- |
| `NUXT_API_SECRET`       | 仅服务端        | 密钥类配置，不下发前端 |
| `NUXT_PUBLIC_SITE_NAME` | 服务端 + 客户端 | 站点名，布局头部展示   |
| `NUXT_PUBLIC_API_BASE`  | 服务端 + 客户端 | 接口前缀               |

读取方式：`useRuntimeConfig().public.siteName`、服务端 `useRuntimeConfig().apiSecret`。真实 `.env` 已被 `.gitignore` 忽略。

## 已知说明

- `pnpm-workspace.yaml` 中的 `allowBuilds.esbuild: false` 是 pnpm 12 对依赖 postinstall 脚本的默认拦截；Nuxt 4.6 使用 rolldown，esbuild 二进制走可选平台包，不影响构建与测试。
- TypeScript 固定在 `^5.9`：`vue-tsc`（Volar）与 `typescript-eslint` 目前不支持 TS 6/7。
- e2e 测试会执行一次完整 `nuxt build` 并启动独立端口，因此比单元测试慢（数秒级），CI 中建议分开跑。

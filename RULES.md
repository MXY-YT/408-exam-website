# RULES.md — 本项目 AI 助手持久规则

> 与 `AGENTS.md`（技术地图与硬约束）配套：AGENTS.md 讲"仓库怎么组织"，本文件讲"AI 怎么干活、什么不许干"。
> 优先级：用户当次指令 > RULES.md > AGENTS.md。

## 1. 沟通

- 中文回复；结论先行，只给关键结论 / 风险 / 下一步，不铺背景。
- 执行前若把握低于 95%，先列 1-3 个关键问题确认方向，再动手。
- 执行后简述：变更点 + 验证结果 + 后续建议。

## 2. 记忆

- 目录 `memory/`，事件按日期写入 `memory/record/YYYY-MM-DD.md`。
- 凭证 / 密钥 / token 一律写入 `memory/credentials.md`；该文件已加入 `.gitignore`，**禁止提交**，也禁止写进任何会上传的文件。
- 产生实质变更（代码 / 内容 / 结构 / 部署口径）后补一条记录。

## 3. 内容与代码

- 遵守 `AGENTS.md` 的硬约束：hash 路由、静态资源走 `withBase()`、`kb-*` 稳定 ID、SVG 规范、`408-terms.txt` 单一数据源等。
- 改文件用精确替换，不做整文件重写。
- 不主动创建 `*.md` 文档（`memory/`、`RULES.md` 除外）。

## 3.1 移动端布局（踩过的坑）

- CSS Grid / Flex 容器的子项要加 `min-width: 0`，否则内部宽内容会撑破列宽。
- 宽内容（公式、代码、表格）必须放进 `overflow-x: auto` 的容器；`overflow` 对 `table` 元素无效，表格需外包一层滚动容器。
- 表格不要用 `w-full` 硬压列宽（窄屏会把文字压成竖排），用 `min-w-full` + 单元格 `min-width` 保证可读性。

## 4. 构建与部署

- 校验 + 构建：`npm run build`（真题索引重建 → 内容校验 → 搜索索引 → vite 打包）。
- 部署 GitHub Pages 二级目录须用 `VITE_BASE_PATH=/postgraduate-exam-website/` 重新构建；本机 / 自定义域名用默认 `/`。
- `client/dist.zip` 是本地打包产物，**不得提交**（已加入 `.gitignore`）。

## 5. 提交

- 提交信息用中文，格式 `<类型>: <说明>`（feat / fix / style / docs / chore / refactor）。
- 禁止 `git reset --hard`、`git checkout --` 等破坏性操作，除非用户明确要求。
- 提交前跑一遍 `npm run validate` 或 `npm run build`。

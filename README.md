# mxt.log

一个使用 Astro 构建的静态博客，用于整理学习记录、算法竞赛与 AI 竞赛实践。

## 本地开发

需要 Node.js 24 或更高版本。

```bash
npm install
npm run dev
```

构建与检查：

```bash
npm run check
npm run build
```

## 写一篇新文章

- 学习记录：在 `src/content/notes/` 中新增 Markdown；
- 竞赛复盘：在 `src/content/experiences/` 中新增 Markdown；
- Frontmatter 字段会由 `src/content.config.ts` 校验。

## 部署到 GitHub Pages

仓库推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并部署。首次使用时，需要在 GitHub 仓库的 **Settings → Pages → Source** 中选择 **GitHub Actions**。

当前仓库名是 `mxt1022.github.io`，因此默认发布在根路径。若 fork 到普通项目仓库，可在构建环境中设置：

```text
SITE_URL=https://<username>.github.io
BASE_PATH=/<repository>
```

站内链接和静态资源会自动适配 `BASE_PATH`。

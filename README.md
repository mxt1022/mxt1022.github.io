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

## 项目结构

```text
.
├─ .github/workflows/       # GitHub Pages 部署与数据更新
├─ public/assets/
│  ├─ data/                 # Codeforces 与近期比赛快照
│  ├─ icons/                # 本地技术栈图标
│  └─ images/               # Logo、头像与 OG 图片
├─ scripts/codeforces/      # Codeforces 数据抓取脚本及依赖
└─ src/
   ├─ assets/fonts/         # 本地字体
   ├─ components/           # 页面组件
   ├─ content/              # 学习、竞赛和项目内容集合
   ├─ layouts/              # 全站布局
   ├─ pages/                # Astro 路由与静态接口
   ├─ styles/               # 全局样式与字体声明
   └─ utils/                # 图片、数据和结构化数据工具
```

`dist/`、`.astro/` 和 `node_modules/` 都是可重新生成的本地目录，不属于源码结构。

## 写一篇新文章

- 学习记录：在 `src/content/notes/` 中新增 Markdown；
- 竞赛复盘：在 `src/content/experiences/` 中新增 Markdown；
- 项目案例：在 `src/content/projects/` 中新增 Markdown；
- Frontmatter 字段会由 `src/content.config.ts` 校验。

学习记录可通过 `series` 归入系列；项目案例使用 `status`、`role`、`stack`、`highlights` 和 `links` 描述状态、职责、技术栈、关键内容与相关入口。列表、个人主页和详情页会从内容集合自动生成。

### 内容状态提示

学习记录可以使用 `status: 编写中`、`status: 持续记录` 或 `status: 已完成`，未填写时默认为“已完成”。竞赛记录继续使用 `status` 描述当前阶段；包含“进行中”“持续”“编写中”“更新中”或“训练中”的状态会显示醒目标记，其他已完结或复盘类状态不会额外占用页面空间。

### 定制竞赛提交时间轴

在竞赛文章的 Frontmatter 中加入 `progress`，页面会自动计算提交次数、最佳分、最新分与相对首提交提升：

```yaml
progress:
  label: SUBMISSION TIMELINE
  metric: Public Score
  scoreSuffix: ""
  precision: 5
  goal: higher # higher 或 lower
  accent: "#20beff"
  demo: false
  submissions:
    - time: 2026-07-18T10:30:00+08:00
      title: Baseline
      strategy: 建立交叉验证与基础特征。
      score: 0.76555
      note: 可选的补充说明。
```

`metric`、`scoreSuffix`、`precision`、`goal`、`accent` 和时间轴标题均可按比赛单独配置。示例文章中的演示分数带有“示例数据”标记，替换为真实记录后将 `demo` 改为 `false`。

## 部署到 GitHub Pages

仓库推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并部署。首次使用时，需要在 GitHub 仓库的 **Settings → Pages → Source** 中选择 **GitHub Actions**。

### Codeforces 数据更新

本地手动更新可运行：

```bash
npm run fetch:contests
```

Codeforces 数据与站点源码使用两个互不合并的分支：

- `main`：Astro 源码、文章与本地开发提交；
- `data`：只保存 `public/assets/data/*.json` 自动快照。

`.github/workflows/update-codeforces.yml` 在北京时间每天 08:23 运行，也可以手动触发。它从 `main` 读取抓取脚本，但只向 `data` 提交生成的数据，随后显式调用部署流程。`main` 或人工推送到 `data` 时也会自动部署；每次部署都固定读取 `main` 的站点代码，再覆盖 `data` 中的最新 JSON 并发布。

因此日常开发只需要正常提交、拉取和推送 `main`，不需要把 `data` 合并回 `main`，也不会因每日机器人提交产生主分支冲突。若 Codeforces API 暂时不可用，任务会失败并保留上一次有效快照。

抓取脚本会分页读取完整提交历史，不会在提交数超过 10,000 后静默截断。若 `data` 分支尚不存在，更新工作流会自动创建；部署工作流则会先使用 `main` 内置快照，避免站点因数据分支缺失而无法发布。

当前仓库名是 `mxt1022.github.io`，因此默认发布在根路径。若 fork 到普通项目仓库，可在构建环境中设置：

```text
SITE_URL=https://<username>.github.io
BASE_PATH=/<repository>
```

站内链接和静态资源会自动适配 `BASE_PATH`。

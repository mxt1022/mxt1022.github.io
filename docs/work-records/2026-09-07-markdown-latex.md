# Markdown LaTeX 渲染接入记录

- 日期：2026-09-07
- 范围：学习记录、竞赛记录、项目案例等由 Astro Content 渲染的 Markdown 文档

## 本次改动

1. 安装 `@astrojs/markdown-remark`、`remark-math`、`rehype-katex` 与 `katex`。
2. 在 `astro.config.mjs` 的全局 Markdown 配置中启用数学语法解析和 KaTeX HTML 输出。
3. 在站点公共布局中加载 KaTeX 字体与样式，因此所有 Markdown 详情页均可正常显示公式。
4. 为块级公式增加横向滚动和最小宽度规则，避免较长公式在窄屏上撑破文章布局。

## 编写方式

- 行内公式：`$O(n)$`、`$\sum_{i=1}^{n} i$`
- 块级公式：使用一对 `$$` 包裹公式，并让起止标记各自单独占一行。

示例：

```text
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

## 验证项

- Astro 类型检查通过。
- 生产构建通过。
- 构建产物包含 KaTeX 生成的 `katex`、`katex-mathml` 和 `katex-html` 标记。
- `\sum` 可生成求和符号，现有 `$O(1)$`、`$x \rightarrow y$`、`$\frac{...}{...}$` 等写法可正常渲染。

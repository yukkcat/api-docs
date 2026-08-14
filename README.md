# Klong API 文档

基于 Next.js 与 Fumadocs 的 Klong API 接口文档。目前收录 GPT Image、Nano Banana、OpenAI 与 Claude 兼容接口。

## 本地启动

```bash
cd api-docs
bun install
bun run dev
```

默认访问 `http://localhost:3000`，首页会直接进入画图接口。开发模式会按需编译路由，首次打开和切换页面会比线上生产版慢。

## 生产预览

```bash
bun run build
bun run start
```

也可以直接运行 `bun run preview`。生产版会预生成中英文文档，并启用 Next.js 的链接预取；这是部署后的实际速度。

## 编辑文档

文档内容位于 `content/docs/`：

- 中文页面：`页面名.mdx`
- 英文页面：`页面名.en.mdx`
- 中文侧边栏：`meta.json`
- 英文侧边栏：`meta.en.json`

新增页面后，把文件名同时加入对应语言的 `meta` 文件即可显示到侧边栏。

## Docker

推送到 `main` 后，GitHub Actions 会自动构建并发布 GHCR 镜像：

```bash
docker pull ghcr.io/yukkcat/api-docs:latest
docker run -d --name api-docs -p 3000:3000 ghcr.io/yukkcat/api-docs:latest
```

## 来源

文档框架与布局基于 MIT 许可的 [Infinite Canvas 文档](https://github.com/basketikun/infinite-canvas/tree/main/docs)，许可文本见 `LICENSE`。

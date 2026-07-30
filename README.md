# 钟连炜技术作品集

钟连炜的 ComfyUI 与 AIGC 视觉工作流技术作品集。站点面向 HR、技术面试官与 AIGC 业务负责人，重点展示本地部署、工作流设计、模型管理、参数实验和故障排查过程。

当前仓库原本包含一个独立的 JobPilot Python 项目，因此本网站位于 `portfolio/` 子目录，避免覆盖原项目。

## 技术栈

- Next.js App Router
- TypeScript（严格模式）
- Tailwind CSS
- 静态导出：`output: "export"`
- 无数据库、后端 API、CMS 或付费服务
- 图片与下载资源仅从 `public/` 读取

## 本地启动

需要 Node.js 20.9 或更高版本。进入本目录后执行：

```powershell
cd E:\CodexProjects\job-tracker\portfolio
npm install
npm run dev
```

浏览器访问终端输出的本地地址，默认通常为 `http://localhost:3000`。

## 质量检查与静态构建

```powershell
npm run lint
npm run typecheck
npm run build
```

`npm run build` 成功后会直接生成 `out/`。静态导出不需要再执行 `next export`。

## 页面

- `/`：Hero、个人介绍、核心技能、精选项目、工程与排错能力、联系方式
- `/projects/`：全部项目与六类客户端筛选
- `/projects/[slug]/`：背景、目标、环境、工作流、参数、图片对比、问题、解决过程、结果和下载
- `/about/`：技术背景、学习方向、本地环境、学习路线和联系方式

## 项目数据

项目内容集中在：

```text
src/types/project.ts
src/data/projects.ts
src/data/site.ts
```

新增项目时：

1. 在 `src/data/projects.ts` 的 `projects` 数组新增一个符合 `Project` 类型的对象。
2. 使用唯一、稳定、只含小写字母、数字和连字符的 `slug`。
3. 从既有分类中选择：`Deployment`、`Image Generation`、`LoRA`、`Controlled Generation`、`Video`、`Automation`。
4. 如项目尚无结果，将状态设为 `In Development`，结果、参数和问题等字段保持空数组，不要写推测内容。
5. 将项目图片和下载文件放入 `public/`，再显式更新资源的可用状态。

动态详情页通过 `generateStaticParams()` 从项目数据生成；新增数据后重新执行 `npm run build` 即可生成对应静态路由。

## 图片资源

建议保持每个项目一个独立目录：

```text
public/images/projects/
├─ local-deployment/
├─ photoreal-portrait/
├─ denoise-study/
└─ lora-integration/
```

当前建议文件名：

```text
public/images/projects/photoreal-portrait/baseline.png
public/images/projects/denoise-study/denoise-020.png
public/images/projects/denoise-study/denoise-035.png
public/images/projects/denoise-study/denoise-050.png
public/images/projects/denoise-study/denoise-065.png
```

资源尚未提供时，数据使用：

```ts
{
  available: false,
  suggestedPath: "public/images/projects/example/image.png"
}
```

真实文件复制完成后改为：

```ts
{
  available: true,
  publicPath: "/images/projects/example/image.png",
  suggestedPath: "public/images/projects/example/image.png"
}
```

`ProjectMedia` 会在未配置或浏览器加载失败时显示固定比例占位，不会导致页面报错。加载成功的图片支持点击放大、Escape 关闭和显式关闭按钮。

## JSON、PDF 与简历

下载目录：

```text
public/downloads/
├─ workflows/
├─ reports/
└─ resume/
```

建议文件名：

```text
public/downloads/workflows/photoreal-baseline.json
public/downloads/reports/photoreal-baseline-record.pdf
public/downloads/resume/ZhongLianwei_Resume.pdf
```

仅复制文件不会自动启用按钮。还需在 `src/data/projects.ts` 或 `src/data/site.ts` 中将对应资源改为 `available: true` 并设置 `/downloads/...` 形式的 `publicPath`。这项显式开关可以避免缺失文件产生 404。

## 联系方式与 GitHub

当前公开联系方式：

- 邮箱：`2241411709@qq.com`
- 电话：页面显示为 `151****1041`，复制按钮复制完整号码
- GitHub：`https://github.com/cxzgood`

全局联系方式集中维护在 `src/data/site.ts` 的 `personalProfile` 与 `contactItems`。项目自身的 GitHub 链接仍由 `src/data/projects.ts` 中对应项目的 `github` 独立控制，不因个人主页地址可用而推断项目仓库已公开。

## 部署到 Vercel

本项目当前没有执行线上部署。需要部署时：

1. 将代码放入你控制的 Git 仓库。
2. 在 Vercel 导入仓库。
3. Root Directory 设置为 `portfolio`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `out`。
6. 部署前确认所有公开图片、下载文件和联系方式均可公开。

由于站点使用静态导出，不依赖 Vercel 的服务端功能。

## 其他静态托管平台

执行 `npm run build` 后，将 `out/` 内的全部内容上传到 Cloudflare Pages、Netlify、GitHub Pages、对象存储或任意静态 Web 服务器。

- 构建命令：`npm run build`
- 发布目录：`out`
- 项目已启用 `trailingSlash`，嵌套路由会生成目录式 `index.html`
- 如果网站部署在域名子路径而不是根路径，需要在 `next.config.ts` 配置 `basePath`，并同步处理资源前缀
- 新增或替换 `public/` 文件后必须重新构建

## 版本控制与隐私

`.gitignore` 已排除：

- `node_modules/`、`.next/`、`out/`
- `.env` 与本地日志
- `*.safetensors`、`*.ckpt`、`*.pt`、`*.pth`
- ComfyUI 批量输出目录

工作流 JSON、实验报告 PDF、简历和人工筛选的作品图没有被笼统忽略，可在确认无敏感信息后按需纳入版本控制。

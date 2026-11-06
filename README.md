# HMCL-docs

[![Build Status](https://drone.hmcl.net/api/badges/huanghongxun/HMCL-docs/status.svg)](https://drone.hmcl.net/huanghongxun/HMCL-docs)

Hello Minecraft! Launcher 帮助文档仓库，使用 [Eleventy（11ty）](https://www.11ty.dev/) 和 Node.js 构建静态网站，沿用 Minimal Mistakes 主题。文章继续使用 Markdown 编写，网站由 Nginx 提供静态文件。

您可以通过对本仓库提交 Pull Request 的方式来为 HMCL 帮助文档贡献自己的力量！
本仓库内容使用 Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) 协议（附带额外条款）开放，协议内容请参见 [LICENSE](LICENSE) 文件。

## 相关链接

[Hello Minecraft! Launcher 帮助文档仓库网站](https://docs.hmcl.net)

[English documentation](https://docs.hmcl.net/en/)

## Markdown

每篇文章由 Markdown 编写。如果你不知道什么是 Markdown，我们推荐你先大概了解一下这个排版工具。

我们推荐你使用 Typora 编写 Markdown 文章，该软件的使用方法和 Word 等传统文字排版软件相似，易于使用。

请注意，你在使用 Typora 时，请在 文件->偏好设置->图像 中，将 `插入图片时...` 选项修改为复制到指定路径为 `/assets/img/docs/${filename}` 目录

## 贡献

文档按集合组织，文章放在 `_<collection>/` 中，图片放在对应的资源目录中。如果你要提交 PR，请沿用现有集合，不要将新文章的 md 文件直接放在根目录下。

每篇文章结构如下：

```
_<collection>/<article>.md

assets
 * img
   * docs
     * <article>
       * img1.png
       * img2.png
       * ...
```

其中，`<collection>` 表示集合，如 `multiplayer` 表示多人游戏、`modpack` 表示整合包，`<article>` 表示你的文章的英文唯一标识（尖括号表示占位符，不要直接提交 `<article>`，请确保其唯一且简短）请仅使用英文字母、数字、中划线、下划线字符作为唯一标识，不要使用空格、英文句点、中文字符。请确保资源文件夹名和 md 文件名一致，具体可以参考已有文章目录格式。

每篇文章由 Markdown 编写的 `<article>.md` 文件及附带图片组成（文章的图片请放置到 `/assets/img/docs/<article>` 目录中）。Markdown 文件开头应包含由 `---` 包围的 YAML Front Matter，提供标题 `title`、更新日期 `date` 等元数据；在 `_config.yml` 的 `defaults` 中配置有默认值的可以不指定。迁移到 11ty 后，原有文章目录和 Front Matter 格式继续使用。

原图继续放在 `assets/`。构建时会为 PNG、JPEG、TIFF 生成额外 WebP，并让页面优先加载 WebP、以原图回退。自动生成的 WebP 只写入 `_site/`，不需要提交到仓库。

### 添加新文章

添加新文章时，请确保将内容按照上述格式要求存放。你也可以参考已经写好的文章格式。

切记不要在一个添加新文章的 PR 里修改其他文章的内容。

### 修改已有文章

修改已有文章时，请确保你的 PR 仅修改一个文章内容，并在该文章里署名。

### 更新索引

在添加或修改文章后，请更新索引文件 `index.json`，以便 HMCL 展示你新添加的文件。默认语言（简体中文）的文章会自动同步到 `index.json`，翻译文章不会出现在其中。

### 多语言

本站默认语言为简体中文。英文翻译文件与中文原文放在同一目录下，文件名追加 `_en` 后缀即可：

```text
_launcher/isolation.md      # 中文，输出 /launcher/isolation.html
_launcher/isolation_en.md   # 英文，输出 /en/launcher/isolation.html
```

约定：

- 翻译文件的 front matter **不需要**写 `permalink`、`lang`、`locale`，`_plugins/i18n.rb` 会自动继承中文原文的 URL 并在前面加上 `/en`。
- 翻译文件需要翻译 `title`、`excerpt`/`description` 等元数据；`date`、`author`、`authors`、`layout` 等字段与原文保持一致。
- 翻译文件不要保留 `redirect_from`，避免中英文重定向路径冲突。
- 正文中的站内链接保持与中文原文相同的 URL 即可，构建时会自动改写为指向对应英文页面的链接（前提是该页面存在英文翻译）。
- 站点标题、描述与导航分别由 `_data/i18n.yml`、`_data/en/navigation.yml` 提供。新增语言时，需要：
  1. 在 `_config.yml` 的 `i18n.locales` 中登记语言代码；
  2. 在 `_data/i18n.yml` 中补充站点标题与描述；
  3. 新建 `_data/<locale>/navigation.yml` 导航文件；
  4. 用 `_<locale>` 后缀创建翻译文件。
- 页面标题栏右侧会显示语言切换入口，页面头部会自动输出 `hreflang` 标注。
- 更新日志（`_changelogs/`）目前只有中文内容，英文更新日志页面直接展示中文条目，并附带说明。

### 本地部署

项目使用 11ty 构建，不需要安装 Ruby 或 Bundler。构建与部署的详细说明参见 [ELEVENTY.md](ELEVENTY.md)。

#### 前置条件

- Node.js 24，具体版本见 [.nvmrc](.nvmrc)。
- pnpm，版本由 [package.json](package.json) 的 `packageManager` 固定。

#### 下载源码

> 以 `git` 为例，您也可以通过 `github` 下载源码压缩包或其它方式下载源码。

```shell
# 克隆项目到本地
git clone https://github.com/HMCL-dev/HMCL-docs.git
# 进入项目根目录
cd HMCL-docs
```

#### 安装依赖

```shell
corepack enable
pnpm install --frozen-lockfile
```

仓库的 [.npmrc](.npmrc) 默认使用腾讯云 npm 镜像源。

#### 启动本地开发服务器

```shell
pnpm dev
```

访问 <http://127.0.0.1:4173>。修改文章或资源后会自动重新构建，刷新浏览器查看结果。

#### 本地构建产物

```shell
pnpm build
pnpm preview
```

构建产物位于 `_site/`，预览地址同样为 <http://127.0.0.1:4173>。可用 `PORT=4174 pnpm preview` 更换端口。`_site/` 和 `node_modules/` 不应提交到仓库。

运行构建兼容性测试：

```shell
pnpm test
```

主题 CSS 当前使用 `theme/minimal-mistakes/prebuilt/` 中的预编译文件，修改 SCSS 不会自动编译 CSS，具体限制见 [ELEVENTY.md](ELEVENTY.md)。

### Docker 部署

先安装依赖并构建静态文件，再构建和启动 Nginx 镜像：

```shell
pnpm build
docker build -t hmcl-docs:local .
DOCS_IMAGE=hmcl-docs:local docker-compose up -d
```

默认访问地址为 <http://127.0.0.1:3005>。使用 Compose 插件的环境可将 `docker-compose` 替换为 `docker compose`。

如果 3005 已被现有站点占用，可以在另一个端口并行预览：

```shell
DOCS_PORT=13005 DOCS_IMAGE=hmcl-docs:local \
  docker-compose -p hmcl-docs-preview up -d
```

此时访问 <http://127.0.0.1:13005>。镜像基于官方 Nginx，包含静态产物和 Nginx 配置，使用非 root 用户及只读文件系统，不挂载宿主机网页目录。

### Drone 发布

[.drone.yml](.drone.yml) 在 `main` 分支推送后依次安装依赖、运行 `pnpm build`、使用 Kaniko 构建并推送镜像到 `registry.hmcl.net/image/hmcl-docs:latest`，最后通过受限 SSH 更新服务器上的 Compose 服务。镜像构建不需要特权模式或 Docker socket。

Registry 凭据、部署密钥和 SSH 主机指纹通过 Drone Secrets 提供，不写入源码。服务器部署配置和所需 Secrets 见 [ELEVENTY.md](ELEVENTY.md)。

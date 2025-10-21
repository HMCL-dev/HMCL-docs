# HMCL-docs

[![Build Status][drone-build-badges]][drone-build-url]

Hello Minecraft! Launcher 帮助文档仓库

您可以通过对本仓库提交 Pull Request 的方式来为 HMCL 帮助文档贡献自己的力量！
本仓库内容使用 Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) 协议（附带额外条款）开放，协议内容请参见 LICENSE 文件。

## 相关链接

[HMCL 文档][hmcl-docs-url]

## Markdown

每篇文章由 Markdown 编写。如果你不知道什么是 Markdown，我们推荐你先大概了解一下这个排版工具。

我们推荐你使用 Typora 编写 Markdown 文章，该软件的使用方法和 Word 等传统文字排版软件相似，易于使用。

请注意，你在使用 Typora 时，请在 文件->偏好设置->图像 中，将 `插入图片时...` 选项修改为复制到指定路径为 `/assets/img/docs/${filename}` 目录

## 贡献

本仓库组织方式为一篇文章放在一个目录中。如果你要提交 PR，请不要将 md 文件直接放在根目录下。

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

每篇文章由 Markdown 编写的 `<article>.md` 文件及附带图片组成（文章的图片请放置到 `/assets/img/docs/<article>` 目录中）在 Markdown 文件中请确保包含 [Front Matter][jekyll-docs-front-matter] 其中应提供文章的一些元数据（如标题 `title` 更新日期 `date` 等）在 `_config.yml` 的 `defaults` 中配置有默认值的可以不指定。

### 添加新文章

添加新文章时，请确保将内容按照上述格式要求存放。你也可以参考已经写好的文章格式。

切记不要在一个添加新文章的 PR 里修改其他文章的内容。

### 修改已有文章

修改已有文章时，请确保你的 PR 仅修改一个文章内容，并在该文章里署名。

### 更新索引

在添加或修改文章后，请更新索引文件 `index.json`，以便 HMCL 展示你新添加的文件。

### 本地部署

项目是基于 Jekyll 实现的静态网站，使用 Minimal Mistakes 主题。

如果您想更深入的参与项目文档的维护，可参阅以下内容。

#### 前置条件

- `Ruby` 版本大于等于 `3.1` （项目构建版本 `3.4`）

#### 安装 bundle

> 环境中已安装 `bundle` 可跳过本节

```shell
gem install bundler
```

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
# 配置镜像（请自行根据网络环境决定是否需要使用镜像，此处以腾讯云镜像为例）
bundle config mirror.https://rubygems.org https://mirrors.cloud.tencent.com/rubygems
# 配置项目依赖安装路径
bundle config path vendor/bundle
# 安装项目依赖
bundle install
```

#### 启动本地开发服务器

```shell
bundle exec jekyll serve
```

#### 本地构建产物

> 根据需要配置环境变量，配置 `JEKYLL_ENV=production` 表示生产环境构建。

```shell
bundle exec jekyll build
```

[hmcl-docs-url]: https://docs.hmcl.net
[drone-build-url]: https://drone.hmcl.net/huanghongxun/HMCL-docs
[drone-build-badges]: https://drone.hmcl.net/api/badges/huanghongxun/HMCL-docs/status.svg
[jekyll-docs-front-matter]: https://jekyllrb.com/docs/front-matter/

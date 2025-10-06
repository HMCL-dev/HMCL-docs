# HMCL-docs

[![Build Status](https://drone.hmcl.net/api/badges/huanghongxun/HMCL-docs/status.svg)](https://drone.hmcl.net/huanghongxun/HMCL-docs)

Hello Minecraft! Launcher 帮助文档仓库

您可以通过对本仓库提交 Pull Request 的方式来为 HMCL 帮助文档贡献自己的力量！
本仓库内容使用 Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) 协议（附带额外条款）开放，协议内容请参见 LICENSE 文件。

## 相关链接

[Hello Minecraft! Launcher 帮助文档仓库网站](https://docs.hmcl.net)

## Markdown

每篇文章由 Markdown 编写。如果你不知道什么是 Markdown，我们推荐你先大概了解一下这个排版工具。

我们推荐你使用 Typora 编写 Markdown 文章，该软件的使用方法和 Word 等传统文字排版软件相似，易于使用。

请注意，你在使用 Typora 时，请在 文件->偏好设置->图像 中，将 `插入图片时...` 选项修改为复制到指定路径为 `/src/assets/img/docs/${filename}` 目录。

## 贡献

本仓库组织方式为一篇文章放在一个集合目录中。如果你要提交 PR，请不要将 md 文件直接放在根目录下。

每篇文章结构如下：

`src/collections/_<collection>/<article>.md`

`src/assets/img/docs/<article>`

- `img1.png`
- `img2.png`
- ...

其中，`<collection>` 表示集合名称，如 `multiplayer` 表示多人游戏、`modpack` 表示整合包，`<article>` 表示你的文章的英文名（尖括号表示占位符，请替换为文章名称，不要直接提交 '`<article>`'），请仅使用英文字母、数字、中划线、下划线字符，不要使用空格、中文字符。请确保 md 文件名和文件夹名一致，具体可以参考已有文章目录格式。

每篇文章由 Markdown 编写的 `<article>.md` 文件及附带图片组成。文章的图片请放置到 `/src/assets/img/docs/<article>` 目录中。

### 添加新文章

添加新文章时，请确保将内容按照上述格式要求存放。你也可以参考已经写好的文章格式。

切记不要在一个添加新文章的 PR 里修改其他文章的内容。

### 修改已有文章

修改已有文章时，请确保你的 PR 仅修改一个文章内容，并在该文章里署名。

### 更新索引

在添加或修改文章后，请更新索引文件 `index.json`，以便 HMCL 展示你新添加的文件。

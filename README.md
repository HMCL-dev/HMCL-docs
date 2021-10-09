# HMCL-docs
Hello Minecraft! Launcher 帮助文档仓库

您可以通过对本仓库提交 Pull Request 的方式来为 HMCL 帮助文档贡献自己的力量！
本仓库内容使用 Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) 协议（附带额外条款）开放，协议内容请参见 LICENSE 文件。

## Markdown
每篇文章由 Markdown 编写。如果你不知道什么是 Markdown，我们推荐你先大概了解一下这个排版工具。

我们推荐你使用 Typora 编写 Markdown 文章，该软件的使用方法和 Word 等传统文字排版软件相似，易于使用。

## 贡献
本仓库组织方式为一篇文章放在一个目录中。如果你要提交 PR，请不要将 md 文件直接放在根目录下。

每篇文章结构如下：
```
<article>.md

assets
 * img
   * docs
     * <article>
       * img1.png
       * img2.png
       * ...
```

其中，`<article>` 表示你的文章的英文名（尖括号表示占位符，请替换为文章名称，不要直接提交 '`<article>`'），请仅使用英文字母、数字、中划线、下划线字符，不要使用空格、中文字符。请确保 md 文件名和文件夹名一致。具体可以参考已有文章目录格式。

每篇文章由 Markdown 编写的 `<article>.md` 文件及附带图片组成。文章的图片请放置到 `/assets/img/docs/<article>` 目录中。

### 添加新文章

添加新文章时，请确保将内容按照上述格式要求存放。你也可以参考已经写好的文章格式。

切记不要在一个添加新文章的 PR 里修改其他文章的内容。

### 修改已有文章

修改已有文章时，请确保你的 PR 仅修改一个文章内容，并在该文章里署名。

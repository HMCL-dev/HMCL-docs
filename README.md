# HMCL-docs
Hello Minecraft! Launcher 帮助文档仓库

您可以通过对本仓库提交 Pull Request 的方式来为 HMCL 帮助文档贡献自己的力量！
本仓库内容使用 Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) 协议（附带额外条款）开放，协议内容请参见 LICENSE 文件。

## Markdown
每篇文章由 Markdown 编写。如果你不知道什么是 Markdown，我们推荐你先大概了解一下这个排版工具。

我们推荐你使用 Typora 编写 Markdown 文章，该软件的使用方法和 Word 等传统文字排版软件相似，易于使用。

## 贡献
本仓库组织方式为一篇文章放在一个目录中。如果你要提交 PR，请不要将 md 文件直接放在根目录下。

每篇文章的文件夹结构如下：
```
文件夹 <article>
 * <article>.md
 * img1.png
 * img2.png
 * ...
 * OWNERS
```

其中，`<article>` 表示你的文章的英文名，请仅使用英文字母、数字、中划线、下划线字符，不要使用空格、中文字符。请确保 md 文件名和文件夹名一致。具体可以参考已有文章目录格式。

每篇文章由 Markdown 编写的 `<article>.md` 文件及附带图片组成。此外你还需要在文章目录中添加 OWNERS 文件，以标记该文章由哪些人编写或编辑过。

### 添加新文章

添加新文章时，请确保你的 PR 仅在根文件夹下创建一个全新的文章目录，并将内容按照上述格式要求存放。你也可以参考已经写好的文章格式。

切记不要在一个添加新文章的 PR 里修改其他文章的内容。

### 修改已有文章

修改已有文章时，请确保你的 PR 仅修改一个文章内容，并在该文章的 OWNERS 里署名。

### 文章分类

如果你要提交的文章可以被囊括为一个分类，我们推荐你对文章进行分类。

目录分类的格式为：
```
文件夹 <collection>
  * 文件夹 <article1>
    * <article1>.md
    * OWNERS
  * 文件夹 <article2>
    * <article2>.md
    * OWNERS
  * <collection>.md
  * OWNERS
```

具体你可以参考 multiplayer 分类。

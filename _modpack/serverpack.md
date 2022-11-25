---
title:  "服务端自动更新整合包制作教程"
permalink: /modpack/serverpack.html
date:   2021-08-22 23:18:02 +0800
categories: 整合包
toc: true
---

> 本文由 huanghongxun 编写。

HMCL 允许服务器管理员借助服务端自动更新整合包来实现自动分发整合包更新，这将大大方便有需要频繁更新游戏客户端 Mod、配置等信息的服务器管理员。
HMCL 需要服务器管理员额外提供一个 HTTP 服务器（只需要能提供静态文件服务，比如 Apache 和 Nginx 皆可）来提供检查整合包更新并允许 HMCL 下载更新文件。

## 第一步：导出整合包
在 HMCL 中右键做好的客户端版本，选择`导出整合包`：

![](/assets/img/docs/serverpack/1.png)

选择导出为`服务器自动更新整合包`：

![](/assets/img/docs/serverpack/1-1.png)

填写整合包信息，整合包下载链接前缀如何填写请看下文

![](/assets/img/docs/serverpack/1-2.png)

选择需要包含在整合包内的文件后将产生整合包压缩文件

## 第二步：导入整合包

接着创建一个全新的空文件夹，将启动器复制进去

![](/assets/img/docs/serverpack/1-3.png)

运行启动器，并导入刚才导出的整合包，导入完成后，这个文件夹（这里叫“新整合包”）可以打包发给玩家。

## 第三步，部署整合包更新服务器
你可以借助 Apache、Nginx 等支持静态文件的 HTTP 服务器软件提供文件。首先，决定好整合包下载链接前缀，比如我希望 HMCL 从远程服务器的 http://www.site.com/modpack 目录下存放整合包的更新信息，则在之前导出整合包的整合包下载前缀中填写 http://www.site.com/modpack。

![](/assets/img/docs/serverpack/1-4.png)

上图为导出的服务器自动更新整合包压缩文件的内容，你需要将这个整合包解压到 http://www.site.com/modpack 下。也就是说，从 http://www.site.com/modpack/server-manifest.json 这个链接下载下来的文件必须和上图中整合包压缩文件中的 server-manifest.json 文件一致，并且，http://www.site.com/modpack/overrides 是一个文件夹，里面存放了整合包文件，比如：

![](/assets/img/docs/serverpack/1-6.png)

整合包压缩文件 test.zip/overrides/mods/Advancement_Book-1.12-1.0.3.jar 文件必须可以从 http://www.site.com/modpack/overrides/mods/Advancement_Book-1.12-1.0.3.jar 该目录下载下来，且文件内容一致。那么至此更新服务器就部署完成了。

## 第四步，更新整合包

如果你需要更新整合包，那么将新的整合包经过第一步导出新的整合包压缩文件，并解压到类似 http://www.site.com/modpack 文件夹下即可完成新整合包的部署。
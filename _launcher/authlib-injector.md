---
title:  "Authlib-Injector 服务器设置指南"
permalink: /launcher/authlib-injector.html
date:   2021-08-22 23:18:02 +0800
categories: 启动器
toc: true
---

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdocs.hmcl.net%2Flauncher%2Fauthlib-injector.html&count_bg=%233E4245&title_bg=%233E4245&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80&edge_flat=false)

> 本文由 huanghongxun 编写。

## 背景

使用 authlib-injector 认证的服主可以通过本教程提供的方法使 HMCL 默认在打开时弹窗要求创建对应认证服务器的账户。

## 方法

在 HMCL 启动器同级目录下创建 `authlib-injectors.json` 文件，此时文件夹目录结构如下图所示：

![](/assets/img/docs/authlib-injector/image.png)

（注意，请确保打包后的整合包不包含 `hmcl.json` 文件，否则无法生效。该文件默认为隐藏状态，需开启隐藏文件显示） 

`authlib-injectors.json` 文件的示例如下

```
{
    "urls": [
        "https://example.yggdrasil.yushi.moe/"
    ]
}
```

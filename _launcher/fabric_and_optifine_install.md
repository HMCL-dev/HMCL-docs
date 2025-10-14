---
title: 同时安装 Fabric & OptiFine
date: 2023-01-04 11:30:00 +0800
author: zkitefly
hits: true
toc: true
---

在 HMCL 的自动安装中，如果先选择了 Fabric 或 OptiFine ，HMCL 就会提示他们互不兼容。

但在本文档中，通过一些简单的操作就可以同时安装 Fabric & OptiFine 的客户端。

原理是安装 OptiFabric 这个 Fabric 模组，该模组的作用是采用官方的 OptiFine 并在运行时与 Fabric 兼容来实现这一点。

**如果你使用 OptiFine 纯粹是为了提高性能、使用缩放按钮或动态照明，那么还有[其他模组](https://lambdaurora.dev/optifine_alternatives#/)可以单独实现这些功能，具有更可靠的兼容性。**

## 操作方法

### 1.先选择一个版本，并选择 Fabric ，并安装。

![安装fabric客户端](/assets/img/docs/fabric_and_optifine_install/1.gif)

*注：如果你想放置其他的 Fabric 模组，建议一并安装 **Fabric API** ，有些 Fabric 模组会依赖他。*

### 2.获取并安装 OptiFabric 模组 & OptiFine

#### 获取

- **1）获取 OptiFabric ，可以在他的 [MC百科下载页面（推荐）](https://www.mcmod.cn/download/1703.html) [CurseForge 页面](https://www.curseforge.com/minecraft/mc-mods/optifabric/files/all) 或在 HMCL 的模组搜索中下载**

[MC百科下载页面（推荐）](https://www.mcmod.cn/download/1703.html)

![MC百科下载页面](/assets/img/docs/fabric_and_optifine_install/2.png)

[CurseForge页面](https://www.curseforge.com/minecraft/mc-mods/optifabric/files/all) 下载操作：

![CurseForge页面下载操作](/assets/img/docs/fabric_and_optifine_install/5.png)

HMCL 模组搜索下载操作：

![1](/assets/img/docs/fabric_and_optifine_install/6.png)

![2](/assets/img/docs/fabric_and_optifine_install/7.png)

![3](/assets/img/docs/fabric_and_optifine_install/8.png)

![4](/assets/img/docs/fabric_and_optifine_install/9.png)

*注：如果你在HMCL模组搜索中下载时，另存该模组，那么就需要按照下面的模组安装方法来安装。*

- **2）获取 OptiFine ，可以在他的 [页面](https://optifine.net/downloads) 或非官方 [中文页面](https://optifine.cn/downloads) 中可以下载**

OptiFine [页面](https://optifine.net/downloads) 操作：

![OptiFine页面操作](/assets/img/docs/fabric_and_optifine_install/5.png)

OptiFine 非官方 [中文页面](https://optifine.cn/downloads) 操作：

![OptiFine非官方中文页面操作](/assets/img/docs/fabric_and_optifine_install/3.png)

#### 安装

进入 要安装模组的游戏版本 的 游戏管理 ，切换到 模组管理 ，在这个页面将 OptiFabric 模组 & OptiFine 添加即可

![安装模组](/assets/img/docs/fabric_and_optifine_install/11.gif)

**然后在 模组管理 中检查是否有 OptiFabric 模组 & OptiFine !**

检查完后，至此就完成啦，直接启动游戏即可。

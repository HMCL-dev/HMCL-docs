---
title:  "模组包报错排查手册"
permalink: /modpack/error-handbook.html
date:   2025-05-24 13:39:36 +0800
categories: 整合包
toc: true
---

> 本文由 LIiston 编写。

# 模组包报错排查手册  

## 文件夹结构

首先我们需要先认识Minecraft的文件夹结构  
如果你开启了 [版本隔离](launcher/global-version-isolation.html) 那么你的文件夹结构如下  

```text
.minecraft
|*asstes
|*libraries
|*versions
    \1.16.5-optifine
        |1.16.5-optifine.jar
        |*saves
        |*resourcepacks
        |*logs
        |*mods
        |*config
        |*saves
        |*crash-reports
        ...
```

如果你没有开启则是这样  
```text
.minecraft
|*asstes
|*libraries
|*saves
|*resourcepacks
|*logs
|*mods
|*config
|*saves
|*crash-reports
|*versions
    \1.16.5-optifine
        |1.16.5-optifine.jar
        ...
```

我们极力推荐您打开版本隔离，因为这样能避免模组之间的一部分冲突 [跳转](/launcher/global-version-isolation.html)

## 简单排查

在遇到报错时，您可以通过以下两种方式进行初步分析：

1. **使用社区分析工具**  
    访问 [CrashMC 报错分析器](https://www.crashmc.com/analyzer)，将崩溃报告内容粘贴进去，工具会自动分析常见问题并给出建议。

2. **借助 AI 辅助分析**  
    可以将崩溃日志粘贴到 [DeepSeek Chat](https://chat.deepseek.com/)，让 AI 帮助你解读报错内容和可能的解决方法。

这两种方式都能帮助您快速定位问题，提高排查效率。

## 求助他人

*游戏崩的时候会有个窗口，里面可以导出一个压缩包，可以发给别人让别人帮你看，你千万别截图那个窗口 *磕头*

![报错示例截图](/assets/img/docs/error-handbook/image.png)
在向他人求助时，建议将 `.minecraft` 文件夹下的 `crash-reports` 文件夹和 `logs` 文件夹中的相关文件（如最新的崩溃报告和日志文件）一并打包发送。  
这样可以让对方更全面地了解你的运行环境和报错详情，从而更高效地帮助你分析和解决问题。请注意，发送前可先检查日志内容，避免泄露个人隐私信息。

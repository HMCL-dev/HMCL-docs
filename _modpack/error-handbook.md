---
title: 模组包报错排查手册
date: 2025-05-24 13:39:36 +0800
author: LIPiston
---

## 文件夹结构

首先我们需要先认识Minecraft的文件夹结构  
如果你开启了 [版本隔离](launcher/global-version-isolation.html) 那么你的文件夹结构如下  
```text
.minecraft
|*assets         # 游戏资源文件夹，存放纹理、声音等资源
|*libraries      # 依赖库文件夹，存放运行游戏所需的各种库
|*versions       # 版本文件夹，包含所有已安装的Minecraft版本
    \1.16.5-optifine
        |1.16.5-optifine.jar   # 该版本的主程序jar文件
        |*saves               # 存档文件夹，仅该版本可见
        |*resourcepacks        # 资源包文件夹，仅该版本可见
        |*logs                # 日志文件夹，仅该版本可见
        |*mods                # 模组文件夹，仅该版本可见
        |*config              # 配置文件夹，仅该版本可见
        |*crash-reports       # 崩溃报告文件夹，仅该版本可见
        ...
```

如果你没有开启则是这样  
```text
.minecraft
|*assets         # 游戏资源文件夹，存放纹理、声音等资源
|*libraries      # 依赖库文件夹，存放运行游戏所需的各种库
|*saves          # 存档文件夹，所有版本共用
|*resourcepacks  # 资源包文件夹，所有版本共用
|*logs           # 日志文件夹，所有版本共用
|*mods           # 模组文件夹，所有版本共用
|*config         # 配置文件夹，所有版本共用
|*crash-reports  # 崩溃报告文件夹，所有版本共用
|*versions       # 版本文件夹，包含所有已安装的Minecraft版本
    \1.16.5-optifine
        |1.16.5-optifine.jar   # 该版本的主程序jar文件
        ...
```

我们极力推荐您打开版本隔离，因为这样能避免模组之间的一部分冲突 [跳转](/_launcher/isolation.md)

## 简单排查

在遇到报错时，您可以通过以下两种方式进行初步分析：

1. **使用社区分析工具**  
    访问 [CrashMC 报错分析器](https://www.crashmc.com/analyzer)，将崩溃报告内容粘贴进去，工具会自动分析常见问题并给出建议。

2. **借助 AI 辅助分析**  
    可以将崩溃日志粘贴到 [DeepSeek Chat](https://chat.deepseek.com/)，让 AI 帮助你解读报错内容和可能的解决方法。

3. **进入 HMCL 汉医堂**
    可以在 HMCL 急诊群中向群友们寻求帮助，他们通常有丰富的经验，能够协助你分析报错并提供解决方案。  

    > qq : 666546887

这三种方式都能帮助您快速定位问题，提高排查效率。 

## 求助他人

*游戏崩的时候会有个窗口，里面可以导出一个压缩包，可以发给别人让别人帮你看，你千万别截图那个窗口 *磕头*

![报错示例截图](/assets/img/docs/error-handbook/image.png)
在向他人求助时，建议将 `.minecraft` 文件夹下的 `crash-reports` 文件夹和 `logs` 文件夹中的相关文件（如最新的崩溃报告和日志文件）一并打包发送。  
这样可以让对方更全面地了解你的运行环境和报错详情，从而更高效地帮助你分析和解决问题。请注意，发送前可先检查日志内容，避免泄露个人隐私信息。


---
title:  "整合包自带 Java 教程"
permalink: /modpack/bundled-java.html
date:   2021-10-09 23:18:02 +0800
categories: 整合包
toc: true
---

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdocs.hmcl.net%2Fmodpack%2Fbundled-java.html&count_bg=%233E4245&title_bg=%233E4245&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80&edge_flat=false)

## 背景

想必有些服务器主为此头疼了许久。由于玩家的电脑环境多变，甚至可能仍然有安装着 Java 7 的电脑而无法启动 1.12.2 以上的游戏或者含有 Mod 的客户端。因此服务器主希望能在整合包中自带一个 Java 运行时（或者叫 JRE），从而取代电脑自带的 JVM。接下来本文将介绍两种方法。

## 名词解释
- `JRE` **Java Runtime Environment**的缩写。通常可以认为是玩家所使用的 `Java`
  下文所指代的 Java 和 JRE 均可以认为是此版本。

# 方法一：使用最新版本（推荐）

## EXE 版本

EXE 版本在 Windows 系统下打开会首先检查**同级文件夹**下的 `jre-arm64`、`jre-x64` 和 `jre-x86` 文件夹。

检查顺序从上到下依次是：
- `jre-arm64` （ARM 64 位）
- `jre-x64` （x86 64 位）
- `jre-x86` （x86 32 位）

启动优先级如下：
- 如果玩家电脑的操作系统是**x86 32位**的，HMCL 将会优先使用 `jre-x86` 启动 HMCL。
- 如果玩家电脑的操作系统是**x86 64位**的，HMCL 将会优先使用 `jre-x64` 启动 HMCL。
- 如果玩家电脑的操作系统是**ARM 64位**的，HMCL 将会优先使用 `jre-arm64` 启动 HMCL。

如果你不打算兼容**ARM 64位**和**x86 32位**操作系统的玩家（让 HMCL 使用系统 JRE 环境），那么你的整合包内只需要携带 `jre-x64` 即可。

如果你想在任何情况下使用同一个 Java 启动 HMCL，只需要携带 `jre-x86` 即可，此时无论玩家电脑的操作系统是什么架构都会尝试使用该 Java。

如果没有对应的版本，将会尝试使用系统自带的版本启动。

**注意**：

使用 x86 32位的 Java 很可能会导致游戏出错、内存不够等问题。我们推荐您配备 **x86 64位**的 Java 而不是 **x86 32位**。
    
## SH 版本

SH 版本在支持 Bash 的系统下打开会首先检查**同级文件夹**下的 `jre-loongarch64`、`jre-arm32`、`jre-arm64`、`jre-x64` 和 `jre-x86` 文件夹。

检查顺序从上到下依次是：
- `jre-x64` （x86 64 位）
- `jre-x86` （x86 32 位）
- `jre-arm64` （ARM 64 位）
- `jre-arm32` （ARM 32 位）
- `jre-loongarch64` （Loongarch 64 位）

会根据玩家电脑的操作系统架构选择对应文件夹内的 Java 运行时启动 HMCL。

如果你想在**x86 32位**和**x86 64位**下使用同一个 Java 启动 HMCL，只需要携带 `jre-x86` 即可，此时无论玩家电脑的操作系统是什么架构都会尝试使用该 Java 启动 HMCL。

如果没有对应的版本，或者对应的版本不兼容，将会尝试使用系统自带的版本启动。

**注意**：

1. 在启动器内更新升级本体时，只会更新本体部分，并不会将 EXE外壳 或 SH 外壳（即 HMCLauncher）更新，因此建议在制作整合包时重新下载 EXE 或 SH 版本以确保能正常使用该功能。
2. 部分 Linux 系统的 **x86 64位** 系统可能并不兼容 **x86 32位** 版本的 Java

## 方法二：创建快捷方式

对于在 Windows 下使用 JAR 版本启动 HMCL 的可以采用方法二。

### 目录结构

首先我们假设整合包根文件夹是 `tutorial`（这个文件夹名字可以取别的），该文件夹内应该包含如下的文件：

![](/assets/img/docs/modpack-in-java/2-1.png)

其中，`.minecraft` 是 Minecraft 文件夹，`jre-x64` 是你的 Java 运行时，我们分别来看看这两个文件夹的内容：

![](/assets/img/docs/modpack-in-java/2-2.png)

上图是 `.minecraft` 文件夹的内容，里面包含着 `assets`、`libraries`、`versions` 等传统的文件夹。以及 `HMCL.jar`，这个文件是 HMCL 启动器的 `jar` 文件，可以在 https://hmcl.huangyuhui.net/download 里面下载 macOS 或者 Linux 版本（这两个版本的文件后缀名都是 `jar`，实际上是完全一样的东西，**也可以在 Windows 系统上双击运行**，没有平台限制）。

这个启动器文件我们接下来会使用到，借助整合包自带的 Java 运行时启动 HMCL。

**注意：HMCL 本体文件 HMCL.jar 请务必保持该文件名，HMCL-3.2.117.jar 等带有版本号的文件名是不可以的**

![](/assets/img/docs/modpack-in-java/2-3.png)

上图是 `jre-x64` 文件夹的内容，一看就是一个 JRE 的文件夹。

### 创建快捷方式

接下来我们创建一个快捷方式来使得 HMCL 通过 `jre-x64` 文件夹里的 Java 运行时启动，并使得 Minecraft 也通过该 Java 运行时启动。

![](/assets/img/docs/modpack-in-java/2-4.png)

在 `tutorial` 文件夹内右击空白区域打开快捷菜单，创建快捷方式。

![](/assets/img/docs/modpack-in-java/2-5.png)

在弹出的窗口中（如上图所示），在输入框内输入：`cmd /c start .\jre-x64\bin\javaw.exe -jar .\.minecraft\HMCL.jar`，其中 `jre-x64` 和 `.minecraft\HMCL.jar` 根据实际情况修改，`jre-x64` 是你的 Java 运行时的路径，`.minecraft\HMCL.jar` 是 HMCL 本体文件。

![](/assets/img/docs/modpack-in-java/2-6.png)

接着给快捷方式取个名字就好了（如上图所示，`开始游戏` 是我取的名字）。

生成好快捷方式后我们还要编辑一下属性，右键 `开始游戏` 这个新创建的快捷方式（如果你取了别的名字请选中那个文件编辑其属性），在弹出的快捷菜单中选择属性，会打开快捷方式的属性窗口如下图所示：

![](/assets/img/docs/modpack-in-java/2-7.png)

将起始位置内的文字删除干净，留空即可。保存退出该窗口。

### 完成

现在这个开始游戏的快捷方式就可以直接使用的，你可以双击该快捷方式打开 HMCL，HMCL 在启动游戏的时候也会直接使用你指定的 Java 运行时。

## 一些疑问

**1Q**：这些 Java 文件夹中具体该放些什么，直接复制就行了吗？

**1A**：是的，复制 jre 内的所有东西就行，可以根据下图参考：

![](/assets/img/docs/modpack-in-java/2-3.png)

——————————————————————————————————————————————————

**2Q**：去哪里找Java？

**2A**：有很多的Java提供选择，如 [Liberica JDK](https://bell-sw.com/pages/downloads/?os=Windows&package=jdk-full) 、[Microsoft JDK](https://docs.microsoft.com/zh-cn/java/openjdk/download)、[Oracle JDK](https://www.oracle.com/java/technologies/downloads/#jdk17-windows) 和 [Oracle openJDK](https://jdk.java.net/) 等

只需要在下载时下载**.zip 压缩包文件**，且将压缩包内的所有内容放入对应文件夹即可

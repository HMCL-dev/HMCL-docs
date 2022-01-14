 # 整合包自带 Java 教程

## 背景

想必有些服务器主为此头疼了许久。由于玩家的电脑环境多变，甚至可能仍然有安装着 Java 7 的电脑而无法启动 1.12.2 以上的游戏、或者  Mod 客户端。因此服务器主希望能在整合包中自带一个 Java 运行时（或者叫 JRE），从而取代电脑自带的 JVM。接下来本文将介绍两种方法。

# 方法一：使用 HMCL-3.2.122 或以上版本

**HMCL-3.2.122** 或更新的版本的 Windows 版本**（必须是 Windows 版本，或者说 exe 文件）**会直接检查同级文件夹下的 `jre-x64` 和 `jre-x86` 文件夹。

如果玩家电脑的操作系统是 32 位的，那么将优先使用 `jre-x86` 内的 Java 运行时启动游戏。如果是 64 位的，将优先选择 `jre-x64` 文件夹内的 Java 运行时启动游戏（但不会选择 `jre-x86`）。

如果你放弃 32 位操作系统的玩家，那么你的整合包内只需要携带 `jre-x64` 即可。文件夹结构如下：

![](assets/img/docs/modpack_in_java/1-1.png)

## 方法二：创建快捷方式

对于低于 HMCL 3.2.119 的版本，需要采用方法一。

### 目录结构

首先我们假设整合包根文件夹是 `tutorial`（这个文件夹名字可以取别的），该文件夹内应该包含如下的文件：

![](assets/img/docs/modpack_in_java/2-1.png)

其中，`.minecraft` 是 Minecraft 文件夹，`jre-x64` 是你的 Java 运行时，我们分别来看看这两个文件夹的内容：

![](assets/img/docs/modpack_in_java/2-2.png)

上图是 `.minecraft` 文件夹的内容，里面包含着 `assets`、`libraries`、`versions` 等传统的文件夹。以及 `HMCL.jar`，这个文件是 HMCL 启动器的 `jar` 文件，可以在 https://hmcl.huangyuhui.net/download 里面下载 macOS 或者 Linux 版本（这两个版本的文件后缀名都是 `jar`，实际上是完全一样的东西，**也可以在 Windows 系统上双击运行**，没有平台限制）。

这个启动器文件我们接下来会使用到，借助整合包自带的 Java 运行时启动 HMCL。

**注意：HMCL 本体文件 HMCL.jar 请务必保持该文件名，HMCL-3.2.117.jar 等带有版本号的文件名是不可以的**

![](assets/img/docs/modpack_in_java/2-3.png)

上图是 `jre-x64` 文件夹的内容，一看就是一个 JRE 的文件夹。

### 创建快捷方式

接下来我们创建一个快捷方式来使得 HMCL 通过 `jre-x64` 文件夹里的 Java 运行时启动，并使得 Minecraft 也通过该 Java 运行时启动。

![](assets/img/docs/modpack_in_java/2-4.png)

在 `tutorial` 文件夹内右击空白区域打开快捷菜单，创建快捷方式。

![](assets/img/docs/modpack_in_java/2-5.png)

在弹出的窗口中（如上图所示），在输入框内输入：`cmd /c start .\jre-x64\bin\javaw.exe -jar .\.minecraft\HMCL.jar`，其中 `jre-x64` 和 `.minecraft\HMCL.jar` 根据实际情况修改，`jre-x64` 是你的 Java 运行时的路径，`.minecraft\HMCL.jar` 是 HMCL 本体文件。

![](assets/img/docs/modpack_in_java/2-6.png)

接着给快捷方式取个名字就好了（如上图所示，`开始游戏` 是我取的名字）。

生成好快捷方式后我们还要编辑一下属性，右键 `开始游戏` 这个新创建的快捷方式（如果你取了别的名字请选中那个文件编辑其属性），在弹出的快捷菜单中选择属性，会打开快捷方式的属性窗口如下图所示：

![](assets/img/docs/modpack_in_java/2-7.png)

将起始位置内的文字删除干净，留空即可。保存退出该窗口。

### 完成

现在这个开始游戏的快捷方式就可以直接使用的，你可以双击该快捷方式打开 HMCL，HMCL 在启动游戏的时候也会直接使用你指定的 Java 运行时。

## 一些疑问

Q：jre-x64 文件夹中具体该放些什么，直接复制就行了吗？

A：是的，复制 jre 内的所有东西就行



Q：去哪里找Java？

A：有很多的Java提供选择，如[Liberica JDK](https://bell-sw.com/pages/downloads/?os=Windows&package=jdk-full) 、[Microsoft JDK](https://docs.microsoft.com/zh-cn/java/openjdk/download)、[Oracle JDK](https://www.oracle.com/java/technologies/downloads/#jdk17-windows)和[Oracle openJDK](http://jdk.java.net/)

只需要在下载时下载**.zip的压缩包文件**，且将压缩包内的所有内容放入`jre-x64`或`jre-x86`即可
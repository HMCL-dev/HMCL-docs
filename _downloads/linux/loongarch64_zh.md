---
title: 下载 HMCL 和 Minecraft 依赖的 Java
date: 2023-09-05 14:00:00 +0800
redirect_from:
  - /downloads/loongnix.html
lang: zh
permalink: downloads/linux/loongarch64
---

龙芯平台存在 “**新世界**” 和 “**旧世界**” 两个 ABI，不同 ABI 的 Java 暂时互不兼容。

请在终端中输入 `uname -r` 命令查看 Linux 内核版本:

- 如果你的内核版本为 5.10 或更高版本，请下载[新世界](#新世界) Java；
- 如果你的内核版本为 4.19，请下载[旧世界](#旧世界) Java。

## 新世界

如果你正在使用新世界龙芯系统，请下载新世界 Java。

直接下载 (需自行安装)：[loongson25.1.5-fx-jdk25_36-linux-loongarch64-glibc2.34.tar.gz](https://ftp.loongnix.cn/Java/openjdk25/loongson25.1.5-fx-jdk25_36-linux-loongarch64-glibc2.34.tar.gz)

通过包管理器安装：

- AOSC OS/Debian/Ubuntu: 

  ```bash
  sudo apt install default-jre
  ```

  注意：Deepin 软件源中的 Java 不包含 JIT 编译器，使用它启动游戏性能将极其糟糕。我们推荐 Deepin 用户直接下载 Java，而不是使用 APT 安装。
  
- ArchLinux:

  ```bash
  sudo pacman -S jre-openjdk
  ```

## 旧世界

如果你正在使用旧世界龙芯系统，请下载旧世界 Java：

- `.tar.gz`: [loongson25.1.5-fx-jdk25_36-linux-loongarch64.tar.gz](https://ftp.loongnix.cn/Java/openjdk25/loongson25.1.5-fx-jdk25_36-linux-loongarch64.tar.gz)

- `.deb`: [loongson25.1.5-fx-jdk25_36-linux-loongarch64.deb](https://ftp.loongnix.cn/Java/openjdk25/loongson25.1.5-fx-jdk25_36-linux-loongarch64.deb)

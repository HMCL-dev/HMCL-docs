---
title:  "下载 HMCL 和 Minecraft 依赖的 Java"
permalink: /downloads/linux/loongarch64.html
date:   2023-09-05 14:00:00 +0800
categories: Java 下载
toc: false
---

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdocs.hmcl.net%2Fdownloads%2Flinux%2Floongarch64.html&count_bg=%233E4245&title_bg=%233E4245&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80&edge_flat=false)

龙芯平台存在 “**新世界**” 和 “**旧世界**” 两个 ABI，不同 ABI 的 Java 暂时互不兼容。

请在终端中输入 `uname -r` 命令查看 Linux 内核版本。如果你的内核版本为 4.x 请下载[旧世界](#旧世界) Java，否则请下载[新世界](#新世界) Java。

## 旧世界

如果你正在使用旧世界龙芯系统，请前往龙芯开源社区下载龙芯 Java 17。

[点击此处前往下载页面](https://www.loongnix.cn/zh/api/java/downloads-jdk17/index.html)

## 新世界

如果你正在使用新世界龙芯系统，请使用系统的包管理器安装 Java 17。

**Loongnix**/Deepin/Debian/Ubuntu:

```
sudo apt install openjdk-17-jre
```

Arch Linux:

```
sudo pacman -S jre17-openjdk
```

---

There are two ABIs on Loongson platform: **New World** and **Old World**. Java with different ABIs are not compatible with each other for the time being.

Please execute `uname -r` in terminal to check the Linux kernel version. Please download [Old World](#old-world) Java if your kernel version is 4.x, otherwise please download [New World](#new-world) Java.

## Old World

If you are using an Old World Loongson system, please go to Loongson Open Source Community to download Loongson Java 17.

[Click here to go to the download page](https://www.loongnix.cn/zh/api/java/downloads-jdk17/index.html)

## New World

If you are using a New World Loongson system, please install Java 17 by using system's package manager.

**Loongnix**/Deepin/Debian/Ubuntu:

```
sudo apt install openjdk-17-jre
```

Arch Linux:

```
sudo pacman -S jre17-openjdk
```

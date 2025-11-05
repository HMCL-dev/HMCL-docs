---
title: Download HMCL and Minecraft Dependency Java for Linux LoongArch64
date: 2023-09-05 14:00:00 +0800
redirect_from:
  - /downloads/loongnix.html
lang: en
permalink: downloads/linux/loongarch64
---

There are two ABIs on the Loongson platform: "**New World**" and "**Old World**".
Java for different ABIs is temporarily incompatible.

Please enter the `uname -r` command in the terminal to check your Linux kernel version:

- If your kernel version is 5.10 or higher, please download the [New World](#新世界) Java;
- If your kernel version is 4.19, please download the [Old World](#旧世界) Java.

## New World

If you are using an New World distribution, please download the New World Java.

Direct download (manual installation required): [loongson25.1.5-fx-jdk25_36-linux-loongarch64-glibc2.34.tar.gz](https://ftp.loongnix.cn/Java/openjdk25/loongson25.1.5-fx-jdk25_36-linux-loongarch64-glibc2.34.tar.gz)

Install via package manager:

- AOSC OS/Debian/Ubuntu: 

  ```bash
  sudo apt install default-jre
  ```

  Note: The Java package in the Deepin repository does not include a JIT compiler. Using it to launch games will result in extremely poor performance. We recommend Deepin users download Java directly instead of installing it via APT.

- ArchLinux:

  ```bash
  sudo pacman -S jre-openjdk
  ```

## Old World

If you are using an Old World distribution, please download the Old World Java:

- `.tar.gz`: [loongson25.1.5-fx-jdk25_36-linux-loongarch64.tar.gz](https://ftp.loongnix.cn/Java/openjdk25/loongson25.1.5-fx-jdk25_36-linux-loongarch64.tar.gz)

- `.deb`: [loongson25.1.5-fx-jdk25_36-linux-loongarch64.deb](https://ftp.loongnix.cn/Java/openjdk25/loongson25.1.5-fx-jdk25_36-linux-loongarch64.deb)

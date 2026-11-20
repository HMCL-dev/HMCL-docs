---
title: Download Java Required by HMCL and Minecraft
date: 2023-09-05 14:00:00 +0800
---

There are two ABIs on the Loongson platform, "**New World**" and "**Old World**", and Java for the two different ABIs is currently mutually incompatible.

Please enter the `uname -r` command in the terminal to check the Linux kernel version:

- If your kernel version is 5.10 or later, please download [New World](#new-world) Java;
- If your kernel version is 4.19, please download [Old World](#old-world) Java.

## New World

If you are using a New World Loongson system, please download New World Java.

Direct download (requires manual installation): [loongson25.3.20-fx-jdk25.0.1_8-linux-loongarch64-glibc2.34.tar.gz](https://ftp.loongnix.cn/Java/openjdk25/loongson25.3.20-fx-jdk25.0.1_8-linux-loongarch64-glibc2.34.tar.gz)

Install via package manager:

- AOSC OS/Debian/Ubuntu: 

  ```bash
  sudo apt install default-jre
  ```

  Note: The Java in the Deepin software repository does not include a JIT compiler, so using it to launch the game will result in extremely poor performance. We recommend that Deepin users download Java directly instead of installing it via APT.
  
- ArchLinux:

  ```bash
  sudo pacman -S jre-openjdk
  ```

## Old World

If you are using an Old World Loongson system, please download Old World Java:

- `.tar.gz`: [loongson25.3.20-fx-jdk25.0.1_8-linux-loongarch64.tar.gz](https://ftp.loongnix.cn/Java/openjdk25/loongson25.3.20-fx-jdk25.0.1_8-linux-loongarch64.tar.gz)

- `.deb`: [loongson25.3.20-fx-jdk25.0.1_8-linux-loongarch64.deb](https://ftp.loongnix.cn/Java/openjdk25/loongson25.3.20-fx-jdk25.0.1_8-linux-loongarch64.deb)

- `.rpm`: [loongson25.3.20-fx-jdk25.0.1_8-linux.loongarch64.rpm](https://ftp.loongnix.cn/Java/openjdk25/loongson25.3.20-fx-jdk25.0.1_8-linux.loongarch64.rpm)

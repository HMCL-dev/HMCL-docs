---
title: Detailed Settings Reference
excerpt: Detailed descriptions of the various HMCL settings, including Global Game Settings, Appearance, Downloads, and more
date: 2023-6-09 10:26:00 +0800
author: MemoryShadow
---

## Introduction

This article explains in detail, from the perspectives of "Global Game Settings", "General", "Appearance", and "Downloads", what each option in HMCL's settings does. For entries that are self-explanatory from their names, this article does not discuss them at length.

### Constraints and Notes

This article was written for version `HMCL-3.5.3.230`. If you are using an older version, note that some options may not exist.

<!--{% comment %}-->
## Table of Contents

- [Introduction](#introduction)
  - [Constraints and Notes](#constraints-and-notes)
- [Table of Contents](#table-of-contents)
- [Global Game Settings](#global-game-settings)
  - [Java Path](#java-path)
    - [Automatically Selecting a Suitable Java](#automatically-selecting-a-suitable-java)
  - [Version Isolation](#version-isolation)
  - [Game Memory](#game-memory)
  - [Launcher Visibility](#launcher-visibility)
    - [End the Launcher After the Game Starts](#end-the-launcher-after-the-game-starts)
    - [Hide the Launcher After the Game Starts](#hide-the-launcher-after-the-game-starts)
    - [Keep the Launcher Visible](#keep-the-launcher-visible)
    - [Hide the Launcher and Reopen It After the Game Ends](#hide-the-launcher-and-reopen-it-after-the-game-ends)
  - [Game Arguments](#game-arguments)
  - [JVM Arguments](#jvm-arguments)
  - [Native Library Path](#native-library-path)
  - [GLFW](#glfw)
  - [OpenAL](#openal)
- [General](#general)
- [Appearance](#appearance)
- [Downloads](#downloads)
  - [Download Source](#download-source)
  - [Download Concurrency](#download-concurrency)
  - [Proxy Settings](#proxy-settings)
- [Special Thanks](#special-thanks)
- [References](#references)
<!--{% endcomment %}-->

## Global Game Settings

This is the first settings section in HMCL and one of the most important ones, as it determines how HMCL behaves when launching the game.

### Java Path

As we all know, Minecraft is written in Java, so to launch the game HMCL needs to know the installation path of Java (JRE[^1]).

Since HMCL itself is a Java program, generally if HMCL starts normally, at least one JRE can be found on the computer. However, some unknown factors may prevent a JRE from being found, and in that case you need to specify the JRE installation path manually.

Let us first discuss the case where Java can be detected automatically:

When HMCL starts, it looks for a JRE based on registry entries, environment variables, and HMCL's own startup path[^2]. If one is found, it is displayed in the "Java Path" field and used when launching the game.

The cases above cover almost everything. If you want HMCL to find Java automatically, you should configure your computer's environment using these techniques.

Next, let us discuss the case where Java cannot be detected automatically:

Usually, a JRE installed from an extracted archive will not be detected automatically by HMCL, and in that case you need to specify the JRE installation path manually. You can expand the "Java Path" entry (usually by clicking the triangle on the right side of the entry), select the "Custom" entry in the expanded drop-down list, then click the folder icon on the right and choose the path of your Java executable in the dialog that appears.

#### Automatically Selecting a Suitable Java

After version 1.16.5, Minecraft's minimum supported Java version was raised from 8 to 16. HMCL can find the most suitable Java version among the added versions and use it when launching the game. The whole process requires no manual intervention.

### Version Isolation

This feature is supported by all mainstream launchers today. While sharing dependency libraries as much as possible, it isolates different game versions from each other, preventing the mod loader you installed from being applied to the wrong version or loaded into an incompatible version, while minimizing disk usage to the greatest extent.

The underlying principle of this feature is not elaborated here. For users, the biggest difference is that the actual game directory changes; for example, the way you retrieve game logs[^3] changes.

The game directory is normally the `.minecraft` folder, but after version isolation is enabled, your actual game directory is switched to `.minecraft/versions/<game version name>`, which can cause extra confusion for beginners or players used to the official launcher.

Generally speaking, unless you are playing an unmodified version, you should enable version isolation to avoid errors. This also clears data such as logs when you delete a game version.

### Game Memory

This is related to the amount of RAM on your computer. Generally, choosing the "Automatically Allocate Memory" option gives a relatively suitable value. However, some players with weaker CPUs who hope to trade memory for CPU time may be willing to allocate more memory.

But be aware that this only adjusts the maximum memory that the JVM[^4] can use. Only when the mod or Minecraft developers have not manually controlled GC[^5] behavior can memory be traded for CPU time as you expect.

### Launcher Visibility

This entry has 4 options:

- End the launcher after the game starts
- Hide the launcher after the game starts
- Keep the launcher visible
- Hide the launcher and reopen it after the game ends

#### End the Launcher After the Game Starts

This option is especially recommended for low-performance machines, as it saves some computer resources. The trade-off is that the launcher cannot capture your game crash information and logs very well.

#### Hide the Launcher After the Game Starts

This option collects relevant crash information from your computer when the game crashes, so you can report it to the relevant developers. The trade-off is that it consumes some extra computer resources.

#### Keep the Launcher Visible

This option keeps the launcher visible throughout the whole game session, which helps when you need to launch multiple games at the same time. The trade-off is that it consumes more computer resources.

#### Hide the Launcher and Reopen It After the Game Ends

If you need to switch between different game versions frequently, for example to test your mod's compatibility or to compare information between versions, this option will be helpful.

### Game Arguments

Regarding this point, I have not found any additional launch arguments that can be used together with the game.

### JVM Arguments

Adjusting JVM arguments allows more fine-grained control over the JVM's behavior, such as whether to compress pointers (trading CPU for memory), whether to perform GC frequently (again trading CPU for memory), and so on. These can generally be adjusted in ways like those described in this article[^6]. Note, however, that JVM arguments are determined by the actual implementation; whether they are used and supported depends on the specific JVM implementation.

### Native Library Path

On some devices, such as those with M1 chips, the generic native libraries may not work properly; only the libraries specially provided for a version can make them work. You can use this option to replace them.

### GLFW

GLFW is a lightweight C library used to create and manage OpenGL contexts across multiple operating systems, handle user input, and obtain time and framebuffers. It supports multiple windows, fullscreen mode, windowed mode, multiple input devices, and the clipboard. GLFW is an operating-system-independent library that can be used on many platforms, including Windows, macOS, and Linux.

On Linux, the system's built-in windowing libraries (such as Xorg) usually already include window management that can integrate with OpenGL. Therefore, using the system's built-in libraries avoids library conflicts with other projects and ensures the best support for the features provided by the system. In addition, using the system's built-in libraries minimizes installation and configuration complexity.

Therefore, Linux players are recommended to use the system's built-in one.

### OpenAL

OpenAL is a cross-platform 3D audio API that can play sound effects and music on multiple operating systems. Its supported features include positioning, playback, 3D effects, echo, filtering, and more. The functions provided by OpenAL can be used to control the position, direction, and velocity of sound sources and the listener to achieve 3D audio effects.

On Linux, OpenAL can usually be integrated with ALSA (Advanced Linux Sound Architecture) or PulseAudio (a modern audio subsystem). Using the system's built-in audio support libraries ensures compatibility between the application and the underlying audio hardware and devices, and provides the best audio performance and features. In addition, using OpenAL gives applications cross-platform characteristics, so the same code and resources can be used to implement audio effects on multiple operating systems.

Therefore, Linux users are recommended to use the system's built-in one.

## General

This section provides some general HMCL parameters, such as whether the launcher automatically checks for updates, where the downloaded-file cache directory is located, and the display language of the program interface. These are mostly self-explanatory and do not need much discussion.

## Appearance

This section provides some HMCL appearance parameters, such as the launcher's theme color, animation display, background image, and font. These are mostly self-explanatory and do not need much discussion.

## Downloads

### Download Source

Due to network conditions, downloading Minecraft used to be troublesome, but now we have the BMCLAPI[^7] project, which provides mirrors of Minecraft-related files to users in mainland China for free. However, there may be some delay, so you can choose according to your needs.

### Download Concurrency

Increasing download concurrency can make the most of your network, but higher is not always better. Increasing concurrency puts a higher load on both your computer and the download source. Because of the cask effect, any link in the chain — your local downstream bandwidth, the download source's upstream bandwidth, your disk read/write speed — can become a bottleneck during the download. So do not increase concurrency blindly; for typical home broadband, a concurrency between 8 and 16 is recommended.

### Proxy Settings

A tool for solving some cases of poor network conditions or connecting to special network segments, such as connecting to intranet servers.

## Special Thanks

- huangyuhui
- GitHub Copilot

## References

[^1]: [What is a JRE?](https://www.ibm.com/cn-zh/topics/jre "Click to view")

<!--{% comment %}-->
[^2]: [Java bundled with modpacks](../_modpack/bundled-java.md "Click to view")
<!--{% endcomment %}--{{'>'}}
[^2]: [Java bundled with modpacks](/_modpack/bundled-java.md "Click to view")
<!---->

[^3]: [How to obtain Minecraft game logs?](https://memoryshadow.cn/index.php/2023/06/03/how-do-i-get-minecraft-game-logs/ "Click to view")

[^4]: [What is a JVM?](https://www.ibm.com/support/pages/ibm-i-上java-虚拟机简介 "Click to view")

[^5]: [What is GC?](https://blog.csdn.net/weixin_44908159/article/details/123626886 "Click to view")

[^6]: [JVM parameter values](https://www.ibm.com/docs/zh/integration-bus/10.0?topic=command-jvm-parameter-values "Click to view")

[^7]: [BMCLAPI](https://bmclapidoc.bangbang93.com/ "Click to view")

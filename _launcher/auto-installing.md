---
title:  "自动安装与模组下载简介"
excerpt: 安装 Forge、Fabric、LiteLoader、OptiFine 及模组的教程
date:   2025-11-02 09:06:30 +0800
author: asdqp233,Mine-diamond
---

要为 Minecraft 安装模组，你首先需要安装一个“模组加载器”（例如 NeoForge 或 Fabric），然后再安装你想要的模组。HMCL 为这两个步骤都提供了强大的支持。

在安装前，最关键的一点是**兼容性**。请记住以下核心原则：

- 通常，你只能为单个游戏实例安装一种模组加载器。
- 你下载的**模组**，必须同时兼容你的**游戏版本**（如 1.20.4）和**模组加载器**（如 Fabric）。

简单来说，为游戏安装模组总共分三步，本指南将带你逐一完成：
1. 开启版本隔离，为模组创建一个独立干净的环境。
2. 安装模组加载器（如 Forge, Fabric）。
3. 安装你喜欢的模组。

## 启用版本隔离

在安装模组之前，必须开启版本隔离以隔离为不同实例安装的模组：

在 HMCL 主界面，点击「设置」，在「全局游戏设置」选项卡中，找到「版本隔离」，点击「版本隔离」，选择「各实例独立」即可

![Working_Directory](/assets/img/docs/auto-installing/Working_Directory.png)

更详细的介绍见 [全局版本隔离](/_launcher/isolation.md)

## 安装模组加载器  

### 模组加载器简介

常见的模组加载器有以下几个：

`Forge`,`NeoForge`,`Fabric`,`Quilt`,`Cleanroom`,`LiteLoader` 是 6 个常见的 Mod 加载器。  
`Fabric API`,`QSL/QFAPI` 是两个随 `Fabric` 与 `Quilt` 的官方 API（实际是模组）。


**兼容性：**
-  ***LiteLoader* 和 *Forge* 是兼容的 (*Forge* 较新版本和 *LiteLoader* 较老版本可能不兼容)，可以同时安装**  
-  **其它所有模组加载器几乎互不兼容，即你无法同时安装两个模组加载器**  

**Fabric与Quilt 说明：**  
非常多的 *Fabric Mod* 需要 *Fabric API* 作为前置模组， *Quilt Mod* 需要 *QSL/QFAPI* 作为前置模组。  
在安装 *Fabric* 或 *Quilt* 加载器时候如果没有其它原因，建议安装 *Fabric API* 或 *QSL/QFAPI* , 否则很多 *Fabric Mod* 或 *Quilt Mod* 则有可能无法被加载!

### 安装新实例时安装模组加载器

当你在安装新的游戏客户端时候, 会看到其中有该版本支持的模组加载器安装选项，点击你想安装的模组加载器（根据你想安装模组所支持的加载器进行选择）  

![AutoInstaller_ModLoader](/assets/img/docs/auto-installing/AutoInstaller_ModLoader.png)

- 点击你想要的加载器（如 Fabric）。
- 在弹出的版本选择页面，若无特殊需求，**选择最新稳定版**（通常是第一个）。
- 如果你选择 `Fabric` 或 `Quilt`，最好同时安装`Fabric API` 或 `QSL/QFAPI`。
- 点击「安装」即可。

### 为已有实例安装或更换模组加载器

如果你想为已安装好的纯净版游戏添加加载器，或者更换、更新加载器版本：

1.  在 HMCL 主界面，点击「实例管理」，然后选择你想要修改的游戏实例。
2.  在左侧菜单中，点击「自动安装」。

![Auto_Install_Page](/assets/img/docs/auto-installing/Auto_Install_Page.png)

- **安装**：点击你想要的加载器图标（如 Forge），选择版本（推荐最新版），然后点击安装。
- **更新**：点击已安装的加载器，选择一个更新的版本，然后点击安装。
- **删除**：点击加载器右侧的「X」按钮即可删除。
- **更换**：先删除旧的加载器，再安装新的。

> **注意**：此处的自动安装页面不支持安装 `Fabric API` 或 `QSL/QFAPI`。请将它们当作普通模组进行安装。


## 安装模组

安装好加载器后，就可以开始添加模组了。你可以在下列网站获取模组信息，并在 HMCL 内下载和安装：
- [MC 百科](https://www.mcmod.cn/) - 中文社区，资料详尽。
- [CurseForge](https://www.curseforge.com/minecraft/search?class=mc-mods) - 最大的模组发布站之一。
- [Modrinth](https://modrinth.com/mods) - 新兴的现代化模组发布站。

在安装任何模组前，请先确认三件事：
1.  **游戏版本**：模组是否支持你当前的游戏版本？(例如, 1.20.4)
2.  **加载器类型**：模组是给 Forge、Fabric 还是其它模组加载器用的？
3.  **前置模组**：模组是否需要其他模组作为前置？（模组页面通常会说明）

### 自动安装 (推荐)

HMCL 内置了 CurseForge 和 Modrinth 的搜索和下载功能，非常方便。

1.  在 HMCL 主界面，点击「下载」->「模组」。
2.  在搜索框输入模组名（支持中英文），然后点击搜索。如果搜不到，可以尝试切换右上角的下载源。
3.  点击你想要的模组，进入版本列表页面。
4.  根据**游戏版本**和**加载器**，找到你需要的版本，点击并选择「安装到当前实例」。
5.  如果该模组有前置，HMCL 会自动提示，请先安装所有前置模组（但是请不要重复安装前置模组）。

注：点击模组下载页面 上方的蓝色的链接可以到对应的网站查看模组的信息，这会告诉你模组的功能和有可能会提示你一些注意事项

**注意: 请查看你要下载的模组是否正常你要安装的游戏版本以及模组加载器，否则模组无法被正常加载!**

![AddingModAutomatically](/assets/img/docs/auto-installing/AutoInstaller_ModAutoAdding.png)

### 安装OptiFine 或其它光影模组

光影的安装方式略有不同，请参考专门的指南 [光影安装](/_launcher/shader.md)

### 手动安装

当你在网站或其它位置手动下载了模组文件，你可以参照以下步骤完成安装：

一般的 Mod 文件后缀为 `jar` 或者 `litemod`，请确认后缀是正确的。其中`jar`为大多数模组加载器支持的格式，`litemod`仅`LiteLoader`支持。  

#### 通过模组管理页面

1.  进入「实例管理」-> 选择你的游戏实例 ->「模组管理」。
2.  点击「添加模组」并选择你的模组文件，或直接将文件拖拽到窗口内即可。  

#### 通过模组文件夹安装

1.  进入「实例管理」-> 选择你的游戏实例 ->「浏览」->「模组文件夹」。
2.  这会打开该实例的 `mods` 文件夹。
3.  将你下载的 `.jar` 模组文件复制或移动到这个文件夹里。
    （如果 `mods` 文件夹不存在，请自行创建一个。）

![AddingModManually](/assets/img/docs/auto-installing/AutoInstaller_ModManualAdding.png)

## 安装 Mod 后游戏报错/无法启动

造成游戏报错的原因有很多, 比如 Mod 之间不兼容, Fabric API 的版本过高, 缺少前置 Mod 等等。

**第一步：基础检查（最常见问题）**
- **查看 HMCL 错误报告**：新版 HMCL 会直接提示大部分常见错误，这是你的首选信息来源。
- **检查兼容性**：确认模组版本、游戏版本、模组加载器三者是否匹配。
- **检查前置模组**：是否忘记安装必要的API（如 Fabric API）或其他前置模组？

**第二步：自己排查**
- **使用“二分法”**：在“模组管理”页面，先禁用一半的模组，看游戏能否启动或出错。如果可以，说明问题出在被禁用的那一半里。不断重复此过程，直到找到引发问题的具体模组。
- **查看日志文件**：如果你有能力，可以自行查看游戏日志来定位问题。

**第三步：有效求助**
如果无法自行解决，你需要向社区求助。但请记住，一个有效的求助包含**完整的日志文件**。

**如何正确求助**：
1. 在游戏崩溃后，点击 HMCL 弹出的错误窗口上的「**导出游戏日志**」按钮，它会生成一个 `minecraft-exported-crash-info-时间戳.zip` 文件。
2. 带着**这个文件**去社区、论坛或群里提问，并具体描述你遇到的问题。

> **重要**：对于向他人求助，千万不要只截图，不要只说“游戏出错怎么办”这种及其笼统的话语。**没有日志，谁也帮不了你。**

![CrashReportPage](/assets/img/docs/auto-installing/Crash_Report_Page.png)


## 补充：常见模组加载器简单介绍和支持版本一览  

模组加载器简单介绍：  

| 模组加载器 | 简单介绍 |
| --------- | ------- |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/forge.png" alt="Forge icon" width="16"> Forge</span> | 老牌的模组加载器，功能强大，支持的模组众多，推荐在1.21之前安装。 |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/neoforge.png" alt="NeoForge icon" width="16"> NeoForge</span> | 1.20.1后Forge的继任者，推荐在1.21版本后安装NeoForge。 |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/fabric.png" alt="Fabric icon" width="16"> Fabric</span> | 轻型模组加载器，非常适合安装优化模组或纯净生存增强类模组。 |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/quilt.png" alt="Quilt icon" width="16"> Quilt</span> | Fabric的一个分支，同样轻量。 |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/fabric.png" alt="Fabric api icon" width="16"> Fabric API</span><br><span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/quilt.png" alt="QSL/QFAPI icon" width="16"> QSL/QFAPI</span> | 由于`Fabric`和`Quilt`比较轻功能有限，因此提供了增强功能的api，很多模组依赖于此api。 |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/cleanroom.png" alt="Cleanroom icon" width="16"> Cleanroom</span> | 1.12.2版本Forge的一个优化代替，提供了相对更强的功能，仅支持1.12.2。 |
| <span style="white-space: nowrap;"><img src="/assets/img/docs/auto-installing/chicken.png" alt="LiteLoader icon" width="16"> LiteLoader</span> | 轻量模组加载器，为Forge的轻量代替，现在已停止维护。 |


支持版本一览：  

| 模组加载器  | 最老版本| 最新版本    |
| ---------- | ------ | ------      |
| <img src="/assets/img/docs/auto-installing/forge.png" alt="Forge icon" width="16"> Forge      | 1.5.2  | 游戏最新版本 |
| <img src="/assets/img/docs/auto-installing/neoforge.png" alt="NeoForge icon" width="16"> NeoForge   | 1.20.1 | 游戏最新版本 |
| <img src="/assets/img/docs/auto-installing/fabric.png" alt="Fabric icon" width="16"> Fabric     | 1.16.3 | 游戏最新版本 |
| <img src="/assets/img/docs/auto-installing/fabric.png" alt="Fabric api icon" width="16"> Fabric api | 1.16.3 | 游戏最新版本 |
| <img src="/assets/img/docs/auto-installing/quilt.png" alt="Quilt icon" width="16"> Quilt        | 1.16.3 | 游戏最新版本 |
| <img src="/assets/img/docs/auto-installing/quilt.png" alt="QSL/QFAPI icon" width="16"> QSL/QFAPI  | 1.18.2 | 1.21        |
| <img src="/assets/img/docs/auto-installing/cleanroom.png" alt="Cleanroom icon" width="16"> Cleanroom  | 1.12.2 |             |
| <img src="/assets/img/docs/auto-installing/chicken.png" alt="LiteLoader icon" width="16"> LiteLoader | 1.5.2  | 1.12.2      |
---
title:  "自动安装与模组下载简介"
permalink: /launcher/auto-installing.html
date:   2025-09-21 13:56:00 +0800
categories: 启动器
toc: true
---

![Hits](https://hits.zkitefly.eu.org/?tag=https%3A%2F%2Fdocs.hmcl.net%2Flauncher%2Fauto-installing.html)

> 本文由 asdqp233 编写，Mine-diamond修改。

要为 Minecraft 安装模组，你首先需要安装一个“模组加载器”（例如 Forge 或 Fabric），然后再安装你想要的模组。HMCL 为这两个步骤都提供了强大的支持。

在安装前，最关键的一点是**兼容性**。请记住以下核心原则：

- 通常，你只能为单个游戏实例安装一种模组加载器。
- 你下载的**模组**，必须同时兼容你的**游戏版本**（如 1.20.4）和**模组加载器**（如 Fabric）。

简单来说，为游戏安装模组总共分三步，本指南将带你逐一完成：
1. 开启版本隔离，为模组创建一个独立干净的环境。
2. *安装模组加载器（如 Forge, Fabric）。
3. 安装你喜欢的模组。

## 启用版本隔离

在安装模组之前，强烈推荐开启版本隔离以隔离为不同实例安装的模组，见 [全局版本隔离](/launcher/global-version-isolation.html)

## 安装模组加载器  

### 模组加载器简介

首先，让我们先了解常见的模组加载器

`Forge`,`NeoForge`,`Fabric`,`Quilt`,`Cleanroom`,`LiteLoader` 是 6 个常见的 Mod 加载器。  
`Fabric API`,`QSL/QFAPI` 是两个随 `Fabric` 与 `Quilt` 的官方 API（实际是模组）。


下面是简单介绍：  


| 模组加载器                                                                                                                                            | 简单介绍                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------  |
| <img src="/assets/img/docs/auto-installing/forge@2x.png" alt="Forge icon" width="16"> Forge                                                          | 老牌的模组加载器，功能强大，支持的模组众多，推荐在1.21之前安装                                       |
| <img src="/assets/img/docs/auto-installing/neoforge@2x.png" alt="NeoForge icon" width="16"> NeoForge                                                 | 1.20.1后Forge的继任者，推荐在1.21版本后安装NeoForge                                               |
| <img src="/assets/img/docs/auto-installing/fabric@2x.png" alt="Fabric icon" width="16"> Fabric                                                       | 轻型模组加载器，非常适合安装优化模组或玩纯净生存增强类整合包。                                       |
| <img src="/assets/img/docs/auto-installing/quilt@2x.png" alt="Quilt icon" width="16"> Quilt                                                          | Fabric的一个分支，同样轻量                                                                       |
| <img src="/assets/img/docs/auto-installing/fabric@2x.png" alt="Fabric api icon" width="16"> Fabric API <br> <img src="/assets/img/docs/auto-installing/quilt@2x.png" alt="QSL/QFAPI icon" width="16"> QSL/QFAPI | 由于`Fabric`和`Quilt`比较轻功能有限，因此提供了增强功能的api，很多模组依赖于此api|
| <img src="/assets/img/docs/auto-installing/cleanroom@2x.png" alt="Cleanroom icon" width="16"> Cleanroom                                              | 1.12.2版本Forge的一个优化代替，提供了更强的功能，仅支持1.12.2 ，给在此版本游玩的玩家一个更好的选择。   |
| <img src="/assets/img/docs/auto-installing/chicken@2x.png" alt="LiteLoader icon" width="16"> LiteLoader                                              | 轻量模组加载器，为Forge的轻量代替，现在已停止维护                                                   |



支持版本：  

| 模组加载器  | 最老版本| 最新版本    |
| ---------- | ------ | ------      |
| Forge      | 1.5.2  | 游戏最新版本 |
| NeoForge   | 1.20.1 | 游戏最新版本 |
| Fabric     | 1.16.3 | 游戏最新版本 |
| Fabric api | 1.16.3 | 游戏最新版本 |
| Quilt      | 1.16.3 | 游戏最新版本 |
| QSL/QFAPI  | 1.18.2 | 1.21        |
| Cleanroom  | 1.12.2 |             |
| LiteLoader | 1.5.2  | 1.12.2      |


**兼容性：**
-  ***LiteLoader* 和 *Forge* 是兼容的 (*Forge* 较新版本和 *LiteLoader* 较老版本可能不兼容)，可以同时安装**  
-  **其它所有模组加载器几乎互不兼容，即你无法同时安装两个模组加载器**  

**补充：**  
非常多的 *Fabric Mod* 或 *Quilt Mod* 都需要 *Fabric API* 或 *QSL/QFAPI*作为前置模组。  
在安装 Mod 加载器时候如果没有其它原因，建议安装 *Fabric API* 或 *QSL/QFAPI* , 否则很多 *Fabric Mod* 或 *Quilt Mod* 则有可能无法被加载!

### 安装新实例时安装模组加载器

当你在安装新的游戏客户端时候, 会看到其中有该版本支持的模组加载器安装选项，点击你想安装的模组加载器，  

![AutoInstaller_ModLoader](/assets/img/docs/auto-installing/AutoInstaller_ModLoader.png)

进入任何选择版本页面后，若无特殊原因，建议选择最新正式版。  
如果你选择`Fabric`或`Quilt`，那么推荐同时安装`Fabric API`或`QSL/QFAPI`。  
选择完合适的Mod加载器之后就可以点击右下角的「安装」继续进行安装。  

### 为已安装的实例安装/重新安装模组加载器

如果你需要安装/更换/更新已安装实例的模组加载器。
在主页面点击「实例管理」，再点击对应实例。  
点击左侧「自动安装」选项，切换到自动切换选项卡。  

![Auto_Install_Page](/assets/img/docs/auto-installing/Auto_Install_Page.png)

如果你需要删除已安装的模组加载器，点击右边的「X」按钮以删除。  
如果需要升级版本，点击已安装过的模组加载器，选择更新的版本并安装即可。  
如果安装新模组加载器，先删除已安装的模组加载器，然后再点击对应的模组加载器，选择一个版本（推荐最新版）选择安装即可。    

自动安装页面不支持`Fabric API, QSL/QFAPI`的安装和更新，请按照普通模组的逻辑进行安装和更新。


## 安装 Mod

安装好加载器后，就可以开始添加模组了。你可以在下列网站获取模组信息，并在 HMCL 内下载和安装：
- [MC 百科](https://www.mcmod.cn/)
- [CurseForge](https://www.curseforge.com/minecraft/search?class=mc-mods)
- [Modrinth](https://modrinth.com/mods)

在安装任何模组前，请先确认三件事：
1.  **游戏版本**：模组是否支持你当前的游戏版本？(例如, 1.20.4)
2.  **加载器类型**：模组是给 Forge、Fabric 还是其它模组加载器用的？
3.  **前置模组**：模组是否需要其他模组作为前置？（模组页面通常会说明）

### 自动安装

你可以直接在 HMCL 内下载模组，HMCL 内置了 CurseForge 和 Modrinth 下载源的搜索和下载功能, 并支持中英文搜索 (匹配结果不一定准确) 。

- 点开 Mod 下载页面(下载 -> 模组), 输入你想要下载的模组名并点击搜索，如果不能搜到，请切换下载源，如果还是不可以，那就说明模组没有在支持的下载源上架。  
- 点击你想安装的模组，会进入下载页面，根据它显示支持的模组加载器和游戏版本选择你要安装的版本，点击该版本，  
- 点击安装到当前实例将会安装到当前实例（HMCL 主界面 左侧“实例管理”显示的实例或实例列表中选中的实例即为当前实例）  
- 点击下载到本地文件夹会弹出文件选择框选择下载的位置并将模组下载到该位置  
- 如果模组有前置模组，会显示所有前置的模组，点击前置模组进行安装，安装前置模组后再安装该模组。  

注：点击模组下载页面 上方的蓝色的链接可以到对应的网站查看模组的信息，这会告诉你模组的功能和有可能会提示你些什么注意事项

**注意: 请查看你要下载的模组是否正常你要安装的游戏版本以及模组加载器，否则模组无法被正常加载!**

![AddingModAutomatically](/assets/img/docs/auto-installing/AutoInstaller_ModAutoAdding.png)

### 安装OptiFine 或其它光影模组

跳转 [光影安装](/launcher/shader.html)

### 手动安装

当你在网站或其它位置手动下载了模组文件，你可以参照以下步骤完成安装：

一般的 Mod 文件后缀为 `jar` 或者 `litemod`，请确认后缀是正确的。其中`jar`为大多数模组加载器支持的格式，`litemod`仅`LiteLoader`支持。  

#### 通过 HMCL 模组管理页面安装
进入`实例列表 -> 具体实例 -> 模组管理`，点击「添加模组」并选择你的模组文件或直接将模组文件拖入启动器窗口完成安装。  

#### 通过模组文件夹安装

在 HMCL 内通过`实例管理 -> 浏览 -> 模组文件夹`打开模组文件夹，或手动进入`\.minecraft\mods`（仅未开启版本隔离）或`\.minecraft\versions\<版本名称>\mods`（仅已开启版本隔离），讲这个 jar 文件复制到该文件夹中即可(没有这个文件夹就自己新建一个) 。 

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

**第三步：寻求帮助**
- **正确地求助**：如果无法解决，请**导出完整的日志文件（点击崩溃页面的“导出游戏日志”按钮）**，然后**带着日志文件**去社区、论坛或群里求助。
> **切记**：千万不要只截图或说“出错了”。**请务必提供游戏日志**

> 导出日志方法：点击崩溃页面的“导出游戏日志”即可  
![CrashReportPage](/assets/img/docs/auto-installing/Crash_Report_Page.png)
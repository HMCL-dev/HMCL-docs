---
title:  "自动安装与模组下载简介"
permalink: /launcher/auto-installing.html
date:   2021-10-09 23:18:02 +0800
categories: 启动器
toc: true
---

> 本文由 asdqp233 编写。

## 安装 Mod 加载器

当你在安装新的游戏客户端时候, 会看到其中有 Forge, LiteLoader, Fabric, Quilt 这 4 个 Mod 加载器可供选择。

![AutoInstaller_ModLoader](/assets/img/docs/auto-installing/AutoInstaller_ModLoader.png)

当你使用 1.14 及以上的游戏版本时, 推荐使用 Fabric , 1.14 以下的版本推荐使用 Forge 。 LiteLoader 只适用于 1.12.2 及以前的版本 (目前已停更) 。

**注意: *LiteLoader* 和 *Forge* 是兼容的 ( *Forge* 较新版本和 *LiteLoader* 较老版本可能不兼容) , 但 *Fabric* 和 *Forge* 不兼容!**

选择完合适的Mod加载器之后就可以点击右下角的`安装`继续进行安装。

**注意: 如果选择 *Fabric* , 那么建议同时选择 *Fabric API***

## 安装 Mod

### 自动安装

#### Forge Mod

HMCL 内置了 CurseForge 和 Modrinth 下载源的搜索和下载功能, 目前已支持中文搜索 (匹配结果不一定准确) 。点开 Mod 下载页面, 最上方会显示当前 Mod 需要的前置 Mod (如果有) , 以及 Mod 支持的全部版本, 请根据你当前安装的游戏版本选择恰当的版本。

**注意: 请区分 *Forge Mod* 和 *Fabric Mod* , 大部分 Mod 在文件名中会注明, 请不要选择错误, 否则 Mod 将无法被正确加载。**

![AddingModAutomatically](/assets/img/docs/auto-installing/AutoInstaller_ModAutoAdding.png)

#### Fabric Mod

*Fabric Mod* 的安装和*Forge Mod*的安装类似, 参照上文。

**注意: 几乎所有的 *Fabric Mod* 都需要 *Fabric API* 。在安装 Mod 加载器时候如果没有选择, 请先安装 *Fabric API* (安装方法和普通 Mod 安装方法相同) , 否则 *Fabric Mod* 无法被加载!**

#### LiteLoader Mod

*LiteLoader Mod* 安装和 *Forge Mod* 的安装类似, 参照上文。

**注意: LiteLoader 只能加载文件后缀为 litemod 的模组, Forge Mod 修改后缀后 LiteLoader 无法检测。**

### 手动安装

一般的 Mod 文件后缀为 `jar` 或者 `liteMod` 。

将这个 jar 文件复制到 `\.minecraft\Mods` 文件夹中即可 (没有这个文件夹就自己新建一个) 。如果开启了版本隔离, 那么文件夹是`\.minecraft\version\<版本名称>\Mods`。

或者在 HMCL 的 `游戏管理页面—模组管理` 页面点击添加模组或直接将文件拖入启动器窗口。

![AddingModManually](assets/img/docs/auto-installing/AutoInstaller_ModManualAdding.png)

## 安装 Mod 后游戏报错/无法启动

造成游戏报错的原因有很多, 比如 Mod 之间不兼容, Fabric API 的版本过高, 缺少前置 Mod 等等。

1. 新版本的 HMCL 拥有错误分析功能, 可以根据HMCL的提示来排查原因。

2. 也可以使用二分法来解决——每次加入 / 删除一半的 Mod , 挨个排除, 直到找到导致游戏报错的 Mod 为止。

3. 如果你的能力很优秀, 也可以直接查看游戏日志来找出问题的原因。

4. 如果无法理解日志内容, 那么请将 `\.minecraft\crash-reports` 和 `\.minecraft\logs` 文件夹打包发给其他人寻求帮助。


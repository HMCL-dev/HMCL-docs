---
title: 光影
date: 2021-10-09 23:18:02 +0800
categories: 启动器
note: 本文由 hejiehao 修改。
hits: true
toc: true
---

## 安装 OptiFine

### 方式一: 全新安装

当你在安装新的游戏客户端时候，会看到有个 `OptiFine` 的选项。

![OptiFine_Install](/assets/img/docs/shader/optifine_install.png)

点开之后会看到有 3 个复选框，一般而言，`正式版` 会比 `测试版` 更加稳定。选择安装 `正式版` ，如果没有 `正式版` 那么再考虑 `测试版` 。

![OptiFine_Selection](/assets/img/docs/shader/select_optifine.png)

选择完合适的版本之后就可以点击右下角的`安装`继续进行安装。

### 方式二: 修改/升级已安装版本

在对应的游戏版本管理页面，点击 `自动安装` ，你会看到有个 `OptiFine` 的选项。

![OptiFine_AutoInstaller](/assets/img/docs/shader/install_auto-16338577874692.png)

点开之后选择合适的版本然后等待安装完成即可。
目前，如果要在  `Fabric` 使用 `OptiFine` ，需要通过 **方式四** 安装。

### 方式三：官网安装

在[ OptiFine 官网](https://optifine.net/downloads)上下载合适版本的 OptiFine (下载完应为 `OptiFine_<游戏版本>_<OptiFine版本>.jar` ) 。

双击打开或者使用 `java -jar 文件名` 的方式打开，然后你就会看到这个界面。

![Path_Selection](/assets/img/docs/shader/change_path.png)

选择自己游戏的 `.minecraft 目录`（默认安装到 `\AppData\Roaming\.minecraft` 目录下），然后点击 `Install` 按钮，之后你在 HMCL 的版本列表中就可以找到含有 OptiFine 名字的客户端，启动即可。

如果未找到，请确认你是否已安装对应的版本的客户端，且 **命名为对应版本号** 的原本游戏客户端。

### 方式四：OptiFine 与 Mod 加载器共存

从[ OptiFine 官网](https://www.optifine.net/)上下载的 Jar 文件本身也可作为 Mod 被加载，可以用 Java 运行下载的文件并导出 Mod 版本。Mod 安装具体方法见 [ Mod 安装教程](auto-installing.html)

注意：

1. Fabric 和 OptiFine 本身并不能共存，必须同时安装[ OptiFabric ](https://www.curseforge.com/minecraft/mc-mods/optifabric) (一个 Fabric Mod ) 。
  OptiFabric 目前 1.17 仅支持 `OptiFine HD U G9` ，`Fabric` 最高支持的版本为 `0.11.7` 。

2. Forge 和 OptiFine 会出现不兼容的情况，但大多数情况下，Forge 和 OptiFine 是相互支持的。在[ OptiFine 官网下载页面 ](https://optifine.net/downloads)可以查看OptiFine与Forge的兼容情况，位置见下图的红框位置。

![OptiFine_Compatibility](/assets/img/docs/shader/optifine_compatibility.png)

3. 若出现不兼容的情况，请使用[ OptiForge ](https://www.curseforge.com/minecraft/mc-mods/optiforge) (一个 Forge Mod ) 或者等待OptiFine兼容Forge解决。

## 安装Oculus（一个 Forge Mod）

在高版本的OptiFine中，OptiFine与mod的兼容性较差，以及对性能提升较小，所以可以安装Oculus，但Oculus与OptiFine不兼容，注意依赖关系，Oculus需要前置Rubidium

![Oculus](/assets/img/docs/shader/oculus.png)

相关链接：[ Oculus Curseforge ](https://www.curseforge.com/minecraft/mc-mods/oculus)，[ Oculus Modrinth ](https://modrinth.com/mod/oculus)，[ Rubidium Curseforge ](https://www.curseforge.com/minecraft/mc-mods/rubidium)，[ Rubidium Modrinth ](https://modrinth.com/mod/rubidium)

## 安装Iris Shaders（一个Fabric/Quilt Mod）

在Fabric中，也可以安装Iris Shaders来安装光影，注意依赖关系，Iris Shaders需要前置Sodium

![Iris](/assets/img/docs/shader/iris.png)

相关链接：[ Iris Shaders官网 ](https://irisshaders.dev/)，[ Iris Shaders Modrinth ](https://modrinth.com/mod/iris)，[ Iris Shaders Curseforge（不再更新，请到官网或Modrinth下载最新版本） ](https://www.curseforge.com/minecraft/mc-mods/irisshaders)，[ Sodium Modrinth ](https://modrinth.com/mod/sodium)，[ Sodium Curseforge（不再更新，请在Modrinth下载） ](https://www.curseforge.com/minecraft/mc-mods/sodium)

## 安装光影包

一般光影是一个 Zip 格式的文件，将光影文件放入 `\.minecraft\shaderpacks` 文件夹中即可 (没有这个文件夹就自己新建一个) 。如果开了版本隔离，那么文件夹是 `\.minecraft\version\<客户端名称>\shaderpacks`。若你不知道游戏文件夹在哪，在HMCL中打开游戏文件夹。

![Game_Dir](/assets/img/docs/shader/game_dir.png)

如果你不知道版本隔离是啥，也不会创建文件夹，那么请打开游戏，依次点击 `设置—视频设置—光影—光影包文件夹` ，在里面放入光影包，然后点击你要加载的光影，最后点击 `完成` 即可

![Shader_Settings](/assets/img/docs/shader/shaders_setting.png)

**注意：光影对于电脑配置的要求比较高，如果开了光影之后出现游戏画面很卡的情况，请升级电脑配置、使用低配置光影或者关闭光影。**

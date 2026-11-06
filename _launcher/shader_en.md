---
title: Shaders
excerpt: How to install shaders, including OptiFine, Oculus, and Iris Shaders
date: 2021-10-09 23:18:02 +0800
authors:
  - hejiehao
---

## Installing OptiFine

### Method 1: Fresh installation

When you install a new game client, you will see an `OptiFine` option.

![OptiFine_Install](/assets/img/docs/shader/optifine_install.png)

After expanding it, you will see 3 checkboxes. Generally speaking, `Release` versions are more stable than `Preview` versions. Choose to install a `Release` version, and only consider a `Preview` version if no `Release` version exists.

![OptiFine_Selection](/assets/img/docs/shader/select_optifine.png)

After choosing a suitable version, click `Install` in the lower right corner to continue the installation.

### Method 2: Modify/upgrade an installed version

On the management page for the corresponding game version, click `Automatic Installation`, and you will see an `OptiFine` option.

![OptiFine_AutoInstaller](/assets/img/docs/shader/install_auto.png)

After expanding it, choose a suitable version and wait for the installation to finish.
Currently, if you want to use `OptiFine` with `Fabric`, you need to install it via **Method 4**.

### Method 3: Installing from the official website

Download a suitable version of OptiFine from the [OptiFine official website](https://optifine.net/downloads) (the downloaded file should be `OptiFine_<game version>_<OptiFine version>.jar`).

Open it by double-clicking, or with `java -jar filename`, and you will see this interface.

![Path_Selection](/assets/img/docs/shader/change_path.png)

Select your game's `.minecraft directory` (by default it installs to the `\AppData\Roaming\.minecraft` directory), then click the `Install` button. After that, you can find a client whose name contains OptiFine in HMCL's version list; just launch it.

If you cannot find it, please confirm that you have installed the client for the corresponding version, and that the original game client is **named after the corresponding version number**.

### Method 4: OptiFine coexisting with a mod loader

The Jar file downloaded from the [OptiFine official website](https://www.optifine.net/) can itself be loaded as a mod. You can run the downloaded file with Java and export a mod version. For the specific method of installing mods, see the [Mod installation tutorial](/_launcher/auto-installing.md).

Notes:

1. Fabric and OptiFine themselves cannot coexist; you must also install [OptiFabric](https://www.curseforge.com/minecraft/mc-mods/optifabric) (a Fabric mod).
   For 1.17, OptiFabric currently only supports `OptiFine HD U G9`, and the highest `Fabric` version supported is `0.11.7`.

2. Forge and OptiFine can be incompatible, but in most cases Forge and OptiFine support each other. You can check OptiFine's compatibility with Forge on the [OptiFine official download page](https://optifine.net/downloads); the location is shown in the red box in the figure below.

![OptiFine_Compatibility](/assets/img/docs/shader/optifine_compatibility.png)

3. If incompatibility occurs, please use [OptiForge](https://www.curseforge.com/minecraft/mc-mods/optiforge) (a Forge mod) or wait for OptiFine to resolve its compatibility with Forge.

## Installing Oculus (a Forge mod)

In newer OptiFine versions, OptiFine has poor compatibility with mods and provides only a small performance improvement, so you can install Oculus instead. However, Oculus is incompatible with OptiFine, so pay attention to dependencies: Oculus requires Rubidium.

![Oculus](/assets/img/docs/shader/oculus.png)

Related links: [Oculus Curseforge](https://www.curseforge.com/minecraft/mc-mods/oculus), [Oculus Modrinth](https://modrinth.com/mod/oculus), [Rubidium Curseforge](https://www.curseforge.com/minecraft/mc-mods/rubidium), [Rubidium Modrinth](https://modrinth.com/mod/rubidium)

## Installing Iris Shaders (a Fabric/Quilt mod)

On Fabric, you can also install Iris Shaders to use shaders. Pay attention to dependencies: Iris Shaders requires Sodium.

![Iris](/assets/img/docs/shader/iris.png)

Related links: [Iris Shaders official website](https://irisshaders.dev/), [Iris Shaders Modrinth](https://modrinth.com/mod/iris), [Iris Shaders Curseforge (no longer updated, please download the latest version from the official website or Modrinth)](https://www.curseforge.com/minecraft/mc-mods/irisshaders), [Sodium Modrinth](https://modrinth.com/mod/sodium), [Sodium Curseforge (no longer updated, please download from Modrinth)](https://www.curseforge.com/minecraft/mc-mods/sodium)

## Installing shader packs

Generally, a shader is a Zip file. Just put the shader file into the `\.minecraft\shaderpacks` folder (create the folder yourself if it does not exist). If version isolation is enabled, the folder is `\.minecraft\version\<client name>\shaderpacks`. If you do not know where the game folder is, open the game folder in HMCL.

![Game_Dir](/assets/img/docs/shader/game_dir.png)

If you do not know what version isolation is and cannot create folders, then open the game and click `Settings — Video Settings — Shaders — Shader Packs Folder`, put the shader pack in there, then click the shader you want to load and finally click `Done`.

![Shader_Settings](/assets/img/docs/shader/shaders_setting.png)

**Note: shaders have relatively high requirements for computer hardware. If the game becomes very laggy after enabling shaders, please upgrade your computer, use a low-end shader, or disable shaders.**

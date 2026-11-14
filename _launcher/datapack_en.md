---
title: Datapack Creation Guide
excerpt: Create datapacks that can be imported by HMCL
date: 2021-08-22 23:18:02 +0800
author: huanghongxun
---

This guide only explains how to create a datapack archive that HMCL can import.

## Recommendation

It is always recommended that you create datapack archives in the multi-datapack format, because HMCL deletes datapacks with duplicate names. You can use this behavior to implement an update mechanism: simply import a new archive in the multi-datapack format, and the datapack you created is updated.

## Multi-datapack

If your datapack is split into multiple parts for players to enable or disable, or if it needs to bundle a resource pack, then you need to create an archive in the multi-datapack format.

An example of the multi-datapack file format (which can only be a single `.zip` file) is shown below:

```
crafting++.zip
\
* datapacks
  |\
  | * block_sky_domain (a valid datapack)
  | * crafting_machine
  | * craftingpp
  | * tradepp
  | * utilitypp
  |
* resources.zip (if your datapack needs to bundle textures)
  \
    * assets
      \
        * ...
```

Here, the file format under `datapacks` is the same as that of `.minecraft/saves/New World/datapacks`, so you can pack your local `datapacks` folder manually and then import it into HMCL directly. If you also need resource files, bundle them inside the archive.

In addition, the format of the `resources.zip` file is the same as that of `.minecraft/saves/New World/resources.zip`. When importing a datapack, the launcher merges the default resource pack bundled with the world with the resource pack bundled with your datapack; if there are duplicate files, the old files are overwritten. If your server uses a datapack that contains a resource pack, please perform this operation on the server, and players can then download the server resource pack.

## Single datapack

If your datapack does not need resource files, you can simply pack the `datapacks/<your datapack name>` folder and import it into HMCL directly.

An example of the single-datapack file format (which can only be a single `.zip` file) is shown below:

```
RealisticGlassPane.zip
\
* pack.mcmeta
* data
  \
    * some files
```

HMCL copies the datapack archive you packed directly into the datapacks folder without extracting it (because the vanilla game supports reading archives).

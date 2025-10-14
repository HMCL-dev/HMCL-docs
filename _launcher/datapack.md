---
title: 数据包制作指南
date: 2021-08-22 23:18:02 +0800
author: huanghongxun
hits: true
toc: true
---

本指南只介绍如何制作一个 HMCL 可导入的数据包压缩包。

## 建议

始终建议你使用多数据包格式制作数据包压缩包，因为 HMCL 会删除重名的数据包，因此可以借此完成更新功能，只要直接导入新的多数据包格式的压缩包就可以完成更新你制作的数据包。

## 多数据包

如果你的数据包被分离成多个部分供玩家选择是否启用，或者需要自带资源包，那么你需要制作多数据包格式的压缩包。

多数据包文件（只能是一个 `.zip` 文件）格式例子如下：
```
crafting++.zip
\
* datapacks
  |\
  | * block_sky_domain (一个合法的数据包)
  | * crafting_machine
  | * craftingpp
  | * tradepp
  | * utilitypp
  |
* resources.zip (如果你的数据包需要附带材质)
  \
    * assets
      \
        * ...
```

其中，`datapacks` 下的文件格式和 `.minecraft/saves/New World/datapacks` 的一样，因此可直接手动打包你本地的 `datapacks` 文件夹，
就可以直接导入 HMCL 了。如果还需要资源文件，请在压缩包内附带上。

此外，`resources.zip` 文件的格式和 `.minecraft/saves/New World/resources.zip` 的格式一样，
导入数据包时，启动器将会合并世界附带的默认资源包和你的数据包附带的资源包，如果有重复的文件，旧的文件将被覆盖。
如果你的服务器使用了包含资源包的数据包，那么请在服务器上完成这个操作，接着玩家下载服务器资源包即可。

## 单数据包
如果你的数据包不需要资源文件，那么你直接打包 `datapacks/<你的数据包名称>` 文件夹，即可直接导入 HMCL。

单数据包文件（只能是一个 `.zip` 文件）格式例子如下：
```
RealisticGlassPane.zip
\
* pack.mcmeta
* data
  \
    * 一些文件
```

HMCL 将会将你打包好的数据包压缩包直接复制到 datapacks 文件夹，不会解压（因为原版游戏支持读取压缩包）。
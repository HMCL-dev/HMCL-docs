---
title: 全局版本隔离
date: 2021-10-09T23:18:02+08:00
last_modified_at: 2025-12-03T14:31:42+08:00
author: LIPiston
redirect_from:
  - /launcher/global-version-isolation.html
---

请注意该方法会改变默认的游戏文件结构。

## 使用方式

进入 hmcl 的 `设置`

![](/assets/img/docs/isolation/img1.png)

在全局游戏设置中找到 `版本隔离` 并设置为 `各实例独立`

![](/assets/img/docs/isolation/img2.png)

这时候 minecraft 的文件结构就会有所改变，如下方

```plaintext
.minecraft
├── asstes
├── libraries
└── versions
    └── 1.16.5-optifine
        ├── 1.16.5-optifine.jar
        ├── saves
        ├── resourcepacks
        ├── logs
        ├── mods
        └── ...
```

并非在 .minecraft 文件夹中存储一切的 mod 和 资源包**而是各版本的资源互相独立**

这样你就可以在一个目录下，安装多个客户端

## 往后的使用

在做完版本隔离的设置后，hmcl 的快速打开各个游戏文件夹的功能就会显得十分好用。

![](/assets/img/docs/isolation/img3.png)

~~善用该功能也可为你的磁盘剩下不少的空间~~，现在反思过来其实都差不多

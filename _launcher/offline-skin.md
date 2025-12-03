---
title: 离线模式下更换皮肤
date: 2025-11-24 22:05:02 +0800
author: qiaoshouzi
contributors:
  - kitefly
  - TyMxy
---

# 离线模式下更换皮肤
**注意：**
> 1. 使用 默认、Steve、Alex、本地皮肤图片文件: 多人联机下其他玩家无法看到您的皮肤  
> 使用 LittleSkin、Blessing Skin 服务器: 多人联机下和您使用 **相同方式** 的玩家可以看到您的皮肤, 其他玩家不可以
>
> 2. 本文档在v3.4.208参考编写，有可能会的短时性的失效！

打开HMCL, 进入 **账号列表** , 点击下图离线账号的【上传皮肤】红框处:

![](/assets/img/docs/offline-skin/img1_1.png)

![](/assets/img/docs/offline-skin/img1_2.png)

> 默认: 使用默认随机的皮肤显示
>
> Steve: 使用Steve (史蒂夫) 皮肤显示
>
> Alex: 使用Alex (艾利克斯) 皮肤显示
>
> [本地皮肤图片文件](#本地皮肤图片文件)、[LittleSkin](#littleskin)、[Blessing Skin 服务器](#blessing-skin-服务器): 请见下文↓

## 本地皮肤图片文件

点击 **本地皮肤图片文件** , 设置 **皮肤/披风**皮肤图片 路径, 点击 **确认**, 即可

![](/assets/img/docs/offline-skin/img2.png)

## LittleSkin

首先您需要一个LittleSkin的账号, [注册](https://mcskin.littleservice.cn/auth/register)并[登录](https://mcskin.littleservice.cn/auth/login)

然后前往 [角色管理](https://mcskin.littleservice.cn/user/player), 查看您的角色名, 如果没有, 请点击 **添加新角色** 进行添加

你可在 [我的衣柜](https://mcskin.littleservice.cn/user/closet) 修改此账户名的皮肤与披风

![](/assets/img/docs/offline-skin/img3_1.png)

在HMCL中创建的离线账户的 账户名 **必须**和角色名相等, 如果不相等, 请 **重新在HMCL中创建离线账户**

![](/assets/img/docs/offline-skin/img3_2.png)

确认相等后, 点击 **LittleSkin** 即可同步在LittleSkin上此账户名的皮肤

![](/assets/img/docs/offline-skin/img3_3.png)

## Blessing Skin 服务器

**Blessing Skin 服务器, 进入 **角色管理** , 查看角色名 , 确认 **角色名** 和 **HMCL中创建的离线账号角色名** 相同, 如果不相等, **请重新在HMCL中创建离线账户**

你可在 我的衣柜 修改此账户名的皮肤与披风

![](/assets/img/docs/offline-skin/img4_1.png)

进入 **配置生成**, 按下图找到 `CustomSkinLoader` 中的网址, 复制到HMCL中即可同步在Blessing Skin 服务器上此账户名的皮肤

> 注意: **V3.4.205**需把链接末尾的 / 去掉, 这个BUG已经在**V3.4.206**修复

![](/assets/img/docs/offline-skin/img4_2.png)

![](/assets/img/docs/offline-skin/img4_3.png)

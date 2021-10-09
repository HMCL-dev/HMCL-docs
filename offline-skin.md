---
title:  "离线模式下更换皮肤"
permalink: /help/launcher/offline-skin.html
date:   2021-10-09 23:18:02 +0800
categories: HMCL
toc: true
---

> 本文由 kitefly 编写
> qiaoshouzi 对其进行了重写

# 离线模式下更换皮肤

> 1. 本文档仅适用于V3.4.205及以上版本, **不支持V3.3.188**, 请在 设置→通用→启动器更新 中选择 **测试版** 并升级到V3.4.205及以上版本
>
> 2. 使用 默认、Steve、Alex、本地皮肤图片文件: 多人联机下其他玩家无法看到您的皮肤  
> 使用 LittleSkin、Blessing Skin 服务器: 多人联机下和您使用**相同方式**的玩家可以看到您的皮肤, 其他玩家不可以

打开HMCL, 进入 **账号列表** , 点击如图红框处

![](/assets/img/docs/offline-skin/img1.png)

![](/assets/img/docs/offline-skin/img2.png)

> 默认: 使用默认随机的皮肤显示
>
> Steve: 使用Steve(史蒂夫)皮肤显示
>
> Alex: 使用Alex(艾利克斯)皮肤显示
>
> [本地皮肤图片文件](#本地皮肤图片文件)、[LittleSkin](#LittleSkin)、[Blessing Skin 服务器](#Blessing Skin 服务器): 见下面

## 本地皮肤图片文件

点击 **本地皮肤图片文件** , 设置 **皮肤/披风** 路径, 点击 **确认**, 即可

![](/assets/img/docs/offline-skin/img3.png)

## LittleSkin

首先您需要一个LittleSkin的账号, [登录](https://littleskin.cn/auth/login)|[注册](https://littleskin.cn/auth/register)

然后前往 [角色管理](https://littleskin.cn/user/player), 查看您的角色名, 如果没有, 请点击 **添加新角色** 进行添加

![](/assets/img/docs/offline-skin/img4.png)

在HMCL中创建的离线账户的 账户名 **必须 **和角色名相等, 如果不相等, 请 **重新在HMCL中创建离线账户**

![](/assets/img/docs/offline-skin/img5.png)

确认相等后, 点击 **LittleSkin** 即可

![](/assets/img/docs/offline-skin/img6.png)

## Blessing Skin 服务器

登录Blessing Skin 服务器, 进入 **角色管理** , 查看角色名 , 确认 **角色名** 和 **HMCL中创建的离线账号角色名** 相同, 如果不相等, 请 **重新在HMCL中创建离线账户**

![](/assets/img/docs/offline-skin/img7.png)

进入 **配置生成**, 按下图找到 `CustomSkinLoader` 中的网址, 复制到HMCL中即可

> 注意: **V3.4.205及以下**需要把末尾的 / 去掉, 这个BUG将会在**下个版本**修复

![](/assets/img/docs/offline-skin/img8.png)
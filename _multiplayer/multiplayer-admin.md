---
title: "使用管理员权限启动 HMCL"
permalink: /multiplayer/admin.html
date: 2022-09-15 23:18:02 +0800
categories: 多人联机
toc: true
---

> 本文由 Zkitefly 编写。

# 售后

[加入 官方交流QQ群 ，你所有的问题都可以在这里帮助你解答](/multiplayer/feedback.html)

# 多人联机教程

[多人联机教程](/multiplayer/help.html)

# 使用管理员权限启动 HMCL

_原因是 HiPer 的底层原理需要管理员权限_

以下分为两类平台，一般用户请观看 Windows 平台

## Windows 平台

只需右键 <HMCL.exe> 点击“以管理员身份运行”即可

![](/assets/img/docs/multiplayer/help/0.png)

若不想每次这样操作，只需右键点击属性，切换到上方的“兼容性”选项卡，并勾选“以管理员身份运行程序”，点击“确定”保存修改，之后正常打开即是管理员身份启动！

![](/assets/img/docs/multiplayer/help/00.png)

## 非 Windows 平台（Mac/Linux）

只需在启动命令前添加 `sudo` 指令，并输入用户密码（输入时不显示密码）回车即可

这里假设你的 HMCL 本体名称为`HMCL.jar`

这里默认你将所在的 HMCL 本体路径为：`~/`

一般正常的启动命令是

```
java -jar ~/HMCL.jar
```

那么在该命令前添加 `sudo` 指令即可
```
sudo java -jar ~/HMCL.jar
```




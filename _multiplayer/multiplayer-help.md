---
title:  "多人联机教程"
permalink: /multiplayer/help.html
date:   2022-09-17 11:00 +0800
categories: 多人联机
toc: true
---

> 本文由 Zkitefly 编写。

## 注意

请在使用多人联机模块之前您需要同意 [HMCL 用户协议](https://hmcl.huangyuhui.net/eula) 

HMCL 联机模块使用了第三方软件 HiPer

联机需要使用网络，请确保您的网络通畅。

请注意，**HMCL 只负责提供功能，在法律许可范围内，开发者不对本软件提供任何保证。用户使用本软件所造成的的风险均由用户自行承担。**

## 使用步骤

### 零、使用管理员权限启动 HMCL

*这一步的原因是 HiPer 的底层原理需要管理员权限*

以下分为两类平台，一般用户请选择 Windows 平台

#### Windows 平台

只需右键 HMCL.exe 点击“以管理员身份运行”即可

![只需右键 HMCL.exe 点击“以管理员身份运行”即可](/assets/img/docs/multiplayer/0.png)

若不想每次这样操作，只需右键点击属性，切换到上方到“兼容性”选项卡，并勾选“以管理员身份运行程序”

![若不想每次这样操作，只需右键点击属性，切换到上方到“兼容性”选项卡，并勾选“以管理员身份运行程序”](/assets/img/docs/multiplayer/1.png)

#### 非 Windows 平台

只需在启动命令前添加 `sudo` 指令，并输入用户密码（输入时不显示密码）回车即可

如正常的启动命令是

```
java -jar HMCL.jar
```

那么在该命令前添加 `sudo` 指令即可

```
sudo java -jar HMCl.jar
```

#### 一、申请并输入凭证，启动 HiPer

[申请凭证请前往此处获取](https://hmcl.huangyuhui.net/api/redirect/multiplayer-static-token)

*公众号中显示的“索引码”就是凭证*

获得后将凭证输入到平针输入框，并点击“启动 HiPer”

启动后你会看到该该页面

![启动 HiPer 效果图](/assets/img/docs/multiplayer/1.png)

### 创建方

#### 二、启动游戏

点击多人联机页面的“启动游戏”即可

#### 三、选择单人游戏模式进入一个存档

![单人世界](/assets/img/docs/multiplayer/help/2.png)

![选择存档](/assets/img/docs/multiplayer/help/3.png)

#### 四、对局域网开放

点击键盘上的 Esc 键，弹出游戏菜单   

点击“对局域网开放”，“创建一个局域网世界”

![对局域网开放](/assets/img/docs/multiplayer/help/4.png)

![创建一个局域网世界](/assets/img/docs/multiplayer/help/5.png)

此时你会在聊天框中显示开放端口

![开放端口](/assets/img/docs/multiplayer/help/6.png)

#### 五、输入端口，拷贝加入IP

将开放的端口输入至 端口号 输入框中，之后在点击拷贝，将其发送给参与者

![将开放的端口输入至 端口号 输入框中，之后在点击拷贝，将其发送给参与者](/assets/img/docs/multiplayer/help/7.png)

### 参与者

#### 二、启动游戏

点击多人联机页面的“启动游戏”即可

#### 三、选择多人游戏模式，选择添加服务器

点击“多人游戏”，“添加服务器”

游戏会要求你输入服务器地址，你只需要向创建方索要服务器地址并输入，并进入服务器即可。
![输入服务器地址](/assets/img/docs/multiplayer/help/8.png)

## 注意

1.一般情况下，参与者的游戏账户必须是** 微软账户 或 外置登录账户（如 Little Skin）**，否则加入失败，具体操作方法详见[此处](multiplayer/account.html)

2.一般情况下，参与者的游戏版本、模组要必须与创建方的一致，否则加入失败。

## 存在问题

**请到 [GitHub](https://github.com/huanghongxun/HMCL) 进行反馈！**

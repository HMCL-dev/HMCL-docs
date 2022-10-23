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

HMCL 联机模块使用了第三方软件 HiPer，所以您也需要同意 [用户协议与免责声明](https://hmcl.huangyuhui.net/api/redirect/multiplayer-agreement)。

你需要了解，HMCL 仅为 速聚 提供多人联机服务入口，使用中遇到的任何问题由 速聚 负责处理。您在使用多人联机服务过程中所遇到的任何问题与纠纷（包括其付费业务）均与 HMCL 无关，应与 速聚 协商解决。

联机需要使用网络，请确保您的网络通畅。

请注意，**HMCL 只负责提供功能，在法律许可范围内，开发者不对本软件提供任何保证。用户使用本软件所造成的的风险均由用户自行承担。**

The passages were written in Simplified Chinese. If you want to help translate them, please send a pull request on https://github.com/huanghongxun/HMCL-docs/pulls. Or you can enable your translation tool to read. 

## 售后

[**加入 官方交流QQ群 ，你所有的问题都可以在这里帮助你解答**](/multiplayer/feedback.html)

## 使用步骤

### 一、申请并输入索引码，启动 HiPer

**注意：创建方 和 参与者都要做的**

[申请索引码请前往此处获取](https://hmcl.huangyuhui.net/api/redirect/multiplayer-static-token)

获得后将索引码输入到 索引码 输入框，并点击“启动 HiPer”

**索引码需一人一码（各自不同的），因为索引码代表一个网络IP，若一个设备已经用了这个IP，网络已经有了这个IP，那么其他设备就不能用这个IP，因为他已经被占用了。如果你的朋友需要，强烈建议让你的朋友自己获取，而不是帮他获取，因为每天第二次获取授权会变得更贵，[详情](/multiplayer/token.html##%E5%90%8E%E7%BB%AD%E8%8E%B7%E5%8F%96%E7%B4%A2%E5%BC%95%E7%A0%81)**

启动后你会看到该页面：

![启动 HiPer 效果图](/assets/img/docs/multiplayer/help/1.png)

**接下来分为[创建方](#创建方)和[参与者](#参与者)**

### 创建方

#### 二、启动游戏

点击多人联机页面的“启动游戏”即可

*注：使用其他的启动器启动游戏也是可以的*

#### 三、选择单人游戏模式进入一个存档

![单人世界](/assets/img/docs/multiplayer/help/2.png)

![选择存档](/assets/img/docs/multiplayer/help/3.png)

#### 四、对局域网开放

点击键盘上的 Esc 键，弹出游戏菜单   

点击“对局域网开放”，“创建一个局域网世界”

![对局域网开放](/assets/img/docs/multiplayer/help/4.png)

![创建一个局域网世界](/assets/img/docs/multiplayer/help/5.png)

此时你会在聊天框中看到游戏开放的端口

![开放端口](/assets/img/docs/multiplayer/help/6.png)

#### 五、输入游戏开放端口，拷贝加入IP，并发送给参与者

将开放的端口输入至 端口号 输入框中，之后在点击拷贝，将其发送给参与者

![将开放的端口输入至 端口号 输入框中，之后在点击拷贝，将其发送给参与者](/assets/img/docs/multiplayer/help/7.png)



### 参与者

#### 二、启动游戏

点击多人联机页面的“启动游戏”即可

*注：使用其他的启动器启动游戏也是可以的*

#### 三、选择多人游戏模式，选择添加服务器

点击“多人游戏”，“添加服务器”

游戏会要求你输入服务器地址，你只需要向创建方索要服务器地址并输入，并进入服务器即可。
![输入服务器地址](/assets/img/docs/multiplayer/help/8.png)

## 注意

1.一般情况下，参与者的游戏账户必须是 微软账户 或 [外置登录账户（如 Little Skin）](/multiplayer/account.html)，否则你需要将服务器地址输入至下方的输入框中并点击“加入”，在游戏中选择多人游戏模式，进入局域网世界方可加入！

![](/assets/img/docs/multiplayer/help/9.png)

2.一般情况下，参与者的游戏版本、模组要必须与创建方的一致，否则加入失败。

3.[若遇到问题，可以加入 官方交流QQ群（HiPer）获得帮助](/multiplayer/feedback.html)

## 常见问题

### 1.显示连接终止怎么办

请回到 HMCL 多人联机页面，将“创建服务器地址”一行点击 退出 ，并再次点击 加入 ，然后回到游戏进行加入

### 2.加入世界后掉入虚空，然后显示连接终止怎么办

请[关闭防火墙](#3如何关闭防火墙)，然后回到HMCL多人联机页面，将“创建服务器地址”一行点击 退出，并再次点击 加入，然后回到游戏进行加入

### 3.如何关闭防火墙

#### 自动关闭

[_点击此处在右侧点击 下载 并运行该脚本即可_](https://gitcode.net/chearlai/f/-/blob/master/%E5%85%B3%E9%97%AD%E9%98%B2%E7%81%AB%E5%A2%99%E8%84%9A%E6%9C%AC.bat)

#### 手动关闭

[_请点击此处查看相关文章进行关闭_](https://cn.bing.com/search?q=%E5%85%B3%E9%97%AD%E9%98%B2%E7%81%AB%E5%A2%99+Microsoft)

### 4.HiPer意外退出出/无法创建网络

![](/assets/img/docs/multiplayer/help/10.png)

![](/assets/img/docs/multiplayer/help/11.png)

有以下可能：

- 启动器获取管理员权限失败（需要手动以管理员身份启动HMCL）
- 有杀毒软件拦截 HiPer
- 索引码过期，或输错了

无上述可能，请尝试[下载](https://gitcode.net/chearlai/f/-/blob/master/%E5%87%BA%E7%8E%B0_HiPer%E6%97%A0%E6%B3%95%E5%88%9B%E5%BB%BA%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87_%E5%8F%AF%E8%83%BD%E6%98%AFHiPer%E5%B7%B2%E7%BB%8F%E5%90%AF%E5%8A%A8%E6%88%96%E7%BC%BA%E5%B0%91%E7%AE%A1%E7%90%86%E5%91%98%E6%9D%83%E9%99%90_%E8%AF%B7%E5%8F%8C%E5%87%BB%E6%88%91_.bat)该脚本，并运行，然后回到 HMCL 再试

### 5.游戏加入失败，显示：Connection timed out: no further information

![](/assets/img/docs/multiplayer/help/12.png)

双方[关闭防火墙](#3如何关闭防火墙)
如果尝试无效，请尝试通知创建方重新启动 HiPer

### 6.游戏加入失败，显示：登录失败:无效会话(请尝试重启游戏及启动器) | 无效的个人信息公钥签名。请尝试重启游戏。

![](/assets/img/docs/multiplayer/help/13.png)

![](/assets/img/docs/multiplayer/help/14.png)


一般情况下，参与者的游戏账户必须是 微软账户 或 外置登录账户（如 Little Skin），否则你需要将服务器地址输入至下方的输入框中并点击“加入”，在游戏中选择多人游戏模式，进入局域网世界方可加入！

![](/assets/img/docs/multiplayer/help/9.png)

### 7.公众号相关问题

[请移步至此处](/multiplayer/token.html#%E5%85%AC%E4%BC%97%E5%8F%B7%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98)

### 更多

[请移步至此处](https://shimo.im/docs/5rk9dplRrYuYXjqx#anchor-fZRj)


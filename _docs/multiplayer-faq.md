# ![](icon.png)**HMCL 多人联机常见问题**

> 本篇文章由 Zkitefly 编写。

# **必读**

- **[Github](https://zkitefly.github.io/hmcld/multiplayer-faq.html)** · **[Gitee](https://gitee.com/bleaker/hmcld/blob/master/multiplayer-faq.md)**

- 本文档将定时收集HMCL 多人联机常见问题与回答，若你在这里没有发现你想要的回答，欢迎前往 [此视频 ](https://www.bilibili.com/video/BV1g3411Y7rC)下的评论区进行提问，我会定期前往回答，然后将问题上传至此，也欢迎加入 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 进行问题讨论！

- 你可以使用`Ctrl+f`来方便查找你的答案

- **在阅读本文章前，请先确认 HMCL 版本是否为开发版 <img src="https://img.shields.io/maven-central/v/org.glavo.hmcl/hmcl-dev?label" style="zoom: 130%;" />，若不是，请在 [此处](https://gitee.com/Glavo/HMCL-Update/blob/main/README.md#%E6%B5%8B%E8%AF%95%E7%89%88-)下载他。**

- 如果你想为此文档做贡献，你可以在 [**Github**]() 提交 Pull requests 。其中，图片要存放在 Github 仓库中的 `/assets/img/docs/multiplayer-faq` 目录中

- **在 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 提问本文章没有的问题时，为了更快的解决问题，请提供以下必要信息：**

> ***你所使用的 cato 渠道是 HMCL吗？***
>
> ***你所使用的 HMCL 版本？***
>
> ***你是在此问题发生前进行了哪些操作？***
>
> ***你认为大概是什么问题，***
>
> ***你是否已经阅读过本文档，并按文档内容尝试解决？（是/否）***

## **1 多人联机会话意外退出，退出码 2**

### 问题

在使用多人联机时出现下面图片问题↓

![](/assets/img/docs/multiplayer-faq/1.png)

### 回答

**请确认 HMCL 版本是否为开发版  <img src="https://img.shields.io/maven-central/v/org.glavo.hmcl/hmcl-dev?label" style="zoom: 130%;" />，若不是，请在 [此处](https://gitee.com/Glavo/HMCL-Update/blob/main/README.md#%E6%B5%8B%E8%AF%95%E7%89%88-)下载他。**

## **2 无法连接多人联机服务，你可以在多人联机页面的反馈中反馈问题**

### 问题

在使用多人联机时出现下面图片问题↓

![](/assets/img/docs/multiplayer-faq/2.png)

### 回答

**请检查 HMCL 检测出来的 NAT 类型不是 差或极差 ，因为可能就是因为他而无法进行联机。**

> ***在 NAT 类型为 极差 环境下你可能无法进行联机***
>
> ***在 NAT 类型为 差 下你大概率无法创建房间，但你能进入 NAT 类型为 好 的房间***

**有关 如何改善 NAT 类型为差的网络？ 您可以参考这篇文章[如何改善 NAT 类型为差的网络？](https://zkitefly.github.io/hmcld/help/launcher/multiplayer-symmetric.html)** *（若访问困难，可访问[此链接](https://gitee.com/bleaker/hmcld/blob/master/multiplayer-symmetric.md)*）

------

**可能是你当前使用 HMCL 多人联机的人数过多，公共鉴权服务器没有足够的资源来使用联机，你可以尝试等待每个整点或半点，服务器会自动刷新一次或尝试询问 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 中的群主或管理员鉴权服务器是否正常工作**

------

**你可以尝试使用凭证开启桥接服务获得稳定体验**  （[**获得凭证的方法**](#10-如何获得凭证)）

## **3 加入房间失败，无法与对方建立链接**

### 问题

在对方加入房间时出现下面图片问题↓

![](/assets/img/docs/multiplayer-faq/3.jpg)

### 回答

**请检查房主和你的HMCL版本是否一致,且版本是否为开发版**<img src="https://img.shields.io/maven-central/v/org.glavo.hmcl/hmcl-dev?label" style="zoom: 130%;" />

------

**请检查 HMCL检测出来的 NAT 类型不是 差或极差 ，因为可能就是因为他而无法进行联机。**

> ***在 NAT 类型为 极差 环境下你可能无法进行联机***
>
> ***在 NAT 类型为 差 下你大概率无法创建房间，但你能进入 NAT 类型为 好 的房间***

**有关如何改善 NAT 类型为差的网络？ 您可以参考这篇文章[如何改善 NAT 类型为差的网络？](https://zkitefly.github.io/hmcld/help/launcher/multiplayer-symmetric.html)** *（若访问困难，可访问[此链接](https://gitee.com/bleaker/hmcld/blob/master/multiplayer-symmetric.md)*

------

**可能是你当前使用 HMCL 多人联机的人数过多，公共鉴权服务器没有足够的资源来使用联机，你可以尝试等待每个整点或半点，服务器会自动刷新一次，或尝试询问 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 中的群主或管理员鉴权服务器是否正常工作**

------

**一般要是过了整点或半点的房间都加入不了，你可以叫房主到了时间的时候重新创建房间，或使用凭证开启桥接模式获得稳定不断线的服务**

------

**你可以尝试使用凭证开启桥接服务获得稳定体验**  （[**获得凭证的方法**](#10-如何获得凭证)）

（*温馨提示：凭证里填写的是密钥，而不是序列号*）

## **4 安装失败，部分文件无法下载**

### 问题

进入 HMCL 多人联机页面时出现下方图片问题↓

![](/assets/img/docs/multiplayer-faq/4.png)

### 回答

**请确认 HMCL 版本是否为开发版 <img src="https://img.shields.io/maven-central/v/org.glavo.hmcl/hmcl-dev?label" style="zoom: 130%;" />，若不是，请在 [此处](https://gitee.com/Glavo/HMCL-Update/blob/main/README.md#%E6%B5%8B%E8%AF%95%E7%89%88-)下载他**

------

**请检查你的电脑是否能正常上网、关闭防火墙、关闭杀毒软件或添加 cato （HMCL多人联机核心）程序为白名单**

**（一般这种问题应该是下载 cato 的服务器出现了一些问题，这种问题应该不会持续太久）**

## **5  找不到 cato 程序**

### 问题

在创建房间时发生如下图片问题↓

![](/assets/img/docs/multiplayer-faq/5.png)

### 回答

**请关闭 HMCL ，然后再次启动，此时你进入多人联机页面就会下载  cato （HMCL多人联机核心）程序了**

------

**若不行，请检查你正在使用的杀毒软件是否将 cato 程序拦截，如果是，请关闭他或将 cato 程序加入白名单**

## **6 创建联机房间失败，你的凭证可能无法正常工作，你可以使用空凭证再试**

### 问题

使用凭证开启桥接服务，然后创建房间时发生下方图片问题↓

![](/assets/img/docs/multiplayer-faq/6.png)

### 回答

**我们最近收到很多这样的问题，也许是 HMCL 的一些问题所导致，并不是 cato 的问题，房主和加入方可以尝试重启 HMCL 再尝试使用。**

------

**请检查 HMCL 版本是否为开发版<img src="https://img.shields.io/maven-central/v/org.glavo.hmcl/hmcl-dev?label" style="zoom: 130%;" />**

**请检查你与房主的 HMCL 版本是否一致**

**请检查你的凭证是否填写错误**

**请检查你正在使用的凭证是否处于有效期内**

------

**请询问 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 中的群主或管理员鉴权服务器是否正常工作，或者耐心等待十分钟。**

（*温馨提示：凭证里填写的是密钥，而不是序列号*）

## 7 **无法检测游戏端口号，你必须先启动游戏并在游戏内打开对局域网开放选项后才能启动联机**

### 问题

创建房间时检测不到游戏端口，上面的小横条一直在动，如图↓

![](/assets/img/docs/multiplayer-faq/7.png)

![](/assets/img/docs/multiplayer-faq/8.png)

### 回答

*目前我们并不知道具体有效的修复方法（如果你知道，欢迎提交 Pull requests 来完善本文章，或者加入 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 与我们进行讨论）*

------

**请检查是否开启游戏中的 对局域网开放 选项**

**你可以尝试重启一下电脑？**

**你可以尝试重新安装你的 Java ，或使用不同的 Java 来启动 HMCL 和游戏（建议安装[Liberica JDK](https://bell-sw.com/pages/downloads/)）**

## 8 **是否允许使用离线账号的玩家创建或加入房间**

### 问题

因为我和我的朋友没有正版账号与外置登录账号（authlib-injector），所以使用离线账号来进行创建或加入房间，是否允许？

### 回答

**允许，你和你的朋友可以使用离线账号来进行创建或加入房间**

> **房主允许使用离线账号、正版账号和外置登录账号（authlib-injector）进行创建房间操作**
>
> **加入方允许使用离线账号、正版账号和外置登录账号（authlib-injector）进行加入房间操作**

**注：加入方若使用离线账号，那么必须点击如在下方图片↓显示的 HMCL 多人联机房间按钮进入！否则无法进入**

![](/assets/img/docs/multiplayer-faq/9.jpg)

## 9 **在与他人联机时总是在每个整点或半点断开连接**

### 问题

在与他人联机时总是在每个整点或半点断开连接，如图↓

![](/assets/img/docs/multiplayer-faq/10.png)

### 回答

**此行为是正常现象，因为鉴权服务器在每个整点或半点自动刷新一次，导致你被中断连接，重新创建房间即可**

**若忍受不了每个整点或半点断开连接，你可以考虑申请凭证开启桥接服务**（[**获得凭证的方法**](#10-如何获得凭证)）

## 10 **如何获得凭证**

### 问题

因为某些原因，需要使用凭证。但不知道在哪里购买凭证

### 回答

> **在[Cato快速入门体验包](https://noin.cn/shop/646.html?ref=azAtwBwzp)中往下滑，以游客身份购买，并按照提示获取到社区邀请码注册社区帐号（拥有了社区帐号则无需购买），然后在[此处](https://noin.cn/shop/exchange?ref=azAtwBwzp)以积分的方式购买'月度凭证'或'单日凭证'（积分在刚刚都购买中包含积分、每日签到获得积分、在[此处](https://noin.cn/gold/credit?ref=azAtwBwzp)购买获得 等等......）** *（温馨提示：凭证里填写的是密钥，而不是序列号）*
>
> **加入 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) ，然后在群聊中询问获得凭证**

**注意事项**

**房主和加入方必须使用凭证联机（因为凭证网络与非凭证网路是不互通的），且一个人只能使用一个凭证**

**若出现使用凭证的情况下仍然无法使用，请查阅此问题->** [**6 创建联机房间失败，你的凭证可能无法正常工作，你可以使用空凭证再试**](#6-创建联机房间失败你的凭证可能无法正常工作你可以使用空凭证再试)

**请确保房主和加入方的 HMCL 版本是相同的！**

## 11 **什么是凭证**

### 问题

什么是凭证呀

### 回答

**有关此问题，请查阅[此链接](http://101.43.107.234/qifei/hmcl.html#%E5%87%AD%E8%AF%81)**

## 12 **如何使用 HMCL 多人联机**

### 问题

第一次使用 HMCL 多人联机，不清楚该如何使用

### 回答

**有关此问题，请查阅**[**此文章**](https://zkitefly.github.io/hmcld/help/launcher/multiplayer/help.html)

## 13 **HMCL检测 NAT 类型时提示失败怎么办**

### 问题

在正常进入多人联机页面，然后 HMCL 照常检测 NAT 类型，结果提示检测失败，这样该怎么办

### 回答

**无论失败与否，请以实际表现为准！！！**

> **若提示检测失败，但仍旧可以正常联机功能，请忽略此提示，正常使用即可**
>
> **若提示检测失败，且无法进行使用联机功能，建议阅读此文章 [如何改善 NAT 类型为差的网络？](https://zkitefly.github.io/hmcld/help/launcher/multiplayer-symmetric.html) *（若访问困难，可访问[此链接](https://gitee.com/bleaker/hmcld/blob/master/multiplayer-symmetric.md)*）， 或使用凭证开启桥接模式，因为桥接模式不受 NAT 类型的影响**（[**获得凭证的方法**](#10-如何获得凭证)）

**若使用凭证仍旧无法解决，请加入 [QQ群：212927890](https://jq.qq.com/?_wv=1027&k=N4mHT9FD) 获得帮助**

## 14 **若房主使用带有 Mod 的客户端创建房间，那加入方是否需要房主客户端的 Mod**

### 问题

有一天，我想与我的朋友一起玩 XXX Mod（模组），于是我（房主）用带有 XXX Mod 的客户端创建房间，但请问加入方是否也需要带有 XXX Mod 的客户端加入房间？

### 回答

**需要，请确保加入方的客户端与房主的客户端保持一致，且若房主的客户端安装了 Mod ，那加入方的客户端也必须拥有房主客户端中的 Mod！**


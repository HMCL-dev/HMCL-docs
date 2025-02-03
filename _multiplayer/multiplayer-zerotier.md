---
title:  "使用 ZeroTier 远程联机"
permalink: /multiplayer/zerotier.html
date:   2022-11-20 09:02:00 +0800
categories: 多人联机
toc: true
---

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdocs.hmcl.net%2Fmultiplayer%2Fzerotier.html&count_bg=%233E4245&title_bg=%233E4245&icon=&icon_color=%23E7E7E7&title=%F0%9F%91%80&edge_flat=false)

# 开头

- 本篇教程不依赖启动器，也不代表 HMCL 的观点，仅供参考。

- 本教程使用 [ZeroTier](https://www.zerotier.com/) 进行远程联机（即不在同一局域网的联机），**如果玩家是同一局域网联机，可以不需要本教程**；

- **本教程默认玩家的设备系统为 Windows**，但 macOS、Linux 甚至 Android 系统也是可以适用与本教程的；

- [ZeroTier](https://www.zerotier.com/) 允许一个账户同时链接 10 个设备链接，也就是说**一个世界只能 10 个人链接**，这对于只是想和几个朋友一起联机的人来说就非常适合本教程，**但如果是要开服或者很多人来加入游戏的，不建议使用本教程。**

# 教程

下面会分为 房主 和 加入方 两个角色进行操作。

## 房主

### 第一步：下载并安装 ZeroTier

[点击此处](https://download.zerotier.com/dist/ZeroTier%20One.msi) 下载 ZeroTier 安装程序。

注意，**如果你的系统是 Windows 7，不能使用上面的版本**，而是使用 1.6.6 版本的安装程序（[点击此处](https://download.zerotier.com/RELEASES/1.6.6/dist/ZeroTier%20One.msi) 下载）

然后打开下载目录，找到刚刚下载的安装程序打开安装即可。

## 第二步：注册并登录 ZeroTier 账号

*****这一步骤只需 房主 操作*****

[点击此处](https://my.zerotier.com/login) 打开登录页面，点击下方的 `Sign Up` 按钮转到注册页面，并根据页面提示填写信息注册账号。

可使用 邮箱+密码、Google 账户、GitHub 账户或 Microsoft 账户进行注册。

注册完后会自动登录。

## 第三步：创建网络并复制网络 ID 和修改访问权限

[点击此处](https://my.zerotier.com/) 打开网络设置页面，点击 `Create A Network` 按钮，页面会出现一个如图的网络

![1](https://vip.123pan.cn/1821946486/yk6baz03t0m000d6xujocxp3hsgy63eaDIYvDIrxAqF1ApxPAdJ2.png)

点击进入该网络，复制如图所示的 `Network ID`，**此网络 ID 需要 房主 和 加入方 知晓。**

![2](https://vip.123pan.cn/1821946486/yk6baz03t0n000d6xujp02fha3wkj523DIYvDIrxAqF1ApxPAdJ2.png)

向下滑，找到如图所示的页面，选择 `Public` 选项。

![3](https://vip.123pan.cn/1821946486/yk6baz03t0l000d6xujntz15i51bwm71DIYvDIrxAqF1ApxPAdJ2.png)

## 第四部：加入网络

打开 开始 菜单，找到 ZeroTier 程序并打开

![4](https://vip.123pan.cn/1821946486/yk6baz03t0n000d6xujp02fi3swkk5i1DIYvDIrxAqF1ApxPAdJ2.png)

然后 ZeroTier 出现在状态栏中，右键 ZeroTier，点击 `Join New Network...`

![5](https://vip.123pan.cn/1821946486/ymjew503t0n000d6xuk03nfwu7wdcxmlDIYvDIrxAqF1ApxPAdJ2.png)

在弹出的窗口中，粘贴网络 ID，并点击 `Join` 加入网络。

![6](https://vip.123pan.cn/1821946486/yk6baz03t0m000d6xujocxp5ycgy9w8tDIYvDIrxAqF1ApxPAdJ2.png)

此时系统会提示如图所示的内容，点击 `是` 即可。

![7](https://vip.123pan.cn/1821946486/ymjew503t0l000d6xujz7kfg9t14m2lmDIYvDIrxAqF1ApxPAdJ2.png)

## 第六步：获取网络 IP 并组合成联机地址

右键 ZeroTier，点击如图所示选择该网络给你分配的 IP，保留备用

![8](https://vip.123pan.cn/1821946486/yk6baz03t0n000d6xujp02fkj3wkn3p9DIYvDIrxAqF1ApxPAdJ2.png)

然后启动游戏并进入世界，按 ESC 键返回游戏菜单，点击 `对局域网开放` - `创建局域网世界`，然后记录端口号

![9](https://vip.123pan.cn/1821946486/ymjew503t0m000d6xujznsbi4dgr2f5pDIYvDIrxAqF1ApxPAdJ2.png)

然后根据 `网络 IP` + `:` + `端口号` 组合成联机地址，例如 `172.23.153.193:54548`，**将联机地址告诉加入方。**

![10](https://vip.123pan.cn/1821946486/yk6baz03t0m000d6xujocxp8eogyc2gaDIYvDIrxAqF1ApxPAdJ2.png)

## 加入方

### 第一步：下载并安装 ZeroTier

[点击此处](https://download.zerotier.com/dist/ZeroTier%20One.msi) 下载 ZeroTier 安装程序。

注意，**如果你的系统是 Windows 7，不能使用上面的版本**，而是使用 1.6.6 版本的安装程序（[点击此处](https://download.zerotier.com/RELEASES/1.6.6/dist/ZeroTier%20One.msi) 下载）

然后打开下载目录，找到刚刚下载的安装程序打开安装即可。

## 第二部：加入网络

打开 开始 菜单，找到 ZeroTier 程序并打开

![4](https://vip.123pan.cn/1821946486/yk6baz03t0n000d6xujp02fi3swkk5i1DIYvDIrxAqF1ApxPAdJ2.png)

然后 ZeroTier 出现在状态栏中，右键 ZeroTier，点击 `Join New Network...`

![5](https://vip.123pan.cn/1821946486/ymjew503t0n000d6xuk03nfwu7wdcxmlDIYvDIrxAqF1ApxPAdJ2.png)

在弹出的窗口中，粘贴网络 ID，并点击 `Join` 加入网络。

![6](https://vip.123pan.cn/1821946486/yk6baz03t0m000d6xujocxp5ycgy9w8tDIYvDIrxAqF1ApxPAdJ2.png)

此时系统会提示如图所示的内容，点击 `是` 即可。

![7](https://vip.123pan.cn/1821946486/ymjew503t0l000d6xujz7kfg9t14m2lmDIYvDIrxAqF1ApxPAdJ2.png)

## 第三步：进入游戏

启动与房主相同版本的游戏（若安装了模组，则模组也要一致），进入 多人游戏 - 直接连接，粘贴房主发你的联机地址并加入。

至此就已经成功啦~

![11](https://vip.123pan.cn/1821946486/yk6baz03t0l000d6xujntz17ae1c0y5fDIYvDIrxAqF1ApxPAdJ2.png)

# 常见问题

1.若 加入方 在加入世界时遇到如下信息该如何处理

```text
io.netty.channel.abstractchannel&amp;AnnotatedConnectException:Connection refused: no further information:
```

```text
Conneotion timed out: no further information
```

答：检查 网络 IP 或（和）端口号 是否错误，检查网络是否连接正常。

2.若 加入方 在加入世界时遇到如下信息该如何处理

```
登录失败：无效会话（请尝试重启游戏及启动器）
```

答：此问题是加入方验证账户验证不通过导致，可通过两种方法解决

①：在 第六步 启动游戏前，房主 安装 [[LSP]自定义局域网联机Lan Server Properties](https://www.mcmod.cn/class/2754.html)，在 创建局域网世界 前将 `在线模式` 调整为 关 即可。

②：在 第七步 启动游戏前，加入方 选择 第三方账户登录（authlib-injecter） 或已购买 Java 版 Minecraft 的 Microsoft 账户进行启动即可。


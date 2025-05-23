---
title:  "使用HMCL启动器配置服务器客户端自动更新"
permalink: /modpack/serverpack2.html
date:   2021-08-22 23:18:02 +0800
categories: 整合包
toc: true
---

![Hits](https://hits.zkitefly.eu.org/?tag=https%3A%2F%2Fdocs.hmcl.net%2Fmodpack%2Fserverpack2.html)

## 备注

> 文章原作者：[hy黑影](https://www.mcbbs.net/home.php?mod=space&uid=3051111)
> 转载：Zkitfly
> 部分内容进行了稍作打磨
> 本教程转载至[https://www.mcbbs.net/thread-1103864-1-1.html?action=printable](https://www.mcbbs.net/thread-1103864-1-1.html?action=printable)

## **前言**

- 我自己开设的服务器有很多不同的子服，每个子服的客户端版本呢都不相同，我又希望能整合到一个客户端里面；找了一圈发现那些辅助更新程序只能更新单个客户端版本，而且界面不太美观；甚至一度想自己开发启动器.........
- 这篇帖子的灵感来自于 **HMCL** 启动器的一个功能 **导出服务器自动更新整合包**，我觉得可以利用这个功能来代替一些自动更新的辅助程序。
- 整个功能的实现需要：**一台有公网IP的服务器、一个客户端整合包、HMCL启动器**；如果你都没有，那就换成RMB10元
- 本篇教程默认读者为 萌新，即**没有接触过HTTP服务器，网络应用开发，不懂linux系统，惧怕控制台程序**

## **教程**

### **第一步-租服务器（▲如果你有公网IP的服务器，请跳过这一步）**

- 百度搜索 [腾讯云学生机](https://cloud.tencent.com/act/campus?from=11821) 或 [阿里云学生机](https://promotion.aliyun.com/ntms/act/campus2018.html)
- 可以看到有10元/月 的套餐，如果是阿里云的话选**轻量型应用服务器**，腾讯云就只有一个套餐
- 系统请选择**CentOS 8.0 64位**，其他保持默认即可
- 再次确认是否是十元，是的话直接购买；不是的话可能是你已经买过学生套餐
- 第一次购买可能需要**实名认证**，按照提示操作即可，不需要担心安全问题，都是可靠的大公司

### 第二步-安装宝塔面板——CentOS 8.0系统

- 以腾讯云举例，阿里云同理

- 打开控制台面板，找到刚才租的学生机

  ![](/assets/img/docs/serverpack2/2.1.jpg)

- 选择重置密码

  ![](/assets/img/docs/serverpack2/2.2.jpg)

- 点击右侧**登入**按钮，按照说明填写你刚刚重置的密码；之后应该会看到类似这样的提示

  ![](/assets/img/docs/serverpack2/2.3.jpg)

- **不要慌，冷静。如果下面的部分教程失效请去[宝塔面板官网](https://www.bt.cn/)，点击Linux->立即安装**

  ![](/assets/img/docs/serverpack2/2.4.jpg)

- 回到控制台面板，我们需要开放一些通道让面板通过，选择**安全组**

  ![](/assets/img/docs/serverpack2/2.5.jpg)

- 点击**修改规则**，再点击**添加规则**

- 图1：

  ![](/assets/img/docs/serverpack2/2.6.jpg)

- 图2：

  ![](/assets/img/docs/serverpack2/2.7.jpg)

- **按照图中所写添加，想要安全的话按照图1，懒的话按照图2**

- 回到那个黑黑的界面里输入 `yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh` ，按下回车

- 这时会刷一大片大的英文，等他停下来的时候仔细看，最后一行在问你要不要安装（就是最后显示y/n），输入y并按下回车

- 耐心等待五分钟左右，直到出现这个字样

  ![](/assets/img/docs/serverpack2/2.8.jpg)

- 复制**外网面板地址**，在打开的页面中，用户名输入username后面的内容，密码输入password后面的内容

- 点击登入，到此为止面板按照完成

### **第三步-搭建HTTP静态文件服务器**

- 打开刚刚的宝塔面板，一般都会有提示安装套件，选择**nginx套装**安装

- 等待安装完成后，选择**网站**，点击**添加网站**

  ![](/assets/img/docs/serverpack2/3.1.jpg)

- 在弹出的页面填写网站IP，就是地址栏里面的那个；比如：我的是 https://233.88.233.44:8888/site ,那么我就填233.88.233.44

- 另外，**租vps的同学请找服务商索要ip地址和开放的端口**，比如我要到的是123.21.123.21:6666，那我就把这个填上去

  ![](/assets/img/docs/serverpack2/3.2.jpg)

- **其他保持不变，到此为止你已经搭建好了HTTP静态文件服务器✔**

### **第四步-制作整合包**

- 使用HMCL打开你的MC客户端

- 选择你的游戏版本，点击**导出整合包**

  ![](/assets/img/docs/serverpack2/4.1.jpg)

- 选择**服务器自动更新整合包**

- 填写相关信息：

  ![](/assets/img/docs/serverpack2/4.2.jpg)

- 整合包下载链接前缀：比如我刚刚在【[第三步-搭建HTTP静态文件服务器](###第三步-搭建HTTP静态文件服务器)】宝塔里填的是233.88.233.44，我希望能有版本区分，这个版本代号是a；那么我就填https://233.88.233.44/a， **vps注意，端口号也要写▲**

- 版本号写1.0 ，以后更新就写2.0以此类推

- 点击**下一步**，导出完成

### **第五步-上传整合包**

- 打开宝塔面板，选择**文件**，找到相应的目录，在相应IP目录下新建文件夹；比如我刚刚写的版本代号是a，那我就新建a这个文件夹

  ![](/assets/img/docs/serverpack2/5.1.jpg)

- 在新建的文件夹里上传刚刚导出的整合包，并解压；成功后如下图

  ![](/assets/img/docs/serverpack2/5.2.jpg)
 
- 要是更新整合包，请在解压时将该【a】这个文件夹内的文件覆盖处理


### **第六步-分发整合包**

- **大公告成，现在可以把刚刚导出的这个整合包上传分享给玩家了！**

### **第七步-检测整合包**

- **为了防止一些手滑现象导致整合包可能会出现一些问题，你可以在分发整合包前先测试一下要准备分发的整合包**

## **后续**

- 以后每次更新客户端只要重复[**第四步**](###第四步-制作整合包)**和**[**第五步**](###第五步-上传整合包)，**玩家重启客户端后就会自动接收更新**
- 版本号要记得更新
- 默认的更新方式不会删除玩家自己加入的模组，但会下载玩家删除的模组
- 更新覆盖的是整合包导出时的所有数据
- **每次更新会从整合包提供的链接下载 server-manifest.json 来校验玩家本地的整合包。若校验到整合包里没有匹配这个名字的文件或整合包里这个文件匹配名字但哈希值不匹配，就会下载该文件，不会下载匹配名字且哈希值匹配的文件**
- 出网带宽1MB我觉得够用了，除非你想让玩家自己下载全部内容（就是将整合包分发给他人前删除所有模组，玩家启动时就会开始下载回来，这样的好处是可见的整合包大小变小了）

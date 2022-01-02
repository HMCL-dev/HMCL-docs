# 光影和Optifine

## 安装Optifine

### 方式一（推荐）

当你在安装新的游戏客户端时候，会看到有个`Optifine`的选项。

![optifine_install](assets/img/docs/install_optifine/optifine_install.png)

点开之后会看到有3个复选框，一般选择安装`正式版`，如果没有`正式版`那么再考虑`测试版`。

![select_optifine](assets/img/docs/install_optifine/select_optifine.png)

选择完合适的版本之后就可以点击右下角的`安装`继续进行安装。

    **或者**

在对应的游戏版本管理页面，点击`自动安装`，你会看到有个`Optifine`的选项。

![install_auto](assets/img/docs/install_optifine/install_auto-16338577874692.png)

点开之后选择合适的版本然后等待安装完成即可。



### 方法二（推荐，可在当列表无Optifine或Optifine不是最新时使用）

在[Optifine官网](https://optifine.net/downloads)上下载合适版本的Optifine（下载完应为`OptiFine_<游戏版本>_<Optifine版本>.jar`）。


在对应的游戏版本管理页面，点击自动安装，再点击【从本地文件安装/升级】，此时HMCL会弹出文件选择窗口，选择刚才下载的文件，等待HMCL安装完毕即可

![Method5](https://user-images.githubusercontent.com/64117916/147845121-25a8429d-5593-4d85-a627-35039575e8d2.png)


### 方式三

在[Optifine官网](https://optifine.net/downloads)上下载合适版本的Optifine（下载完应为`OptiFine_<游戏版本>_<Optifine版本>.jar`）。

双击打开或者使用`java -jar 文件名` 的方式打开，然后你就会看到这个界面。

![change_path](assets/img/docs/install_optifine/change_path.png)

选择自己游戏的.minecraft目录（默认安装到`\AppData\Roaming\.minecraft`目录下），然后点击`Install`按钮，之后你在HMCL的版本列表中找到就含有Optifine名字的客户端启动即可（如果未找到，请确认你是否已安装对应的原本游戏客户端）。

### 方式四

从[Optifine官网](https://optifine.net/downloads)上下载的jar文件，该文件本身也可作为Mod被加载，具体操作方法见 [Mod安装教程](auto-installing.md)

注意：

1.Fabric和Optifine本身并不能共存，必须同时安装[Optifabric](https://www.curseforge.com/minecraft/mc-mods/optifabric)（一个Mod），具体操作方法见 [Mod安装教程](auto-installing.md)

2.1.14-1.16的Forge和Optifine会出现不兼容的情况，请使用[Optiforge](https://www.curseforge.com/minecraft/mc-mods/optiforge)（一个Mod）解决，具体操作方法见 [Mod安装教程](auto-installing.md)

## 安装光影

一般光影是一个zip格式的文件，将光影文件放入`\.minecraft\shaders`文件夹中即可 (没有这个文件夹就自己新建一个)。如果开了版本隔离，那么文件夹是`\.minecraft\version\<客户端名称>/shaders`

如果你不知道版本隔离是啥，也不会创建文件夹，那么请打开游戏，依次点击`设置—视频设置—光影—光影包文件夹`，在里面放入光影包，然后点击你要加载的光影，最后点击`完成`即可

![shaders_setting](assets/img/docs/install_optifine/shaders_setting.png)

**注意：光影对于电脑配置的要求比较高，如果开了光影之后出现游戏画面很卡的情况，请升级电脑配置或者关闭光影。**

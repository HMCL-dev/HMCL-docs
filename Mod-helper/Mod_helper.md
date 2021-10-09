# MOD

## 安装Mod加载器

当你在安装新的游戏客户端时候，会看到其中有forge，liteloader，fabric这3个mod加载器可供选择。

![mod_loader](C:\Users\Administrator\Desktop\mod_loader.png)

当你使用1.14及以上的游戏版本时，推荐使用fabric，1.14以下的版本推荐使用forge。liteloader只适用1.12及以前的版本(目前已停更)。

**注意：*liteloader*和*forge*是兼容的（*Forge*较新版本和*LiteLoader*较老版本可能会出现不兼容），但*fabric*和*forge*不兼容！**

选择完合适的mod加载器之后就可以点击右下角的`安装`继续进行安装。

**注意：如果选择*fabric*，那么建议你同时选择*fabric api***

## 安装Mod

### Forge Mod

HMCL内置了Curseforge源和 Modrinth源的搜索和下载功能，目前已支持中文搜索（匹配结果不一定准确）。点开mod下载页面，最上方会显示当前mod需要的前置mod（如果有的话），以及mod支持的全部版本，请根据你当前安装的游戏版本选择恰当的版本。

**注意：请区分*Forge Mod* 和*Fabric Mod*，大部分mod在文件名中会注明，请不要选择错误，否则mod无法被正确加载。**

![mod_install](C:\Users\Administrator\Desktop\mod_install.png)

### Fabric Mod

*Fabric Mod* 的安装和*Forge Mod*的安装类似，参照上文。

**注意：所有的*Fabric Mod*都需要*Fabric API*（前置mod）在安装Mod加载器时候如果没有选择，请先安装*Fabric API*（安装方法和普通mod安装方法相同），否则*Fabric Mod*无法被加载！**

### LiteLoader Mod

*LiteLoader Mod*安装和*Forge Mod*的安装类似，参照上文。

**注意：LiteLoader 只能加载文件后缀为litemod的模组，Forge Mod修改后缀后LiteLoader无法检测。**

## 安装Mod后游戏报错/无法启动

造成游戏报错的原因有很多，比如mod之间不兼容，fabric api的版本过高，缺少前置mod等等。

Ⅰ.新版本的HMCL拥有错误分析功能，可以根据HMCL的提示来排查原因。

Ⅱ.也可以使用二分法来解决——每次加入/删除一半的mod，挨个排除，直到找到导致游戏报错的mod为止。

Ⅲ.如果你的能力很优秀，也可以直接查看游戏日志来找出问题的原因。

Ⅳ.如果无法理解日志内容，那么请将/.minecraft/crash-reports和/.minecraft/log文件夹打包发给其他人寻求帮助。

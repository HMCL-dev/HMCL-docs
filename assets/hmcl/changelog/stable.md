![Hits](https://hits.zkitefly.eu.org/?tag=https%3A%2F%2Fdocs.hmcl.net%2Fchangelog%2Fstable.html)

*Notice: changelogs are written in Chinese.*

# HMCL 3.5.5

- 启动器
  - 拒绝在被 Fractureiser 病毒感染的设备上启动 HMCL（若检测到将会提示并退出，[详情](https://github.com/fractureiser-investigation/fractureiser#readme)）
  - 检测 HMCL 是否处于 macOS 上的 App Translocation（macOS 使用了 [App Translocation](https://lapcatsoftware.com/articles/app-translocation.html) 机制，可能会自动将 HMCL 移动至 `/private/var/folders` 中的临时文件夹内，导致用户关闭 HMCL 后游戏数据和设置丢失）
  - 日志分析窗口中显示物理内存大小
  - 更新 Minecraft 购买链接
  - 优化 SSL 异常报错信息
  - 添加更多日志分析规则
  - 更新游戏版本号检测性能
  - 添加隐藏测试版提示开关
  - 在 Linux 上支持 `MESA_LOADER_DRIVER_OVERRIDE` 环境变量，适配 Zink 驱动程序
  - 更新翻译

- 下载
  - 更新搜索版本号

- 游戏设置
  - 添加删除游戏资源文件按钮
  - 将版本高级设置拆分至单独页面中
  - 添加环境变量设置
  - 添加渲染器设置

- 跨平台
  添加 Linux RISC-V 64 平台支持

错误修复：

- 修复日志分析窗口的渲染问题
- 修复在 Minecraft 1.20 不能正常使用游戏内聊天功能的问题
- 修复在 Windows on ARM 平台上的启动问题
- 修复使用系统 GLFW 选项对 1.19+ 不生效的问题
- 修复无法使用 macOS aarch64 JRE 启动部分版本的问题
- 修复一些崩溃问题

# HMCL 3.5.4

- 启动器
  - 多人联机功能暂时下线维护 [详情](https://hmcl.huangyuhui.net/api/redirect/multiplayer-migrate)
  - 不再支持添加 Mojang 账户 [迁移至微软账户](https://aka.ms/MinecraftMigration)
  - 默认在用户文件夹中存储账户信息，提高安全性
  - 优化性能与资源占用，解决卡顿问题
  - 优化文本提示
  - 优化自动内存分配功能
  - 优化游戏 JVM 参数，改善游戏性能
  - 优化自动选择 Java 功能
  - 优化自动下载 Java 功能
  - 优化微软账户登录功能
  - 支持 Gif 格式背景图
  - 优化高分辨率屏幕上图标的显示效果
  - 更新反馈页面
  - 默认加入 Little Skin 登录选项
  - 为 Linux 提供 sh 格式构建
  - 新添加 JVM 选项 `-Dhmcl.home`，允许用户自行指定 HMCL_DIRECTORY

- 下载
  - 支持整合包下载页使用中文搜索
  - 支持下载安装 Modrinth 整合包
  - 支持 Quilt 自动安装
  - 默认将搜索排序修改为“热度”

- 游戏设置
  - 默认开启“自动选择合适的 Java”
  - 添加世界信息界面，允许玩家在启动器内查看详细世界信息以及修改世界设置
  - 添加模组列表搜索
  - 优化自动内存分配

- 跨平台
  - 适配 Windows ARM64 平台
  - 适配 Linux LoongArch64（旧世界）平台
  - 适配 Linux ARM32 平台
  - 适配 Linux ARM64 平台
  - 适配 MacOS ARM64 平台

此外，本版本包含数百项错误修复，详情请查看[测试版更新日志](https://docs.hmcl.net/changelog/dev.html)。

# HMCL 3.5.3

- 启动器
  - 支持多人联机
  - 自动选择新添加的 Authlib-injector 服务器
  - 添加修改离线账户皮肤的功能，允许使用本地图片和 LittleSkin 等皮肤站
  - 自动检测系统内安装的 OpenJDK，包括 Liberica/Microsoft/Zulu/AdoptOpenJDK
  - 允许修改启动器字体
  - 游戏崩溃时提供崩溃分析报告
  - 添加帮助页面
  - 更换默认背景图
  - 修复微软登录页可能白屏的问题
  - 任意页面按 ESC 键可返回上一页
  - 修复启动器打开时提示找不到 DST ROOT CA X3 证书的问题
  - 修复对系统平台的识别错误导致部分平台不能正确下载 JavaFX 的问题
  - 修复 Log4j 远程代码执行漏洞

- 游戏启动
  - 支持官方启动器为 Minecraft 启动参数提供的一些占位符
  - 兼容 TLauncher 游戏客户端
  - 如果在 macOS/Windows ARM 设备上使用 HMCL，HMCL 会优先使用 x86 的 JDK 运行游戏
  - 解决 Java 16 下部分 mod 不能正常运行的问题
  - 修复 Windows 下打开使用 Unicode UTF-8 提供全球语言支持选项后启动器无法打开的问题
  - 修复不能启动 BakaXL 安装后的游戏的问题
  - 修复不能正常启动 Minecraft 1.5 及以下版本的问题（需要手动删除 options.txt）

- 下载
  - 启动 Minecraft 1.17 及以上版本时自动下载官方提供的 Java 16
  - 支持 CurseForge 整合包、Mod、资源包、地图 下载
  - 支持 1.17 Forge 的自动安装与游戏启动
  - 支持 1.17 下 OptiFine 与 Forge 同时安装
  - 添加模组批量更新功能
  - 添加自动选择下载源的功能
  - 允许修改默认的下载并发数

- 游戏设置
  - 允许在 Java 自定义参数内覆盖启动器默认提供的启动参数，而不需要再禁止启动器生成默认参数
  - 允许在 Minecraft 自定义参数内使用 ${game_directory} 等占位符
  - 改进版本管理和游戏设置的界面
  - 添加修改游戏进程优先级的功能
  - 支持自动选择游戏内存大小
  - 添加查看模组详细介绍及打开其官方页面的功能
  - 添加 Linux 下使用系统 GLFW 及 OpenAL 的功能
  - 自定义本地库路径，允许 M1 设备运行 ARM 版本的 Minecraft
  - 添加自动选择 Java 选项，省去提示用户需要更改 Java 版本的步骤

- 整合包
  - 支持使用 Fabric 作为 Mod 加载器的 CurseForge 整合包
  - 支持我的世界中文论坛整合包规范第二版，兼容 CurseForge 整合包格式，允许导入 MultiMC
  - 修复安装整合包时可能崩溃的问题
  - 修复 MCBBS 整合包实现不符合规范的问题

# HMCL 3.3.188

- 启动器
  - 修改界面
  - 更新俄语翻译
  - 改善游戏下载速度
  - 添加复制游戏实例功能
  - 支持微软正版账户登录
  - 自动设置游戏的默认语言为中文
  - 兼容 Java11+，在 Java 11+ 上运行时会自动下载 JavaFX
  - 配置文件会优先选择启动器同目录而不是工作目录
  - 支持 Authlib-injector 账户上传皮肤
  - 支持 Authlib-injector 服务器用邮箱以外的账户登录
  - 上传皮肤时自动检测 Steve、Alex 模型
  - 刷新账户时将显示进度条
  - 自定义本地库路径，允许 M1 设备运行 ARM 版本的 Minecraft
  - 启动 Minecraft 1.17 时自动下载官方提供的 Java 16
  - 允许第三方修改 HMCL 的 BMCLAPI 下载源，从而支持第三方下载源
  - 自动检测系统内安装的 OpenJDK，包括 Liberica/Microsoft/Zulu/AdoptOpenJDK
  - 修复启动 Minecraft 1.0 时不会停止等待游戏启动的问题
  - 修复首次打开整合包会弹出 3 个新建账户窗口的问题
  - 修复运行在 Java 12+ 时列表和下拉菜单不能正常显示的问题
  - 修复鼠标指针不正常的问题
  - 修复添加外置登录的正版账号后会与普通正版账号冲突的问题
  - 修复因为线程过多导致在 macOS 系统上运行崩溃的问题
  - 修复重命名游戏版本点击移动窗口而不是移动光标的问题
  - 尝试修复在游戏启动后启动器直接关闭时导致游戏卡死的问题
  - 修复启动器设置 HTTP 代理后，游戏无法访问网络的问题
  - 修复下载支持库文件失败时启动器崩溃的问题
  - 修复不能识别部分数据包的问题
  - 修复 Windows 下打开使用 Unicode UTF-8 提供全球语言支持选项后启动器无法打开的问题
  - 解决 Java 16 下部分 mod 不能正常运行的问题

- 整合包
  - 更新游戏整合包后会显示新的版本号
  - 支持我的世界中文论坛整合包标准
  - 修复更新整合包下载地址不能使用在线下载自动更新整合包的问题
  - 修复服务端自动更新整合包不能更新游戏、Forge 版本的问题

# HMCL 3.3.172

- 启动器
  - 修改界面
  - 更新俄语翻译
  - 改善游戏下载速度
  - 添加复制游戏实例功能
  - 添加清理缓存文件夹按钮
  - 修改默认下载源为 MCBBS
  - 提升与 ServerSync 的兼容性
  - 添加为正版账号上传皮肤的功能
  - 支持调整并记住启动器窗口大小
  - 在日志窗口添加导出游戏日志功能
  - 现在会校验资源索引文件的完整性
  - 现在启动器代理设置对启动后的游戏有效
  - 在启动游戏、安装游戏等界面显示总下载速度
  - 游戏崩溃后显示游戏崩溃报告而不是游戏日志
  - 允许在启动游戏按钮上滑动鼠标滚轮切换游戏
  - 在删除 Mod、世界、数据包时弹出删除确认提示
  - 允许使用在启动器同目录下的 authlib-injector.jar 文件
  - 在游戏崩溃后的第二次启动时自动检查资源和支持库文件是否完整
  - 添加启动器的 JVM 参数 -Dhmcl.font.override=fontfamily 以允许 Linux 用户更换字体以解决白屏问题
  - 修复部分整合包无法修改启动时游戏窗口大小的问题
  - 修复终止游戏后启动器不会停止等待的问题
  - 修复 1.5.2 及以下版本不能下载资源文件的问题
  - 修复某些情况下启动游戏时，启动器会崩溃的问题
  - 修复进入游戏设置后无法重命名部分游戏版本的问题
  - 修复不能在 Java 17 下载 Forge 和自动更新的问题
  - 修复重命名版本时，输入不合法的新名字后的错误提示
  - 修复重命名被依赖的版本后，会破坏其他依赖这个版本的版本的问题
  - 修复在自定义游戏运行目录时，输入不合法的路径会导致崩溃的问题
  - 修复在输入特定错误的 authlib-injector 服务器地址时会导致启动器崩溃的问题

- 自动安装
  - 在 OptiFine 库缺失时可以自动补全
  - 提升自动安装功能与其他启动器的兼容性
  - 在当前下载源下载失败后自动重试其他下载源
  - 在启动游戏、安装游戏等界面显示明确的安装步骤
  - 安装游戏向导内可直接切换下载源，而不需要返回启动器设置页面
  - 支持同时安装 Minecraft 1.14.4 及以上版本的 Forge 和 OptiFine
  - 自动安装页面将提示不兼容的第三方库，比如 Forge 和 Fabric 不兼容
  - 修复无法安装 Forge 1.12.2 2852 的问题
  - 修复在 Curse 整合包安装遗漏部分 Mod 的问题
  - 修复在 Curse 整合包安装部分成功时删除游戏的问题
  - 修复 1.5.2 及以下版本安装 Forge 后启动失败的问题
  - 修复从 MCBBS 下载源下载文件可能会下载到空文件的问题
  - 修复 1.12.2 同时安装 Forge, OptiFine 时无法进入游戏存档的问题

- 整合包
  - 修复整合包配置丢失后整合包游戏版本不能修改配置的问题
  - 修复服务器自动更新整合包更新时可能会出现 AccessDeniedException 的问题

# HMCL 3.2.149

- 启动器
  - 改进部分错误提示
  - 更新繁体中文语言文件
  - 在主界面账户栏添加鼠标滚轮便捷切换游戏账户
  - 在主界面账户栏添加鼠标悬浮提示以查看完整游戏名
  - 修复原版游戏用熔炉图标标识的问题
  - 修复无法取消启动过程和安装过程的问题
  - 修复无法启动使用 Vivecraft 安装器新安装的游戏的问题
  - 修复启动 1.15 时不会停止等待的问题
  - 修复 Windows 下导出启动脚本对双引号的错误转义
  - 修复部分正版账号登录 1.7.10 会导致游戏崩溃的问题
  - 修复关闭 JVM 检查时仍然会检查 java.exe 是否合法的问题
  - 修复使用 BMCLAPI 不能下载 authlib-injector 和加载游戏列表的问题

- 自动安装
  - 添加 MCBBS 下载源
  - 在资源索引文件不合法时尝试重新下载
  - 添加 Fabric 的 BMCLAPI 和 MCBBS 下载源支持
  - 现官方下载源下载 Forge 时依赖文件不再强制从 BMCLAPI 下载
  - 修复重复下载游戏依赖文件的问题

- 整合包
  - 导出整合包时将剔除所有日志文件和 CustomSkinLoader 的缓存
  - 修复导入 HMCL 整合包时无法安装 Forge 的问题
  - 修复无法下载 Curse 整合包部分 Mod（如潘马斯）的问题
  - 修复下载 Curse 整合包 Mod 失败后会删除整合包的问题
  - 修复下载服务端整合包没有对链接转义而无法下载的问题

# HMCL 3.2.139

- 启动器
  - 添加西班牙语，更新英语、俄语翻译
  - 主页面按回车键启动游戏
  - 游戏列表内点击列表项进入游戏设置，右键列表项打开游戏管理菜单
  - 不再强制使用 java.exe
  - 日志窗口允许关闭自动滚动
  - 避免安装游戏时输入的游戏名称不符合 Windows 系统要求
  - 修复输入某些错误的 Java 路径时崩溃的问题
  - 修复浏览 Mod 列表可能出现的崩溃问题
  - 修复无法识别 Java 12、13 的问题

- 自动安装
  - 添加 Fabric 自动安装
  - 新安装的游戏可以修改游戏版本
  - 修复 OptiFine 自动安装
  - 修复同时安装 Forge 和 OptiFine 自动安装失败的问题
  - 修复某些情况下无法安装 1.12.2 及以下版本的 Forge 的问题
  - 修复导出整合包导入时无法安装 1.13 Forge 和 OptiFine 的问题
  - 修复部分情况下无法下载 Forge 安装包的问题
  - 修复无法安装 1.14 和 1.15 游戏的问题

- 整合包
  - 允许从给定链接下载整合包并进行安装
  - 支持导出 MultiMC 整合包
  - 修复无法下载 Curse 模组的问题
  - 修复下载 Curse 整合包失败后会删除游戏的问题

- 服主功能
  - 添加 authlib-injectors.json，允许服主将添加账号页面更改为默认添加指定服务器的 Authlib Injector 账户
  - 访问 [https://www.huangyuhui.net/index.php/2019/09/09/109/](https://www.huangyuhui.net/index.php/2019/09/09/109/) 以查看添加方法
  - 添加服务器自动更新整合包，允许服务器远程更新游戏客户端
  - 访问 [https://www.huangyuhui.net/index.php/2019/11/12/118/](https://www.huangyuhui.net/index.php/2019/11/12/118/) 以查看添加方法


# HMCL 3.2.130

- 启动器
  - 在启动器更新时显示更新日志
  - 启动前检查是否是 Java 8~10
  - [https://www.huangyuhui.net/index.php/2019/01/27/83/](https://www.huangyuhui.net/index.php/2019/01/27/83/)支持整合包自带 Java 运时
  - 在缓存目录无效时自动更改设置
  - 在登录对话框中添加注册链接
  - 将游戏依赖的动态链接库解压到 .minecraft 中而不是系统临时文件夹
  - 更新 authlib-injector

- 自动安装
  - 只从 BMCLAPI 获取 Forge、OptiFine 列表
  - 添加 BMCLAPI 赞助信息
  - 支持 Forge 1.13 的自动安装
  - 支持 Forge、LiteLoader、OptiFine 的手动更新
  - 添加提示部分版本的 Forge 和 LiteLoader 不兼容的问题
  - 下载库文件失败时提供更友好的提示
  - 安装游戏时更新资源文件
  - 启动时下载缺失的 Minecraft 本体文件
  - 在安装游戏失败时删除不完全的游戏

- 游戏管理
  - 支持对 Fabric 模组的管理
  - 支持数据包列表页面、模组管理面板多选
  - 添加刷新模组列表的按钮
  - 在未安装 Mod API 的情况下禁用模组管理面板
  - 忽略游戏存档名中的颜色转移符
  - 隐藏游戏版本不匹配的游戏存档
  - 添加打开存档文件夹的菜单
  - 删除在版本管理页面中的删除游戏和重命名按钮
  - 提醒用户在修改版本独立选项时需要注意游戏文件的转移
  - 支持拖拽游戏存档压缩包到游戏界面以便安装游戏存档

- 整合包
  - 支持整合包拖拽到主页面打开安装向导
  - 支持新版 MultiMC 整合包的导入
  - 在更新整合包时进行游戏文件的备份
  - 从 Cursemeta 上下载 Curse 上被删除的 Mod 文件

- 修复
  - 修复头像不显示头盔层的问题
  - 修复删除模组时可能导致的崩溃
  - 修复刷新数据包列表时可能的崩溃问题
  - 修复启动器皮肤预览异常的问题
  - 修复下载失败后无法删除游戏版本的问题
  - 修复刷新版本列表时的卡顿问题
  - 修复 mods 不是文件夹时无法安装模组的问题
  - 修复启动按钮无法根据背景颜色更改字体颜色的问题
  - 修复 Java 10 上 UI 错位的问题
  - 修复启动 Curse 整合包时尝试下载被禁用的模组的问题
  - 修复皮肤图片文件损坏时导致的崩溃问题
  - 修复配置文件格式不正确时导致的崩溃问题
  - 修复 Curse 整合包更新失败的问题
  - 修复自动更新弹出气泡的界面错乱问题
  - 修复下载资源文件时潜在的崩溃问题
  - 修复导入整合包时的乱码问题

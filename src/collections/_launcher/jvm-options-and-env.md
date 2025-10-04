---
title: JVM 选项与环境变量
date: 2025-04-20 23:18:02 +0800
hits: true
toc: true
---

## JVM 选项

HMCL 提供了一些 JVM 选项用于调试目的。你可以通过在启动 HMCL 时添加这些参数来使用这些功能。

| 参数 | 描述 |
|------|------|
| `-Dhmcl.home=<path>` | 覆盖 HMCL 全局数据文件夹路径 |
| `-Dhmcl.dir=<path>` | 覆盖 HMCL 工作路径下的 .hmcl 文件夹路径 |
| `-Dhmcl.self_integrity_check.disable=true` | 禁用启动器更新时的本体完整性检查 |
| `-Dhmcl.bmclapi.override=<url>` | 自定义 BMCLAPI 的 API Root 地址（默认为 `https://bmclapi2.bangbang93.com`）|
| `-Dhmcl.font.override=<font family>` | 指定启动器使用的字族 |
| `-Dhmcl.version.override=<version>` | 手动指定启动器版本号 |
| `-Dhmcl.update_source.override=<url>` | 自定义 HMCL 更新源地址 |
| `-Dhmcl.authlibinjector.location=<path>` | 指定本地 authlib-injector 路径，不从网络下载 |
| `-Dhmcl.openjfx.repo=<maven repository url>` | 添加用于下载 OpenJFX 的自定义 Maven 仓库地址（默认为 `https://repo1.maven.org/maven2`）|
| `-Dhmcl.native.encoding=<encoding>` | 指定系统原生编码 |
| `-Dhmcl.microsoft.auth.id=<App ID>` | 自定义 Microsoft OAuth 应用程序 ID |
| `-Dhmcl.microsoft.auth.secret=<App Secret>` | 自定义 Microsoft OAuth 应用程序密钥 |
| `-Dhmcl.curseforge.apikey=<key>` | 自定义 CurseForge API 密钥 |
| `-Dhmcl.discoapi.override=<url>` | 自定义 DiscoAPI 的 API Root 地址（默认为 `https://api.foojay.io/disco/v3.0`）|
| `-Dhmcl.native.backend=<auto/jna/none>` | 指定 HMCL 的本地后端类型。可选值：<br>- `auto`：自动选择（Windows 7+ 使用 JNA，其他系统不使用）<br>- `jna`：强制使用 JNA（如果 JNA 不可用会抛出异常）<br>- `none`：禁用 JNA<br>默认值：`auto` |
| `-Dhmcl.hardware.fastfetch=<true/false>` | 是否使用 fastfetch 获取设备信息。默认值：`true` |

## 环境变量

HMCL/HMCLauncher 也支持一些环境变量来配置启动器的行为。你可以在系统环境变量中添加这些变量。

| 参数 | 描述 |
|------|------|
| `HMCL_JAVA_OPTS` | 自定义 HMCLauncher 所使用的 JVM 启动参数（默认为 `-XX:MinHeapFreeRatio=5 -XX:MaxHeapFreeRatio=15` 或 `-Xmx1G -XX:MinHeapFreeRatio=5 -XX:MaxHeapFreeRatio=15`）|
| `HMCL_JAVA_HOME` | 自定义 HMCLauncher 所使用的 Java 路径 |
| `HMCL_FONT` | 指定启动器使用的字族 |
| `HMCL_JRES` | 添加 HMCL 所使用的 Java 路径，支持写入多个路径 |

## 如何使用 JVM 选项

你可以通过以下几种方式使用这些 JVM 选项。

### 方法一：直接在命令行中添加

在启动 HMCL 时通过命令行添加参数，例如：

```bash
java -Dhmcl.home="D:/Games/HMCL" -jar HMCL.jar
```

### 方法二：创建启动脚本

1. Windows 用户可以创建 `.cmd` 文件：
```batch
@echo off
java -Dhmcl.font.override="Microsoft YaHei" -jar HMCL.jar
pause
```

2. Linux/macOS 用户可以创建 `.sh` 文件：
```bash
#!/bin/bash
java -Dhmcl.font.override="Noto Sans CJK SC" -jar HMCL.jar
```

### 使用注意事项

- 可以同时使用多个参数，只需要用空格分隔
- 包含空格的参数值需要用半角引号包裹
- 确保 JVM 参数位于 `-jar HMCL.jar` 之前

## 如何使用环境变量

### Windows 设置环境变量

1. 右键点击“此电脑”/“这台电脑”/“我的电脑”，选择“属性”
2. 点击“高级系统设置”
3. 点击“环境变量”
4. 在“用户变量”或“系统变量”中点击“新建”
5. 输入变量名（如 `HMCL_JAVA_HOME`）和变量值
6. 点击“确定”保存

示例值：
```
变量名: HMCL_JAVA_HOME
变量值: C:\Program Files\Java\jdk-17
```

### Linux/macOS 设置环境变量

1. 编辑你的 Shell 配置文件（比如 `~/.bashrc`、`~/.zshrc` 等）
2. 添加 `export` 语句：

```bash
export HMCL_JAVA_HOME="/usr/lib/jvm/java-17-openjdk"
export HMCL_JAVA_OPTS="-XX:MinHeapFreeRatio=5 -XX:MaxHeapFreeRatio=15"
```

3. 保存文件并重新加载配置：
```bash
source ~/.bashrc  # 或 `source ~/.zshrc`
```

### 使用注意事项

- 设置环境变量后需要重启 HMCL 才能生效
- 如果同时设置了 JVM 参数和环境变量，JVM 参数优先级更高
- Windows 用户注意使用半角分号（;）分隔多个路径
- Linux/macOS 用户注意使用半角冒号（:）分隔多个路径


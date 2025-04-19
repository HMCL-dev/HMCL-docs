---
title: "JVM 选项"
permalink: /launcher/jvm-options.html
date: 2025-04-20 23:18:02 +0800
categories: 启动器
toc: true
---

![Hits](https://hits.zkitefly.eu.org/?tag=https%3A%2F%2Fdocs.hmcl.net%2Flauncher%2Fjvm-options.html)

## 选项

HMCL 提供了一些 JVM 选项用于调试目的。你可以通过在启动 HMCL 时添加这些参数来使用这些功能。

| 参数 | 描述 |
|------|------|
| `-Dhmcl.home=<path>` | 覆盖 HMCL 数据文件夹路径 |
| `-Dhmcl.self_integrity_check.disable=true` | 禁用启动器更新时的本体完整性检查 |
| `-Dhmcl.bmclapi.override=<url>` | 自定义 BMCLAPI 的 API Root 地址（默认为 `https://bmclapi2.bangbang93.com`）|
| `-Dhmcl.font.override=<font family>` | 指定启动器使用的字体族 |
| `-Dhmcl.version.override=<version>` | 手动指定启动器版本号 |
| `-Dhmcl.update_source.override=<url>` | 自定义 HMCL 更新源地址 |
| `-Dhmcl.authlibinjector.location=<path>` | 指定本地 authlib-injector 路径，不从网络下载 |
| `-Dhmcl.openjfx.repo=<maven repository url>` | 添加用于下载 OpenJFX 的自定义 Maven 仓库地址 |
| `-Dhmcl.native.encoding=<encoding>` | 指定系统原生编码 |
| `-Dhmcl.microsoft.auth.id=<App ID>` | 自定义 Microsoft OAuth 应用程序 ID |
| `-Dhmcl.microsoft.auth.secret=<App Secret>` | 自定义 Microsoft OAuth 应用程序密钥 |
| `-Dhmcl.curseforge.apikey=<key>` | 自定义 CurseForge API 密钥 |
| `-Dhmcl.discoapi.override=<url>` | 自定义 DiscoAPI 的 API Root 地址（默认为 `https://api.foojay.io/disco/v3.0`）|

## 如何使用 JVM 选项

要使用这些 JVM 选项，你可以通过以下几种方式:

### 方法一：直接在命令行中添加

在启动 HMCL 时通过命令行添加参数，例如:

```bash
java -Dhmcl.home="D:/Games/HMCL" -jar HMCL.jar
```

### 方法二：创建启动脚本

1. Windows 用户可以创建 `.bat` 文件:
```batch
@echo off
java -Dhmcl.font.override="Microsoft YaHei" -jar HMCL.jar
pause
```

2. Linux/macOS 用户可以创建 `.sh` 文件:
```bash
#!/bin/bash
java -Dhmcl.font.override="Noto Sans CJK SC" -jar HMCL.jar
```

### 使用注意事项

- 可以同时使用多个参数，只需要用空格分隔
- 包含空格的参数值需要用引号包裹
- 确保 JVM 参数位于 `-jar HMCL.jar` 之前


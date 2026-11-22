---
title: JVM Options and Environment Variables
excerpt: Instructions for configuring JVM parameters and environment variables
date: 2025-04-20 23:18:02 +0800
---

## JVM Options

HMCL provides some JVM options for debugging purposes. You can use these features by adding these parameters when launching HMCL.

| Parameter | Description |
|------|------|
| `-Dhmcl.home=<path>` | Overrides the path of the HMCL global data folder |
| `-Dhmcl.dir=<path>` | Overrides the path of the .hmcl folder under the HMCL working directory |
| `-Dhmcl.self_integrity_check.disable=true` | Disables the launcher's self-integrity check during updates |
| `-Dhmcl.bmclapi.override=<url>` | Customizes the BMCLAPI API Root address (defaults to `https://bmclapi2.bangbang93.com`)|
| `-Dhmcl.font.override=<font family>` | Specifies the font family used by the launcher |
| `-Dhmcl.version.override=<version>` | Manually specifies the launcher version number |
| `-Dhmcl.update_source.override=<url>` | Customizes the HMCL update source address |
| `-Dhmcl.authlibinjector.location=<path>` | Specifies the local authlib-injector path instead of downloading it from the network |
| `-Dhmcl.openjfx.repo=<maven repository url>` | Adds a custom Maven repository URL used for downloading OpenJFX (defaults to `https://repo1.maven.org/maven2`)|
| `-Dhmcl.native.encoding=<encoding>` | Specifies the system native encoding |
| `-Dhmcl.microsoft.auth.id=<App ID>` | Customizes the Microsoft OAuth application ID |
| `-Dhmcl.microsoft.auth.secret=<App Secret>` | Customizes the Microsoft OAuth application secret |
| `-Dhmcl.curseforge.apikey=<key>` | Customizes the CurseForge API key |
| `-Dhmcl.discoapi.override=<url>` | Customizes the DiscoAPI API Root address (defaults to `https://api.foojay.io/disco/v3.0`)|
| `-Dhmcl.native.backend=<auto/jna/none>` | Specifies the native backend type of HMCL. Possible values:<br>- `auto`: choose automatically (JNA on Windows 7+, no native backend on other systems)<br>- `jna`: force the use of JNA (throws an exception if JNA is unavailable)<br>- `none`: disable JNA<br>Default value: `auto` |
| `-Dhmcl.hardware.fastfetch=<true/false>` | Whether to use fastfetch to obtain device information. Default value: `true` |

## Environment Variables

HMCL/HMCLauncher also supports some environment variables for configuring the launcher's behavior. You can add these variables to the system environment variables.

| Parameter | Description |
|------|------|
| `HMCL_JAVA_OPTS` | Customizes the JVM startup parameters used by HMCLauncher (defaults to `-XX:MinHeapFreeRatio=5 -XX:MaxHeapFreeRatio=15` or `-Xmx1G -XX:MinHeapFreeRatio=5 -XX:MaxHeapFreeRatio=15`)|
| `HMCL_JAVA_HOME` | Customizes the Java path used by HMCLauncher |
| `HMCL_FONT` | Specifies the font family used by the launcher |
| `HMCL_JRES` | Adds the Java paths used by HMCL; multiple paths are supported |

## How to Use JVM Options

You can use these JVM options in several ways.

### Method 1: Add them directly on the command line

Add the parameters on the command line when launching HMCL, for example:

```bash
java -Dhmcl.home="D:/Games/HMCL" -jar HMCL.jar
```

### Method 2: Create a launch script

1. Windows users can create a `.cmd` file:
```batch
@echo off
java -Dhmcl.font.override="Microsoft YaHei" -jar HMCL.jar
pause
```

2. Linux/macOS users can create a `.sh` file:
```bash
#!/bin/bash
java -Dhmcl.font.override="Noto Sans CJK SC" -jar HMCL.jar
```

### Notes on Usage

- Multiple parameters can be used at the same time; just separate them with spaces
- Parameter values that contain spaces must be wrapped in half-width quotation marks
- Make sure the JVM parameters come before `-jar HMCL.jar`

## How to Use Environment Variables

### Setting Environment Variables on Windows

1. Right-click "This PC"/"This Computer"/"My Computer" and select "Properties"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. In "User variables" or "System variables", click "New"
5. Enter the variable name (for example `HMCL_JAVA_HOME`) and the variable value
6. Click "OK" to save

Example values:
```
Variable name: HMCL_JAVA_HOME
Variable value: C:\Program Files\Java\jdk-17
```

### Setting Environment Variables on Linux/macOS

1. Edit your shell configuration file (such as `~/.bashrc`, `~/.zshrc`, etc.)
2. Add `export` statements:

```bash
export HMCL_JAVA_HOME="/usr/lib/jvm/java-17-openjdk"
export HMCL_JAVA_OPTS="-XX:MinHeapFreeRatio=5 -XX:MaxHeapFreeRatio=15"
```

3. Save the file and reload the configuration:
```bash
source ~/.bashrc  # or `source ~/.zshrc`
```

### Notes on Usage

- HMCL must be restarted after setting environment variables for them to take effect
- If both JVM parameters and environment variables are set, the JVM parameters take precedence
- Windows users should use half-width semicolons (;) to separate multiple paths
- Linux/macOS users should use half-width colons (:) to separate multiple paths

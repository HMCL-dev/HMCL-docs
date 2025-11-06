---
title: FAQ
date: 2025-09-19 13:40:00 +0800
author: LIPiston
contributors:
  - Mine-diamond
lang: en
permalink: faq
---

> This is a guide for beginners, aiming to help you quickly get started with the HMCL launcher and Minecraft in the simplest way. For more in-depth information on any topic, you can click the links provided in the text to view detailed documentation.

### How to log in to your account

You need to purchase the game with a Microsoft account to play Minecraft, or use an offline/external account.

You can buy the game on the [official Minecraft website](https://www.minecraft.net/store/minecraft-java-bedrock-edition-pc?tabs=%7B%22details%22%3A0%7D) or the [Xbox Store](https://www.xbox.com/games/store/minecraft-java-bedrock-edition-for-pc/9nxp44l49shj).

After purchasing, on the main HMCL interface, click "Account" in the top left, then click "Microsoft Account" on the left to log in, or click "Offline Login" to create an offline account.

### How to download the game

Using HMCL to download Minecraft is very simple and can be done in just a few steps.

If you haven't installed any instances (i.e., haven't installed any game versions), you can directly click **"Start Game"**. HMCL will automatically install the latest official version of Minecraft and launch the game.

If you want to download more instances (you can also follow these steps for the first download), please do the following:

Find and click the "Download" button on the left side of the main interface.

![](/assets/img/docs/about-questions/img.png)

On the download page, click the "Game" tab at the top left. Here you will see all available game versions (**versions are listed from newest to oldest**). Choose a version you like. We usually recommend the latest official version.

![](/assets/img/docs/about-questions/img2.png)

Click the "Install" button at the bottom right, and HMCL will automatically download and install it for you.

![](/assets/img/docs/about-questions/img3.png)

Now return to the main interface and click the **"Start Game"** button at the bottom right to begin your adventure!

![](/assets/img/docs/about-questions/img4.png)

### What is the gameplay

While waiting for the game to download, you can learn about its core gameplay.

As a sandbox game, simply put, the core gameplay is **"destroy"** and **"create"**. You can freely explore the world, collect resources, build homes, challenge monsters...

For beginners, the following official Chinese Wiki links are your best starting point:
- **Must-read for beginners**: [Minecraft Wiki Beginner's Guide](https://zh.minecraft.wiki/w/%E6%95%99%E7%A8%8B/%E6%96%B0%E6%89%8B%E6%89%8B%E5%86%8C)
- **Survival First Day Guide**: [Tutorial: How to Survive the First Day](https://zh.minecraft.wiki/w/Tutorial:%E7%AC%AC%E4%B8%80%E5%A4%A9)

### What is a Resource Pack

You may have heard other players talk about beautiful "texture packs".

A "texture pack" generally refers to a resource pack that modifies the game's textures, and was the term used for Minecraft versions 1.5 and earlier.

"Texture" and "texture pack" were mistranslations in the past; the official terms are now "texture" and "texture pack". If you see someone discussing texture packs, they are usually referring to texture packs.

A "resource pack" is a file that can modify various game resources, such as **textures (images), models, music, sound effects, language files**, etc., greatly changing the look and feel of the game. A good resource pack can greatly enhance your gaming audio-visual experience.

![General illustration](/assets/img/docs/about-questions/img5.jpg)

- **How to use resource packs?** See [Resource Pack Loading Tutorial](https://zh.minecraft.wiki/w/Tutorial:%E5%8A%A0%E8%BD%BD%E8%B5%84%E6%BA%90%E5%8C%85).
- **Want to make your own resource pack?** Learn more at [Resource Pack Details](https://zh.minecraft.wiki/w/%E8%B5%84%E6%BA%90%E5%8C%85).

You can get resource packs from the following websites:
- [CurseForge](https://www.curseforge.com/minecraft/texture-packs)
- [Modrinth](https://modrinth.com/resourcepacks)

### What is a Mod

You may have heard that Minecraft has a wealth of mod resources. Mods are powerful tools that can change or add game content, allowing you to add new blocks, mobs, items, and mechanics. By installing mods, you can enjoy richer content, smoother gameplay, and better audio-visual effects.

You can get mod information from the following websites and download and install them in HMCL:
- [MCBBS](https://www.mcmod.cn/)
- [CurseForge](https://www.curseforge.com/minecraft/search?class=mc-mods)
- [Modrinth](https://modrinth.com/mods)

HMCL automatic mod installation and usage tutorial: [Jump](/launcher/auto-installing.html)

#### What to do if the game reports an error after installing mods

It is common for the game to fail to start or crash after installing mods, usually due to mod conflicts or missing dependencies. Don't worry, most problems can be easily solved.

Common solutions are mentioned at the end of HMCL's "Automatic Installation and Mod Download Introduction": [Jump](/launcher/auto-installing.html#%E5%AE%89%E8%A3%85-mod-%E5%90%8E%E6%B8%B8%E6%88%8F%E6%8A%A5%E9%94%99%E6%97%A0%E6%B3%95%E5%90%AF%E5%8A%A8)

Or check the modpack error troubleshooting manual: [Jump](/modpack/error-handbook.html)

If you can't solve the error, try [seeking help](help.html)

### How to Choose the Java Version for the Game

HMCL will automatically manage Java and select the appropriate Java version for different game versions. If a suitable Java is not detected when starting the game, HMCL will prompt you to download Java (just click "Download" to complete the installation). For new players, the default settings are sufficient.

If you do need to manually install and specify a Java version:

**Install Java:**
1. Go to **Settings -> Java Management**, where you can see Java installed by HMCL or already installed on your system.
2. If you need to download Java, click "Download Java", select the required version, and then click "OK".
3. If you have installed Java but HMCL does not recognize it, select "Add Java", find the `java.exe` file in your Java installation path (Windows only) or the `java` file (Linux/macOS only), and then click OK.

**Select Java:**
- If you want all instances to use the same Java version, go to "Settings -> Global Game Settings" and select the Java to use. This Java will be used for all instances using global game settings (generally not recommended).
- If you only need to specify the Java version for a particular instance, go to that instance's "Instance Management -> Game Settings" (check "Enable instance-specific game settings"), and then select the Java to use. This Java will only be used for that instance.

> **Important Tip**: If you encounter any game crashes or startup issues after changing Java, **please immediately switch back to HMCL's default Java version**.
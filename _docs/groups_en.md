---
title: Join the HMCL User Group
date: 2024-03-05 17:00:00 +0800
authors:
  - Glavo
  - 8Mi_Yile
  - zkitefly
---

All Minecraft players are welcome to join the HMCL User Group. Please abide by the following group rules:

1. Do not discuss sensitive content such as politics, pornography, illegal activities, or monetary transactions; do not insult others, spread rumors or defame others, or behave vulgarly; do not discuss topics such as mental illness or LGBT; please respect everyone;
2. Do not spam, dump trash, start flame wars, vent personal emotions, deliberately mislead others, or engage in other behavior that disrupts the discussion environment;
3. Do not upload EXE or APK files;
4. Do not use third-party modules/plugins to send special messages in the group chat;
5. Do not discuss cheating tools for multiplayer games;
6. Do not post advertisements unrelated to Minecraft. You may promote servers, modpacks, and related content in moderation; each person may promote the same content at most once per week;
7. The topic of the user group is Minecraft; please do not discuss other games excessively.

## User Groups

![](/assets/img/docs/groups/group-4.png)

The following are casual chat groups. All users are welcome to join (joining multiple groups will get you kicked):

{% for group in site.data.groups -%}
- [{{ group.name }}]({{ group.link }}){% if group.status %} ({{ group.status }}){% endif %}
{% endfor %}

We periodically remove inactive members who have not spoken in the user groups for more than three months. One week before each cleanup, we will post an announcement in the group.

## Crash Support Group

If you have encountered an abnormal game exit, you are welcome to join the crash support group for solutions: [Minecraft Crash Support Group](/_docs/crash-support-group.md)

**This group only handles game error and crash issues. Please take unrelated topics to other groups.**

Because too many people join, we remove users whose issues have been resolved. If you encounter a new problem after being removed and need help, you can join again.

## Hearse Group

We have set up a separate group for users of Linux, FreeBSD and other systems, as well as devices such as ARM (excluding macOS), RISC-V and Loongson.
If you are using these platforms, you are welcome to join the HMCL Hearse Group: [HMCL Hearse Group (737461713)](https://qm.qq.com/q/C935haj8xW).

This group is not suitable for ordinary Windows and macOS users. If you do not care about the platforms mentioned above, please go to the [User Groups](#user-groups).

## Public Beta Group

If you care about HMCL's latest development progress and are willing to actively test new HMCL features and provide feedback, you are welcome to join the HMCL Public Beta Group: [HMCL Public Beta Group (954100320)](https://qm.qq.com/q/EO7Cx87Cz6)

This group is used for discussing HMCL development and testing. Casual chat is prohibited, and users who do not actively participate in feedback will be removed at any time. If you want to chat casually, please go to the [User Groups](#user-groups).

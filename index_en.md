---
layout: splash
title: Beginner's Guide
---

> [!NOTE]
> If you encounter a BUG, please send feedback in time to [HMCL/issues](https://github.com/HMCL-dev/HMCL/issues).\
> You can also submit your suggestions there.

This is the official help documentation of HMCL. To learn how to use HMCL or solve common problems, browse the table of contents below. If you need help diagnosing a crash, you can ask in the [QQ group](https://docs.hmcl.net/groups.html) or the [Discord server](https://discord.com/invite/jVvC7HfM6U).

{% include toc locale=page.locale %}

{% for group in site.data.navigation.docs -%}
## {{ group.title }}
{% for item in group.children -%}
1. [{{ item.title }}]({{ item.url }})
{%- if item.description %}\
   {{ item.description }}
{%- endif %}
{% endfor %}
{% endfor %}

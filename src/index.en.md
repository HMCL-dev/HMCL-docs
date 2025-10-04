---
title: Getting Started Guide
note: Organized by wifi-left.
permalink: /index.en.html
breadcrumbs: false
hits: true
toc: true
---

## Notice

The articles were written in Simplified Chinese. If you want to help translate them, please send a pull request to [GitHub: HMCL-dev/HMCL-docs](https://github.com/HMCL-dev/HMCL-docs/pulls). Or you can enable your translation tool to read.

If you encounter a BUG, please send feedback in time to [GitHub: huanghongxun/HMCL/issues](https://github.com/HMCL-dev/HMCL/issues).

You can also submit your suggestions here.

{% for group in site.data.navigation.docs_en %}
## {{ group.title }}

{% for item in group.children %}
{{ forloop.index }}. [{{ item.title }}]({{ item.url }})
{%- if item.description %}

    {{ item.description }}
{% endif %}
{% endfor %}
{% endfor %}

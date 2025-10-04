---
title: 新手導航
layout: document
breadcrumbs: false
hits: true
toc: true
---

## 注意

如果您遇到 BUG，請及時在 [GitHub: huanghongxun/HMCL/issues](https://github.com/HMCL-dev/HMCL/issues) 髮送反饋。

您也可以在這裡提交您的建議。

{% for group in site.data.navigation.docs %}
## {{ group.title }}

{% for item in group.children %}
{{ forloop.index }}. [{{ item.title }}]({{ item.url }})
{%- if item.description %}

    {{ item.description }}
{% endif %}
{% endfor %}
{% endfor %}

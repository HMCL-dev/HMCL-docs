---
title: 新手导航
note: 由 wifi-left 进行整理。
permalink: /index.html
breadcrumbs: false
hits: true
toc: true
---

## 注意

如果您遇到 BUG，请及时在 [GitHub: huanghongxun/HMCL/issues](https://github.com/HMCL-dev/HMCL/issues) 发送反馈。

您也可以在这里提交您的建议。

{% for group in site.data.navigation.docs %}
## {{ group.title }}

{% for item in group.children %}
{{ forloop.index }}. [{{ item.title }}]({{ item.url }})
{%- if item.description %}

    {{ item.description }}
{% endif %}
{% endfor %}
{% endfor %}

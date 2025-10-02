---
title: HMCL 新手导航
note: 由 wifi-left 进行整理。
hits-tag: https%3A%2F%2Fdocs.hmcl.net
toc: true
---

## 注意 Notice

The articles were written in Simplified Chinese. If you want to help translate them, please send a pull request to [GitHub: HMCL-dev/HMCL-docs](https://github.com/HMCL-dev/HMCL-docs/pulls). Or you can enable your translation tool to read.

If you encounter a BUG, please send feedback in time to [GitHub: huanghongxun/HMCL/issues](https://github.com/HMCL-dev/HMCL/issues).

You can also submit your suggestions here.

如果您遇到 BUG，请及时在 [GitHub: huanghongxun/HMCL/issues](https://github.com/HMCL-dev/HMCL/issues) 发送反馈。

您也可以在这里提交您的建议。

{% comment %}
此处的目录从 `_data/navigation.yml` 中的 docs 条目渲染，请修改该文件以更新目录
{% endcomment %}
{% for group in site.data.navigation.docs %}
## {{ group.title }}

{% for item in group.children %}
{{ forloop.index }}. [{{ item.title }}]({{ item.url }})
{%- if item.description %}

    {{ item.description }}
{% endif %}
{% endfor %}
{% endfor %}

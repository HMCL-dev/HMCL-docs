---
layout: splash
title: 新手导航
---

<!--{% comment %}-->
> [!NOTE]
> <!--{% endcomment %}-->
> <!----{{ '>' }} **Notice** <br> {{ '<' }}!---->
> The articles were written in Simplified Chinese. If you want to help translate them, please send a pull request to [HMCL-docs/pulls](https://github.com/HMCL-dev/HMCL-docs/pulls). Or you can enable your translation tool to read.\
> If you encounter a BUG, please send feedback in time to [HMCL/issues](https://github.com/HMCL-dev/HMCL/issues).\
> You can also submit your suggestions here.
<!----{{ '>' }}
{: .notice--info }
<!---->

> [!NOTE]
> 如果您遇到 BUG，请及时在 [HMCL/issues](https://github.com/HMCL-dev/HMCL/issues) 发送反馈。\
> 您也可以在这里提交您的建议。

{% include toc %}

{% for group in site.data.navigation.docs -%}
## {{ group.title }}
{% for item in group.children -%}
1. [{{ item.title }}]({{ item.url | relative_url }})
{%- if item.description %}\
   {{ item.description }}
{%- endif %}
{% endfor %}
{% endfor %}

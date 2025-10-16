---
title: 新手导航
author: wifi-left
---

The articles are written in Simplified Chinese. If you'd like to help with translations, you're welcome to [submit a pull request](https://github.com/HMCL-dev/HMCL-docs/pulls). Alternatively, you can use your preferred translation tool to read them.\
If you encounter a BUG, please report it promptly by [opening an issue](https://github.com/HMCL-dev/HMCL/issues).
<!----{{ '>' }}
{: .notice}
{{ '<' }}!---->

如果您遇到 BUG，请及时在 [Issues](https://github.com/HMCL-dev/HMCL/issues) 页面提交反馈。
<!----{{ '>' }}
{: .notice}
{{ '<' }}!---->

<!----{{ '>' }}
{%- for group in site.data.navigation.docs -%}
# {{ group.title }}
{%- for item in group.children %}
1. [{{ item.title }}]({{ item.url | relative_url }})
{%- if item.description %}\
  {{ item.description }}
{% endif %}
{% endfor %}
{% endfor %}
{{ '<' }}!---->

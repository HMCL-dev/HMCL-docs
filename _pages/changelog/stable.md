---
layout: compress
permalink: /changelog/stable.html
---

<!----{{ '>' }}
<script>location = "{% link '/_pages/changelogs/stable.md' %}"</script>
{% assign changelogs = site.changelogs | where_exp: "item", "item.relative_path contains 'stable'" | reverse %}
{% assign changelogs = changelogs | where_exp: "item", "item.slug == site.data.hmcl.stable.nowchange or item.slug == site.data.hmcl.stable.nowpreview" %}
{% for item in changelogs %}
  {% assign version = item.slug %}
  <h1 id="{% if version == page.nowchange %}nowchange{% elsif version == page.nowpreview %}nowpreview{% else %}HMCL-{{ version }}{% endif %}">HMCL {{ version }}</h1>
  <div>{{ item.content | markdownify }}</div>
{% endfor %}
{{ '<' }}!---->

<!--{% comment %}-->

> [!NOTE]
> 该页面仅用于客户端获取更新日志

<!--{% endcomment %}-->

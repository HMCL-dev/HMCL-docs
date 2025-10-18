---
layout: compress
permalink: /changelog/dev.html
---

<!----{{ '>' }}
<script>location = "{% link {{ '_pages/changelogs/dev.md' }} %}"</script>
{% assign changelogs = site.changelogs | where_exp: "item", "item.relative_path contains 'dev'" | reverse %}
{% assign changelogs = changelogs | where_exp: "item", "item.slug == site.data.hmcl.dev.nowchange or item.slug == site.data.hmcl.dev.nowpreview" %}
{% for item in changelogs %}
  {% assign version = item.slug %}
  <h1 id="{% if version == site.data.hmcl.dev.nowchange %}nowchange{% elsif version == site.data.hmcl.dev.nowpreview %}nowpreview{% else %}HMCL-{{ version }}{% endif %}">HMCL {{ version }}</h1>
  <div>{{ item.content | markdownify }}</div>
{% endfor %}
{{ '<' }}!---->

<!--{% comment %}-->

> [!NOTE]
> 该页面仅用于客户端获取更新日志

<!--{% endcomment %}-->

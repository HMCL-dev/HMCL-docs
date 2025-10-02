---
title: 稳定版更新日志
date: 2021-08-22 23:18:02 +0800
note: Changelogs are written in Chinese.
hits: true
toc: true
---

{% assign changelogs = site.changelogs | where_exp: "item", "item.relative_path contains 'stable/'" | reverse %}
{% for item in changelogs %}
  {% assign path = item.relative_path |  split: '.' | first | split: '/' %}
  {% assign end = path | size %}
  {% assign version = path | slice: 2, end | join: '.' %}
  <h1 id="{% if forloop.index == 1 %}nowchange{% else %}HMCL-{{ version }}{% endif %}">HMCL {{ version }}</h1>
  <div>{{ item.content | markdownify }}</div>
{% endfor %}

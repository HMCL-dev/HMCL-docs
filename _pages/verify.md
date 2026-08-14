---
title: HMCL 校验
permalink: /verify.html
classes: wide
toc: false
---

检查 HMCL 文件是否是官方构建。

<div id="hmcl-verify" class="notice">
  <div id="hmcl-verify-alert">点击并选择文件或将文件拖拽到此处进行校验</div>
  <div id="hmcl-verify-file"></div>
  <input id="hmcl-verify-input" type="file" accept=".jar,.exe,.sh">
</div>

<style>
  #hmcl-verify {
    gap: 2em;
    display: flex;
    cursor: pointer;
    user-select: none;
    text-align: center;
    align-items: center;
    aspect-ratio: 16 / 9;
    flex-direction: column;
    justify-content: center;
    transition: background-color .3s ease;
  }
  #hmcl-verify-alert {
    font-size: 2em;
  }
  #hmcl-verify-file {
    font-size: 1.5em;
  }
  #hmcl-verify-input {
    display: none;
  }
</style>

<script src="/assets/js/hmcl-signature-verify.min.js"></script>

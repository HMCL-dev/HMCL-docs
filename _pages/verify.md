---
title: 验证 HMCL 文件
permalink: /verify.html
toc: false
---

<div class="hmcl-verify">
  <p>选择 HMCL 的 jar 文件后，页面会在本地浏览器中读取文件，并使用 HMCL 官方公钥验证内嵌签名。文件不会被上传。</p>

  <label class="hmcl-verify__picker">
    <span>选择文件</span>
    <input id="hmcl-verify-file" type="file" accept=".jar,.zip,application/java-archive,application/zip">
  </label>

  <div id="hmcl-verify-result" class="hmcl-verify__result" role="status" aria-live="polite">
    尚未选择文件。
  </div>
</div>

<style>
  .hmcl-verify {
    max-width: 48rem;
  }

  .hmcl-verify__picker {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    margin: 1rem 0;
    padding: .55rem .85rem;
    border: 1px solid var(--global-border-color);
    border-radius: 4px;
    cursor: pointer;
  }

  .hmcl-verify__picker input {
    max-width: 20rem;
  }

  .hmcl-verify__result {
    margin-top: 1rem;
    padding: .85rem 1rem;
    border: 1px solid var(--global-border-color);
    border-radius: 4px;
    background: var(--code-background-color);
    white-space: pre-wrap;
  }

  .hmcl-verify__result[data-state="ok"] {
    border-color: #2e7d32;
  }

  .hmcl-verify__result[data-state="error"] {
    border-color: #c62828;
  }
</style>

<script src="{{ '/assets/js/hmcl-signature-verify.js' | relative_url }}"></script>

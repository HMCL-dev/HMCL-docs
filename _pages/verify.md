---
title: 验证 HMCL 文件
permalink: /verify.html
toc: false
---

<div class="hmcl-verify">
  <p>检查 HMCL 文件是否是官方构建。</p>

  <div class="hmcl-verify__actions">
    <label class="hmcl-verify__button" for="hmcl-verify-file">选择文件</label>
    <span id="hmcl-verify-selected-file" class="hmcl-verify__file">未选择文件</span>
    <input id="hmcl-verify-file" class="hmcl-verify__input" type="file" accept=".jar,.exe,.sh">
  </div>

  <div id="hmcl-verify-result" class="hmcl-verify__result" role="status" aria-live="polite" hidden></div>
</div>

<style>
  .hmcl-verify {
    max-width: 42rem;
    font-size: 1rem;
    line-height: 1.65;
  }

  .hmcl-verify p {
    margin-bottom: 1rem;
  }

  .hmcl-verify__actions {
    display: flex;
    align-items: center;
    gap: .75rem;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  .hmcl-verify__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: .35rem .8rem;
    border: 1px solid rgba(127, 127, 127, .45);
    border-radius: 4px;
    background: rgba(127, 127, 127, .12);
    color: inherit;
    font-size: .9rem;
    line-height: 1.2;
    cursor: pointer;
  }

  .hmcl-verify__button:hover {
    filter: brightness(.95);
  }

  .hmcl-verify__file {
    min-width: 0;
    max-width: 100%;
    opacity: .72;
    font-size: .9rem;
    overflow-wrap: anywhere;
  }

  .hmcl-verify__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  .hmcl-verify__result {
    margin-top: 1rem;
    padding: .75rem .9rem;
    border: 1px solid rgba(127, 127, 127, .35);
    border-left-width: 4px;
    border-radius: 4px;
    background: rgba(127, 127, 127, .08);
    font-size: .95rem;
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .hmcl-verify__result[hidden] {
    display: none;
  }

  .hmcl-verify__result[data-state="ok"] {
    border-color: #2e7d32;
  }

  .hmcl-verify__result[data-state="error"] {
    border-color: #c62828;
  }
</style>

<script src="{{ '/assets/js/hmcl-signature-verify.js' | relative_url }}"></script>

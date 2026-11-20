---
title: HMCL Verification
classes: wide
toc: false
---

Check whether an HMCL file is an official build.

<div id="hmcl-verify" class="notice">
  <div id="hmcl-verify-alert">Click to select a file, or drag and drop a file here to verify it</div>
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

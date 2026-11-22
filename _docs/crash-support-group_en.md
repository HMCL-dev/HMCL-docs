---
title: Join the HMCL Crash Support Group
excerpt: The HMCL Crash Support Group only handles game errors and crashes
date: 2024-03-05 17:00:00 +0800
author: zkitefly
---

<!----{{'>'}}
<div id="alert-modal">
<div class="notice">
{% capture notice %}
<!---->
<h1 id="" align="center">Please Read Before Joining the Group</h1>

- If the game exits abnormally, please click the ![](/assets/img/docs/groups/button-1.png "Export Game Crash Logs") button in the lower left corner (not the ![](/assets/img/docs/groups/button-2.png "Logs") button), and send the complete crash archive that is generated
- If you encounter other problems, please describe the situation in detail and provide relevant screenshots so that we can help you
- When using a modpack, please state the specific modpack name and version
- Please be patient; the group administrators and other members will help solve your problem. Insulting or rushing others is strictly prohibited
- Do not discuss sensitive content such as politics, pornography, illegal activities, or monetary transactions; do not engage in personal attacks, rumor-mongering, or defamation
- Do not spam, flood the chat, start disputes, vent emotions, or engage in other behavior that disrupts the group chat
- Do not use third-party plugins to send special messages; do not discuss cheating tools for multiplayer games
- This group only supports HMCL-related issues. Users of the PCL launcher should join group 978054335
- Do not send the same file repeatedly. If you need to get attention again, quote your previously sent message
- Due to the member limit, users whose issues have been resolved will be removed from the group. You can join again if you encounter a new problem
- This group only handles game crash-related issues. Please discuss other topics in other groups

---
<!----{{'>'}}
{% endcapture %}
{{ notice | markdownify }}
<p class="text-center">Please wait <span id="countdown">5</span> seconds and read the notes carefully</p>
<button id="close-btn" class="btn align-center" disabled>I Understand</button>
</div>
</div>
<!---->

If you have encountered an abnormal game exit, you are welcome to join the crash support group for solutions: [Minecraft Crash Support Group (666546887)](https://qm.qq.com/q/nG0Ti1kJri)

![](/assets/img/docs/groups/crash.png)

**This group only handles game error and crash issues. Please take unrelated topics to other groups.**

Because too many people join, we remove users whose issues have been resolved. If you encounter a new problem after being removed and need help, you can join again.

<!----{{'>'}}
<style>
.initial-content {
  position: relative;
  z-index: 20;
}

#alert-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  background: #00000090;
  justify-content: center;
  align-items: center;
  z-index: 20;
}
#alert-modal img {
  vertical-align: middle;
  margin-block: -0.5em;
  display: inline;
  height: 2.5em;
}
</style>
<script>
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("alert-modal");
  var show = localStorage.getItem("crash-support-group.show");
  if (show === "1") {
    modal.style.display = "none";
    return;
  }
  var text = document.getElementById("countdown");
  var btn = document.getElementById("close-btn");
  var sec = parseInt(text.textContent, 10) || 10;
  var timer = setInterval(function () {
    text.textContent = --sec;
    if (sec <= 0) {
      clearInterval(timer);
      text.parentNode.textContent = "Please click the button below to close";
      btn.disabled = false;
    }
  }, 1000);
  btn.addEventListener("click", function () {
    localStorage.setItem("crash-support-group.show", "1");
    modal.style.display = "none";
  }, false);
});
</script>

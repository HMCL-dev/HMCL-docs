---
title: 加入 HMCL 报错崩溃交流群
excerpt: HMCL 报错崩溃交流群仅处理游戏报错与崩溃问题
date: 2024-03-05 17:00:00 +0800
author: zkitefly
---

<!----{{'>'}}
<div id="alert-modal">
<div class="notice">
{% capture modal %}
<!---->
<h1 id="" align="center">加入群聊前请注意</h1>

- 游戏非正常退出时，请点击左下角 ![](/assets/img/docs/groups/button-1.png "导出游戏崩溃日志") 按钮（不是 ![](/assets/img/docs/groups/button-2.png "日志") 按钮），并完整发送生成的报错压缩包
- 遇到其他问题时，请详细说明情况并提供相关截图，以便我们提供帮助
- 使用整合包时，请说明具体的整合包名称与版本
- 请保持耐心，群管理和群友会协助解决问题。严禁辱骂、催促他人
- 禁止讨论政治、色情、违法、金钱交易等敏感内容，禁止人身攻击、造谣诽谤等行为
- 禁止刷屏、灌水、挑起争端、发泄情绪等影响群聊秩序的行为
- 禁止使用第三方插件发送特殊消息；禁止讨论多人游戏作弊工具
- 本群仅支持 HMCL 启动器相关问题。PCL 启动器用户请加入 978054335 群
- 请勿重复发送文件，如需重新获取关注，请引用之前发送的消息
- 因人数限制，已解决问题的用户会被移出群聊。如遇新问题可再次加入
- 本群仅处理游戏崩溃相关问题，其他话题请到其他群讨论

---
<!----{{'>'}}
{% endcapture %}
{{ modal | markdownify }}
<p class="text-center">请等待 <span id="countdown">5</span> 秒，请认真阅读注意事项</p>
<button id="close-btn" class="btn align-center" disabled>我已了解</button>
</div>
</div>
<!---->

如果你遇到了游戏非正常退出问题，欢迎加入报错崩溃交流群咨询解决方案：[Minecraft 报错崩溃交流群 (666546887)](https://qm.qq.com/q/nG0Ti1kJri)

![](/assets/img/docs/groups/crash.png)

**本群仅处理游戏报错崩溃问题，无关话题请前往其他群聊讨论。**

由于加群人数过多，我们会移出问题已解决的用户。如果你在被移出后遇到了新的问题需要求助，你可以再次加群。

<!----{{'>'}}
<style>
#alert-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  user-select: none;
}

#alert-modal img {
  display: inline;
  height: 1.5em;
  vertical-align: middle;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("alert-modal");
  var text = document.getElementById("countdown");
  var btn = document.getElementById("close-btn");
  var sec = parseInt(text.textContent, 10) || 10;
  var timer = setInterval(function () {
    text.textContent = --sec;
    if (sec <= 0) {
      clearInterval(timer);
      text.parentNode.textContent = "请点击下方按钮关闭";
      btn.disabled = false;
    }
  }, 1000);

  btn.addEventListener("click", function () {
    modal.style.display = "none";
  }, false);
});
</script>
<!---->

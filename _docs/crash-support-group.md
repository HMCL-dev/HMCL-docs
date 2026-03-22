---
title: 加入 HMCL 报错崩溃交流群
excerpt: HMCL 报错崩溃交流群仅处理游戏报错与崩溃问题
date: 2024-03-05 17:00:00 +0800
author: zkitefly
---

<!----{{'>'}}<div id="alert-modal" class="mfp-hide notice"><!---->
<h1 id="" class="text-center">加入群聊前请注意</h1>

<ul class="task-list">
  <li>游戏非正常退出时请点击左下角 <button class="btn btn--small" disabled>导出游戏崩溃信息</button> 按钮（注意不是 <button class="btn btn--small" disabled>日志</button> 按钮），并完整发送生成的报错压缩包</li>
  <li>遇到其他问题时，请详细说明情况并提供相关截图，以便我们提供帮助</li>
  <li>使用整合包时，请说明具体的整合包名称与版本</li>
  <li>请保持耐心，群管理和群友会协助解决问题。严禁辱骂、催促他人</li>
  <li>禁止讨论政治、色情、违法、金钱交易等敏感内容，禁止人身攻击、造谣诽谤等行为</li>
  <li>禁止刷屏、灌水、挑起争端、发泄情绪等影响群聊秩序的行为</li>
  <li>禁止使用第三方插件发送特殊消息；禁止讨论多人游戏作弊工具</li>
  <li>本群仅支持 HMCL 启动器相关问题。PCL 启动器用户请加入 978054335 群</li>
  <li>请勿重复发送文件，如需重新获取关注，请引用之前发送的消息</li>
  <li>因人数限制，已解决问题的用户会被移出群聊。如遇新问题可再次加入</li>
  <li>本群仅处理游戏崩溃相关问题，其他话题请到其他群讨论</li>
</ul>

<hr>
<!----{{'>'}}
<button id="close-btn" class="btn btn--large align-center" disabled>请认真阅读并等待 <span id="countdown">5</span> 秒</button>
{% include post_pagination.html %}
</div>
{{'<'}}!---->

如果你遇到了游戏非正常退出问题，欢迎加入报错崩溃交流群咨询解决方案：[Minecraft 报错崩溃交流群 (666546887)](https://qm.qq.com/q/nG0Ti1kJri)

![](/assets/img/docs/groups/crash.png)

**本群仅处理游戏报错崩溃问题，无关话题请前往其他群聊讨论。**

由于加群人数过多，我们会移出问题已解决的用户。如果你在被移出后遇到了新的问题需要求助，你可以再次加群。

<!----{{'>'}}
<style>
#alert-modal {
  text-align: left;
  max-width: 768px;
  margin: 0 auto !important;
  position: relative;
  overflow: auto;
}
#alert-modal ul button {
  background-color: #5c6bc0;
  color: #ffffff;
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const status = settings.get("crash_support_group_rule");
  if (status === "agree") {
    return;
  }
  $.magnificPopup.open({
    items: { src: '#alert-modal', type: 'inline' },
    modal: true
  });
  const $text = $("#countdown");
  const $btn = $("#close-btn");
  let sec = parseInt($text.text(), 10) || 10;
  const timer = setInterval(function() {
    $text.text(--sec);
    if (sec <= 0) {
      clearInterval(timer);
      $text.parent().text("我已了解");
      $btn.prop("disabled", false);
    }
  }, 1000);
  $btn.on("click", function() {
    settings.set("crash_support_group_rule", "agree");
    $.magnificPopup.close();
  });
});
</script>

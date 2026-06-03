---
title: 加入 HMCL 报错崩溃交流群
excerpt: HMCL 报错崩溃交流群仅处理游戏报错与崩溃问题
date: 2024-03-05 17:00:00 +0800
author: zkitefly
classes: wide
toc: false
---

<div id="alert-modal" class="notice mfp-hide">
  <h1 id="" class="text-center">加入群聊前请注意</h1>
  <ul class="task-list">
    <li>
      <details open>
        <summary>游戏非正常退出时请点击左下角导出游戏崩溃日志按钮（注意不是日志按钮），并完整发送生成的报错压缩包</summary>
        <div class="notice--success"><img src="/assets/img/docs/groups/button-1.png" title="导出游戏崩溃日志" decoding="async"> <img src="/assets/img/docs/groups/button-2.png" title="日志" decoding="async"></div>
      </details>
    </li>
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
  <div>
    <a class="btn btn--inverse" href="{{ page.previous.url | relative_url }}">上一页</a>
    <a class="btn btn--inverse" href="{{ page.next.url | relative_url }}">下一页</a>
    <button id="close-btn" class="btn align-right" disabled>我已了解</button>
  </div>
  {{'<'}}!---->
</div>

如果你遇到了游戏非正常退出问题，欢迎加入报错崩溃交流群咨询解决方案：[Minecraft 报错崩溃交流群 (666546887)](https://qm.qq.com/q/nG0Ti1kJri)

<img src="/assets/img/docs/groups/crash.png" alt="Minecraft 报错崩溃交流群 (666546887) 二维码" decoding="async">

**本群仅处理游戏报错崩溃问题，无关话题请前往其他群聊讨论。**

由于加群人数过多，我们会移出问题已解决的用户。如果你在被移出后遇到了新的问题需要求助，你可以再次加群。

<!----{{'>'}}
<style>.mfp-content { max-width: 798px; }</style>
<script>
window.addEventListener("load", () => {
  const status = settings.get("crash_support_group_rule");
  if (status === "agree") return;
  $.magnificPopup.open({
    items: { src: '#alert-modal', type: 'inline' },
    modal: true
  });
  let sec = 10;
  const $btn = $("#close-btn");
  $btn.attr("data-countdown", sec);
  const timer = setInterval(function() {
    $btn.attr("data-countdown", --sec);
    $btn.text("请等待 " + sec + " 秒");
    if (sec <= 0) {
      clearInterval(timer);
      $btn.text("我已了解");
      $btn.prop("disabled", false);
    }
  }, 1000);
  $btn.on("click", () => {
    settings.set("crash_support_group_rule", "agree");
    $.magnificPopup.close();
  });
});
</script>

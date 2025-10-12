---
title: 加入 HMCL 报错崩溃交流群
date: 2024-03-05 17:00:00 +0800
author: zkitefly
---

![](/assets/img/docs/groups/crash.png)

如果你遇到了游戏非正常退出问题，欢迎加入报错崩溃交流群咨询解决方案：[Minecraft 报错崩溃交流群 (666546887)](https://qm.qq.com/q/nG0Ti1kJri)

**本群仅处理游戏报错崩溃问题，无关话题请前往其他群聊讨论。**

由于加群人数过多，我们会移出问题已解决的用户。如果你在被移出后遇到了新的问题需要求助，你可以再次加群。

<script>
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;

    let timeLeft = 10 ; // 倒计时秒数
    const closeButton = document.createElement('button');
    closeButton.textContent = '我已了解';
    closeButton.style.cssText = `
        display: block;
        margin: 15px auto 0;
        padding: 8px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: not-allowed;
        opacity: 0.6;
    `;
    closeButton.disabled = true;

    modalContent.innerHTML = `
        <h1>⚠️加入群聊前请注意⚠️</h2>
        <ul>
            <li>游戏非正常退出时，请点击左下角 <img src="/assets/img/docs/groups/button-1.png" style="display: inline; height: 1.5em; vertical-align: middle;" title="导出游戏崩溃日志"> 按钮（不是 <img src="/assets/img/docs/groups/button-2.png" style="display: inline; height: 1.5em; vertical-align: middle;" title="日志"> 按钮），并完整发送生成的报错压缩包</li>
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
        <p style="text-align: center; margin-top: 15px;">
            请等待 <span id="countdown">${timeLeft}</span> 秒，请认真阅读注意事项
        </p>
    `;

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 倒计时功能
    const countdownInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('countdown').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').parentElement.textContent = '请点击下方按钮关闭';
            closeButton.disabled = false;
            closeButton.style.cursor = 'pointer';
            closeButton.style.opacity = '1';
        }
    }, 1000);

    // 添加关闭按钮事件
    closeButton.addEventListener('click', () => {
        if (!closeButton.disabled) {
            document.body.removeChild(modal);
        }
    });
});
</script>

---
title: 多人联机反馈
date: 2025-10-07 18:44:00 +0800
author: Burning_TNT
classes: wide
toc: false
---

## Terracotta | 陶瓦联机

<!--{% comment %}-->
> [!TIP]
> 欢迎您填写[反馈表单](https://account.wps.cn/?cb=https%3A%2F%2Faccount.kdocs.cn%2Fpassport%2Fsinglesign%3Fcb%3Dhttps%253A%252F%252Ff.kdocs.cn%252Fksform%252Fw%252Fwrite%252FnjMwdtgD%253Fchannel%253Dmdlsjp%2523routePromt%26form%3Df.kdocs.cn&reload=true&from=v1-wap-wps-login&wxpluginappid=wx53f22ed6915cdf17&wxpluginpath=pages%2Fweb%2Fweb&wxpluginquery=url%3Dhttps%3A%2F%2Ff.wps.cn%2Fksform%2Fw%2Fwrite%2FnjMwdtgD%3Fchannel%3Dmdlsjp%23routePromt%26source%3Dweb_login&qrcode=kdocs&plusreffer=f.kdocs.cn)。
<!--{% endcomment %}-->

<!----{{ '>' }}

> 欢迎您填写[反馈表单](https://account.wps.cn/?cb=https%3A%2F%2Faccount.kdocs.cn%2Fpassport%2Fsinglesign%3Fcb%3Dhttps%253A%252F%252Ff.kdocs.cn%252Fksform%252Fw%252Fwrite%252FnjMwdtgD%253Fchannel%253Dmdlsjp%2523routePromt%26form%3Df.kdocs.cn&reload=true&from=v1-wap-wps-login&wxpluginappid=wx53f22ed6915cdf17&wxpluginpath=pages%2Fweb%2Fweb&wxpluginquery=url%3Dhttps%3A%2F%2Ff.wps.cn%2Fksform%2Fw%2Fwrite%2FnjMwdtgD%3Fchannel%3Dmdlsjp%23routePromt%26source%3Dweb_login&qrcode=kdocs&plusreffer=f.kdocs.cn)<span id="feedback-auto-redirect"></span>。
{: .notice--success }

{{ '<' }}!---->

我们注意到了 EasyTier 项目。它提供了一种简单、安全、去中心化的异地组网方案，足以承载 Minecraft 的联机需求。
在 EasyTier 开发团队的帮助下，我们决定重新在启动器内提供联机服务。

如要体验陶瓦联机，请遵循以下步骤：打开 HMCL，转到 **设置** - **通用**，展开 **启动器更新** ，勾选 **开发版** 。
然后，请根据启动器提示更新到 **3.7.0.300** 或以上版本，之后您可通过 HMCL 左下角 **多人联机** 入口体验 Terracotta | 陶瓦联机。

目前，HMCL、PCL CE 已实现最基本的互通支持。我们欢迎其他启动器接入 Scaffolding 协议实现更完整的互通功能。

为向尽可能多的玩家免费开放基本联机功能，陶瓦联机将极大程度上基于 P2P。
简单而言，陶瓦联机不会比市面上基于服务器中继的联机方案稳定，但其开销将远远低于其他联机方案。
需要特别提醒的是：联机功能不会更不能取代 Minecraft: Java Edition 服务器。
它的主要目标依然是让朋友之间能共同游玩，而不是长时间的对外开放。

最后，我想感谢一切参与到 EasyTier、Terracotta \| 陶瓦联机开发和测试、为 EasyTier 提供打洞和中继服务器的社区志愿者。欢迎大家访问 easytier.cn 深入了解这一项目。

<!----{{ '>' }}
<script>
  var countdown = 10;
  var interval = setInterval(function() {
    if (countdown > 0) {
      document.getElementById("feedback-auto-redirect").innerHTML = "，页面将于 " + countdown-- + " 秒后自动跳转，您也可以手动<a href=\"javascript:;\" onclick=\"stopRedirect()\">取消跳转</a>";
    }
    else {
      clearInterval(interval);
      window.location.href = "https://account.wps.cn/?cb=https%3A%2F%2Faccount.kdocs.cn%2Fpassport%2Fsinglesign%3Fcb%3Dhttps%253A%252F%252Ff.kdocs.cn%252Fksform%252Fw%252Fwrite%252FnjMwdtgD%253Fchannel%253Dmdlsjp%2523routePromt%26form%3Df.kdocs.cn&reload=true&from=v1-wap-wps-login&wxpluginappid=wx53f22ed6915cdf17&wxpluginpath=pages%2Fweb%2Fweb&wxpluginquery=url%3Dhttps%3A%2F%2Ff.wps.cn%2Fksform%2Fw%2Fwrite%2FnjMwdtgD%3Fchannel%3Dmdlsjp%23routePromt%26source%3Dweb_login&qrcode=kdocs&plusreffer=f.kdocs.cn";
    }
  }, 1000);
  function stopRedirect() {
    clearInterval(interval);
    document.getElementById("feedback-auto-redirect").innerHTML = "";
  }
</script>
{{ '<' }}!---->

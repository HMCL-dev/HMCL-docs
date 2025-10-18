(function ($) {
  var pluginName = "autoRedirect";

  function Plugin(element, options) {
    this.$el = $(element);
    this.settings = $.extend({}, $.fn[pluginName].defaults, options, this.$el.data());
    this.timer = null;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var self = this;
      var delay = parseInt(self.settings.delay, 10);
      var href = self.$el.attr("href");

      if (!href) return;

      var $info = $("<span class=\"redirect-info\"> (将在 <span class=\"time\">" + delay + "</span> 秒后自动跳转，您也可以<a href=\"javascript:;\" class=\"cancel-redirect\">取消自动跳转</a>) </span>");
      self.$el.after($info);

      self.timer = setInterval(function () {
        delay--;
        $info.find(".time").text(delay);
        if (delay <= 0) {
          clearInterval(self.timer);
          window.location.href = href;
        }
      }, 1000);

      $info.on("click", ".cancel-redirect", function () {
        clearInterval(self.timer);
        $info.text("");
      });
    },
    destroy: function () {
      clearInterval(this.timer);
      this.$el.next(".redirect-info").remove();
    }
  };

  $.fn[pluginName] = function (option) {
    return this.each(function () {
      var $this = $(this);
      var instance = $this.data(pluginName);

      if (!instance) {
        $this.data(pluginName, new Plugin(this, option));
      } else if (typeof option === "string" && instance[option]) {
        instance[option]();
      }
    });
  };

  $.fn[pluginName].defaults = {
    delay: 5
  };

  $(function () {
    $("a[data-redirect]").each(function () {
      $(this)[pluginName]();
    });
  });

})(jQuery);

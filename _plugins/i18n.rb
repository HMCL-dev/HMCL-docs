# frozen_string_literal: true

# HMCL 文档站多语言支持
#
# 约定：
#   * 简体中文是默认语言，URL 保持不变（例如 /launcher/isolation.html）。
#   * 其他语言通过文件名后缀区分，例如 _launcher/isolation_en.md 会自动生成
#     英文页面 /en/launcher/isolation.html；翻译文件无需在 front matter 里
#     写 permalink / lang / locale。
#   * 翻译页面会自动从对应的默认语言页面继承 URL，并在正文中把站内链接
#     改写为当前语言版本（仅当目标页面存在对应翻译时）。
#   * 站点标题、描述、导航会按当前页面的语言切换。
#
# 支持的语言由 _config.yml 中的 i18n.locales 指定，默认语言由
# i18n.default_locale 指定。
module HMCLDocs
  module I18n
    FALLBACK_DEFAULT_LOCALE = "zh"
    MISSING = Object.new.freeze

    class << self
      attr_reader :default_locale

      # 读取所有页面/文档，识别翻译文件并统一分配 lang、permalink，
      # 同时记录默认语言 URL 到各语言 URL 的映射，用于语言切换和链接改写。
      def setup(site)
        config = site.config["i18n"] || {}
        @default_locale = config["default_locale"] || FALLBACK_DEFAULT_LOCALE
        locales = config["locales"] || [@default_locale, "en"]
        @translations = {}
        locales.each { |locale| @translations[locale] = {} }

        @defaults = {
          "title"       => site.config["title"],
          "description" => site.config["description"],
          "navigation"  => site.data["navigation"],
        }

        items = site.pages + site.documents
        by_path = {}
        items.each { |item| by_path[relative_path(item)] = item }

        items.each do |item|
          translation = translation_of(item)
          if translation.nil?
            item.data["lang"] ||= @default_locale
          else
            setup_translation(item, translation, by_path)
          end
        end

        # 为默认语言页面挂上翻译版本的地址，供语言切换器使用。
        items.each do |item|
          next unless item.data["lang"] == @default_locale

          localized = @translations.find do |locale, mapping|
            locale != @default_locale && mapping.key?(item.url)
          end
          next if localized.nil?

          locale, mapping = localized
          item.data["alternate_locale"] = locale
          item.data["translation_url"] = mapping[item.url]
        end
      end

      # 页面渲染前切换到当前页面对应的站点级信息与数据文件
      # （例如 _data/en/navigation.yml、_data/en/groups.csv 会覆盖同名数据）。
      def activate(site, lang)
        restore_data(site)
        info = site.data.dig("i18n", lang) || {}
        site.config["title"] = info["title"] || @defaults["title"]
        site.config["description"] = info["description"] || @defaults["description"]

        return if lang == @default_locale

        lang_data = site.data[lang]
        return unless lang_data.is_a?(Hash)

        @data_overrides = {}
        lang_data.each do |key, value|
          @data_overrides[key] = site.data.key?(key) ? site.data[key] : MISSING
          site.data[key] = value
        end
      end

      # 全部页面渲染完成后恢复默认语言，避免影响 post_write 阶段的插件。
      def reset(site)
        return if @defaults.nil?

        restore_data(site)
        site.config["title"] = @defaults["title"]
        site.config["description"] = @defaults["description"]
      end

      # 把翻译页面正文中的站内链接改写为当前语言版本。
      def rewrite_links(content, baseurl, lang)
        mapping = @translations && @translations[lang]
        return content if mapping.nil? || mapping.empty?

        content.gsub(/href="([^"]*)"/) do
          original = Regexp.last_match(1)
          full_match = Regexp.last_match(0)

          # 跳过外部链接、锚点、协议相对链接
          next full_match if original.match?(%r!\A(?:[a-z][a-z0-9+.-]*:|//|#)!i)

          href = original
          if !baseurl.to_s.empty? && href.start_with?("#{baseurl}/")
            href = href.delete_prefix(baseurl)
          end
          next full_match unless href.start_with?("/")

          path, suffix = href.split(/(?=[?#])/, 2)
          localized = mapping[path]
          next full_match if localized.nil?

          "href=\"#{baseurl}#{localized}#{suffix}\""
        end
      end

      private

      # 如果文件名带有某个非默认语言的后缀，返回 [locale, 去掉后缀的文件名]，
      # 否则返回 nil。
      def translation_of(item)
        path = relative_path(item)
        ext = File.extname(path)
        basename = File.basename(path, ext)
        @translations.each_key do |locale|
          next if locale == @default_locale

          suffix = "_#{locale}"
          next unless basename.end_with?(suffix)

          translated_name = "#{basename.delete_suffix(suffix)}#{ext}"
          dir = File.dirname(path)
          source_path = dir == "." ? translated_name : File.join(dir, translated_name)
          return [locale, source_path]
        end
        nil
      end

      def setup_translation(item, translation, by_path)
        locale, source_path = translation
        item.data["lang"] = locale
        item.data["locale"] = locale

        source = by_path[source_path]
        if source.nil?
          Jekyll.logger.warn "I18n:", "找不到 #{relative_path(item)} 对应的默认语言原文（#{source_path}），无法生成翻译页面"
          return
        end

        source_url = source.url
        localized_url = "/#{locale}#{source_url}"
        item.data["permalink"] = localized_url
        item.data["alternate_locale"] = @default_locale
        item.data["translation_url"] = source_url
        @translations[locale][source_url] = localized_url
      end

      def relative_path(item)
        if item.respond_to?(:relative_path)
          item.relative_path
        else
          item.path.sub(%r!\A/!, "")
        end
      end

      def restore_data(site)
        return if @data_overrides.nil?

        @data_overrides.each do |key, value|
          if value == MISSING
            site.data.delete(key)
          else
            site.data[key] = value
          end
        end
        @data_overrides = nil
      end
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  HMCLDocs::I18n.setup(site)
end

Jekyll::Hooks.register [:pages, :documents], :pre_render do |item, _payload|
  HMCLDocs::I18n.activate(item.site, item.data["lang"] || HMCLDocs::I18n.default_locale)
end

Jekyll::Hooks.register [:pages, :documents], :post_convert do |item|
  lang = item.data["lang"]
  next if lang.nil? || lang == HMCLDocs::I18n.default_locale

  baseurl = item.site.config["baseurl"].to_s
  item.content = HMCLDocs::I18n.rewrite_links(item.content, baseurl, lang)
end

Jekyll::Hooks.register :site, :post_render do |site|
  HMCLDocs::I18n.reset(site)
end

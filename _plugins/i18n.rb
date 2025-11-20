module JekyllFeed
  class Generator < Jekyll::Generator
    def feed_source_path
      @feed_source_path ||= File.expand_path "_layouts/feed.xml", @site.config["source"]
    end
  end
end

module Jekyll
  class JekyllSitemap < Jekyll::Generator
    def source_path(file = "sitemap.xml")
      File.expand_path "_layouts/#{file}", @site.config["source"]
    end

    def sitemap
      site_map = PageWithoutAFile.new(@site, __dir__, "", "sitemap.xml")
      site_map.content = File.read(source_path).gsub(MINIFY_REGEX, "")
      site_map.data["layout"] = nil
      site_map.data["static_files"] = static_files.map(&:to_liquid)
      site_map.data["xsl"] = file_exists?("sitemap.xsl")
      site_map.data["i18n"] = false
      site_map
    end

    def robots
      robots = PageWithoutAFile.new(@site, __dir__, "", "robots.txt")
      robots.content = File.read(source_path("robots.txt"))
      robots.data["layout"] = nil
      robots.data["i18n"] = false
      robots
    end
  end

  class DataReader
    def sanitize_filename(name)
      name.gsub(%r![^\w\s.-]+|(?<=^|\b\s)\s+(?=$|\s?\b)!, "")
          .gsub(%r!\s+!, "_")
    end
  end
end

module I18nFilter
  def i18n(hash, locale, key)
    return nil unless hash.is_a?(Hash) && locale.is_a?(String) && key.is_a?(String)
    return nil unless hash.key?(key)

    locale_key = "#{key}.#{locale}"
    return { "locale" => locale, "data" => hash[locale_key] } if hash.key? locale_key

    site = @context.registers[:site]
    default_locale = site.config["locale"].is_a?(String) ? site.config["locale"] : "en"
    { "locale" => default_locale, "data" => hash[key] }
  end
end

Liquid::Template.register_filter(I18nFilter)

Jekyll::Hooks.register [:site], :pre_render do |site|
  default_locale = site.config["locale"] || "en"
  locales = Array(site.config["locales"] || default_locale)
  locales.unshift(default_locale) unless locales.include?(default_locale)
  return if locales.empty?

  plugins = site.data["plugins"]
  return unless plugins.is_a?(Hash)

  i18n_data = plugins["i18n"]
  fallback_data = i18n_data.is_a?(Hash) ? i18n_data["fallback"] : nil
  return unless fallback_data.is_a?(Hash)

  docs_map = {}

  (site.pages + site.documents).each do |doc|
    next unless doc.data["i18n"] == true
    next unless doc.is_a?(Jekyll::Page) or doc.is_a?(Jekyll::Document)

    path_parts = doc.path.split("/")
    next if path_parts.empty?

    basename = path_parts[-1]
    basename_parts = basename.split(".")

    doc_locale = (basename_parts.length < 3 || !locales.include?(basename_parts[-2])) ? default_locale : basename_parts[-2]
    path_parts[-1] = "#{basename_parts[0..-3].join(".")}.#{basename_parts[-1]}" unless doc_locale == default_locale
    default_doc_path = path_parts.join('/')
    docs_map[default_doc_path] ||= {}
    docs_map[default_doc_path][doc_locale] = doc
  end

  docs_map.each_value do |docs|
    default_doc = docs[default_locale]
    next unless default_doc
    default_doc.data["fallbacks"] = {}
    default_doc.data["translations"] = docs

    locales.each do |locale|
      if docs[locale]
        docs[locale].data["locale"] = locale
        docs[locale].data["origin"] = docs[locale]
        docs[locale].data["default"] = default_doc
        unless locale == default_locale
          docs[locale].data["permalink"] = "/#{locale}#{default_doc.url}"
          docs[locale].instance_variable_set(:@url, nil)
        end
      else
        fallback_locale = fallback_data[locale]
        while fallback_locale
          fallback_doc = docs[fallback_locale]
          break if fallback_doc
          fallback_locale = fallback_data[fallback_locale]
        end
        fallback_doc ||= default_doc

        if fallback_doc.is_a?(Jekyll::Page)
          base, dir, name = fallback_doc.instance_variable_get(:@base), fallback_doc.instance_variable_get(:@dir), fallback_doc.instance_variable_get(:@name)
          new_doc = Jekyll::PageWithoutAFile.new(fallback_doc.site, base, dir, name)
          site.pages << new_doc
        else
          path, collection = fallback_doc.instance_variable_get(:@path), fallback_doc.collection
          new_doc = Jekyll::Document.new(path, site: fallback_doc.site, collection: collection)
          collection.docs << new_doc
        end

        default_doc.data["fallbacks"][locale] = new_doc

        new_doc.content = fallback_doc.content
        fallback_doc.data.each { |k, v| new_doc.data[k] = v }
        new_doc.data["permalink"] = "/#{locale}#{fallback_doc.url}"
        new_doc.data["locale"] = locale
      end
    end
  end
end

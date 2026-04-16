begin
  require "webp-ffi"
rescue LoadError; end

module KramdownEnhancer
  GITHUB_LINK_REGEX = /\b(?:GP-\d+|GC-[0-9a-f]{7})\b/
  BLOCKQUOTE_TYPES = {
    note: "notice--info",
    tip: "notice--success",
    important: "notice--primary",
    warning: "notice--warning",
    caution: "notice--danger",
  }

  class << self
    def webp
      @webp ||= {}
    end

    def file
      @file ||= {}
    end

    def baseurl
      @baseurl
    end

    def baseurl=(input)
      @baseurl =
        if input.is_a?(String) && !input.empty?
          str = input.start_with?("/") ? input : "/#{input}"
          str.chomp("/")
        else
          ""
        end
    end
  end

  class WebpFile < Jekyll::StaticFile
    def write(dest)
      true
    end
  end

  module Html
    def convert_a(el, indent)
      if el.attr["href"].is_a?(String) && !el.options[:relative]
        el.attr["href"] = relative_url(el.attr["href"])
        el.options[:relative] = true
      end

      super
    end

    def convert_img(el, indent)
      if el.attr["src"].is_a?(String) && !el.options[:relative]
        src = el.attr["src"]
        el.attr["src"] = relative_url(src)
        el.options[:relative] = true

        if KramdownEnhancer.webp[src] && !el.options[:webp] && !el.options[:picture]
          webp_src = KramdownEnhancer.webp[src]
          pic = Kramdown::Element.new(:html_element, "picture")
          pic.children << Kramdown::Element.new(:html_element, "source", { "srcset" => relative_url(webp_src), "type" => "image/webp" })
          el.options[:picture] = true
          el.options[:webp] = true
          pic.children << el
          return convert_html_element(pic, indent)
        end
      end

      super
    end

    def convert_blockquote(el, indent)
      p = el.children.first
      return super if p&.type != :p || p.children.empty?

      first = p.children.first
      return super unless first&.type == :text

      text = first.value.downcase
      KramdownEnhancer::BLOCKQUOTE_TYPES.each do |type, class_name|
        prefix = "[!#{type}]"
        prefix_with_newline = "#{prefix}\n"

        # case A: <p>[!NOTE]</p>
        if text == prefix
          el.attr["class"] = [el.attr["class"], class_name].compact.join(" ")
          p.children.shift
          break
        # case B: <p>[!NOTE]\n some text</p>
        elsif text.start_with?(prefix_with_newline)
          el.attr["class"] = [el.attr["class"], class_name].compact.join(" ")
          first.value = first.value[prefix_with_newline.length..-1] || ""
          break
        end
      end

      super
    end

    def convert_html_element(el, indent)
      unless el.options[:relative]
        if el.value == "a" && el.attr["href"].is_a?(String)
          el.attr["href"] = relative_url(el.attr["href"])
          el.options[:relative] = true
        elsif el.value == "img" && el.attr["src"].is_a?(String)
          src = el.attr["src"]
          el.attr["src"] = relative_url(el.attr["src"])
          el.options[:relative] = true

          if KramdownEnhancer.webp[src] && !el.options[:webp] && !el.options[:picture]
            webp_src = KramdownEnhancer.webp[src]
            pic = Kramdown::Element.new(:html_element, "picture")
            pic.children << Kramdown::Element.new(:html_element, "source", { "srcset" => relative_url(webp_src), "type" => "image/webp" })
            el.options[:webp] = true
            pic.children << el
            return convert_html_element(pic, indent)
          end
        elsif el.value == "picture"
          el.children.each do |child|
            child.options[:picture] = true
          end
        end
      end
      super(el, indent)
    end

    def convert_text(el, indent)
      return super(el, indent) unless !el.options[:github_link] && KramdownEnhancer::GITHUB_LINK_REGEX.match?(el.value)
      list = el.value.split(KramdownEnhancer::GITHUB_LINK_REGEX)
      el.type = :html_element
      el.value = "span"
      el.children = list.reject(&:empty?).map do |item|
        if KramdownEnhancer::GITHUB_LINK_REGEX.match(item)
          href =
            if item.start_with?("GP-")
              "https://github.com/HMCL-dev/HMCL/pull/#{item[3..]}"
            else
              "https://github.com/HMCL-dev/HMCL/commit/#{item[3..]}"
            end
          link = Kramdown::Element.new(:a, nil, {"href": href, "target": "_blank"})
          link.children = [Kramdown::Element.new(:text, item, nil, :github_link => true)]
          link
        else
          Kramdown::Element.new(:text, item, nil, :github_link => true)
        end
      end
      convert_html_element(el, indent)
    end

    private

    def relative_url(input)
      if input.is_a?(String) && input.start_with?("/")
        input = input.start_with?("/") ? input : "/#{input}"
        uri = Addressable::URI.parse(input)
        if uri
          if uri.path.length > 1
            file = KramdownEnhancer.file[uri.path[1..]]
            uri.path = file.url if file
          end
          uri.path = "#{KramdownEnhancer.baseurl}#{uri.path}"
          return uri.to_s
        end
      end
      input
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  KramdownEnhancer.baseurl = site.config["baseurl"]
  webp_list = []
  webp_enabled = defined?(WebP)
  site.each_site_file do |file|
    KramdownEnhancer.file[file.relative_path] = file
    if file.is_a?(Jekyll::StaticFile)
      url = "#{file.url}.webp"
      source = "#{file.path}.webp"
      destination = File.join(site.dest, url)
      if File.exist?(source)
        KramdownEnhancer.webp[file.url] = url
      elsif webp_enabled && %w[.png .jpg .jpeg .tif .tiff].include?(file.extname.downcase)
        FileUtils.mkdir_p(File.dirname(destination))
        WebP.encode(file.path, destination)
        webp_list.push(KramdownEnhancer::WebpFile.new(site, site.dest, File.dirname(url), File.basename(url)))
        KramdownEnhancer.webp[file.url] = url
      end
    end
  end
  site.static_files.concat(webp_list)
  Kramdown::Converter::Html.prepend(KramdownEnhancer::Html)
end

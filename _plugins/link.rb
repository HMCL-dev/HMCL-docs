require "webp-ffi" if ENV["WEBP"] == "enabled"

module Link
  class WebpFile < Jekyll::StaticFile
    def write(dest)
      true
    end
  end

  module HtmlExtension
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

    def convert_a(el, indent)
      if el.attr["href"].is_a?(String) && !el.options[:relative]
        el.attr["href"] = relative_url(el.attr["href"])
        el.options[:relative] = true
      end
      super(el, indent)
    end

    def convert_img(el, indent)
      if el.attr["src"].is_a?(String) && !el.options[:relative]
        src = el.attr["src"]
        el.attr["src"] = relative_url(src)
        el.options[:relative] = true

        if Link::HtmlExtension.webp[src] && !el.options[:webp] && !el.options[:picture]
          webp_src = Link::HtmlExtension.webp[src]
          pic = Kramdown::Element.new(:html_element, "picture")
          pic.children << Kramdown::Element.new(:html_element, "source", { "srcset" => relative_url(webp_src), "type" => "image/webp" })
          el.options[:picture] = true
          el.options[:webp] = true
          pic.children << el
          return convert_html_element(pic, indent)
        end
      end

      super(el, indent)
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

          if Link::HtmlExtension.webp[src] && !el.options[:webp] && !el.options[:picture]
            webp_src = Link::HtmlExtension.webp[src]
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

    private

    def relative_url(input)
      if input.is_a?(String) && input.start_with?("/")
        input = input.start_with?("/") ? input : "/#{input}"
        uri = Addressable::URI.parse(input)
        if uri
          if uri.path.length > 1
            file = Link::HtmlExtension.file[uri.path[1..]]
            uri.path = file.url if file
          end
          uri.path = "#{Link::HtmlExtension.baseurl}#{uri.path}"
          return uri.to_s
        end
      end
      input
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  Link::HtmlExtension.baseurl = site.config["baseurl"]
  webp_list = []
  site.each_site_file do |file|
    Link::HtmlExtension.file[file.relative_path] = file
    if file.is_a?(Jekyll::StaticFile)
      url = "#{file.url}.webp"
      source = "#{file.path}.webp"
      destination = File.join(site.dest, url)
      if File.exist?(source)
        Link::HtmlExtension.webp[file.url] = url
      elsif ENV["WEBP"] == "enabled" && %w[.png .jpg .jpeg .tif .tiff].include?(file.extname.downcase)
        FileUtils.mkdir_p(File.dirname(destination))
        WebP.encode(file.path, destination)
        webp_list.push(Link::WebpFile.new(site, site.dest, File.dirname(url), File.basename(url)))
        Link::HtmlExtension.webp[file.url] = url
      end
    end
  end
  site.static_files.concat(webp_list)
  Kramdown::Converter::Html.prepend(Link::HtmlExtension)
end

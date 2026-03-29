module Link
  module HtmlExtension
    class << self
      def relative_path_to_file
        @relative_path_to_file ||= {}
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
      unless el.options[:relative]
        el.attr["href"] = relative_url(el.attr["href"])
        el.options[:relative] = true
      end
      super
    end

    def convert_img(el, indent)
      unless el.options[:relative]
        el.attr["src"] = relative_url(el.attr["src"])
        el.options[:relative] = true
      end
      super
    end

    def convert_html_element(el, indent)
      unless el.options[:relative]
        if el.value == "a"
          el.attr["href"] = relative_url(el.attr["href"])
          el.options[:relative] = true
        elsif el.value == "img"
          el.attr["src"] = relative_url(el.attr["src"])
          el.options[:relative] = true
        end
      end
      super
    end

    private

    def relative_url(input)
      if input.is_a?(String) && input.start_with?("/")
        input = input.start_with?("/") ? input : "/#{input}"
        uri = Addressable::URI.parse(input)
        if uri
          if uri.path.length > 1
            file = Link::HtmlExtension.relative_path_to_file[uri.path[1..]]
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

Kramdown::Converter::Html.prepend(Link::HtmlExtension)

Jekyll::Hooks.register :site, :post_read do |site|
  Link::HtmlExtension.baseurl = site.config["baseurl"]
  site.each_site_file do |file|
    Link::HtmlExtension.relative_path_to_file[file.relative_path] = file
  end
end

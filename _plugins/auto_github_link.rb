module AutoGithubLink
  module HtmlExtension
    GITHUB_LINK_REGEX = /\b(GP-\d+)|(GC-[0-9a-f]{7})\b/

    def convert_text(el, indent)
      return super(el, indent) unless !el.options[:github_link] && GITHUB_LINK_REGEX.match?(el.value)
      list = el.value.split(GITHUB_LINK_REGEX)
      el.type = :html_element
      el.value = "span"
      el.children = list.reject(&:empty?).map do |item|
        if GITHUB_LINK_REGEX.match(item)
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
  end
end

Kramdown::Converter::Html.prepend(AutoGithubLink::HtmlExtension)

require "nokogiri"

Jekyll::Hooks.register [:pages, :documents], :post_convert do |doc|
  next unless doc.output_ext == ".html"
  site = doc.site
  next unless site.data["plugins"]
  alert_type = site.data["plugins"]["auto_alert"]
  next unless alert_type

  fragment = Nokogiri::HTML::DocumentFragment.parse(doc.content)
  fragment.css("blockquote").each do |item|
    first_child = item.at_css("*:first-child")
    next unless first_child
    next unless first_child.name == "p"

    text = first_child.text.downcase
    alert_type.each do |type, data|
      if text == "[!#{type}]"
        item['class'] = [item['class'], data["class_name"]].compact.join(" ")
        first_child.name = "div"
        first_child.inner_html = "<strong>#{data["title"]}</strong>"
        break
      elsif text.start_with? "[!#{type}]\n"
        item['class'] = [item['class'], data["class_name"]].compact.join(" ")
        first_child.add_previous_sibling "<div><strong>#{data["title"]}</strong></div>"
        first_child.content = first_child.content.sub(/\A#{Regexp.escape("[!#{type}]\n")}/i, "")
        break
      end
    end
  end
  doc.content = fragment.to_html
end

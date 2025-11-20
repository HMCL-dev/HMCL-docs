require "nokogiri"
require "addressable/uri"

def auto_webp(doc)
  return unless doc.output_ext == ".html"

  site = doc.site
  liquid_context = Liquid::Context.new({}, {}, { site: site })

  fragment = Nokogiri::HTML::DocumentFragment.parse(doc.content)
  fragment.css("img[src^=\"/assets/\"]").each do |item|
    next unless item["src"]
    uri = Addressable::URI.parse(item["src"])
    next if uri.nil?

    source_path = uri.path
    webp_path = "#{source_path}.webp"
    begin
      uri.path = Liquid::Template.parse("{% link #{source_path[1..]} %}").render!(liquid_context)
      item["src"] = uri.to_s
      uri.path = Liquid::Template.parse("{% link #{webp_path[1..]} %}").render!(liquid_context)
      item.wrap("<picture><source srcset=\"#{uri.to_s}\" type=\"image/webp\"></picture>")
    rescue => e
      # Ignored
    end
  end
  doc.content = fragment.to_html
end

require "nokogiri"
require "addressable/uri"

def auto_link(doc)
  return unless doc.output_ext == ".html"

  site = doc.site
  liquid_context = Liquid::Context.new({}, {}, { site: site })

  process_uri = lambda do |path|
    uri = Addressable::URI.parse(path)
    if uri&.path
      uri.path = Liquid::Template.parse("{% link #{uri.path[1..]} %}").render!(liquid_context)
    end
    uri.to_s
  end

  fragment = Nokogiri::HTML::DocumentFragment.parse(doc.content)
  fragment.css("[src^=\"/assets/\"],[src^=\"/\"][src$=\".md\"],[src^=\"/\"][src*=\".md#\"]").each do |item|
    if item["src"]
      item["src"] = process_uri.call(item["src"])
    end
  end
  fragment.css("[href^=\"/assets/\"],[href^=\"/\"][href$=\".md\"],[href^=\"/\"][href*=\".md#\"]").each do |item|
    if item["href"]
      item["href"] = process_uri.call(item["href"])
    end
  end
  doc.content = fragment.to_html
end

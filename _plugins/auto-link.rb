require "nokogiri"
require "addressable/uri"

Jekyll::Hooks.register [:pages, :documents], :post_convert do |doc|
  next unless doc.output_ext == ".html"

  site = doc.site
  baseurl = site.config["baseurl"].to_s
  liquid_context = Liquid::Context.new({}, {}, { site: site })

  process_uri = lambda do |path|
    uri = Addressable::URI.parse(path)
    if uri&.path && !uri.path&.start_with?(baseurl)
      uri.path = Liquid::Template.parse("{% link #{uri.path[1..]} %}").render!(liquid_context)
    end
    uri.to_s
  end

  fragment = Nokogiri::HTML::DocumentFragment.parse(doc.content)
  fragment.css("[src^=\"/\"]").each do |item|
    if item["src"]
      item["src"] = process_uri.call(item["src"])
    end
  end
  fragment.css("[href^=\"/\"]").each do |item|
    if item["href"]
      item["href"] = process_uri.call(item["href"])
    end
  end
  doc.content = fragment.to_html
end

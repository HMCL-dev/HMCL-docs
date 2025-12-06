require_relative "auto-link"
require_relative "auto-webp"

Jekyll::Hooks.register [:pages, :documents], :post_convert do |doc|
  auto_webp(doc)
  auto_link(doc)
end

require "kramdown/converter/html"
require "kramdown/element"

module Alert
  module HtmlExtension
    def convert_blockquote(el, indent)
      types = %w(note tip important warning caution)
      first = el.children.first
      return super unless first&.type == :p
      return super if first.children.empty?

      target = first.children.first
      return super unless target&.type == :text

      down = target.value.downcase
      types.each do |type|
        prefix = "[!#{type}]"

        # case A: <p>[!NOTE]</p>
        if down == prefix
          el.attr["data-type"] = type
          first.children.shift
          break
        end

        head = prefix + "\n"
        next unless down.start_with?(head)

        # case B: <p>[!NOTE]\n some text</p>
        el.attr["data-type"] = type
        target.value = target.value[head.length..-1] || ""
        break
      end

      super
    end
  end
end

Kramdown::Converter::Html.prepend(Alerts::HtmlExtension)

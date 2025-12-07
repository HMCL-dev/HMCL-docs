require "nokogiri"

Jekyll::Hooks.register [:pages, :documents], :post_convert do |doc|
  next unless doc.output_ext == ".html"
  site = doc.site
  next unless site.data["plugins"]
  alert_type = site.data["plugins"]["auto_alert"]
  next unless alert_type

  fragment = Nokogiri::HTML::DocumentFragment.parse(doc.content)
  # 遍历 HTML 中的所有 blockquote 标签
  fragment.css("blockquote").each do |item|
    # 找出第一个子节点，用于判断是否含有 [!type] 标记
    first_child = item.at_css("*:first-child")
    next unless first_child
    next unless first_child.name == "p"

    inner_html = first_child.inner_html.downcase

    # 遍历所有 alert 类型
    alert_type.each do |type, data|
      # 情况一：完整匹配 [!type] 形式 <p>[!NOTE]</p>
      if inner_html == "[!#{type}]"
        # 将 alert 类型对应的 class 加入 blockquote
        item['class'] = [item['class'], data["class_name"]].compact.join(" ")

        # 将 <p> 替换为 <div> 并插入标题
        first_child.name = "div"
        first_child.inner_html = "<strong>#{data["title"]}</strong>"
        break

      # 情况二：段落以 [!type]\n 开头 <p>[!NOTE]\n\n other content</p>
      elsif inner_html.start_with? "[!#{type}]\n"
        # 将 alert 类型对应的 class 加入 blockquote
        item['class'] = [item['class'], data["class_name"]].compact.join(" ")
        # 在原段落前插入标题 <div><strong>提示</strong></div><p>[!NOTE]\n\n other content</p>
        first_child.add_previous_sibling "<div><strong>#{data["title"]}</strong></div>"
        # 移除段落内容开头的 [!type]\n <div><strong>提示</strong></div><p>\n other content</p>
        first_child.inner_html = first_child.inner_html.sub(/\A#{Regexp.escape("[!#{type}]\n")}/i, "")
        break
      end
    end
  end
  doc.content = fragment.to_html
end

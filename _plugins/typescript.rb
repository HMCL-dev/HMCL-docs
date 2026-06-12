class TypescriptConverter < Jekyll::Converter
  CACHE = Jekyll::Cache.new("TypescriptConverter")

  def matches(ext)
    ext =~ /^\.ts$/i
  end

  def output_ext(ext)
    "#{ext}.js"
  end

  def convert(content)
    hash = Digest::SHA256.hexdigest(content)
    unless TypescriptConverter::CACHE.key?(hash)
      TypescriptConverter::CACHE[hash] = Script.call("typescript", code: content)
    end
    TypescriptConverter::CACHE[hash]
  end
end

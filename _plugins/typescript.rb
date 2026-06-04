require "execjs"

ExecJS.runtime = ExecJS::Runtimes::MiniRacer if ExecJS::Runtimes::MiniRacer.available?

module TypescriptCompiler
  class << self
    def context
      @context
    end

    def context=(input)
      @context = input
    end

    def compile(input)
      TypescriptCompiler.context.call("compile", input)
    end
  end
end

class TypescriptConverter < Jekyll::Converter
  def matches(ext)
    ext =~ /^\.ts$/i
  end

  def output_ext(ext)
    "#{ext}.js"
  end

  def convert(content)
    TypescriptCompiler.compile(content)
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  source = File.read(site.in_source_dir("_plugins/vendor/typescript/typescript.min.js"))
  source += "\n"
  source += File.read(site.in_source_dir("_plugins/vendor/typescript/compile.js"))

  TypescriptCompiler.context = ExecJS.compile(source)
end

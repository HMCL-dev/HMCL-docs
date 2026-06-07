module Jekyll
  class Document
    YAML_FRONT_MATTER_REGEXP = %r!\A(?:---|/\* @frontmatter)\s*\n(.*?\n?)^((?:---|\*/|\.\.\.)\s*$\n?)!m.freeze
  end

  module Utils
    def has_yaml_header?(file)
      File.open(file, "rb", &:readline).match? %r!\A(---|/\* @frontmatter)\s*\r?\n!
    rescue EOFError
      false
    end
  end
end

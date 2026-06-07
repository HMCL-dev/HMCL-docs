Jekyll::Hooks.register :site, :post_write do |site|
  config = site.config["post_process"]
  next unless config

  cache = nil
  terser = config["terser"]
  if terser.is_a?(Hash)
    terser.each do |terser_output, terser_inputs|
      next unless terser_output.is_a?(String) && terser_inputs.is_a?(Array)

      cache = Jekyll::Cache.new("PostProcess") unless cache
      terser_codes = []
      terser_inputs_all_exist = true
      terser_inputs.each do |file|
        destination = File.join(site.dest, file)
        if File.exist?(destination)
          terser_codes << File.read(destination, encoding: "UTF-8")
        else
          terser_inputs_all_exist = false
          break
        end
      end

      if terser_inputs_all_exist
        destination = File.join(site.dest, terser_output.to_s)
        code = terser_codes.join(";")
        hash = Digest::SHA256.hexdigest(code)
        unless cache.key?("terser_#{hash}")
          cache["terser_#{hash}"] = Script.call("terser", code: code)
        end
        File.write(destination, cache["terser_#{hash}"])
        Jekyll.logger.info "Post Process:", "[terser] #{terser_output}"
      end
    end
  end

  remove_files = config["remove_files"]
  if remove_files.is_a?(Array)
    remove_files.each do |file|
      destination = File.join(site.dest, file)
      File.delete(destination) if File.exist?(destination)
      Jekyll.logger.info "Post Process:", "[remove_files] #{file}"
    end
  end

  remove_dirs = config["remove_dirs"]
  if remove_dirs.is_a?(Array)
    remove_dirs.each do |dir|
      destination = File.join(site.dest, dir)
      FileUtils.rm_rf(destination) if File.directory?(destination)
      Jekyll.logger.info "Post Process:", "[remove_dirs] #{dir}"
    end
  end

  # clean history jekyll cache
  jekyll_cache_dir = File.dirname(site.cache_dir)
  current_cache_name = File.basename(site.cache_dir)
  if File.basename(jekyll_cache_dir) == ".jekyll-cache"
    Dir.entries(jekyll_cache_dir).select do |entry|
      next if entry == "." || entry == ".."
      entry_path = File.join(jekyll_cache_dir, entry)
      if File.file?(entry_path)
        File.delete(entry_path)
        Jekyll.logger.info "Post Process:", "[clean_history_jekyll_cache] #{entry}"
      elsif File.directory?(entry_path)
        if entry < current_cache_name
          FileUtils.rm_rf(entry_path)
          Jekyll.logger.info "Post Process:", "[clean_history_jekyll_cache] #{entry}"
        end
      end
    end
  end
end

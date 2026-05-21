require "terser"

ExecJS.runtime = ExecJS::Runtimes::MiniRacer if ExecJS::Runtimes::MiniRacer.available?

Jekyll::Hooks.register :site, :post_write do |site|
  config = site.config["post_process"]
  next unless config

  terser = config["terser"]
  if terser.is_a?(Hash)
    terser.each do |terser_output, terser_inputs|
      next unless terser_output.is_a?(String) && terser_inputs.is_a?(Array)

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
        File.write(destination, Terser.compile(terser_codes.join(";")))
        Jekyll.logger.info "Post Process:", "terser #{terser_output}"
      end
    end
  end

  remove_files = config["remove_files"]
  if remove_files.is_a?(Array)
    remove_files.each do |file|
      destination = File.join(site.dest, file)
      File.delete(destination) if File.exist?(destination)
      Jekyll.logger.info "Post Process:", "remove_files #{file}"
    end
  end

  remove_dirs = config["remove_dirs"]
  if remove_dirs.is_a?(Array)
    remove_dirs.each do |dir|
      destination = File.join(site.dest, dir)
      FileUtils.rm_rf(destination) if File.directory?(destination)
      Jekyll.logger.info "Post Process:", "remove_dirs #{dir}"
    end
  end
end

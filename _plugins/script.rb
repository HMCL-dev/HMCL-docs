module Script
  class << self
    def init
      begin
        stdout, _, status = Open3.capture3("bun", "-v")
        if status.success?
          @runtime = "bun"
          Jekyll.logger.info "Script:", "[init] #{@runtime} #{stdout}"
          return
        end
      rescue
        # Ignored
      end

      stdout, stderr, status = Open3.capture3("node", "-v")
      raise stderr unless status.success?
      @runtime = "node"
      Jekyll.logger.info "Script:", "[init] #{@runtime} #{stdout}"
    end

    def call(name, param)
      init unless @runtime
      uuid = SecureRandom.uuid
      stdout, stderr, status = Open3.capture3(@runtime, "_plugins/scripts/call.js", stdin_data: {"name": name, "param": param, "uuid": uuid}.to_json)
      raise stderr unless status.success?
      log, _, result = stdout.rpartition(uuid)
      log.split("\n").map do |line|
        Jekyll.logger.info "Script:", "[#{name}] #{line}"
      end
      JSON.parse(result)
    end
  end
end

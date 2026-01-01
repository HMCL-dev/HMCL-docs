require 'rubygems'
require 'bootstrap'

Jekyll::Hooks.register :site, :after_init do |site|
  site.config["sass"]["load_paths"] = [] if site.config["sass"]["load_paths"].nil?
  site.config["sass"]["load_paths"] << Bootstrap.stylesheets_path
end

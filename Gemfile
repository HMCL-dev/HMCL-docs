source "https://rubygems.org"
# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "4.4.1"
gem "minimal-mistakes-jekyll", "4.27.3"

group :jekyll_plugins do
  gem "jekyll-paginate", "1.1.0"
  gem "jekyll-gist", "1.5.0"
  gem "jekyll-feed", "0.17.0"
  gem "jekyll-include-cache", "0.2.1"
  gem "jekyll-redirect-from", "0.16.0"
  gem "jekyll-polyglot", "1.11.0"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :windows, :jruby do
  gem "tzinfo", "2.0.6"
  gem "tzinfo-data", "1.2025.2"
end

# Performance-booster for watching directories on Windows
gem "wdm", "0.2.0", :platforms => [:windows]

gem "http_parser.rb", "0.8.0", :platforms => [:jruby]

# plugin dependencies
gem "nokogiri", "1.18.10"
gem "addressable", "2.8.7"

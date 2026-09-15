source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "jekyll-paginate", "~> 1.1"
gem "jekyll-seo-tag", "~> 2.8"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-feed", "~> 0.17"
gem "jekyll-redirect-from", "~> 0.16"

group :jekyll_plugins do
  gem "kramdown-parser-gfm", "~> 1.1"
end

# Windows/JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", install_if: -> { Gem.win_platform? }

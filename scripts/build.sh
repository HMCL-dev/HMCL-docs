#!/usr/bin/env bash

touch Gemfile.lock
chmod a+w Gemfile.lock
chown -R jekyll:jekyll /drone
gem sources --add https://mirrors.cloud.tencent.com/rubygems/ --remove https://rubygems.org/
bundle config mirror.https://rubygems.org https://mirrors.cloud.tencent.com/rubygems
bundle install

bundle exec jekyll build --trace --verbose --destination _site --config _config.yml

cp -r ./src/data ./data

for config in ./_config.*.yml; do
    [ -f "$config" ] || continue
    language="${config#./_config.}"
    language="${language%.yml}"
    for data in ./src/data/*."$language".*; do
        [ -f "$data" ] || continue
        dest="./src/data/${data#./src/data/}"
        dest="${dest/.$language./.}"
        mv "$data" "$dest"
    done
    bundle exec jekyll build --trace --verbose --destination "_site_$language" --config "_config.yml,_config.$language.yml"
    cd "_site_$language"
    find . -type f -name "*.$language.html" -exec cp --parents {} ../_site \;
    cd ..
    rm -rf "_site_$language"
    cp -r ./data ./src/data
done

rm -rf ./data

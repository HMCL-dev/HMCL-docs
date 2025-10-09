shopt -s globstar

echo "locales:" > build/locales.yml
for config in build/config.*.yml; do
    [ -f "$config" ] || continue
    language="${config#build/config.}"
    language="${language%.yml}"
    echo "  - $language" >> build/locales.yml
done

jbuild() {
    bundle exec jekyll build --trace --verbose "$@"
}

jbuild_mixed() {
    jbuild --destination _site --config "$@"
}

jbuild_single() {
    jbuild --destination _site_single --config "$@"
    rm -rf build/single/{assets,feed.xml,robots.txt,sitemap.xml}
    cp -r _site_single/* _site/
}

echo "=== build mixed version ==="
jbuild_mixed _config.yml,build/locales.yml,$1

echo "=== build default version ==="
jbuild_single _config.yml,build/default.yml,build/locales.yml,$1

rm -rf build/data
cp -r _data build/data

exclude_target=("_data" "_site" "_includes" "_layouts")

for config in build/config.*.yml; do
    [ -f "$config" ] || continue

    language="${config#build/config.}"
    language="${language%.yml}"

    echo "=== build $language version ==="
    for data in _data/**/*.$language.*; do
        [ -f "$data" ] || continue
        dest="${data/.$language./.}"
        mv "$data" "$dest"
    done

    echo "cache_dir: .jekyll-cache/$language" > build/single.yml
    echo "include:" >> build/single.yml
    echo "  - _pages" >> build/single.yml
    echo "  - \"*.$language.*\"" >> build/single.yml
    echo "exclude:" >> build/single.yml
    echo "  - assets/" >> build/single.yml
    echo "  - build/" >> build/single.yml
    echo "  - LICENSE" >> build/single.yml
    echo "  - README.md" >> build/single.yml

    for target in _*; do
        [ -f "$target" ] && continue
        [[ " ${exclude_target[*]} " == *" $target "* ]] && continue

        echo "  - $target/" >> build/single.yml

        find $target -type f -name "*.*" ! -name "*.*.*" | while read -r file; do
            dir="${file%/*}"
            ext="${file##*.}"
            base="${file##*/}"
            name="${base%%.*}"
            dest="$dir/$name.$language.$ext"
            [ -f $dest ] && continue
            cp "$file" "$dest"
        done
    done

    echo "locale: $language" >> build/single.yml
    echo "head_scripts:" >> build/single.yml
    echo "  - /assets/js/theme.$language.js" >> build/single.yml

    jbuild_single _config.yml,build/config.$language.yml,build/single.yml,build/locales.yml,$1

    rm -rf _data
    cp -r build/data _data
done

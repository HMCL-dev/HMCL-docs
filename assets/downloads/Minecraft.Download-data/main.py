# https://github.com/zkitefly/Minecraft.Download-data
import os
import requests
import json

def download_file(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f'Downloaded: {save_path}')
    else:
        print(f'Failed to download: {url}')

def main():
    # Step 1: Download version_manifest.json and save it as version.json
    version_manifest_url = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json"
    download_file(version_manifest_url, "version.json")

    # Step 2: Read version.json and download the versions
    with open("version.json", 'r') as file:
        version_data = file.read()

    version_json = json.loads(version_data)
    # versions = [v for v in version_json["versions"] if v["type"] == "release"]
    versions = version_json["versions"]

    if not os.path.exists("versions"):
        os.makedirs("versions")

    assetindex_data = {"assetindex": []}  # Initialize the assetindex data structure
    seen_asset_indexes = set()  # Initialize a set to keep track of seen asset indexes

    for version in versions:
        version_url = version["url"]
        filename = version_url.split('/')[-1]
        save_path = os.path.join("versions", filename)
        download_file(version_url, save_path)

        # Read the version's JSON file and extract asset index information
        with open(save_path, 'r') as file:
            version_data = json.load(file)

        asset_index = version_data["assetIndex"]
        asset_index_url = asset_index["url"]

        # Check if we have already seen this asset index URL, and skip if it's a duplicate
        if asset_index_url not in seen_asset_indexes:
            seen_asset_indexes.add(asset_index_url)
            assetindex_data["assetindex"].append(asset_index)

    # Save the assetindex data structure to assetindex.json
    with open("assetindex.json", 'w') as asset_index_file:
        json.dump(assetindex_data, asset_index_file, indent=4)

    # Step 4: Read assetindex.json and download the asset indexes
    with open("assetindex.json", 'r') as asset_index_file:
        asset_index_data = json.load(asset_index_file)

    if not os.path.exists("indexes"):
        os.makedirs("indexes")

    for asset_index in asset_index_data["assetindex"]:
        asset_index_url = asset_index["url"]
        filename = asset_index_url.split('/')[-1]
        save_path = os.path.join("indexes", filename)
        download_file(asset_index_url, save_path)

if __name__ == "__main__":
    main()

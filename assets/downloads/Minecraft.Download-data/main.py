# https://github.com/zkitefly/Minecraft.Download-data
import os
import requests
import json
import concurrent.futures

def download_file(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
        print(f'Downloaded: {save_path}')
    else:
        print(f'Failed to download: {url}')

def download_versions(versions):
    if not os.path.exists("versions"):
        os.makedirs("versions")

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_version = {executor.submit(download_file, version["url"], os.path.join("versions", version["id"] + ".json")): version for version in versions}

def download_asset_indexes(asset_indexes):
    if not os.path.exists("indexes"):
        os.makedirs("indexes")

    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_asset_index = {executor.submit(download_file, asset_index["url"], os.path.join("indexes", asset_index["id"] + ".json")): asset_index for asset_index in asset_indexes}

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

    # Step 3: Download versions in parallel
    download_versions(versions)

    # Step 4: Read versions' JSON files and create a dictionary of asset indexes with "id" as keys
    asset_indexes_dict = {}

    for version in versions:
        version_file_path = os.path.join("versions", version["id"] + ".json")
        with open(version_file_path, 'r') as file:
            version_data = json.load(file)

        asset_index = version_data["assetIndex"]
        asset_index_id = asset_index["id"]

        asset_indexes_dict[asset_index_id] = asset_index

    # Step 5: Download asset indexes in parallel
    download_asset_indexes(asset_indexes_dict.values())

    # Step 6: Save the asset indexes dictionary to assetindex.json
    with open("assetindex.json", 'w') as asset_index_file:
        json.dump(asset_indexes_dict, asset_index_file, indent=4)

if __name__ == "__main__":
    main()

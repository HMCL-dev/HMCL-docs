import os
import requests

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

    import json
    version_json = json.loads(version_data)
    versions = version_json["versions"]

    if not os.path.exists("versions"):
        os.makedirs("versions")

    for version in versions:
        version_url = version["url"]
        filename = version_url.split('/')[-1]
        save_path = os.path.join("versions", filename)
        download_file(version_url, save_path)

    # Step 3: Read versions' json files and download the assetIndex
    if not os.path.exists("indexes"):
        os.makedirs("indexes")

    for version_file in os.listdir("versions"):
        with open(os.path.join("versions", version_file), 'r') as file:
            version_data = file.read()

        version_json = json.loads(version_data)
        asset_index_url = version_json["assetIndex"]["url"]
        filename = asset_index_url.split('/')[-1]
        save_path = os.path.join("indexes", filename)
        download_file(asset_index_url, save_path)

if __name__ == "__main__":
    main()

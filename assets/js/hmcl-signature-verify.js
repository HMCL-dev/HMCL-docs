(function () {
  "use strict";

  const SIGNATURE_ENTRY_NAME = "META-INF/hmcl_signature";
  const LAUNCHER_ENTRY_NAMES = ["assets/HMCLauncher.exe", "assets/HMCLauncher.sh"];
  const PUBLIC_KEY_DER_BASE64 = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAypkXnIxC3KzQsICAK9lEan3icR8OUREbW1vqANzi7ne0EXAyFh1Ow10HIY+SIWHVhsIkS/mvNyUyW5TIPc22djWNQKf6OukOY2/htJpolj4l/uhPGe4BoFiV8m2jvyKq0X7truazc9/BDrLKkoIVIkXb0PenVs1AlFLnXzLEu9Lj4kxfkRO4zdV4CMHYWLWLLP9Dj0/Xg+tj9n/QX/IWVVrBporKiJgg99WztKw7wQ/Zd+Syu8vfa6IjpgRojtOiCb8MUvEUHcs8RG/PPRACJ8bNwCaNc0RNLoyfVGjjZGFh95XPr6huJYmn/11j45GTB9I5w77JnF83AWwAPyx15z6yHKm4epzXJ9yFrTK5nATQGD1H2i8rdg4ZvsjFE4nxEYTWDTkk9nQdZs3n5Os+pUh8hyyjsa4Hh2yjmfcivcE/KzyP8JH15OWH9QOHwdfRTDu3v4AxSZCuQKlhaSpYbHFahE+jqP+Pr0+Bc/e5ybu6SdAELlOJrVYU6pkgrvYJmkV6Ahfm3P8OZKt72MAGxDfdYNUA70QWMMC1YP+GQYedC+oLA4/BhQ1Su9AfUUdQGN0a8a6uaZFX5QyiA/6KrRUC06dQdXi9ZOCx8LY28Snl7TjgmOef15HnnmmQTbARJuR0eenprzOXJXJzkS6/Vx1ak/9gNRA8yMiVM9lIilsCAwEAAQ==";

  const fileInput = document.getElementById("hmcl-verify-file");
  const resultElement = document.getElementById("hmcl-verify-result");

  if (!fileInput || !resultElement) {
    return;
  }

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      setResult("尚未选择文件。");
      return;
    }

    setResult("正在读取文件...");

    try {
      const verification = await verifyHmclFile(file);
      setResult(
        [
          "签名有效。",
          `文件名：${file.name}`,
          `文件大小：${formatBytes(file.size)}`,
          `启动器头部：${verification.launcherHeaderMessage}`,
          `参与校验的 zip entry 数量：${verification.checkedEntries}`,
        ].join("\n"),
        "ok"
      );
    } catch (error) {
      setResult(`验证失败：${error.message}`, "error");
    }
  });

  async function verifyHmclFile(file) {
    const fileBuffer = await file.arrayBuffer();
    const entries = readZipEntries(fileBuffer);
    const signatureEntry = entries.find((entry) => entry.name === SIGNATURE_ENTRY_NAME);

    if (!signatureEntry) {
      throw new Error(`missing ${SIGNATURE_ENTRY_NAME}`);
    }

    const signature = await readEntryContent(fileBuffer, signatureEntry);
    const signedEntries = entries
      .filter((entry) => entry.name !== SIGNATURE_ENTRY_NAME)
      .sort((left, right) => {
        if (left.name < right.name) {
          return -1;
        }
        if (left.name > right.name) {
          return 1;
        }
        return 0;
      });

    const signedDataChunks = [];
    for (const entry of signedEntries) {
      const nameBytes = new TextEncoder().encode(entry.name);
      const content = await readEntryContent(fileBuffer, entry);
      signedDataChunks.push(await sha512(nameBytes));
      signedDataChunks.push(await sha512(content));
    }

    const publicKey = await crypto.subtle.importKey(
      "spki",
      base64ToArrayBuffer(PUBLIC_KEY_DER_BASE64),
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-512",
      },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      publicKey,
      signature,
      concatUint8Arrays(signedDataChunks)
    );

    if (!valid) {
      throw new Error("invalid signature");
    }

    const launcherHeader = await verifyLauncherHeader(fileBuffer, entries);

    return {
      checkedEntries: signedEntries.length,
      launcherHeaderMessage: launcherHeader.message,
    };
  }

  function readZipEntries(buffer) {
    const view = new DataView(buffer);
    const end = findEndOfCentralDirectory(view);
    const totalEntries = view.getUint16(end + 10, true);
    const centralDirectorySize = view.getUint32(end + 12, true);
    const centralDirectoryOffset = view.getUint32(end + 16, true);

    if (centralDirectorySize === 0xffffffff || centralDirectoryOffset === 0xffffffff) {
      throw new Error("Zip64 is not supported");
    }

    const zipStartOffset = end - centralDirectorySize - centralDirectoryOffset;
    if (zipStartOffset < 0) {
      throw new Error("invalid zip offsets");
    }

    const entries = [];
    let offset = zipStartOffset + centralDirectoryOffset;
    const centralDirectoryEnd = offset + centralDirectorySize;

    for (let index = 0; index < totalEntries; index += 1) {
      if (offset + 46 > view.byteLength || view.getUint32(offset, true) !== 0x02014b50) {
        throw new Error("invalid central directory");
      }

      const flags = view.getUint16(offset + 8, true);
      const method = view.getUint16(offset + 10, true);
      const compressedSize = view.getUint32(offset + 20, true);
      const uncompressedSize = view.getUint32(offset + 24, true);
      const fileNameLength = view.getUint16(offset + 28, true);
      const extraLength = view.getUint16(offset + 30, true);
      const commentLength = view.getUint16(offset + 32, true);
      const localHeaderOffset = view.getUint32(offset + 42, true);
      const fileNameStart = offset + 46;
      const fileNameEnd = fileNameStart + fileNameLength;
      const name = decodeEntryName(new Uint8Array(view.buffer, fileNameStart, fileNameLength), flags);

      entries.push({
        name,
        method,
        compressedSize,
        uncompressedSize,
        localHeaderOffset: zipStartOffset + localHeaderOffset,
      });

      offset = fileNameEnd + extraLength + commentLength;
    }

    if (offset !== centralDirectoryEnd) {
      throw new Error("central directory size mismatch");
    }

    entries.zipStartOffset = zipStartOffset;
    return entries;
  }

  function findEndOfCentralDirectory(view) {
    const minOffset = Math.max(0, view.byteLength - 22 - 0xffff);

    for (let offset = view.byteLength - 22; offset >= minOffset; offset -= 1) {
      if (view.getUint32(offset, true) === 0x06054b50) {
        const commentLength = view.getUint16(offset + 20, true);
        if (offset + 22 + commentLength === view.byteLength) {
          return offset;
        }
      }
    }

    throw new Error("end of central directory not found");
  }

  async function readEntryContent(buffer, entry) {
    const view = new DataView(buffer);
    const offset = entry.localHeaderOffset;

    if (offset + 30 > view.byteLength || view.getUint32(offset, true) !== 0x04034b50) {
      throw new Error(`invalid local header: ${entry.name}`);
    }

    const fileNameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const dataStart = offset + 30 + fileNameLength + extraLength;
    const dataEnd = dataStart + entry.compressedSize;

    if (dataEnd > view.byteLength) {
      throw new Error(`entry data is truncated: ${entry.name}`);
    }

    const compressedData = new Uint8Array(buffer, dataStart, entry.compressedSize);

    if (entry.method === 0) {
      return compressedData;
    }

    if (entry.method === 8) {
      return inflateRaw(compressedData, entry.name, entry.uncompressedSize);
    }

    throw new Error(`unsupported compression method ${entry.method}: ${entry.name}`);
  }

  async function verifyLauncherHeader(buffer, entries) {
    const prefixLength = entries.zipStartOffset || 0;

    if (prefixLength === 0) {
      return {
        message: "无，普通 jar 文件",
      };
    }

    const prefix = new Uint8Array(buffer, 0, prefixLength);

    for (const entryName of LAUNCHER_ENTRY_NAMES) {
      const launcherEntry = entries.find((entry) => entry.name === entryName);
      if (!launcherEntry) {
        continue;
      }

      const launcherContent = await readEntryContent(buffer, launcherEntry);
      if (bytesEqual(prefix, launcherContent)) {
        return {
          message: `${entryName}，${formatBytes(prefixLength)}，内容一致`,
        };
      }
    }

    throw new Error("launcher header does not match signed assets");
  }

  async function inflateRaw(data, entryName, expectedSize) {
    if (typeof DecompressionStream === "undefined") {
      throw new Error("this browser does not support DecompressionStream");
    }

    let stream;
    try {
      stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    } catch (error) {
      throw new Error(`this browser cannot decompress deflated zip entries: ${entryName}`);
    }

    const output = new Uint8Array(await new Response(stream).arrayBuffer());
    if (output.byteLength !== expectedSize) {
      throw new Error(`uncompressed size mismatch: ${entryName}`);
    }
    return output;
  }

  function decodeEntryName(bytes, flags) {
    if ((flags & 0x0800) === 0) {
      return new TextDecoder("utf-8").decode(bytes);
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  }

  async function sha512(data) {
    return new Uint8Array(await crypto.subtle.digest("SHA-512", data));
  }

  function concatUint8Arrays(chunks) {
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return result;
  }

  function bytesEqual(left, right) {
    if (left.byteLength !== right.byteLength) {
      return false;
    }

    for (let index = 0; index < left.byteLength; index += 1) {
      if (left[index] !== right[index]) {
        return false;
      }
    }

    return true;
  }

  function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes.buffer;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    const units = ["KB", "MB", "GB"];
    let value = bytes / 1024;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }

    return `${value.toFixed(2)} ${units[unitIndex]}`;
  }

  function setResult(message, state) {
    resultElement.textContent = message;
    if (state) {
      resultElement.dataset.state = state;
    } else {
      delete resultElement.dataset.state;
    }
  }
})();

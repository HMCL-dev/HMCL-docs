(function () {
  "use strict";

  const SIGNATURE_ENTRY_NAME = "META-INF/hmcl_signature";
  const PUBLIC_KEY_ENTRY_NAME = "assets/hmcl_signature_publickey.der";
  const LAUNCHER_ENTRY_NAMES = ["assets/HMCLauncher.exe", "assets/HMCLauncher.sh"];
  const PUBLIC_KEY_DER_BASE64 = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAypkXnIxC3KzQsICAK9lEan3icR8OUREbW1vqANzi7ne0EXAyFh1Ow10HIY+SIWHVhsIkS/mvNyUyW5TIPc22djWNQKf6OukOY2/htJpolj4l/uhPGe4BoFiV8m2jvyKq0X7truazc9/BDrLKkoIVIkXb0PenVs1AlFLnXzLEu9Lj4kxfkRO4zdV4CMHYWLWLLP9Dj0/Xg+tj9n/QX/IWVVrBporKiJgg99WztKw7wQ/Zd+Syu8vfa6IjpgRojtOiCb8MUvEUHcs8RG/PPRACJ8bNwCaNc0RNLoyfVGjjZGFh95XPr6huJYmn/11j45GTB9I5w77JnF83AWwAPyx15z6yHKm4epzXJ9yFrTK5nATQGD1H2i8rdg4ZvsjFE4nxEYTWDTkk9nQdZs3n5Os+pUh8hyyjsa4Hh2yjmfcivcE/KzyP8JH15OWH9QOHwdfRTDu3v4AxSZCuQKlhaSpYbHFahE+jqP+Pr0+Bc/e5ybu6SdAELlOJrVYU6pkgrvYJmkV6Ahfm3P8OZKt72MAGxDfdYNUA70QWMMC1YP+GQYedC+oLA4/BhQ1Su9AfUUdQGN0a8a6uaZFX5QyiA/6KrRUC06dQdXi9ZOCx8LY28Snl7TjgmOef15HnnmmQTbARJuR0eenprzOXJXJzkS6/Vx1ak/9gNRA8yMiVM9lIilsCAwEAAQ==";
  const PUBLIC_KEY_DER = base64ToUint8Array(PUBLIC_KEY_DER_BASE64);

  const VerificationErrorCode = Object.freeze({
    MISSING_PUBLIC_KEY: "missing-public-key",
    MISSING_SIGNATURE: "missing-signature",
    INVALID_PUBLIC_KEY: "invalid-public-key",
    INVALID_SIGNATURE: "invalid-signature",
    INVALID_LAUNCHER_HEADER: "invalid-launcher-header",
    INVALID_ZIP: "invalid-zip",
    UNSUPPORTED_ZIP: "unsupported-zip",
    UNSUPPORTED_BROWSER: "unsupported-browser",
  });

  class VerificationError extends Error {
    constructor(code, message, cause) {
      super(message);
      this.name = "VerificationError";
      this.code = code;
      this.cause = cause;
    }
  }

  const fileInput = document.getElementById("hmcl-verify-file");
  const resultElement = document.getElementById("hmcl-verify-result");
  const selectedFileElement = document.getElementById("hmcl-verify-selected-file");
  let verificationRequestId = 0;

  if (!fileInput || !resultElement) {
    return;
  }

  fileInput.addEventListener("change", async () => {
    const requestId = ++verificationRequestId;
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      setSelectedFileName("");
      hideResult();
      return;
    }

    setSelectedFileName(file.name);
    setResult("正在验证，请稍候...");

    try {
      await verifyHmclFile(file);
      if (!isCurrentVerification(requestId)) {
        return;
      }
      setResult(
        "验证通过，该文件是 HMCL 的官方构建，可以放心使用。",
        "ok"
      );
    } catch (error) {
      if (!isCurrentVerification(requestId)) {
        return;
      }
      setResult(`验证失败。\n${formatVerificationError(error)}`, "error");
    }
  });

  function isCurrentVerification(requestId) {
    return requestId === verificationRequestId;
  }

  async function verifyHmclFile(file) {
    const fileBuffer = await file.arrayBuffer();
    const archive = readZipArchive(fileBuffer);
    const entries = archive.entries;
    const publicKeyEntry = entries.find((entry) => entry.name === PUBLIC_KEY_ENTRY_NAME);
    const signatureEntry = entries.find((entry) => entry.name === SIGNATURE_ENTRY_NAME);

    if (!publicKeyEntry) {
      throw new VerificationError(VerificationErrorCode.MISSING_PUBLIC_KEY, `missing ${PUBLIC_KEY_ENTRY_NAME}`);
    }

    if (!signatureEntry) {
      throw new VerificationError(VerificationErrorCode.MISSING_SIGNATURE, `missing ${SIGNATURE_ENTRY_NAME}`);
    }

    const bundledPublicKey = await readEntryContent(fileBuffer, publicKeyEntry);
    if (!bytesEqual(bundledPublicKey, PUBLIC_KEY_DER)) {
      throw new VerificationError(VerificationErrorCode.INVALID_PUBLIC_KEY, "public key mismatch");
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
      PUBLIC_KEY_DER,
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
      throw new VerificationError(VerificationErrorCode.INVALID_SIGNATURE, "invalid signature");
    }

    await verifyLauncherPrefix(fileBuffer, archive);
  }

  function readZipArchive(buffer) {
    const view = new DataView(buffer);
    const end = findEndOfCentralDirectory(view);
    const totalEntries = view.getUint16(end + 10, true);
    const centralDirectorySize = view.getUint32(end + 12, true);
    const centralDirectoryOffset = view.getUint32(end + 16, true);

    if (centralDirectorySize === 0xffffffff || centralDirectoryOffset === 0xffffffff) {
      throw new VerificationError(VerificationErrorCode.UNSUPPORTED_ZIP, "Zip64 is not supported");
    }

    const zipStartOffset = end - centralDirectorySize - centralDirectoryOffset;
    if (zipStartOffset < 0) {
      throw new VerificationError(VerificationErrorCode.INVALID_ZIP, "invalid zip offsets");
    }

    const entries = [];
    let offset = zipStartOffset + centralDirectoryOffset;
    const centralDirectoryEnd = offset + centralDirectorySize;

    for (let index = 0; index < totalEntries; index += 1) {
      if (offset + 46 > view.byteLength || view.getUint32(offset, true) !== 0x02014b50) {
        throw new VerificationError(VerificationErrorCode.INVALID_ZIP, "invalid central directory");
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
      throw new VerificationError(VerificationErrorCode.INVALID_ZIP, "central directory size mismatch");
    }

    return {
      entries,
      zipStartOffset,
    };
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

    throw new VerificationError(VerificationErrorCode.INVALID_ZIP, "end of central directory not found");
  }

  async function readEntryContent(buffer, entry) {
    const view = new DataView(buffer);
    const offset = entry.localHeaderOffset;

    if (offset + 30 > view.byteLength || view.getUint32(offset, true) !== 0x04034b50) {
      throw new VerificationError(VerificationErrorCode.INVALID_ZIP, `invalid local header: ${entry.name}`);
    }

    const fileNameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const dataStart = offset + 30 + fileNameLength + extraLength;
    const dataEnd = dataStart + entry.compressedSize;

    if (dataEnd > view.byteLength) {
      throw new VerificationError(VerificationErrorCode.INVALID_ZIP, `entry data is truncated: ${entry.name}`);
    }

    const compressedData = new Uint8Array(buffer, dataStart, entry.compressedSize);

    if (entry.method === 0) {
      return compressedData;
    }

    if (entry.method === 8) {
      return inflateRaw(compressedData, entry.name, entry.uncompressedSize);
    }

    throw new VerificationError(
      VerificationErrorCode.UNSUPPORTED_ZIP,
      `unsupported compression method ${entry.method}: ${entry.name}`
    );
  }

  async function verifyLauncherPrefix(buffer, archive) {
    const prefixLength = archive.zipStartOffset;

    if (prefixLength === 0) {
      return;
    }

    const prefix = new Uint8Array(buffer, 0, prefixLength);

    for (const entryName of LAUNCHER_ENTRY_NAMES) {
      const launcherEntry = archive.entries.find((entry) => entry.name === entryName);
      if (!launcherEntry) {
        continue;
      }

      const launcherContent = await readEntryContent(buffer, launcherEntry);
      if (bytesEqual(prefix, launcherContent)) {
        return;
      }
    }

    throw new VerificationError(
      VerificationErrorCode.INVALID_LAUNCHER_HEADER,
      "launcher header does not match signed assets"
    );
  }

  async function inflateRaw(data, entryName, expectedSize) {
    if (typeof DecompressionStream === "undefined") {
      throw new VerificationError(
        VerificationErrorCode.UNSUPPORTED_BROWSER,
        "this browser does not support DecompressionStream"
      );
    }

    let stream;
    try {
      stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    } catch (error) {
      throw new VerificationError(
        VerificationErrorCode.UNSUPPORTED_BROWSER,
        `this browser cannot decompress deflated zip entries: ${entryName}`,
        error
      );
    }

    let output;
    try {
      output = new Uint8Array(await new Response(stream).arrayBuffer());
    } catch (error) {
      throw new VerificationError(
        VerificationErrorCode.INVALID_ZIP,
        `cannot decompress entry: ${entryName}`,
        error
      );
    }

    if (output.byteLength !== expectedSize) {
      throw new VerificationError(
        VerificationErrorCode.INVALID_ZIP,
        `uncompressed size mismatch: ${entryName}`
      );
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

  function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  }

  function formatVerificationError(error) {
    switch (error && error.code) {
      case VerificationErrorCode.MISSING_PUBLIC_KEY:
        return "这不是可验证的 HMCL 文件，或者 HMCL 版本过低，无法验证。";

      case VerificationErrorCode.MISSING_SIGNATURE:
        return "这是非官方构建，请谨慎甄别其来源。";

      case VerificationErrorCode.INVALID_PUBLIC_KEY:
      case VerificationErrorCode.INVALID_SIGNATURE:
      case VerificationErrorCode.INVALID_LAUNCHER_HEADER:
        return "该 HMCL 文件可能被篡改或已损坏，请不要使用此文件。你可以从 HMCL 官方网站重新下载 HMCL。";

      case VerificationErrorCode.INVALID_ZIP:
        return "这个文件不是有效的 HMCL 文件，或文件已经损坏。";

      case VerificationErrorCode.UNSUPPORTED_ZIP:
        return "暂不支持验证这种文件格式。";

      case VerificationErrorCode.UNSUPPORTED_BROWSER:
        return "当前浏览器不支持读取这个文件，请换用新版 Chrome、Edge 或 Firefox。";

      default:
        return "无法完成验证，请确认你选择的是从官方渠道下载的 HMCL 文件。";
    }
  }

  function setResult(message, state) {
    resultElement.textContent = message;
    resultElement.hidden = false;
    if (state) {
      resultElement.dataset.state = state;
    } else {
      delete resultElement.dataset.state;
    }
  }

  function hideResult() {
    resultElement.textContent = "";
    resultElement.hidden = true;
    delete resultElement.dataset.state;
  }

  function setSelectedFileName(fileName) {
    if (selectedFileElement) {
      selectedFileElement.textContent = fileName || "未选择文件";
    }
  }
})();

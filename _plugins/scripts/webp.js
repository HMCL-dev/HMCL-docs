import sharp from "sharp";

export default async function ({ source }) {
  const buffer = new Buffer(source, "base64");
  if (global.Bun && Bun.Image) {
    return new Blob(buffer).image().webp().toBase64();
  }
  return (await sharp(buffer).webp().toBuffer()).toString("base64");
}

import { minify } from "terser";

export default async function ({ code }) {
  const result = await minify(code, {
    compress: false,
    mangle: true
  });
  return result.code;
}

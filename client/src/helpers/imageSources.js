// Product images are stored in the database as .png paths. A .webp file with the same
// name ships next to every PNG (public/images), so modern browsers can download a file
// that is roughly ten times smaller while everything else falls back to the PNG.
export function webpVariant(path) {
  if (!path || !/\.png$/i.test(path)) return undefined;
  return path.replace(/\.png$/i, ".webp");
}

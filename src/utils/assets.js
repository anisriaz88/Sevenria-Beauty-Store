// Asset Loader using Vite's eager glob import
const assetModules = import.meta.glob('../assets/**/*.{jpg,jpeg,png,webp,jfif,PNG,JPG,JPEG}', {
  eager: true,
  import: 'default'
});

/**
 * Returns all asset URLs that match a given folder pattern (e.g. 'Anua/P-1')
 * @param {string} folderSubpath - e.g. 'Anua/P-1', 'Cosrx/P-1'
 * @returns {string[]} Array of image URLs
 */
export function getImagesByFolder(folderSubpath) {
  const normalized = folderSubpath.replace(/\\/g, '/').toLowerCase();
  const matched = [];

  for (const [path, url] of Object.entries(assetModules)) {
    const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
    if (normalizedPath.includes(`/${normalized}/`) || normalizedPath.endsWith(`/${normalized}`)) {
      matched.push(url);
    }
  }

  return matched;
}

/**
 * Get primary image for a folder, with optional fallback
 * @param {string} folderSubpath
 * @param {string} fallback
 * @returns {string}
 */
export function getPrimaryImage(folderSubpath, fallback = '') {
  const imgs = getImagesByFolder(folderSubpath);
  return imgs.length > 0 ? imgs[0] : fallback;
}

export default assetModules;

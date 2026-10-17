import cloudinaryMap from './cloudinaryMapping.json';

/**
 * Returns the Cloudinary CDN URL for a given local asset path.
 * If the asset is mapped, returns the CDN URL with f_auto,q_auto optimization.
 * Falls back to the original path if not found.
 *
 * @param {string} localPath - e.g. "/assets/showreel.png"
 * @returns {string} - Cloudinary CDN URL or original path
 */
export function getAssetUrl(localPath) {
  if (!localPath || typeof localPath !== 'string') return localPath;
  if (localPath.startsWith('http://') || localPath.startsWith('https://')) {
    return localPath;
  }
  return cloudinaryMap[localPath] || localPath;
}

export default getAssetUrl;

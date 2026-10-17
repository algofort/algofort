import assets from '../cloudinary-assets.json'
export function assetUrl(path: string) {
  const asset = assets[path as keyof typeof assets]
  if (!asset) throw new Error(`Missing app landing asset: ${path}`)
  return asset.url
}

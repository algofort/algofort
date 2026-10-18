export function imageAtWidth(src, width) {
  return src.includes('res.cloudinary.com/') && src.includes('/image/upload/')
    ? src.replace('/image/upload/', `/image/upload/c_limit,w_${width}/`)
    : src;
}
export function imageSrcSet(src) {
  return src.includes('res.cloudinary.com/') && src.includes('/image/upload/')
    ? [480, 960, 1440, 1920].map(width => `${imageAtWidth(src, width)} ${width}w`).join(', ')
    : undefined;
}

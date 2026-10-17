import React from 'react';

export default function StaticImage({ priority, unoptimized: _unoptimized, fill, placeholder: _placeholder, blurDataURL: _blurDataURL, quality: _quality, style, ...props }) {
  return <img loading={priority ? 'eager' : 'lazy'} style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style} {...props} />;
}

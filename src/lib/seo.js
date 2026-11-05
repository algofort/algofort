const siteUrl = 'https://algofort.com';

const shareImage = {
  url: `${siteUrl}/assets/open-graph-image.jpg`,
  secureUrl: `${siteUrl}/assets/open-graph-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Algofort',
  type: 'image/jpeg',
};

const shareSquareImage = {
  url: `${siteUrl}/assets/open-graph-square.jpg`,
  secureUrl: `${siteUrl}/assets/open-graph-square.jpg`,
  width: 1024,
  height: 1024,
  alt: 'Algofort',
  type: 'image/jpeg',
};

export function withSocialMetadata(metadata) {
  const path = metadata.alternates?.canonical || '/';
  const title = typeof metadata.title === 'string' ? metadata.title.replaceAll('Algofort', 'AlgoFort') : metadata.title;

  return {
    ...metadata,
    title,
    openGraph: {
      title,
      description: metadata.description,
      url: new URL(path, siteUrl).toString(),
      siteName: 'AlgoFort',
      type: 'website',
      images: [shareImage, shareSquareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metadata.description,
      images: [shareImage],
    },
  };
}

export function breadcrumbJsonLd(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, siteUrl).toString(),
    })),
  };
}

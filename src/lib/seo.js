const siteUrl = 'https://algofort.com';

const shareImage = {
  url: '/assets/open-graph-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Algofort',
};

export function withSocialMetadata(metadata) {
  const path = metadata.alternates?.canonical || '/';

  return {
    ...metadata,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: new URL(path, siteUrl).toString(),
      siteName: 'Algofort',
      type: 'website',
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
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

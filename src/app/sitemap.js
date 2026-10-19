const baseUrl = 'https://algofort.com';

const pages = [
  '/',
  '/about',
  '/services',
  '/services/web-development',
  '/services/brand-identity',
  '/services/saas-app-development',
  '/services/mobile-app-development',
  '/portfolio',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/lp/web-development',
  '/lp/brand-agency',
  '/lp/app-development',
  '/lp/saas-app-development',
];

export default function sitemap() {
  return pages.map((path) => ({
    url: new URL(path, baseUrl).toString(),
  }));
}

# Web development landing page

Imported from [web_development_landing_page](https://github.com/emmajohnson5861-sys/web_development_landing_page) at commit `d039a5546b362c18875e5213673ea21655539445`.

This page is built as static HTML, CSS, and JavaScript by `npm run build:lp:web` and served at `/lp/web-development` by the main Next.js deployment. Its media is delivered from Cloudinary; `cloudinary-assets.json` records the uploaded originals and their versions. The two videos use responsive Cloudinary variants and first-frame posters. The Vite build runs only at build time; the page does not start another server or install a second dependency tree.

The footer mirrors the main website's `Footer.jsx` markup and imports `src/styles/footer-section.css` through `src/footer.css`; landing-page-specific spacing and mobile fixes live in that local stylesheet. Keep the HTML in sync when changing the main footer's content. The newsletter remains a UI preview until a subscription backend is connected.

The estimate and popup forms submit through the site's existing `/api/contact` endpoint with reCAPTCHA. The newsletter remains the source project's explicit UI preview.

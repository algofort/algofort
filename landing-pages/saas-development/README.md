# SaaS landing page

Imported from `https://github.com/emmajohnson5861-sys/saas_app_landing_page.git`, commit `d6d3fef981434c891fb5c67a08c16649a5855f61`.

Served at `/lp/saas-app-development`. Built with `npm run build:lp:saas` using the root dependencies and included in the normal build/dev setup. Source styles and animations run in an isolated static page to avoid conflicts with the main website.

The 30 media assets are hosted on Cloudinary, recorded in `cloudinary-assets.json`. Original local media is excluded from deployment. Video delivery uses a width limit and high automatic quality.

The main site footer and shared back-to-top button are reused. Page inquiry and entrance popup submit to `/api/contact` with reCAPTCHA. Interactive dashboard forms remain local demos. Newsletter is a preview until its backend is configured.

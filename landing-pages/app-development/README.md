# App development landing page

Imported from `https://github.com/emmajohnson5861-sys/app_dev.git`, commit `0599761eab9db85a2cbfb5d35d7d26781b15fde7`.

Served at `/lp/app-development` by the main Next.js server. `npm run build:lp:app` uses the root dependencies; the normal build and dev setup include all three landing pages.

All 18 image/logo assets are delivered from Cloudinary. Their source paths and URLs are recorded in `cloudinary-assets.json`; dynamically selected showcase images use `src/assets.ts`. No duplicate public media or second node_modules directory is required.

Both the interactive phone enquiry and tablet enquiry use `/api/contact` with reCAPTCHA v2 and the existing email service. Phone CAPTCHA uses compact mode. Business website details are included in the message separately from the spam trap.

The footer reuses the main site's Footer component and shared styles, including the homepage logo link, equal outer spacing and matching page background. Newsletter remains a preview.

# Brand agency landing page

Imported from `https://github.com/emmajohnson5861-sys/brand_agency.git`, commit `28a8451addb4cbeb987f20bf6688b9384de44286`.

Built with the root dependencies using `npm run build:lp:brand` and served by Next.js at `/lp/brand-agency`. The main build and dev setup build both landing pages; no additional server or dependency installation is needed.

The 49 used media/font/cursor assets are hosted on Cloudinary. `cloudinary-assets.json` records their original paths and delivery URLs; responsive image sources use `src/lib/assets.ts`. Unused source assets and duplicate local originals are excluded from deployment.

The footer reuses the main `Footer.jsx` component and shared footer CSS. Vite adapters render Next's Link and Image components as standard anchors and images in this static bundle. The footer logo points to `/`, and its outer left, right and bottom gaps match the main site.

Both inquiry forms submit to `/api/contact`, use reCAPTCHA v2, and identify brand enquiries in the email subject. A business website is included in the message, separately from the hidden spam trap. Newsletter signup remains a preview until its backend is configured.

# algofort

Modern, responsive website for Algofort built with Next.js / React, interactive animations, and custom typography.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Forms and security

The contact and CTA forms send mail through the server-side `/api/contact` route. Set these values in an ignored `.env.local` file for local development, and in the hosting provider's environment settings for deployment:

```text
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=true
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
CONTACT_TO=
```

Both forms require reCAPTCHA v2 Checkbox. Set **both** values; the site key is public and the secret key must remain server-side:

```text
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

Google reCAPTCHA keys must allow the hostname where the form is used. Use Google's separate test keys for local automated tests, or add `localhost` to a development key. Keep production domain validation enabled.

Before launch, rotate the previously exposed Cloudinary and SMTP credentials, configure hosting-level rate limiting for `/api/contact`, verify HTTPS, and then enable HSTS on the production domain. The in-process form rate limit is a first layer and does not cover multiple server instances.

## Admin workspace

Open `/admin`. Sign in with a verified Firebase email/password account that has an active `adminUsers/{uid}` profile. Initial owner credentials are saved locally in the ignored `.private/admin-login.txt`; never deploy or commit this file.

| Role | Access |
| --- | --- |
| Owner | Projects, categories, submissions, users and roles, WhatsApp and AI support settings |
| Editor | Projects, Cloudinary image uploads and categories |
| Support | Submissions, internal notes, status and failed email retries |

Owners can invite users by email. Invitations contain password reset links. Users must verify their email after setting a password. Self-demotion and removal of the last active owner are blocked. Disabled profiles immediately lose API access. Dashboard sessions use session persistence.

### Firebase configuration

Set the following in `.env.local` and in hosting environment settings. Public values are compiled into the client, so rebuild after changing them:

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_SERVICE_ACCOUNT_BASE64=
```

`FIREBASE_SERVICE_ACCOUNT_BASE64` is the base64 encoding of the Firebase service account JSON. It is private server configuration. Never prefix it with `NEXT_PUBLIC_`. Firebase Authentication must have email/password enabled. Authorise the live website domain in Firebase Authentication settings at launch. Images use the existing server-side `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` values.

The Firestore collections are `portfolioProjects`, `portfolioCategories`, `adminUsers` and `submissions`. All direct client database access is denied by `firestore.rules`; the public portfolio is exposed through `/api/portfolio` with a field allowlist, and admin routes verify Firebase ID tokens, verified emails and stored roles. The rules have been deployed to the supplied Firebase project. Keep console edits and the local rules file in sync.

### Portfolio migration

```bash
node scripts/migrate-portfolio.mjs
```

This imports the original 129 main portfolio projects, six categories and six legacy featured records. Existing document IDs are skipped, preserving dashboard edits. The legacy featured section is currently not mounted on the homepage; migrating it does not add a new visible section. The four landing page project galleries keep their existing data. The main portfolio loads published Firebase records, with original static records as an outage fallback. Archiving hides a project from the live data; categories with linked projects cannot be deleted.

### Form submissions and email

All main-site and landing-page enquiry forms use `/api/contact`. After validation, rate limiting, honeypot and reCAPTCHA checks, the enquiry is saved to Firestore before email delivery. Both a branded user confirmation and an admin notification are sent. Delivery failures are recorded without losing the enquiry or prompting visitors to resubmit. Authorised staff can retry failed emails from the enquiry details; already-sent recipients are skipped. Enquiry notes and status are private to authorised staff. “Replied” is a manual status and does not itself send a reply.

The dashboard loads enquiries in batches of 40 and refreshes the current batch every 30 seconds. Search filters the currently loaded records. At launch, retain shared rate limiting at the hosting layer, set all environment variables, rotate shared secrets, verify the authorised domain and test reCAPTCHA/email on the live domain.

Email content cards are rendered locally with Sharp as opaque PNGs and embedded using MIME Content-ID attachments to preserve readable text contrast in Outlook dark mode. No submission data is uploaded to Cloudinary for these cards. Buttons remain HTML links, and the full enquiry is included in the multipart plain-text alternative. The image card is not selectable text; clients that hide inline images should use the plain-text version or the admin dashboard.

### WhatsApp contact settings

The owner can update the international contact number, pre-filled WhatsApp message and sticky-button visibility in **Admin → Site settings**. Settings live in `siteSettings/contact`; the public `/api/site-settings` route only exposes these three public fields. The main website and all four LPs use the same right-edge WhatsApp widget and refresh settings on focus, on a same-browser settings update and once per minute while visible. Marked phone links and the Contact page WhatsApp link use the same saved number. The admin dashboard does not show the public contact button.

### AI support chat

**Admin → AI support** (owner only) controls visibility, assistant name, greeting, company knowledge, tone, provider name, HTTPS chat-completions endpoint, model, API key and daily request limit. Initial company information comes from the current website. The WhatsApp number follows Site settings. The same lightweight chat widget runs on the main website and all four LPs, with no widget on admin pages.

The supplied Groq key is encrypted in `siteSettings/chatbot` using AES-256-GCM. `CHATBOT_ENCRYPTION_KEY` is the private 32-byte base64 encryption key in `.env.local`. **Copy that existing value into the hosting environment at launch**; do not generate a different value for the same stored provider key. Keep it out of Git and never use a `NEXT_PUBLIC_` prefix. Blank replacement-key fields preserve the existing key; admin responses return only a configured/not-configured flag. The public endpoint exposes only visibility, name, greeting and the WhatsApp URL. API calls, key decryption and endpoint checks run on the server. Provider endpoints must be public HTTPS on port 443, end in `/chat/completions`, and support OpenAI-compatible messages. Redirects and private network addresses are rejected, and DNS is pinned per request.

The initial model is `openai/gpt-oss-20b`, verified against this Groq account. Save changed provider credentials before using **Test saved connection**. A provider change requires a model and API key valid for that provider. The daily visitor quota defaults to 250 requests (UTC day) and each IP-derived bucket allows 20 requests per 10 minutes. Counts are enforced with Firestore transactions in `chatRateLimits`; enable a Firestore TTL policy on its `expiresAt` field to automatically remove old counters. Production reverse proxies must set trustworthy client IP headers; retain hosting-layer abuse protection. Chat quotas also apply when providers return an error.

Messages are sent to the configured provider with bounded recent context, but are not persisted in Firestore or browser storage. Reloading or leaving the page clears the conversation. The assistant has no tools or access to private admin records, cannot submit forms or send mail, and directs enquiries to the team. The privacy page describes the chat data flow. AI responses can still be inaccurate; maintain the company knowledge as services and policies change.

The assistant follows the visitor's current language and expressed tone, answers harmless general questions, and offers brief relevant bridges to Algofort services. Clear English and Roman Urdu signals are resolved per turn so an earlier assistant reply cannot force the wrong language. Other languages are inferred from the latest message. Replies progressively reveal in the browser over a bounded interval, then activate safe links; this is a presentation animation after the API response, not provider token streaming. Reduced-motion preferences disable the reveal animation.


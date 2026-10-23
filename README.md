# Merchant Pro website

Current Merchant Pro website with official navy/orange branding, Montserrat fonts, six original customer testimonials, and legacy URL redirects.

## Publish to a typical web host (cPanel, Apache, Nginx, or static hosting)

The `deploy/` folder is the ready-to-upload website. No Node.js, PHP, WordPress, database, API key, or build step is required to serve it.

1. Download this repository as a ZIP from GitHub (Code → Download ZIP), then extract it.
2. Back up the current website on your host.
3. Upload **the contents of `deploy/`**, including its hidden `.htaccess` file, to the host's document root (often `public_html`). Do not upload the entire repository there.
4. Serve the site at the domain root with HTTPS. Pages use absolute paths and are not configured for a subfolder.
5. On Apache, `.htaccess` supplies the 42 legacy redirects. On Netlify, `_redirects` supplies them. For Nginx or another server, configure equivalent redirects from `legacy-redirects.json`; ensure `/about/` and similar paths serve their `index.html` files.
6. Verify the home page, mobile menu, testimonials, contact links, and legacy redirects on your domain.

The static version uses ordinary full-page links and a small standalone script for the mobile menu. Customer contact is by telephone or email; there is no online form submission service. Phone/email links open the visitor's configured applications.

### Search indexing

The current review site includes `noindex` metadata and a restrictive `robots.txt`. Before a public search launch, deliberately update these in the source and exported pages, and confirm the production domain metadata and business/legal copy.

## Editable application source

`app/` contains the React/Next-compatible pages; `public/` contains local logos, photos, fonts, and icons. The current application uses Vinext and the Cloudflare Workers runtime. Its compiled server output is **not** suitable for uploading directly to a PHP-only host. Use `deploy/` for ordinary web hosting.

With Node.js 22.13 or newer:

```sh
npm ci
npm run dev
npm run build
```

The Sites hosting manifest and build integration are retained so the original source can still build in its original environment. They contain project identifiers, not deployment credentials. The disabled `/api/review` endpoint is retained in source and is not part of the static package.

## Refresh the static version

The supplied export script captures pages from the published source site, removes framework scripts, copies local assets, and supplies standalone mobile navigation. It requires Python 3 and curl:

```sh
python3 scripts/export-static.py
```

To export a different running build, pass `--base-url https://your-preview-domain.example`. Edit and publish the application first, then regenerate `deploy/`. Editing `app/` alone does not update the checked-in static snapshot.

## Assets and content

Official logo artwork was extracted from the supplied Merchant Pro brand sheet without redrawing it. Brand colors: navy `#012A52`, icon orange `#FC7B17`, wordmark orange `#FD6714`. Typography: Montserrat.

Customer testimonials, portraits, Gary Baillio's photo, and the Clover Mini image were migrated from merchantproinc.com. Customer email addresses are not included in the testimonials. No credentials, private training documents, or production account data are included.

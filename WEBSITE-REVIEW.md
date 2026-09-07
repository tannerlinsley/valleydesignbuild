Website review, September 7, 2026

Implemented in the working copy:

- Reworked the homepage around the offer, project imagery, services, and an inquiry form. Removed repeated service lists, numbered decorations, filler captions, and unsourced testimonials.
- Replaced the gallery's social-link landing page with the existing site photos, full-photo links, and links to the matching services.
- Made the project reel play on request. The initial page no longer loads Vimeo. Service card images now load lazily, and text stays visible while fonts load.
- Removed automatic page-wide reveal effects and pointer-tracking code. Content stays visible without waiting for animation observers.
- Added form progress, success, and error states. Failed requests preserve entered details. Added a project city field, autocomplete, unique field IDs, and optional phone number. Moved the form above contact information on mobile.
- Added the static form declaration required by Netlify for server-rendered forms. See [Netlify's form setup requirements](https://docs.netlify.com/manage/forms/setup/).
- Added a skip link, visible keyboard focus, mobile menu state and Escape handling, and native FAQ disclosures that also work without JavaScript.
- Removed the unsourced 47-review aggregate rating, conflicting company timeline and founding date, nonexistent site-search action, duplicate homepage business schema, assumed social-image dimensions, and unverified Twitter handles. Self-serving local business ratings are not eligible for Google's review stars. See [Google's review guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).
- Aligned structured opening hours with the visible contact information. Corrected the business coordinates using an address match from the [US Census geocoder](https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=3092%20N%202000%20W%2C%20Farr%20West%2C%20UT%2084404&benchmark=Public_AR_Current&format=json). The coordinates are an approximate street address location, not a surveyed point.
- Replaced the map marker prototype patch and external marker files with typed module loading and bundled Leaflet assets. Added loading failure feedback and stopped map zoom from consuming page scrolling.
- Prevented missing service and blog pages from generating metadata containing "undefined". Escaped JSON-LD safely, stabilized article dates across time zones, and excluded linked image files from the page sitemap.

Verification:

- `npm run build` passes, including TypeScript and 25 prerendered pages.
- All 25 generated pages have one H1, one canonical URL, and parseable JSON-LD. The sitemap excludes image files and the static form endpoint.
- Browser checks at 390px found no horizontal overflow across all seven main pages, a service page, and a blog article. Reviewed homepage and gallery layouts, the mobile contact form, and the desktop dark theme.
- Verified mobile menu Escape handling, FAQ expansion, service preselection, and production client navigation to the working map.
- Tested form encoding, successful responses, HTTP errors, and network failures with mocked requests. Tested JSON-LD escaping and round-trip parsing. No customer inquiries were sent.
- The live Netlify image endpoint returns HTTP 200 and WebP for the gallery image request. Plain Vite production preview does not emulate that endpoint, so use the development preview for local visual review.

Still needs business or deployment evidence:

- Confirm current pricing, warranty coverage, service promises, and technical construction claims in the existing blog and service content. Those claims were not certified by this review.
- Supply attributable customer reviews and confirmed company history before restoring testimonials or dates. No replacement reviews or milestones were invented.
- Add project-specific photos, locations, constraints, and outcomes for case studies. The gallery currently uses the site's existing assets and service labels.
- Confirm Netlify form detection is enabled, then verify a real submission reaches the intended recipient after deployment. Local tests cannot establish live delivery.
- Merged the seven newer commits from the default branch, including the updated photography, brand assets, pool partner links, and service content.

The changes are prepared for the default branch. Live form delivery and conversion or ranking gains have not been verified.

# Pest Control Innovation — SEO-first GitHub Pages website

Static GitHub Pages + Cloudflare website for Pest Control Innovation.

## Source basis
Company information and service categories were taken from the current public PCI website:
- https://pestcontrolinnovation.in/
- https://pestcontrolinnovation.in/our-service
- https://pestcontrolinnovation.in/contact-us

The current source states 20+ services, 50+ team members, 2,500+ happy clients, 20+ years of experience, an IPM approach, residential and commercial services, and a pan-India presence.

## SEO included
- Unique titles/descriptions and canonical URLs
- One clear H1 per page
- Open Graph/Twitter metadata
- JSON-LD structured data
- FAQ schema on homepage
- Breadcrumbs and internal links
- robots.txt and XML sitemap
- Mobile responsive, lightweight CSS/JS
- Semantic HTML and image alt text
- No invented city-specific claims

## GitHub Pages
1. Create a GitHub repository.
2. Upload all files from this package to the repository root.
3. GitHub → Settings → Pages → Deploy from branch → main → /(root).
4. Add `pestcontrolinnovation.in` as the custom domain in GitHub Pages.

## Cloudflare
Use Cloudflare DNS with the current GitHub Pages custom-domain records shown by GitHub. Keep one canonical host, preferably `https://pestcontrolinnovation.in/`, and redirect the alternate host to it only after the primary site works.

## Google Search Console
Verify the domain, submit:
`https://pestcontrolinnovation.in/sitemap.xml`
Then inspect and request indexing for the homepage, services hub and key service pages.

## Before launch
- Confirm the phone, email and office addresses.
- Replace gallery placeholders with genuine PCI project photographs and unique alt text.
- Add city pages only when PCI has verified local service availability and useful local information.
- The static enquiry form opens the visitor's email application. For direct form submission, connect a form backend later.


## IMPORTANT: Fix the www / non-www duplicate URL issue

Use **https://pestcontrolinnovation.in/** as the single canonical URL.

### Cloudflare DNS
- Keep the apex domain `pestcontrolinnovation.in` connected to GitHub Pages / Cloudflare as your primary host.
- Create the `www` hostname only if needed, but do NOT leave it serving an independent copy.
- Put Cloudflare in front of the site and create a Redirect Rule:
  - Condition: `http.host eq "www.pestcontrolinnovation.in"`
  - Target: `https://pestcontrolinnovation.in/$1`
  - Status: `301`
- Also enable **Always Use HTTPS** in Cloudflare.

The package includes `_redirects` for Cloudflare Pages, but a Cloudflare Redirect Rule is the preferred control when using GitHub Pages behind Cloudflare DNS.

### GitHub Pages custom domain
Configure `pestcontrolinnovation.in` as the custom domain in GitHub Pages. After HTTPS is active, test all four variants:
- http://pestcontrolinnovation.in
- http://www.pestcontrolinnovation.in
- https://www.pestcontrolinnovation.in
- https://pestcontrolinnovation.in

The final canonical destination should be:
**https://pestcontrolinnovation.in/**

### Direct enquiry form
The contact form now POSTs directly to the business email through FormSubmit rather than opening the customer's mail application.

**First-use activation:** FormSubmit may send an activation/confirmation email to `info@pestcontrolinnovation.in` the first time the endpoint is used. Complete that one-time activation. After activation, customer submissions are sent through the web form without opening the customer's email program.

For a production business website, an authenticated transactional form provider can be substituted later if you want stronger spam controls, delivery logs and domain authentication.

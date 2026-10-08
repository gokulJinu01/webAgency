# Luko Designs

The website for Luko Designs, an independent web studio in Toronto — websites, booking, integrations and custom tools for local businesses. A single-page React + Vite site, hosted as static files on Vercel. Enquiries are sent by email through [Web3Forms](https://web3forms.com), with no server or database.

## Live site

[Visit Luko Designs](https://lukodesign.design/)

## Run locally

```sh
npm ci
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:5173
```

`npm run build` outputs the site to `dist/`, and `npm run preview` serves that build locally.

## Settings (`.env` locally, Vercel → Settings → Environment Variables in production)

| Variable | What it does |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | Access key from web3forms.com, created with the email that should receive enquiries. Without it, the form tells visitors to email directly and nothing is sent. |
| `VITE_BOOKING_URL` | Optional Cal.com / Calendly link. The "Book a call" button only appears when this is set. |

Both values end up in the public site, and that's expected. Web3Forms keys are designed for browser use. Rebuild or redeploy after changing them.

## Deploy to Vercel

1. Import the GitHub repo in Vercel. It detects Vite automatically (build `npm run build`, output `dist`).
2. Add the environment variables above.
3. Enable **Web Analytics** in the Vercel project (cookieless, already wired up in `src/main.jsx`).
4. The site URL appears in `index.html` (canonical, Open Graph, structured data), `public/robots.txt`, `public/sitemap.xml`, and `public/privacy.html`. It currently points at `https://lukodesign.design`; swap it for your own domain when you buy one.

`vercel.json` sets security headers, including a Content Security Policy that only allows requests to this site and `api.web3forms.com`, and caches hashed assets in `/assets/` for a year. If you add a third-party script or embed, allow its domain there.

## Work section

One project at a time, chosen from the tab row. The list lives in `projects` at the top of `src/main.jsx`:

| Project | What it shows | Art |
| --- | --- | --- |
| RailTech Inc. | Company site and platform, built end to end | `public/railtech.webp` |
| Interactive 3D portfolio | React + three.js personal site | CSS mock — **replace with a real screenshot**, see below |
| WallList for iOS | Native iOS app and Home Screen widget | `public/walllist.webp`, `public/walllist-widget.webp` |
| earlybird café | Concept for a café | HTML/CSS mock, uses `public/cafe.webp` |
| rise & rye bakery | Concept for a bakery | HTML/CSS mock, image slot marked `FILL IN WITH PROPER IMAGE` |

Two images are still placeholders, both marked with `FILL IN WITH PROPER IMAGE` comments in `src/main.jsx`: a bakery hero photo (`public/bakery.webp`) and a screenshot of the 3D portfolio (`public/portfolio.webp`).

## Where things live

- **Copy, projects, services, FAQ, form logic:** `src/main.jsx` (contact email in `CONTACT_EMAIL` at the top)
- **Design and breakpoints:** `src/style.css`
- **Privacy policy:** `public/privacy.html` · **404 page:** `public/404.html`
- **Share preview image and icons:** `public/og-image.png`, `public/apple-touch-icon.png`, `public/favicon.svg`

## Site behaviour

Five horizontal sections use native scroll snapping. Wheel, trackpad, swipe, the arrow keys, and the header/footer controls all navigate, and the URL hash (`#work`, `#contact`, …) follows the current section so links can point straight at one. When a section's content is taller than the screen (small laptops, zoomed text, phones in landscape), the section scrolls vertically first and only moves on once it reaches the end. Inactive sections are inert, and focus moves to the new section's heading. Motion respects reduced-motion preferences.

## Content notes

- **earlybird café** and **rise & rye bakery** are self-initiated concepts, labelled as such on the site.
- **RailTech**, the **3D portfolio** and **WallList** are Gokul's own products, built end to end — not client commissions.
- The FAQ answers are drafts. Check they match how you actually work.

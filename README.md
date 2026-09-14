# webAgency

Luko Designs

A MERN agency website: React + Vite frontend, Express/Node API, MongoDB via Mongoose. Luko Designs is the selected studio name. The Work section features RailTech AgentPod and MME from Gokul’s existing portfolio. These are personal portfolio projects, not claimed Luko client commissions. The interactive Earlybird hero remains a clearly marked fictional concept. Services are presented without pricing; enquiries are invited for individual quotes.

## Run locally

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your database.
3. Set `VITE_API_URL=http://localhost:3001` and `CLIENT_ORIGINS=http://localhost:5173`.
4. Run `npm run server`, and in another terminal `npm run dev`.
5. Run `npm test` for enquiry validation checks.

## Hosted preview and production

The Sites preview hosts the built React frontend. It does not run the Express process or provide MongoDB. Its form explicitly states that messages are not sent when no API is configured, and it never claims a successful delivery.

To receive enquiries, deploy this repository to a Node-capable host and connect MongoDB. Set `MONGODB_URI`, `PORT`, and `CLIENT_ORIGINS` (comma-separated, exact permitted frontend origins). Set `TRUST_PROXY_HOPS` to the host's known trusted proxy count, only if required. Build with `VITE_API_URL` set to the public Express origin, then run `npm run build` and `npm start`. Express can serve the frontend and API together. Use the same public origin as `VITE_API_URL` when serving them together. Alternatively keep Sites as the frontend and rebuild it using the separate Express URL.

Enquiries are saved in MongoDB's `enquiries` collection; no email notification service or admin dashboard is implied. Manage records securely through your database administration tooling. Establish an appropriate retention process before collecting real client details. No database credential belongs in frontend variables or Git.

API: `GET /api/health` (503 until database ready); `POST /api/enquiries` (validated payload, 16 KB body limit, 5 submissions per IP per 15 minutes, honeypot, no public read endpoint). For multiple server instances, use a shared rate-limit store. An API 201 means the record was saved, not that an email was sent.

## Site behavior

Five horizontal sections use native scroll snapping; navigation and progress are synchronized with IntersectionObserver. Mouse wheel, trackpad, touch swipe, buttons and left/right keys navigate. Sections use viewport-sized layouts with no vertical page scroll. On compact screens, portfolio projects switch in place and the live hero preview has its own toggle. The contact form uses two compact steps. Inactive sections are inert. Motion respects reduced-motion preferences. Café colour/device/menu controls are local interactive design demonstrations.

## Editing

Copy, studio name, services and interactions: `src/main.jsx`. Design and breakpoints: `src/style.css`. Enquiry API: `server/index.js`. Validation: `server/validation.js`. Asset: original generated café photograph in `public/cafe.jpg`.

## Portfolio sources

Descriptions and project links were reviewed from `gokulJinu01/portfolio/src/components/ProjectsSection.js` at commit `01bbb5d592746bedd6bb54ec3ec5d28a9e30d110`. Screenshots: `src/images/railtech.png` and `src/images/mme.png` in that repository. The MME project links to https://mme.railtech.io/. Project descriptions are based on the owner’s published portfolio; no commercial results or independent live-service verification are implied.

## Install from the source archive on your Mac

Download `luko-designs-source.zip`. It contains an `agency/` directory.

```sh
mkdir -p /Users/goku/Projects
unzip ~/Downloads/luko-designs-source.zip -d /Users/goku/Projects
cd /Users/goku/Projects/agency
npm ci
npm run dev
```

Use an empty destination so existing work is not overwritten.

## Push to your GitHub repository

The connected GitHub integration returned HTTP 403 when attempting to initialize `gokulJinu01/webAgency`; no source was pushed there from this session. From the extracted folder, using your own authorized GitHub login:

```sh
git init -b main
git add .
git commit -m "first commit"
git remote add origin https://github.com/gokulJinu01/webAgency.git
git push -u origin main
```

No `.env`, dependencies, compiled output, or credentials are included in the source archive. Configure `.env` from `.env.example` locally when connecting the enquiry backend.

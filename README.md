# GDG VIIT website

React + Vite + Tailwind CSS v4 + Framer Motion + React Router + Lucide.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Updating content

All content lives in `src/data/`; components never hard-code club details.

| File | What it holds |
|---|---|
| `siteConfig.js` | Club name, tenure, email, address, socials, join link, global community URL, form endpoint, impact numbers |
| `team.js` | The 15 members: photo, bio, LinkedIn/GitHub/Instagram links |
| `events.js` | Events. Upcoming/completed is worked out from the date |
| `navigation.js` | Nav items and each page's accent colour |

Anything in `[square brackets]`, marked `TODO`, or flagged `isSample: true` is placeholder data. Replace it before launch.

- **Official logo:** put the file in `public/logos/` and set `siteConfig.logo.src`. It is shown as-is, never redrawn.
- **Photos:** put them in `public/team/` and `public/events/`, then reference them as `'/team/name.jpg'`.
- **Contact form:** set `siteConfig.contact.formEndpoint` (for example a Formspree URL) to send messages for real. Until then the form opens the visitor's email app.

## Deploying

The site is a static SPA. `public/_redirects` handles Netlify routing. On Vercel, add a rewrite of `/(.*)` to `/index.html`.

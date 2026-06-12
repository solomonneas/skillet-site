# skillet-site

Astro static site for skillet.escoffierlabs.dev.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run check && npm run build
```

Output lands in `dist/`.

## Deploy

Deployed on Vercel (project `skillet-site`, repo root). DNS is an A record
`skillet` -> `76.76.21.21` (DNS-only) on the escoffierlabs.dev zone.

# Repository Guidance

## Definition of Done
Before reporting any change complete, run:

```bash
./scripts/verify
```

It runs `npm run check` (astro check, the only type/content gate; there are no tests or lint scripts) then `npm run build` (must produce `dist/` without errors).

Report the actual command output. If it fails, report the failure verbatim and do not claim success. Note: requires Node >= 22.12.0 per `package.json` engines; if the local Node is older, report that as the blocker.

## Project Shape
- Astro 6 static product site for Skillet, served at skillet.escoffierlabs.dev. Styling is Tailwind CSS 4 via the `@tailwindcss/vite` plugin in `astro.config.mjs`.
- Single page: `src/pages/index.astro`, plus a generated `src/pages/sitemap.xml.ts`. Shared shell is `src/layouts/BaseLayout.astro` with components in `src/components/` (nav, footer, theme toggle, copy-command button).
- Editing copy (product name, tagline, version, install command, external links): change the constants in `src/lib/site.ts` (`SITE`, `NAV_LINKS`, `EXTERNAL`), never inline strings in pages.
- Global styles and theme variables: `src/styles/global.css`. Static assets (favicon, OG image, robots.txt): `public/`.

## Commands
- `npm run dev` starts a local dev server; `npm run preview` serves a built `dist/`.
- These plus `check` and `build` are the only scripts. If a command is not in `package.json` scripts, it does not exist here; do not invent others.

## Publishing Boundary
- This repo deploys via Vercel (project `skillet-site`, repo root). `vercel.json` pins framework `astro`, build command `npm run build`, output `dist/`.
- Pushing to `main` triggers a production deploy. A push to main IS a publish. Before any push to main: both Definition of Done commands pass, `SITE.version` and the commands table are accurate (see Gotchas), and the diff contains only intended files.
- Do not push unless explicitly asked. Committing locally is safe; pushing is not.
- A pre-push hook is configured (global `core.hooksPath`). Never push with `--no-verify`. If the hook fails, report its output and stop.

## Prohibitions
- Never weaken, skip, or delete a failing check or gate to get green. Fix the cause or report the failure.
- Never invent commands, config keys, or API facts. Read `package.json`, `astro.config.mjs`, or the source first.
- If blocked by sandboxing, auth, or a missing tool, report the exact blocker and stop. Do not work around it.
- Never force-add anything under `memory/` or `.brigade/`; both are gitignored local state.
- Never commit `dist/`; it exists locally from past builds and is gitignored.

## Gotchas
- `SITE.version` in `src/lib/site.ts` shows in the hero kicker and must track the released skillet CLI version (currently 0.4.0). When versions move, also update the commands table in `index.astro` to match the CLI's real command set.
- Changing `site` in `astro.config.mjs`: do not, unless DNS and Vercel are updated together. DNS is an A record `skillet` -> `76.76.21.21` (DNS-only) on the escoffierlabs.dev zone.
- Touching dependencies: keep the `vite` override (`^7.3.2`) in `package.json` unless you verify Astro no longer needs it.

## Memory Handoff
At the end of any substantial task, write a handoff note to `.claude/memory-handoffs/` using that directory's `TEMPLATE.md`. Record durable discoveries, gotchas, and decisions. Do not wait to be reminded.

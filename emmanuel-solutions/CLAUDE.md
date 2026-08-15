# Emmanuel Solutions — website

Marketing site for Emmanuel Solutions (www.emmanuelsolutionss.com), a consultancy
in sustainable technology, circular economy, innovation capability and industrial
marketing, with a dedicated enterprise AI division.

React 18 + Vite 5 SPA, react-router-dom v6, framer-motion, Three.js.
Deployed on Vercel, triggered by pushes to `main`.

---

## READ THIS FIRST — the repo layout trap

The GitHub repo `gibeon1235/emmanuel-solutions` contains a **single nested folder**.
The site source is NOT at the repo root:

```
~/emmanuel-solutions/            <- git repo root
  └── emmanuel-solutions/        <- the actual Vite project (package.json lives here)
      ├── src/
      ├── public/
      └── scripts/
```

Copying files to the repo root instead of the nested folder silently changes
nothing on the live site. This wasted several deploy cycles. After any `git add`,
run `git status --short` and confirm **every changed path starts with
`emmanuel-solutions/`**.

## How to work in this repo

- **Never start a browser, dev server or take screenshots.** The user checks
  visuals themselves. Verify numerically instead.
- **Filter command output to PASS/FAIL lines.** Never paste full logs.
- **While iterating run only the specific test.** Run `npm run verify` once, at
  the end.
- **Keep summaries to a few lines.**

## Commands

```bash
npm run dev        # local dev server
npm run build      # production build
npm run verify     # build + every test below, in order — run before every deploy
```

Individual checks:

| Command | What it protects |
|---|---|
| `npm run bundle` | Three.js must never enter the main bundle |
| `npm run smoke` | all 15 routes render without throwing |
| `npm run farmer` | the sustainable-technology animation's timing |
| `npm run face` | facial features are actually visible, not buried in the head |
| `npm run capability` | who gets the 3D scene and who never downloads it |
| `npm run mount` | the rail mounts in a real DOM without crashing |

## Deploy

```bash
cd ~/emmanuel-solutions
git checkout main
git add -A
git status --short | head -20      # every path must start with emmanuel-solutions/
git commit -m "..."
git push                            # Vercel builds automatically
```

---

## Architecture

**Content is data.** All copy lives in `src/data/content.js` — services, case
studies, insights, alliances, hero copy, practice areas. Change words there, not
in components.

**Routes are code-split.** Detail pages are `React.lazy`. The homepage is the
entry chunk and must stay under 420 kB (enforced by `npm run bundle`).

**The 3D scenes are lazy and gated.** `src/components/ServiceRail.jsx` owns one
shared canvas that follows the cursor across the four practice-area cards.
`src/three/MascotScene.jsx` is the only file that imports Three.js from the app
side, and it is loaded via `React.lazy` on hover.

**Before any 3D work, read `docs/3D-ANIMATION.md`.** It covers the scene
contract, the tuned lighting rig, material values, the geometry clearance rule,
rigging patterns, animation craft, performance budgets, testing patterns and a
table of pitfalls that have actually broken this project.

### Hard-won rules for the 3D work

1. **Never import `sceneRegistry.js` from a component.** It pulls in Three.js.
   Ask `hasScene()` from `src/three/sceneIds.js` instead — a plain array of
   strings. Getting this wrong once took the entry chunk from 350 kB to 1,046 kB
   and the build reported no problem at all.

2. **Facial features must clear the geometry in front of them.** The head, face
   patch and beard are large overlapping spheres. Five of six features were once
   buried inside them — the mouth sat 0.051 units behind the beard, so the smile
   animation was invisible for several iterations. `npm run face` computes the
   sphere surface depths and fails if anything sinks. Update its constants
   whenever facial geometry moves.

3. **The stage must keep `pointer-events: none`.** It covers the cards; if it
   captured the pointer, moving into it would read as leaving the card and the
   scene would flicker off.

4. **Timing lives in pure modules** (`farmerTimeline.js`), separate from geometry
   (`farmerScene.js`), so it can be tested without a GPU. Follow this split for
   new scenes.

5. **Watch for variable shadowing of `m`.** framer-motion is imported as `m`
   (with `LazyMotion`). A `.map((m, i) => ...)` parameter once shadowed it and
   crashed the whole React tree, which also broke the back button.

### Adding a service scene

1. Write `src/three/<name>Timeline.js` — pure maths, no Three.js.
2. Write `src/three/<name>Scene.js` — returns `{ group, update(t, dt), dispose() }`.
3. Register it in `src/three/sceneRegistry.js` and add the id to `sceneIds.js`.
4. Add a timing test modelled on `scripts/farmer-timeline.mjs`.
5. `npm run verify`.

## Design system

Warm "ground to sky" palette — earth and sun through to sky and water. Tokens in
`src/styles.css` (`--es-sand`, `--es-clay`, `--es-gold`, `--es-sky`, `--es-water`).
Materials system: `.es-glass`, `.es-concrete`, `.es-titanium`, `.es-obsidian`.

**The AI Solutions band is the one dark section and must stay dark** — it is the
established visual identity for that division.

Performance rules learned the hard way: avoid `mix-blend-mode` over video or
animation (forces full stacking-context repaints per frame); use `contain: paint`
and `isolation: isolate` to isolate compositing layers; keep blur radii modest.

## Hero video

`public/assets/video/greenhouse.mp4` is AI-generated footage, labelled
**Illustrative** on the page. It is NOT the real Devrays Mone Solar Dome
installation and nothing may claim it is. Real Devrays photographs are in the
gallery, correctly captioned. Rebuild the loop with
`./scripts/build-hero-loop.sh clipA.mp4 clipB.mp4`.

## Accuracy rules for content

- SFAI (Spray Foam Alliance of India) is an **initiative of IPUA**, not owned by
  Emmanuel Solutions. Isaac was a founding contributor. Describe it as an alliance
  relationship, never as a division.
- Statistics must be attributed. Do not invent figures.

## Open questions — ask the user, do not guess

- Emmanuel Solutions' founding year (needed for schema.org markup)
- Whether the PU Today editorship is current or former
- Exact wording of Emmanuel Solutions' contribution to the Mone Solar Dome
- IIF profile material, expected from a contact named Prasanna

## Roadmap

1. Circular economy scene — chemical recycling, no characters
2. Innovation capability scene — character presenting at a board, classroom setting
3. Industrial marketing scene — building timelapse, ending with a stamp effect
4. Roll the warm palette onto service, case study and alliance pages (still cool-toned)
5. Standalone `/aisolutions` page
6. WebP image optimisation

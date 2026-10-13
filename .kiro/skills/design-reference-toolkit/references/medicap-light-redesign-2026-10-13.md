# MediCap light clinical-editorial redesign — 2026-10-13

## Confirmed direction

The user selected a **clinical editorial** direction: mainly white; blue actions/navigation; green available/success; amber warning; red full/critical; IBM Plex typography; and removal of generic neon/glass dashboard styling across both `docs/` and `public/`.

## Design problem and 5 / 10 / 15-second goal

The dark indigo/cyan aurora, glass panels, oversized rounding, shadows, staggered cards, and four-font stack made a small hospital demo look like a generic generated startup dashboard. The redesign must feel intentionally clinical without pretending to be deployed medical software.

- **5 seconds:** MediCap, hospital capacity, and demo/API data context are visible.
- **10 seconds:** usable, occupied, and admittable capacity plus written status semantics are clear.
- **15 seconds:** view capacity or admit a patient is the obvious next action.

## Live-reference evidence

**Access date and method:** 2026-10-13; live Chromium inspection at desktop and 320px using screenshots, accessibility-tree snapshots, computed styles/overflow, first-focus checks, and reduced-motion emulation. This was not a full WCAG, touch, no-JavaScript, or complete keyboard audit.

- [James Magpantay](https://www.jamesmagpantay.com/) — **Observed:** expressive editorial identity retains a skip link, landmarks, labeled utility controls, proof, and explicit actions; mobile reflows without observed overflow. **Inferred:** personality works because utility remains obvious. **Unknown:** complete focus order, contrast, touch, and no-JS behavior. **Adaptation:** preserve skip/focus/control clarity only. Do not copy its dark/orange palette, mascot, audio, portrait, content sequence, typography, or choreography.
- [Thomas Monavon](https://thomasmonavon.com/) — **Observed:** radical curation, one dominant project, strong scale contrast, and extensive whitespace; mobile remains sparse. **Inferred:** deliberate absence can create authority. **Unknown:** media fallback and complete keyboard/reduced-motion behavior. **Adaptation:** make one capacity snapshot dominant rather than rendering every landing-page idea as an equal card. Do not copy its split viewport, reel, crop, numbering, or type.
- [Exo Ape](https://exoape.com/) — **Observed:** sparse navigation and a few high-impact visual proof moments; mobile condenses navigation. **Inferred:** fewer strong moments can replace component density. **Unknown:** full media accessibility and reduced-motion treatment. **Adaptation:** reduce component noise only. Do not copy its media, cursor, transitions, title crops, or project layouts.
- [THE LINE](https://thelinestudio.com/) — **Observed:** craft vocabulary, large type, and production annotations create a specific authored identity; substantive media has an explicit play control. **Inferred:** domain language is more convincing than generic effects. **Unknown:** complete autoplay, caption, and no-JS behavior. **Adaptation:** use capacity, room, session, and status language as interface structure. Do not copy its footage, frame overlays, labels, palette, or showreel behavior.
- [Gradient Labs](https://gradient-labs.ai/) — **Observed:** a warm light canvas leads with a direct proposition/action, then operational scenarios, mechanism, proof, security, and implementation. Mobile retains the action/proof sequence. **Inferred:** hierarchy follows visitor uncertainty. **Unknown:** full metric substantiation, keyboard behavior, and reduced-motion quality. **Adaptation:** use facts-first capacity hierarchy. Do not copy its ivory/orange palette, actors, diagrams, cards, claims, metrics, logos, or page sequence.
- [Cyd Stumpel](https://cydstumpel.nl/) — **Observed:** editorial personality is layered over landmarks, a skip link, descriptive media, availability, work, and contact; mobile uses a menu without observed overflow. **Inferred:** one identity system can unite varied content without removing utility. **Unknown:** residual reduced-motion animation impact and full contrast. **Adaptation:** use one IBM Plex/ruled language across landing and records. Do not copy its collage, portraits, badges, marquee, illustrations, palette, or interactions.
- [NLC / Obys](https://nlc.obys.agency/) — **Observed:** monumental type, thin rules, numbered sections, metadata, a strong thesis, and audience-specific actions make dense evidence navigable. **Inferred:** metadata and framing carry identity. **Unknown:** parts of mobile main-content behavior and full keyboard operation. **Adaptation:** use restrained indices, mono metadata, and rules. Do not copy its nested frame, landscape, hot-pink/orange palette, numbering composition, or narrative.
- [Junni](https://junni.co.jp/) — **Observed:** one repeated kinetic behavior carries identity across sections; mobile reflows without observed overflow. Reduced-motion and control labeling were weak in this pass. **Inferred:** consistency creates recall. **Unknown:** canvas fallback and keyboard completeness. **Adaptation:** repeat only a static status-rule behavior across room records. Do not copy its canvas/tile field, outlined words, lime palette, marquee, or choreography.

## Pattern selection

- **Primary:** Gradient Labs — facts-first operational narrative, transformed into current capacity → room records → action.
- **Supporting:** NLC — editorial metadata/rules; James Magpantay — explicit utility/accessibility beneath personality.
- **Deliberately not selected as implementation patterns:** source-specific cinematic media, canvas animation, collages, nested frames, marquees, and scroll choreography.

## Originality gate

- **Borrowed problem:** make a complex operating state immediately understandable without generic decoration.
- **Transformed composition:** left-aligned hospital statement plus one current snapshot; ruled workflow rows; flat status-edged room records.
- **Transformed tokens/type:** original warm white, medical blue, deep green, amber, and clinical red system with IBM Plex Sans/Mono.
- **Transformed interaction:** no autoplay or signature source motion; only short functional gauge/control transitions.
- **Content test:** every section uses existing MediCap rooms, beds, admissions, demo context, API context, and repository source.
- **Side-by-side test:** no source composition, copy, assets, claims, palette, type pairing, or signature choreography was reproduced.

Content was rephrased for compliance with licensing restrictions.
## Changed

- Replaced the dark aurora/glass system with warm-white surfaces, thin rules, a medical blue primary, deep green available/success, amber warning, and clinical red critical states.
- Replaced Inter, Playfair Display, Darker Grotesque, and Fira Code with IBM Plex Sans and IBM Plex Mono.
- Rebuilt the landing page around one dominant operational statement and one current-capacity snapshot, followed by ruled workflow rows instead of equal feature cards.
- Rebuilt both capacity dashboards with one metric strip, flat status-edged room records, restrained corners, written status labels, and no staggered entrance animation.
- Ported the visual system to Patients, Admissions, modal forms, navigation, feedback, and both handwritten clients.
- Added repository steering at `.kiro/steering/visual-design.md` to prevent the removed generic styling from returning.

## Checked

- JavaScript syntax for every edited script and `git diff --check`.
- Desktop and 320px rendered screenshots for the landing page and API-backed dashboard.
- 320px, intermediate, and desktop reflow; no horizontal overflow after testing a long unbroken patient name.
- IBM Plex browser-computed font stack and warm-white browser-computed background.
- Capacity values and maintenance exclusion: 29 usable, 3 occupied, 26 admittable in the representative data set.
- Written status plus green/amber/red/neutral visual treatment; zero full rooms no longer receives critical red emphasis.
- Admission dialog initial focus, focus wrapping, Escape close, focus restoration, and background isolation.
- Refresh control re-enables after asynchronous completion.
- Mobile navigation closes and resets its accessible state when leaving the mobile breakpoint.
- Reduced-motion emulation and removal of aurora, gradients, glass blur, glow shadows, old font references, large rounded cards, and staggered entrances.
- Contrast: ink/paper 15.30:1, muted/paper 4.97:1, white/blue 6.63:1, green/soft 7.10:1, red/soft 8.32:1, amber/soft 8.16:1, and metric ordinals/white 5.30:1.
- Final behavioral/semantic review: approved with no remaining actionable blockers.

## Not checked

- The connected dashboard against a running MySQL database and Express API.
- A complete screen-reader, touch-device, print, or formal WCAG audit.
- Every OS/browser font-rendering variation.
- The deployed GitHub Pages result because these changes have not been committed or pushed.

## Known limitations

- Tailwind, IBM Plex, and Remixicon remain CDN dependencies; the Tailwind CDN still emits its production-use warning.
- `docs/` and `public/` remain parallel handwritten clients, so visual primitives are intentionally duplicated and must be ported together.
- The demo remains sample software without production authentication, audit logging, or clinical privacy controls.

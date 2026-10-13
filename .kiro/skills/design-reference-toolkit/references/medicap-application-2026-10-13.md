# MediCap application ledger — 2026-10-13

## Scope and design problem

**Target:** public GitHub Pages demo (`docs/`) with shared truthfulness changes ported to the connected client (`public/`) where applicable.

**Problem:** the current interface calls a session-only static demo “real time” and counts a maintenance bed as “Available.” Its visual hierarchy is coherent, but operational facts and actions need to carry more weight than the ambient styling.

**Audience outcome:** within 5 seconds identify MediCap and its demo status; within 10 seconds see truthful usable/occupied/admittable capacity; within 15 seconds reach the dashboard or admit workflow.

## Question ledger

| ID | Question | Evidence | Status |
|---|---|---|---|
| Q1 | What must the visitor understand first? | Live desktop snapshot and `docs/index.html`: product identity, mock-data disclosure, dashboard CTA | Observed |
| Q2 | What creates trust? | README, API/server/schema source, source CTA; no production deployment evidence | Observed with limitation |
| Q3 | What is the signature design idea? | Repeated capacity cards/gauges plus restrained aurora in source and live snapshot | Observed |
| Q4 | How does mobile adapt? | 320×700 browser snapshot: compact nav, stacked content, room cards remain readable | Observed; horizontal overflow not instrumented |
| Q5 | Is core content accessible? | Browser accessibility snapshots and source inspection: landmarks/progress names exist; menu state, current page, filter labels, skip link, and dialog focus handling are incomplete | Observed/derived; not a WCAG audit |

## Evidence notes

### MediCap live demo
- **URL/date:** [GitHub Pages demo](https://magicman-jpeg.github.io/DATABASE-Hospital/), 2026-10-13.
- **Method:** desktop and 320px accessibility-tree browser snapshots; repository source inspection.
- **Finding:** identity and CTA are immediate, while “real time” overstates the session-only demo and the displayed Available count includes a maintenance bed.
- **Confidence:** observed for visible copy/control structure; derived for metric semantics from `docs/js/store.js` and render formulas.
- **Limitation:** runtime contrast, full keyboard traversal, no-JS behavior, and intermediate widths were not fully audited before implementation.
- **Adaptation:** use “current capacity,” show usable and admittable values, retain the existing card/gauge identity, and improve semantic control state.

### Gradient Labs
- **URL/date:** [gradient-labs.ai](https://gradient-labs.ai/), 2026-10-13.
- **Method:** live browser accessibility-tree snapshot.
- **Finding:** the current page leads with a direct product proposition and action, then organizes mechanisms and proof around explicit operational questions.
- **Confidence:** observed for hierarchy and semantics; inferred for conversion rationale.
- **Limitation:** visual motion, all responsive states, and implementation details were not tested.
- **Adaptation:** borrow only the abstract principle of facts-first system explanation. Do not copy its page sequence, actors, diagrams, claims, visual assets, cards, or wording.

### James Magpantay
- **URL/date:** [jamesmagpantay.com](https://www.jamesmagpantay.com/), 2026-10-13.
- **Method:** live browser accessibility-tree snapshot.
- **Finding:** a skip link, section navigation, early identity, and explicit actions let an expressive interface retain a practical path.
- **Confidence:** observed for exposed controls and structure; inferred for recruiter utility.
- **Limitation:** sound, motion, focus order, and all responsive behavior were not fully tested.
- **Adaptation:** borrow only the clarity/accessibility principle: add a skip link, expose active navigation and menu state, and keep actions obvious. Do not copy its content, mode behavior, mascot, sound, composition, or choreography.

## Pattern selection and originality gate

- **Primary:** Gradient Labs' abstract facts-first system explanation.
- **Supporting:** James Magpantay's utility beneath personality; REA's narrow claims and explicit unknowns.
- **Borrowed user problem:** help a visitor understand an operational system and act without decoding decoration.
- **Source-specific exclusions:** all reference branding, copy, visual assets, page composition, metrics, diagrams, and signature interactions.
- **Transformation:** keep MediCap's own content model, indigo/cyan tokens, room cards, gauges, and workflows; change only factual labels, hierarchy, semantics, and modal/menu behavior.
- **Side-by-side outcome:** the result remains the existing MediCap interface, not a visual replica.

Content was rephrased for compliance with licensing restrictions.
## Implementation verification

### Changed
- Replaced real-time claims with current/demo-specific language and preserved the mock-data disclosure.
- Excluded maintenance rooms from usable-bed, admittable-bed, occupied-bed, and occupancy calculations across both clients.
- Added visible filter labels, skip navigation, active/menu state, live-region feedback, safe dynamic-text escaping, and contextual action labels.
- Added idempotent dialog opening, focus containment/restoration, background isolation with `inert` plus an `aria-hidden` fallback, and accurate mutation/refresh failure messages.
- Paused connected-client polling in hidden tabs and deduplicated background outage announcements.
- Darkened the primary indigo token from `#6366f1` to `#4f46e5` so normal white button text exceeds 4.5:1 contrast.

### Checked
- JavaScript syntax for all edited scripts and `git diff --check`.
- Seeded metrics: 7 rooms, 29 usable beds, 3 occupied beds, and 26 admittable beds.
- Mocked connected-client rendering at 320px: corrected metric labels/values, no horizontal overflow, and explicit room status/capacity text.
- Static layout overflow at 320px, 768px, and 1440px.
- Admission dialog initial focus, Shift+Tab wrapping, Escape close, opener focus restoration, duplicate-open guarding, and background-state restoration.
- Successful-write/failed-refresh messaging and a final behavioral diff review with no remaining actionable issues.
- Key contrast ratios: body 16.36:1, muted copy 7.87:1, sky accent 8.31:1, primary button 6.29:1, skip link 20.17:1.
- Reduced-motion media query is detected and the existing CSS suppresses animation/transition durations.

### Not checked
- The connected client against a running MySQL database and Express API.
- A full screen-reader, touch-device, color-vision, or WCAG audit.
- Every dynamic `docs/` interaction in a browser; module syntax and store calculations were checked, while equivalent dialog/render behavior was exercised through `public/` with mocked API responses.
- The deployed GitHub Pages result, because repository changes have not been committed or pushed.

### Known limitations
- Tailwind, Google Fonts, and Remixicon remain CDN dependencies; the browser warns that the Tailwind CDN is not intended as a production build.
- `docs/` and `public/` remain parallel handwritten clients and can drift without disciplined porting.
- The public demo is session-only sample software; the repository still has no production authentication, audit logging, or clinical privacy controls.
- No SVG pan/zoom dependency was installed because there is no qualifying diagram.

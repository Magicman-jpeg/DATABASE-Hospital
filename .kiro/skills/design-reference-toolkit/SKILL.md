---
name: design-reference-toolkit
description: Evidence-led workflow and curated public-site pattern library for researching, critiquing, and improving MediCap without copying source designs. Use for website inspiration, visual reverse engineering, interaction design, product hierarchy, responsive accessibility, and optional SVG exploration.
---

# Design Reference Toolkit

Use this skill when the user asks to study a public website, take inspiration from a reference, critique MediCap, choose a layout or interaction, or implement a reference-informed redesign.

This skill is the repository's on-demand reference-research workflow. Apply it together with the current implementation rather than assuming an older design decision is still authoritative.

Its quality floor is built in:
- ground every decision in MediCap's real capacity-management content and its evaluator/operator journey;
- avoid generic AI defaults, repeated card kits without hierarchy, decorative labels, and unsupported claims;
- keep the type system and color tokens deliberate rather than adding novelty by default;
- use at most one signature interaction, progressive enhancement, explicit properties, and ease-out entrances;
- preserve semantic structure, visible focus, accessible contrast, responsive reflow, and `prefers-reduced-motion`;
- read affected code before editing, reuse existing primitives, and write only what the task needs.

## Start from the actual surface

The repository has two parallel, handwritten clients. Confirm scope before editing and do not assume either is generated:
- `docs/index.html`: public GitHub Pages landing page and showcase content
- `docs/dashboard.html`, `docs/patients.html`, `docs/admissions.html`: public demo IA and markup
- `docs/js/store.js`: in-browser demo data and capacity rules
- `docs/js/ui.js` plus page scripts: public demo behavior and rendering
- `docs/css/style.css`: shared public demo styles
- `public/index.html` and `public/app.js`: Express-served API client
- `README.md`, `server.js`, and `schema.sql`: claims, API behavior, and database rules

There is no frontend generation pipeline or authored/generated CSS split. Tailwind runs from a CDN. Edit the owning handwritten source and port shared changes explicitly between `docs/` and `public/` when both surfaces are in scope.

## Evidence-led reference study

Before coding, inspect the live reference when accessible. Record:
1. **Observed:** visible hierarchy, page sequence, navigation, responsive behavior, controls, motion, semantics, and accessibility signals.
2. **Inferred:** why those choices may work for that audience and content.
3. **Unknown:** implementation details or behavior that cannot be verified.
4. **Transferable principle:** the abstract design problem solved.
5. **MediCap adaptation:** how the principle serves real demo content and the operator/evaluator journey.

Never describe static inspection as observed runtime behavior. Re-check live sites because public websites change.

For broad research, use a small question ledger:
- What is the page's primary job?
- What does a visitor understand in 5, 10, and 15 seconds?
- What is the strongest proof?
- What is the signature spatial or interaction idea?
- How does mobile differ?
- What remains usable without motion or JavaScript?
- Which claims remain unverified?

Read `references/investigation-protocol.md` for the full workflow.

## Synthesize; do not clone

Extract principles, not pixels. Do not copy a source site's HTML, CSS, JavaScript, assets, copy, exact page composition, exact palette/type pairing, signature illustration, or distinctive choreography. Do not transfer claims or metrics that are not true for MediCap.

Prefer synthesis from two or more references when outside inspiration is needed. Transform content/evidence hierarchy, composition, tokens/type, interaction, and accessibility. The result must remain recognizable as MediCap and grounded in its room, patient, admission, API, and database behavior.

## Choose patterns by problem

Select a pattern by intent, not by a site's look:
- **Evaluator clarity and evidence:** proof-first hierarchy and compact implementation metadata.
- **Operational focus:** current capacity, admittable beds, room status, filters, and actions before decoration.
- **Product personality:** one visual language across landing and operational screens.
- **Domain identity:** use capacity, flow, actors, and handoffs—not fake clinical or terminal chrome.
- **Complex system explanation:** show actors, transitions, constraints, and verified outcomes in sequence.
- **Motion:** one restrained behavior; progressive enhancement; viewport and reduced-motion gating.

Read `references/site-patterns.md` before selecting a source-derived pattern. Treat its Jay/portfolio examples as historical source notes, not repository facts; translate only the abstract principle.

## Implementation sequence

1. Audit the current surface before proposing change.
2. State the design problem and audience outcome.
3. Pick one primary pattern and at most two supporting principles.
4. Draft a low-fidelity structure and map it to existing styles and rendering functions.
5. Run an originality check: remove source-specific decoration and exact composition.
6. Implement the smallest coherent change.
7. Port shared changes explicitly between `docs/` and `public/`; there is no generated CSS to rebuild.
8. Verify desktop, intermediate, 320px/mobile, keyboard, focus, contrast, reduced motion, no-JS core content, links, factual metrics, and source consistency as applicable.
9. Report `Changed`, `Checked`, `Not checked`, and `Known limitations`.

## REA-derived discipline

REA is a model for evidence and ownership—not a runtime dependency. Distinguish observation, derivation, inference, and unknown; keep claims narrow; inspect the smallest useful view first; reuse validated findings; give content explicit owners; mark questions done, partial, unsupported, or unresolved; and retain limitations.

Do not run or install REA for ordinary source analysis.

## Optional SVG capability

`bumbu/svg-pan-zoom` is documented as an optional capability only. Do not install it unless MediCap gains a concrete, dense inline SVG that genuinely needs pan and zoom. If that happens, read `references/svg-pan-zoom.md` first and provide accessible HTML controls, a keyboard path, a static fallback, and a pinned local asset.

## Reference maintenance

Every source-derived note must include its URL, access date, observation method, finding and confidence, limitation, adaptation decision, and what was deliberately not copied. Update the note if the live site changes materially.

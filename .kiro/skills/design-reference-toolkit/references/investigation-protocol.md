# Evidence-Led Website Investigation

## Purpose

Study a public site deeply enough to learn from it without reproducing it. This protocol adapts evidence and ownership practices from the MIT-licensed [morluto/rea](https://github.com/morluto/rea) project to ordinary frontend research. REA itself is not needed for a complete source repository or normal browser inspection.

## Question ledger

Start with explicit questions rather than browsing aimlessly:

| ID | Question | Evidence needed | Status |
|---|---|---|---|
| Q1 | What must the visitor understand first? | Hero, metadata, primary CTA | Unknown |
| Q2 | What creates trust? | Product behavior, outcomes, implementation evidence | Unknown |
| Q3 | What is the signature design idea? | Repeated spatial/motion pattern | Unknown |
| Q4 | How does mobile adapt? | Narrow viewport and navigation | Unknown |
| Q5 | Is core content accessible? | Landmarks, headings, keyboard, contrast, reduced motion | Unknown |

Use: `Observed`, `Inferred`, `Unknown`, or `Not applicable`. Never turn a missing check into a pass.

## Investigation order

1. **Identity:** confirm the exact URL and page being studied.
2. **Five-second scan:** record identity, positioning, and first action.
3. **Information architecture:** list sections and the proof/conversion sequence.
4. **Visual hierarchy:** identify scale contrast, alignment, whitespace, media, and recurring structures.
5. **Interaction:** inspect only meaningful controls and signature motion; distinguish autoplay from user-triggered behavior.
6. **Responsive behavior:** compare desktop, intermediate, and mobile. Look for reflow, overflow, hidden content, and changed navigation.
7. **Accessibility signals:** inspect landmarks, heading structure, labels, focus, alt text, reduced motion, and a non-motion path. This is not a full WCAG audit unless explicitly performed.
8. **Synthesis:** state the design problem solved and why it may work.
9. **Original adaptation:** propose a transformed solution using the repository's real content and design tokens.

## Evidence notes

For every relevant finding, capture:
- source URL and date;
- observation method (page text, browser snapshot, screenshot, computed behavior, repository source);
- finding;
- confidence: observed / derived / inferred;
- limitation or untested condition;
- adaptation decision.

Do not claim runtime behavior from HTML/CSS source alone. Do not claim accessibility from the presence of ARIA alone.

## 5 / 10 / 15-second goal

Adapted from REA's website writing guide:
- **5 seconds:** identity and primary purpose are visible.
- **10 seconds:** strongest evidence or operational direction is clear.
- **15 seconds:** a useful next action is obvious.

Supporting details can be progressive. The primary path should remain short.

## Originality gate

Before implementation, answer:
- What user problem are we borrowing a solution for?
- Which parts are source-specific and must not transfer?
- Have content model, composition, tokens/type, and interaction been meaningfully transformed?
- Does the result still make sense with only this repository's real content?
- Would a side-by-side view look like synthesis rather than a clone?

If not, revise before coding.

## Verification matrix

Match checks to the change:
- **Copy/metadata:** spelling, factual accuracy, stable links, title/description.
- **Layout:** 320px/mobile, intermediate width, desktop, overflow, long content.
- **Interaction:** keyboard, focus, touch/hover distinction, escape/close behavior.
- **Motion:** `prefers-reduced-motion`, viewport pause, hidden-tab pause, CPU restraint.
- **Color:** WCAG contrast on actual foreground/background combinations.
- **Generated CSS:** edit source, rebuild, and confirm output only when a generated pipeline exists.
- **Claims:** stable public proof or explicit limitation; never invent metrics.

Finish with: `Changed`, `Checked`, `Not checked`, `Known limitations`.

## Source ownership for MediCap

- public demo markup/content: `docs/*.html`;
- public demo behavior: `docs/js/*.js`;
- public demo styles: `docs/css/style.css`;
- connected client: `public/index.html` and `public/app.js`;
- API/database behavior: `server.js` and `schema.sql`;
- project claims and usage: `README.md`;
- external references: public URLs in the source ledger.

These are parallel handwritten sources. There is no generated stylesheet to patch or rebuild.

## REA source ledger

The adapted workflow above was derived from these public MIT-licensed sources:
- [REA repository and architecture](https://github.com/morluto/rea)
- [Reverse-engineer-anything skill](https://github.com/morluto/rea/blob/main/.agents/skills/reverse-engineer-anything/SKILL.md)
- [Evidence-led website style guide](https://github.com/morluto/rea/blob/main/website/style-guide.md)
- [MCP Evidence and untrusted-content contracts](https://github.com/morluto/rea/blob/main/docs/mcp-contracts.md)
- [Canonical Evidence model](https://github.com/morluto/rea/blob/main/src/domain/evidence.ts)
- [Evidence completion ledger](https://github.com/morluto/rea/blob/main/src/domain/evidenceCompletionLedger.ts)
- [Static-site ownership and verification workflow](https://github.com/morluto/rea/blob/main/website/README.md)

Only abstract practices were adapted: explicit evidence state, narrow claims, source ownership, bounded investigation, retained unknowns, and proportional verification. REA code, provider machinery, target-analysis behavior, and visual design were not copied or installed.

# Optional SVG Pan/Zoom Capability

Source: [bumbu/svg-pan-zoom](https://github.com/bumbu/svg-pan-zoom) · BSD-2-Clause. Reviewed 2026-10-06.

## Current decision

Do **not** install it now. MediCap currently has no dense inline SVG that needs spatial navigation. An unused library would add runtime, maintenance, and accessibility cost without user value.

## What it provides

When initialized on accessible SVG DOM, the library supports absolute and relative pan/zoom; zoom at a point; zoom in/out; reset, fit, contain, and center; mouse drag, wheel, double-click, and basic touch handling; optional built-in controls and callbacks; resize/bounding-box refresh; and instance destruction.

It works with inline SVG and same-origin SVG in `<object>`/`<embed>`, not an SVG loaded through `<img>` because that DOM is unavailable.

## Adoption gate

Consider it only when all are true:
1. A real, complex diagram is unreadable at normal size.
2. The unenhanced SVG remains fully visible, meaningful, and printable.
3. Pan/zoom is optional enhancement—not core navigation or capacity content.
4. Keyboard, touch, browser zoom, reduced motion, and no-JS behavior can be tested.

## Accessibility policy

The library's built-in SVG controls are not sufficient. If adopted:
- disable built-in controls;
- create semantic HTML buttons for zoom in, zoom out, reset, fit, and center;
- provide arrow-key panning while the diagram is explicitly focused;
- show clear instructions and visible focus;
- do not capture page wheel/touch globally;
- preserve SVG `<title>`/`<desc>` or equivalent adjacent text;
- provide a static/open-full-size fallback.

## Lean integration

If a concrete use case appears:
- pin a reviewed version rather than using a floating CDN URL;
- prefer a local vendored distribution plus the BSD notice;
- initialize only when the SVG exists and is visible;
- call resize/fit/center from a bounded `ResizeObserver` handler;
- destroy the instance when its surface is removed;
- constrain panning and test large SVG performance.

Avoid adding Hammer.js solely for pinch support without a tested requirement. Re-evaluate maintained alternatives if first-class pointer/touch accessibility is essential.

## Known cautions

The project has historical browser claims and an aging interaction model. Important risks include missing keyboard support, limited standard pinch behavior, hidden-SVG initialization problems, explicit resize/update requirements, and degraded performance for very large SVG DOMs.

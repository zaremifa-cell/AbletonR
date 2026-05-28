# Visual Taste Profile

This file captures recurring user taste, rejected directions, accepted visual patterns, and concrete design rules extracted from session logs and direct feedback.

The purpose is speed: future work should not require the user to repeat the same visual preferences.

## How To Use

Before visual work:

1. Read this file.
2. Check recent session logs for unresolved or repeated feedback.
3. Apply the concrete rules without asking again when the pattern is already clear.
4. Ask only when a new visual decision is genuinely ambiguous.

After visual feedback:

1. Extract the user's reaction from the chat/session.
2. Convert subjective feedback into a specific rule.
3. Add it to the relevant section below.
4. If uncertain, add it as a provisional note instead of a permanent rule.

## Current Taste Rules

### Visual Direction

- The project should feel like a premium, visually disciplined Ableton redesign, not a generic SaaS website.
- The Braun / Dieter Rams reference should be used as system logic: archive structure, product-first layout, clear typography, restrained composition.
- Do not turn the site into a purely vintage catalogue. Ableton's musical, software, hardware, and interface energy must remain present.

### Layout

- Prefer strict grids, product-first layouts, clear section boundaries, and precise alignment.
- Avoid generic rounded cards unless a card structure is explicitly part of the requested design.
- Avoid broad redesigns when the user asks for one specific visual refinement.
- Mobile is a primary design surface, not a compressed desktop version.
- When the user asks to copy a full lower page section, include the complete section stack and footer details, not only the most obvious first block.
- Product containers should read as complete rectangular frames when requested; avoid double-thick inner lines caused by overlapping borders or grid gaps.
- For alignment corrections, preserve the existing content hierarchy unless the user explicitly asks to restructure it. In the Shop hero, `Shop` and its description should remain vertically grouped.
- For precise vertical alignment feedback, measure rendered geometry and report the exact distances rather than estimating by eye.

### Color

- Avoid beige-heavy palette decisions.
- Use restrained neutral surfaces with controlled color from Ableton's product world: Live interface colors, clip colors, hardware details, product imagery.
- Do not add decorative gradients, glows, or color effects unless requested or visible in the reference.
- Scroll indicators in the Shop product rail should use the existing Ableton orange accent when a stronger cue is needed.

### Imagery

- Product images and interface screenshots should carry visual weight.
- Do not fake image fidelity with visible CSS patches.
- If the expected result depends on a real asset, first check and use the exact asset path in `public/`.

### Interaction

- Interactions should feel precise and integrated with the parent surface.
- Preserve accepted interaction patterns; refine only the requested detail.
- Slower or more deliberate motion should still feel purposeful, not sluggish.
- Avoid white or light flashes during dramatic product-image transitions; when the user asks for disappearance or screen-swapping drama, prefer a controlled dark/black fade.
- Dark product-image transitions should still inherit the smooth crossfade feel; avoid instant blackout or a hard black hold unless explicitly requested.
- Before tuning product-image transition timing, ensure both images are registered in the same fixed stage; misaligned layers make the swap look unprofessional even with good easing.
- For non-pixel-aligned product image swaps, prefer fade-through-dim with a short dark hold over direct crossfade.
- Do not use derived partial overlays if they introduce visible patch-like light/dark differences against the base render.
- Do not use three-dot carousel indicators for the Shop product rail unless the user explicitly asks for them; the user prefers a more systematic cue.
- Thin horizontal progress rails are an accepted scroll affordance for the Shop product rail.
- Horizontal product rails must remain directly scrollable. Do not add JavaScript wheel guards that block natural left/right scrolling.

## Rejected Patterns

- CSS blocks or overlays used to fake an image/background fix.
- Restyling unrelated sections while changing a specific area.
- Changing shared elements such as promo/nav while addressing page-specific visual requests.
- Claiming visual success without verifying the actual rendered result or asking for a screenshot.
- Splitting vertically grouped header content into separate horizontal columns when the request is only alignment refinement.
- Blocking horizontal product-rail scroll while trying to prevent browser-level navigation.
- Classic dot indicators for the Shop product rail in this design direction.
- White or paper-colored flashes during product image transitions when a darker disappearance effect is requested.
- Abrupt blackouts that replace an accepted smooth crossfade interaction.
- Derived transparent overlays that visibly mismatch the base render's brightness, texture, or edge treatment.

## Accepted Patterns

- Narrow page-specific React state and scoped CSS for page interactions.
- Toggle controls visually integrated with their parent surface.
- Crossfades when they help hide imperfect alignment between related product images.
- Session history and consolidated lessons as sources for future behavior.
- Thin orange product-rail progress indicator for Shop horizontal scroll.
- Measured DOM alignment for Shop hero text and utility links.

## Provisional Notes

Use this section for taste observations that need more evidence before becoming permanent rules.

- No provisional notes yet.

## Feedback Extraction Template

```md
### YYYY-MM-DD - Source

User feedback:

Concrete rule:

Applies to:

Evidence:

Status: Permanent / Provisional
```

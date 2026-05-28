# Ableton Programme — Design Direction

## Core Idea

Ableton Programme is a portfolio redesign of Ableton as a contemporary archive of music-making instruments.

The project should combine the disciplined catalogue logic of das programm / Braun with the visual language of Ableton: Session View grids, music software interfaces, hardware product photography, artist workflows, and precise digital motion.

The site should feel like a curated product archive, not a generic marketing website.

## Visual Thesis

Strict grid, clear typography, functional beauty, and restrained motion. Ableton products are presented as cultural and creative tools: software, hardware, mobile instruments, learning systems, and artist workflows.

The mood should be:

- precise
- contemporary
- archival
- musical
- technical
- premium
- calm but not boring

## Reference Interpretation

The das programm Braun reference is important because of its system, not only its appearance.

What to take from the reference:

- archive-like navigation
- category filters
- Index / Grid switching
- product-first layouts
- strong whitespace
- small but very clear typography
- restrained use of color
- dry, factual product labels
- carefully aligned image grids
- mobile layouts that feel intentional, not compressed

What not to copy directly:

- the exact brand identity
- purely vintage styling
- overly static interaction
- catalogue dryness without Ableton's musical energy

## Ableton Interpretation

Ableton's products should be treated as a programme of tools:

- Live as the central creative software
- Session View as the key visual and interaction motif
- Push as the tactile hardware instrument
- Move as the portable sketching device
- Note as the mobile idea-capture app
- Packs as a sound archive
- Learn as the educational layer
- Artists as proof of use in real creative practice

## Mobile-First Rule

The mobile experience is a primary design surface.

Most users will see the project on a phone first, so the mobile version must feel first-class, not like a simplified desktop layout.

Mobile requirements:

- text must be clearly readable without zooming
- tap targets must be comfortable
- navigation must be simple and deliberate
- sections must have clear boundaries
- images must be cropped intentionally
- no overlapping text or media
- no cramped product cards
- no tiny metadata that becomes unreadable
- scrolling must feel smooth and composed
- the first screen must make a strong impression
- Index / Grid views must both work well on a phone
- product pages must feel editorial and premium on mobile

Mobile is not only a breakpoint. It is the baseline experience.

## Desktop Rule

Desktop should use space with restraint.

The site should avoid filling the screen with unnecessary panels or decorative blocks. Wide layouts should feel like an archive wall, product table, or carefully spaced editorial system.

Desktop requirements:

- strong horizontal rhythm
- clear column logic
- generous whitespace
- strict image alignment
- readable line lengths
- product grids with enough breathing room
- hover states that add information without clutter

## Navigation Model

Navigation should be closer to an archive system than a standard SaaS header.

Primary structure:

- Home
- Live
- Push
- Move
- Note
- Packs
- Learn
- Shop

Secondary mode:

- Index
- Grid

Index mode should expose the catalogue structure as a readable list.

Grid mode should expose the visual product archive.

## Layout Principles

- Start with a strict grid.
- Use clear section boundaries.
- Prefer full-width bands, tables, lists, image grids, and editorial layouts.
- Avoid generic rounded cards.
- Avoid decorative containers that do not serve content.
- Let product images and UI screenshots carry the visual weight.
- Use metadata labels: product type, year, format, role, platform.
- Use concise product descriptions.
- Make every section answer one clear question.

## Typography

Typography must be extremely clear.

Requirements:

- no tiny decorative text that harms readability
- no negative letter spacing
- comfortable line height
- clear hierarchy between product name, metadata, description, and actions
- short labels
- factual language
- mobile type sizes must be tested visually

The typography should feel functional and precise, with enough scale to make the site feel premium.

## Color

The base should be restrained:

- off-white or clean light surface
- black / near-black text
- fine divider lines
- controlled grey scale

Color should come from Ableton's product world:

- Live interface colors
- clip colors
- Push / Move hardware details
- product photography
- focused accent states

Avoid:

- beige-heavy palette
- generic gradients
- decorative color blobs
- too many accent colors at once

## Motion

Motion should make the site feel current without breaking the archive discipline.

Use motion for:

- page transitions
- Index / Grid switching
- product hover reveals
- scroll reveals
- sticky product storytelling
- subtle image transitions
- Session View-inspired interactions

Motion rules:

- fast
- smooth
- purposeful
- consistent
- never blocking readability
- never used to hide weak layout

## Content Voice

The copy should be concise, precise, and product-literate.

Tone:

- clear
- confident
- technical when useful
- artist-aware
- no generic marketing fluff

Product labels should feel archival:

Example format:

```txt
Live 12
Software instrument / Arrangement + Session workflow / 2024
Compose, perform, record, and transform musical ideas in a grid built for improvisation.
```

## Page Direction

### Home

The homepage should introduce the full Ableton programme as a curated archive.

Key ideas:

- strong first viewport
- Ableton mark
- category navigation
- Index / Grid concept
- Live, Push, Move, Note as primary objects
- Session View as visual system

### Live

Live is the central page.

It should focus on:

- Session View
- Arrangement View
- instruments and effects
- performance workflow
- creative speed
- interface details

### Push

Push should feel tactile and object-focused.

It should focus on:

- hardware
- pads
- screen
- standalone workflow
- integration with Live

### Move

Move should feel portable and direct.

It should focus on:

- sketching ideas
- portability
- standalone capture
- transferring ideas into Live

### Note

Note should feel mobile-first by nature.

It should focus on:

- fast capture
- phone workflow
- sync with Ableton Cloud
- starting ideas anywhere

## Quality Bar

The site is successful only if:

- mobile feels premium
- typography is readable everywhere
- the first screen has a strong identity
- the archive concept is visible immediately
- the site does not look like a generic template
- every page feels connected to the same system
- animations improve clarity and presence
- responsive behavior is carefully designed, not accidental

## Working Sequence

1. Define the design direction.
2. Refine the current static homepage as a visual prototype.
3. Test the prototype on mobile and desktop.
4. Migrate to Next.js only after the direction is visually clear.
5. Build shared components and data structure.
6. Build Home.
7. Build Live.
8. Build Push, Move, and Note.
9. Build the catalogue pages.
10. Run final responsive, accessibility, and performance passes.

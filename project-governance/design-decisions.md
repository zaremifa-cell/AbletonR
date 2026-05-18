# Design Decisions

This file records accepted design decisions so future work does not reopen settled direction without reason.

Add only decisions that are confirmed, useful, and likely to affect future work.

## Decision Format

```md
## YYYY-MM-DD - Decision Title

Decision:

Reason:

Applies to:

Do not:

Evidence/source:
```

## Current Decisions

### 2026-05-17 - Braun Reference Means System, Not Costume

Decision: Use the Braun / das programm reference for archive logic, product-first layout, disciplined grid, restrained typography, and factual presentation.

Reason: The project should feel curated and precise without becoming a vintage imitation.

Applies to: Navigation, product grids, index/grid modes, product pages, visual hierarchy.

Do not: Copy vintage styling literally or remove Ableton's musical/software identity.

Evidence/source: `DESIGN_DIRECTION.md`, `project-governance/project-brief.md`.

### 2026-05-17 - Mobile Is A Primary Surface

Decision: Mobile layouts must be designed as first-class compositions.

Reason: The first impression on a phone is part of the core quality bar.

Applies to: Home, product pages, navigation, product grids, index/grid modes, media crops, typography.

Do not: Treat mobile as a compressed desktop layout.

Evidence/source: `DESIGN_DIRECTION.md`, `REQUIREMENTS.md`.

### 2026-05-17 - Product Media Carries The Visual Weight

Decision: Product images, Ableton interface screenshots, hardware details, and music-making context should carry the visual weight.

Reason: The project should feel like a real product ecosystem, not a decorative portfolio template.

Applies to: Hero sections, product pages, product grids, Session View sections, artist/workflow sections.

Do not: Replace product substance with generic cards, decorative containers, or stock-like visuals.

Evidence/source: `DESIGN_DIRECTION.md`, `REQUIREMENTS.md`.

### 2026-05-17 - Visual Claims Require Rendered Evidence Or User Screenshot

Decision: Visual correctness must be based on rendered inspection or user-provided screenshot review.

Reason: Prior work showed that code/build success can miss actual rendered visual problems.

Applies to: All visual changes.

Do not: Claim a section is visually fixed without seeing the rendered result or asking the user for a screenshot.

Evidence/source: `project-governance/review/consolidated-lessons.md`, user instruction on screenshot-based review.


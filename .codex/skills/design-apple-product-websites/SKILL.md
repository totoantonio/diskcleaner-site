---
name: design-apple-product-websites
description: Design, implement, or critique polished product-marketing websites using Apple-inspired principles such as cinematic hierarchy, benefit-led storytelling, disciplined typography, product-focused imagery, restrained motion, and strong responsive behavior. Use for landing pages, product pages, launches, redesigns, or frontend implementation when the user asks for Apple-like, premium, minimal, cinematic, or high-end web design.
---

# Design Apple Product Websites

Create original product experiences informed by Apple's design discipline, not replicas of Apple's pages, assets, copy, trademarks, or distinctive compositions.

## Workflow

1. Inspect the existing product, audience, brand assets, copy, framework, and design tokens before proposing changes.
2. Define one product promise and one primary action. Make every section support them.
3. Build a narrative outline before styling:
   - Immediate product identity and promise
   - A short highlights sequence
   - Benefit-led feature chapters
   - Proof, comparison, or technical detail
   - Decisive closing action
4. Choose a visual concept specific to the product. Use the product's own UI, materials, data, or outcomes as the visual language.
5. Implement in the repository's existing patterns. Reuse components and tokens where practical.
6. Verify responsive behavior, reduced motion, keyboard use, contrast, loading cost, and visual hierarchy.

## Design Principles

- Use a small number of large ideas. Give each section one job.
- Lead with an outcome, then show the mechanism and supporting detail.
- Prefer real product imagery and UI states over decorative stock visuals.
- Establish hierarchy through scale, spacing, contrast, and pacing before adding effects.
- Keep copy short at the top and progressively disclose detail lower on the page.
- Use generous whitespace intentionally; avoid empty space that merely makes the page longer.
- Alternate visual intensity to create rhythm. Do not make every section a full-bleed spectacle.
- Use motion to explain state, reveal relationships, or reward progress. Avoid scroll hijacking and gratuitous parallax.
- Keep controls familiar, visible, and easy to operate. Minimalism must not reduce clarity.
- Make mobile a composed experience, not a shrunken desktop page.

## Implementation Guardrails

- Do not copy Apple's navigation, exact layouts, slogans, imagery, icons, or proprietary assets.
- Do not default to black backgrounds, glass effects, huge gradients, or oversized type merely to signal "premium."
- Keep important content and calls to action available without animation.
- Use semantic HTML and preserve a logical heading order.
- Reserve media dimensions to prevent layout shift.
- Prefer CSS and lightweight transitions; justify heavy animation libraries.
- Respect `prefers-reduced-motion`.
- Test at narrow mobile, tablet, laptop, and wide desktop widths.

## Review Checklist

- Can a visitor identify the product, benefit, and next action within seconds?
- Does each section advance the story instead of repeating the hero?
- Are visuals demonstrating real value?
- Is the page recognizably this brand rather than an Apple imitation?
- Does the design remain clear with motion disabled and on a small screen?
- Are performance and accessibility treated as part of the visual quality?

## Reference

Read [references/apple-product-page-patterns.md](references/apple-product-page-patterns.md) when planning a new page, evaluating an Apple-inspired direction, or deciding how to structure product storytelling.

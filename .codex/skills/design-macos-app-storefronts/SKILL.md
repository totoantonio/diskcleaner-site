---
name: design-macos-app-storefronts
description: Design, implement, or critique websites that market and sell native macOS apps, including utility, productivity, menu-bar, creative, and subscription apps. Use for macOS app landing pages, pricing pages, download flows, trial funnels, launch sites, and redesigns that need Apple-platform polish plus clear conversion, compatibility, security, and trust information.
---

# Design macOS App Storefronts

Create a trustworthy path from product understanding to trial, purchase, download, installation, and support. Treat a polished visual design as one part of that path, not a substitute for it.

## Workflow

1. Inspect the app, current site, codebase, audience, distribution channels, pricing model, and available proof.
2. Confirm the primary conversion:
   - Download or start trial
   - Buy a license
   - Subscribe
   - Open an App Store or marketplace listing
3. Map important user questions: what it does, why it is better, whether it is safe, whether it works on their Mac, what it costs, and what happens after purchase.
4. Build the page around real app screenshots and short outcome-led demonstrations.
5. Implement an honest, low-friction conversion path with visible support and policy links.
6. Verify every CTA, download, pricing statement, compatibility claim, and trust claim.

## Recommended Page Architecture

- Hero: app icon, specific outcome, concise explanation, primary CTA, price or trial terms, and macOS requirement.
- Proof strip: only verifiable ratings, user counts, awards, press, notarization, or platform support.
- Feature chapters: show the app solving recognizable tasks through real UI.
- Differentiation: explain why this app instead of built-in macOS tools or competitors.
- Trust and compatibility: privacy, permissions, notarization, chips, macOS versions, file size, and update policy.
- Pricing: clear plan differences, billing period, device count, renewal behavior, taxes caveat, and refund terms.
- FAQ and support: installation, activation, upgrades, cancellation, troubleshooting, and contact path.
- Closing CTA: repeat the appropriate next action with the essential terms.

## Conversion And Trust Rules

- Place a useful CTA near the first product explanation and repeat it after meaningful proof.
- Distinguish `Download`, `Start free trial`, `Buy`, and `Subscribe`; do not blur their consequences.
- State trial duration and whether payment details are required.
- Show one-time purchase versus subscription differences plainly.
- Explain direct-download, Mac App Store, and marketplace editions when features or billing differ.
- Never invent usage counts, ratings, awards, testimonials, security claims, or Apple endorsements.
- Use "Notarized by Apple" only when verified; never imply Apple recommends the app.
- Provide checksum, signing, privacy, permissions, or security details when appropriate to the product risk.
- Avoid fake urgency, scare tactics, misleading scan results, and preselected expensive plans.

## Visual Direction

- Use native macOS cues lightly: accurate app windows, familiar terminology, crisp iconography, and platform-appropriate typography.
- Make the app UI the main evidence. Crop screenshots to the exact feature being explained.
- Use color and illustration from the app's own identity instead of generic Apple mimicry.
- Keep pricing and download controls calmer and clearer than promotional sections.
- Design all states: hover, focus, loading, download started, error, unsupported system, and purchase success.

## Implementation Checklist

- Preserve existing framework and component conventions.
- Make download links explicit, secure, and testable.
- Include accessible names, keyboard focus, semantic headings, and reduced-motion behavior.
- Keep critical copy as HTML rather than baked into images.
- Optimize screenshots and video; provide poster frames and avoid autoplay with sound.
- Test mobile, desktop, slow-loading media, and missing-JavaScript fallbacks where relevant.

## Reference

Read [references/macos-storefront-patterns.md](references/macos-storefront-patterns.md) before creating a page architecture, pricing section, trust section, or download flow.

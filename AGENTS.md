# DiskCleaner Website Instructions

## Protected Downloads

- Treat `public/downloads/**` as immutable during normal development, commits, pushes, and deployments.
- Never delete, replace, rename, move, stage, or otherwise modify the existing DMG as part of unrelated website work.
- Keep `public/downloads/DiskCleaner-macOS.dmg` tracked so GitHub Pages continues to publish the download at the stable URL.
- Only change a protected download when the user explicitly requests a release-DMG update. Handle that as a separate, deliberate commit.

## Website Context

- This is the official DiskCleaner for Mac marketing site, built with React, TypeScript, Vite, and post-build static generation.
- The primary conversion is the direct download at `/downloads/DiskCleaner-macOS.dmg`; purchase links point to `store.diskcleaner.pro`.
- Preserve the premium, restrained Apple-style presentation and the product's safety-first, user-control messaging.

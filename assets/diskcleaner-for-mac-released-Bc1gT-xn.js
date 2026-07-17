const e=`---
title: "DiskCleaner for Mac Is Released: A Safe, Transparent, Apple-Notarized Mac Cleaner"
description: "DiskCleaner for Mac is now available as a direct download: a safe, transparent, Apple-Notarized Mac cleaner with 21 cleanup categories and tools, Trash-first cleanup, app uninstalling, developer cleanup, RAM tools, and Sparkle auto-updates."
date: "2026-05-25"
updatedAt: "2026-06-02"
slug: "diskcleaner-for-mac-released"
category: "Product Update"
author: "Thomas A."
excerpt: "DiskCleaner for Mac is now released as a direct download. It stays focused on safe, transparent, Apple-Notarized cleanup: every file is shown before removal, everything goes to Trash, and Sparkle keeps the app updated."
featured: true
---

# DiskCleaner for Mac Is Released: A Safe, Transparent, Apple-Notarized Mac Cleaner

DiskCleaner for Mac is now released and available as a direct download from the DiskCleaner website. It is built for people who want to free up Mac storage without trusting a black box: every cleanup candidate is shown before removal, every selected item moves to macOS Trash, and the app is notarized by Apple for direct distribution outside the Mac App Store.

The first public release focuses on a simple promise: make Mac cleanup visible, reversible, and private.

That matters because the Mac cleaner category has a trust problem. Many tools lead with one-click claims, vague "junk" totals, or subscription prompts before users understand what is actually being removed. DiskCleaner takes the opposite approach. It scans, explains, and waits for approval.

## What Is Available Now

The current release includes the core DiskCleaner workflow:

- 21 cleanup categories and tools
- Free Core Cleaning with a One-Time Premium unlock for advanced categories
- App Cache and Browser Cache review
- Screenshots and Trash visibility
- System Logs cleanup
- Developer Data cleanup for Xcode DerivedData, CoreSimulator files, and old iOS DeviceSupport files
- App Leftovers review
- Large Files discovery
- App Uninstaller with leftover-file detection
- RAM Optimizer with live memory metrics
- Menu bar access for quick disk visibility
- Universal Binary support for Apple Silicon and Intel Macs

The app supports macOS 13 Ventura through macOS 26 Tahoe. It is designed as a focused macOS utility, not a general-purpose security suite or always-on background optimizer.

## Why This Release Is Different From a Typical Mac Cleaner

DiskCleaner is built around review-first cleanup.

Before anything moves, you see the categories, the sizes, and the files. You can approve or skip individual items. That is the important difference between a transparent Mac cleaner and a "trust me" cleanup button.

The app also uses a Trash-first safety model. Selected files are moved to macOS Trash instead of being permanently deleted immediately. That gives users a recovery window and keeps the cleanup experience aligned with how people already expect deletion to work on macOS.

For users searching for a safe Mac cleaner, this is the core answer: DiskCleaner does not silently erase files, does not permanently delete cleanup results by default, and does not require an account to scan your Mac.

## Apple-Notarized Direct Download

DiskCleaner is distributed as a direct Mac download and is notarized by Apple.

For macOS apps distributed outside the Mac App Store, Apple provides Developer ID signing and notarization so users can install software from trusted developers while still benefiting from Gatekeeper checks.<sup><a href="#ref-1">[1]</a></sup> Apple describes notarization as a process that checks Developer ID-signed software for malicious components before distribution.<sup><a href="#ref-2">[2]</a></sup>

That does not mean Apple endorses every product claim. It means the app has gone through Apple's notarization process for direct macOS distribution, which is the right baseline for a downloadable Mac utility.

## Privacy Stays Local

DiskCleaner is local-first.

The scan happens on your Mac. File paths and file names stay on your Mac. Normal cleanup does not require an account. The app is built for people who are uncomfortable handing a cleaner app broad visibility into their disk and then having that tool send telemetry somewhere else.

The practical privacy model is straightforward:

- no account needed for scanning
- no cloud scan pipeline
- no upload of file names or disk contents
- no cleanup action without review
- no permanent deletion as the default path

DiskCleaner does not make background network calls for scanning or cleaning. Sparkle handles background app updates without transmitting scan results or file data. Cleanup itself remains local.

## Built for Real Mac Storage Problems

DiskCleaner is not limited to generic cache folders. It targets the places that actually grow on working Macs.

For everyday users, that means browser cache, app cache, screenshots, old downloads, logs, Trash contents, large files, and app leftovers.

For developers, it means Xcode DerivedData, CoreSimulator files, old iOS DeviceSupport files, and stale Homebrew downloads. Developer Data can quietly become one of the largest categories on a Mac, especially for people who use Xcode and multiple simulators.

The goal is not to pretend every byte is useless. The goal is to make the storage visible enough that you can decide what is worth keeping.

## App Uninstaller and Leftover Files

Dragging an app to Trash removes the app bundle, but many apps leave support files behind in Library locations.

DiskCleaner's App Uninstaller is built for that gap. You can review an app and its related leftovers before cleanup. The same review-first rule applies: leftover files are shown before removal, and selected items go to Trash.

This is useful for users who remove large apps and recover less space than expected. The app bundle is often only one piece of the footprint.

## RAM Optimizer Without Mystery Claims

The RAM Optimizer is included for visibility and controlled optimization, not scareware.

It shows live Memory Pressure, Compressed Memory, Swap Used, and Page In/Out metrics. Those values are more useful than a single scary "used memory" number because macOS is designed to use available memory aggressively for performance.

DiskCleaner keeps the feature practical: show the memory state, let the user decide, and avoid pretending that every cached byte is a problem.

## What Is Coming Next

DiskCleaner has a long roadmap, but the direction stays the same: more capability without making cleanup less transparent.

Planned future improvements include:

- clearer release notes inside the app
- more scan explainers
- improved update badges in the menu bar
- deeper cleanup category explanations
- smoother licensing and activation flow
- continued refinement of developer cleanup

DiskCleaner uses Sparkle for background app updates, with update feed and signature verification support for safer direct-distribution updates. The latest DMG remains available from the website for manual installation.

That matters for a utility app because maintenance releases should be boring. If a fix improves scanning, notarization packaging, compatibility, or app behavior, the user should be able to request it through a standard update flow instead of repeating the first-install process.

For direct-distributed Mac apps, an updater must be handled carefully. A proper update flow should verify update signatures and preserve the same safety posture as the app itself. Sparkle, a long-running macOS update framework, documents support for signed update archives and appcast-driven updates for direct-distributed Mac apps.<sup><a href="#ref-3">[3]</a></sup> DiskCleaner's update flow follows the same principle: updates should be easier and not less trustworthy.

## Why the First Release Still Matters

This release is not just "version one is available." It establishes the product's standard.

DiskCleaner is safe by design because cleanup is reviewable and Trash-first. It is transparent because categories and files are visible before action. It is privacy-respecting because scan results stay local. It is Mac-native because it is built for modern macOS distribution, Apple Silicon, Intel Macs, and Apple's notarization expectations.

That combination is the product thesis.

People do not need another Mac cleaner that tells them to click a giant button and hope. They need a tool that shows what it found, explains why it matters, and lets them decide.

## Download DiskCleaner for Mac

DiskCleaner is available now as a direct Mac download:

<div class="blog-cta-block">
  <p class="blog-cta-block-title">Download DiskCleaner for Mac</p>
  <p class="blog-cta-block-sub">A safe, transparent, Apple-Notarized Mac cleaner with Free Core Cleaning and no subscription.</p>
  <a href="/downloads/DiskCleaner-macOS.dmg" download class="blog-cta-btn" data-analytics-location="release-article">
    Download for macOS
  </a>
  <p class="blog-cta-block-note">macOS 13 Ventura through macOS 26 Tahoe · Apple Silicon and Intel</p>
</div>

## FAQ

### Is DiskCleaner released now?

Yes. DiskCleaner for Mac is now available as a direct download from the DiskCleaner website.

### Is DiskCleaner notarized by Apple?

Yes. DiskCleaner is distributed as an Apple-Notarized macOS app for direct download outside the Mac App Store.

### Does DiskCleaner permanently delete files?

No. DiskCleaner uses a Trash-first cleanup model. Selected files are moved to macOS Trash, where they can be reviewed and recovered.

### Does DiskCleaner show files before cleanup?

Yes. The app is built around review-first cleanup. You can review categories and individual files before anything moves.

### Does DiskCleaner support automatic updates?

Yes. DiskCleaner uses Sparkle for background app updates, with secure update feed and signature verification support.

### Is DiskCleaner a subscription?

No. DiskCleaner includes Free Core Cleaning, then unlocks Premium categories with a one-time license for up to 2 Macs.

## Bottom Line

DiskCleaner is now released as a safe, transparent, Apple-Notarized Mac cleaner for users who want control over what gets removed.

The product will keep growing, but the core rule stays the same: every file, your call.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Packaging Mac software for distribution." <em>Apple Developer Documentation</em>, accessed May 26, 2026. <a href="https://developer.apple.com/documentation/xcode/packaging-mac-software-for-distribution">developer.apple.com</a></li>
  <li id="ref-2">Apple Inc. "Notarizing macOS software before distribution." <em>Apple Developer Documentation</em>, accessed May 26, 2026. <a href="https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution">developer.apple.com</a></li>
  <li id="ref-3">Sparkle Project. "Documentation." <em>Sparkle: open source software update framework for macOS</em>, accessed May 26, 2026. <a href="https://sparkle-project.github.io/documentation/">sparkle-project.github.io</a></li>
</ol>
</div>
`;export{e as default};

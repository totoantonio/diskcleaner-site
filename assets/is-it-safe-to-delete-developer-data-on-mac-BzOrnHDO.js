const e=`---
title: "Is It Safe to Delete Developer Data on Mac?"
description: "Developer data — Xcode caches, simulator images, derived data, CocoaPods, npm — can quietly consume 30–100 GB on a Mac. Here's what each category is, what's safe to delete, and what to leave alone."
date: "2026-03-04"
slug: "is-it-safe-to-delete-developer-data-on-mac"
category: "macOS"
excerpt: "If you have Xcode installed, developer data is almost certainly one of the largest storage consumers on your Mac. Simulator images alone can exceed 50 GB. Most of it is safe to remove — but some files will slow you down if deleted carelessly."
featured: true
---

# Is It Safe to Delete Developer Data on Mac?

If you've run a storage scan and seen "Developer Data" listed as a major category, you're not alone. On a Mac where Xcode is installed, this bucket can quietly grow to 30, 50, even 100+ gigabytes.

The good news: most of it is safe to delete. The slightly more complicated answer: not all of it, and knowing the difference matters.

## What "Developer Data" Includes

Developer data isn't one thing — it's a collection of several distinct categories, each with different cleanup rules.

### Xcode Derived Data

Xcode stores compiled build artifacts in \`~/Library/Developer/Xcode/DerivedData\`. Every time you build a project, Xcode caches the compiled output here so subsequent builds are faster.

These files are safe to delete. Xcode will rebuild them automatically the next time you open and build a project. The only cost is a longer first build after cleanup.<sup><a href="#ref-1">[1]</a></sup>

Derived data is typically the single largest item in this category — easily 5–20 GB on an active development machine.

### iOS and iPadOS Simulator Images

Xcode downloads full operating system images for every simulator runtime you've ever used. An iPhone 17 simulator running iOS 18, an older iPad simulator, a watchOS runtime — each one is a multi-gigabyte download stored in \`/Library/Developer/CoreSimulator/Profiles/Runtimes\`.

These files are safe to delete if you no longer need to run that specific simulator version. Xcode will prompt you to re-download the runtime if you try to launch a simulator that needs it.<sup><a href="#ref-2">[2]</a></sup>

A developer who has tested across several iOS versions and device types can easily accumulate 30–60 GB here without realizing it.

### Simulator Device Data

Separate from the runtime images, Xcode also stores data for each simulated device you've booted — installed apps, preferences, and state — in \`~/Library/Developer/CoreSimulator/Devices\`.

This is safe to remove for simulators you're no longer using. Any simulator you boot again will be reset to a clean state.

### CocoaPods Cache

CocoaPods stores a local cache of downloaded pod source files in \`~/Library/Caches/CocoaPods\`. This is used to speed up \`pod install\` by avoiding repeat downloads.

Deleting it is safe. The cache will be rebuilt the next time you run \`pod install\`.<sup><a href="#ref-3">[3]</a></sup>

### npm and Node.js Cache

If you do any JavaScript or Node.js development, npm maintains a cache in \`~/.npm\`. Yarn uses \`~/Library/Caches/Yarn\`. Both are safe to clear — running \`npm install\` or \`yarn\` in any project will repopulate the cache from the registry.

### Xcode Archives

Xcode archives — \`.xcarchive\` bundles created when you archive a project for distribution — live in \`~/Library/Developer/Xcode/Archives\`. These can be several hundred MB to a few gigabytes each.

**Be careful here.** If you need to re-submit a build to the App Store or re-export an IPA without rebuilding from source, you need the archive. Delete archives only if you're certain you have the source code and can rebuild.<sup><a href="#ref-4">[4]</a></sup>

### Old Device Support Files

Xcode downloads device support files for every physical device you've connected, stored in \`~/Library/Developer/Xcode/iOS DeviceSupport\`. These files enable on-device debugging and symbol lookup for a specific iOS version.

If you no longer have a device running that iOS version — or you don't do on-device debugging — these are safe to remove.

## What Is and Isn't Safe: A Quick Reference

| Category | Safe to Delete? | Notes |
|---|---|---|
| Derived Data | Yes | Rebuilt automatically on next build |
| Simulator Runtimes | Yes | Re-downloaded if needed |
| Simulator Device Data | Yes | Simulator resets to fresh state |
| CocoaPods Cache | Yes | Rebuilt on next \`pod install\` |
| npm / Yarn Cache | Yes | Rebuilt on next install |
| Xcode Archives | Careful | Only delete if you can rebuild from source |
| Device Support Files | Yes | Rarely needed after device update |

## How Much Space Can You Get Back?

On a Mac that has been running Xcode for a year or more without cleanup:

- Derived data: **5–20 GB**
- Simulator runtimes: **10–60 GB**
- Simulator device data: **2–10 GB**
- Package manager caches: **1–5 GB**
- Device support files: **2–8 GB**

It's not unusual to reclaim 30–60 GB in a single cleanup pass on an active development machine.

## The Risk of Doing This Manually

The standard advice is to clean derived data from inside Xcode (Product → Clean Build Folder) and manage simulators through Xcode's Platform settings. This works, but it's limited:

- Xcode's built-in cleanup doesn't touch CocoaPods, npm, or device support files
- Navigating to \`/Library/Developer/CoreSimulator/Runtimes\` and manually deleting simulator images requires knowing exactly which paths to target
- It's easy to accidentally remove something you still need

## A More Reliable Approach

DiskCleaner scans Developer Data as a dedicated category — covering Xcode DerivedData, CoreSimulator files, and old iOS DeviceSupport files. Homebrew downloads appear in their own cache category. You see a full list with file sizes before anything moves, and everything goes to Trash (not permanent deletion), so you can recover anything you removed by mistake.

For a folder-by-folder breakdown, see <a href="/blog/which-xcode-folders-are-safe-to-delete/">which Xcode folders are safe to delete</a>.

## Final Take

Most developer data on a Mac is safely removable. Derived data, simulator runtimes, and package manager caches are all designed to be rebuilt on demand. The one real exception is Xcode archives — only remove those if you're confident you don't need to re-export or re-sign a previous build.

For any Mac that has had Xcode installed for more than a year, a single cleanup pass through developer data is one of the highest-yield storage wins available.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Build faster in Xcode." <em>WWDC 2022 Session</em>, Apple Developer, 2022. <a href="https://developer.apple.com/videos/play/wwdc2022/110362/">developer.apple.com</a></li>
  <li id="ref-2">Apple Inc. "Downloading Simulator Runtimes." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes">developer.apple.com</a></li>
  <li id="ref-3">CocoaPods. "CocoaPods Guides — Getting Started." <em>CocoaPods</em>, 2024. <a href="https://guides.cocoapods.org/using/getting-started.html">guides.cocoapods.org</a></li>
  <li id="ref-4">Apple Inc. "Distributing Your App for Beta Testing and Releases." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases">developer.apple.com</a></li>
</ol>
</div>
`;export{e as default};

const e=`---
title: "Which Xcode Folders Are Safe to Delete on Mac?"
description: "A practical safety guide to Xcode folders: DerivedData, Archives, iOS DeviceSupport, CoreSimulator, SourcePackages, simulator runtimes, and caches."
date: "2026-06-07"
slug: "which-xcode-folders-are-safe-to-delete"
category: "Developer"
author: "Thomas Antoni"
excerpt: "Xcode can leave tens of gigabytes across Developer folders. This guide explains which folders are safe to delete, which ones reset simulators or slow builds, and which archives deserve caution."
featured: true
---

# Which Xcode Folders Are Safe to Delete on Mac?

Xcode storage is confusing because the files are spread across several similarly named folders. Some are pure cache. Some are simulator state. Some are old downloads. Some are distribution archives you may still need.

Here is the practical rule: most Xcode-generated data is safe to delete if you understand the consequence. The consequence is usually a slower rebuild, a simulator reset, or a re-download. The main exception is archives.

## Quick Safety Table

| Folder | Safe to delete? | What happens afterward |
|---|---:|---|
| \`~/Library/Developer/Xcode/DerivedData\` | Yes | Xcode rebuilds project artifacts |
| \`~/Library/Developer/Xcode/iOS DeviceSupport\` | Usually | Xcode may re-download support files for old devices |
| \`~/Library/Developer/Xcode/Archives\` | Careful | You may lose old export/re-sign options |
| \`~/Library/Developer/Xcode/SourcePackages\` | Usually | Swift packages are resolved and downloaded again |
| \`~/Library/Developer/CoreSimulator/Devices\` | Usually | Simulators reset or disappear if stale |
| \`~/Library/Developer/CoreSimulator/Caches\` | Yes | Simulator cache is rebuilt |
| \`/Library/Developer/CoreSimulator/Profiles/Runtimes\` | Careful but safe for unused runtimes | Removed runtimes must be re-downloaded |

## DerivedData

Path:

\`\`\`text
~/Library/Developer/Xcode/DerivedData
\`\`\`

This is Xcode's build-output cache: intermediate build files, indexes, compiled modules, and other generated artifacts. It is safe to delete because your source code does not live here.

The tradeoff is time. The next build for each project may be slower because Xcode has to recreate the missing artifacts.

## iOS DeviceSupport

Path:

\`\`\`text
~/Library/Developer/Xcode/iOS DeviceSupport
\`\`\`

DeviceSupport folders help Xcode debug physical iPhones and iPads running specific iOS versions. Old versions often remain after the device has updated.

These are usually safe to delete when you no longer need to debug a device on that exact iOS version. If Xcode needs support files again, it can recreate or re-fetch them when you reconnect a device.

## Xcode Archives

Path:

\`\`\`text
~/Library/Developer/Xcode/Archives
\`\`\`

Archives are different. They are not just cache. An \`.xcarchive\` is a packaged build used for distribution, export, symbolication, and App Store workflows.

Delete archives only when you are confident you do not need to re-export, re-sign, inspect, or symbolicate that build. If the app is abandoned or the archive is from a very old release, removal is usually fine. If the build is still active, keep it.

## SourcePackages

Path:

\`\`\`text
~/Library/Developer/Xcode/SourcePackages
\`\`\`

This folder contains Swift Package Manager checkouts and package caches used by Xcode. It is usually safe to delete, but the next package resolve may take longer and will require network access.

If a project depends on a package server, private repository, or pinned revision that is no longer available, deleting package checkouts can make that project harder to rebuild. For active work, close Xcode first and keep the project source untouched.

## CoreSimulator Devices

Path:

\`\`\`text
~/Library/Developer/CoreSimulator/Devices
\`\`\`

This folder stores simulated device instances: installed test apps, simulator preferences, app containers, logs, and device state.

It is usually safe to delete stale or unavailable simulators. The cost is that simulator state is reset. If you had test data inside a simulator, that data goes away with the device folder.

The safer Terminal cleanup is:

\`\`\`text
xcrun simctl delete unavailable
\`\`\`

That removes simulator devices for runtimes that are no longer installed, instead of wiping every simulator.

## Simulator Runtimes

Path:

\`\`\`text
/Library/Developer/CoreSimulator/Profiles/Runtimes
\`\`\`

Simulator runtimes are the large OS images for iOS, iPadOS, watchOS, tvOS, and visionOS simulators. They can be several gigabytes each.

Unused runtimes are safe to remove, but do it intentionally. If your project still needs to test against that OS version, Xcode will need the runtime again.

The cleaner way is **Xcode → Settings → Platforms**, where you can see and remove installed platforms from the Xcode interface.

## Caches

Common paths:

\`\`\`text
~/Library/Developer/CoreSimulator/Caches
~/Library/Caches/com.apple.dt.Xcode
~/Library/Caches/org.swift.swiftpm
\`\`\`

These are usually safe cleanup targets. They may slow the next launch, build, or package resolution, but they should not remove source code.

## What Not to Delete Blindly

Avoid deleting:

- project folders that contain your actual source code
- active archives for apps you may need to re-export
- simulator device folders if you keep important test data inside them
- private Swift package checkouts if the remote repository may no longer be available
- files in protected system folders you do not recognize

## Best Order for Xcode Cleanup

1. Quit Xcode and Simulator.
2. Remove unavailable simulators with \`xcrun simctl delete unavailable\`.
3. Review \`DerivedData\`.
4. Review old simulator runtimes in Xcode Settings.
5. Review old \`iOS DeviceSupport\` versions.
6. Review \`Archives\` last, with the most caution.

DiskCleaner follows this same philosophy in its Developer Data scan: show the category, path, and size first; avoid permanent deletion; and move selected files to Trash so recovery remains possible.

## Related Guides

- <a href="/blog/delete-xcode-derived-data/">How to delete Xcode DerivedData</a>
- <a href="/blog/is-it-safe-to-delete-developer-data-on-mac/">Is it safe to delete Developer Data on Mac?</a>
- <a href="/blog/what-is-system-data-mac/">What System Data includes on Mac</a>

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Xcode Help." <em>Apple Developer Documentation</em>, 2026. <a href="https://developer.apple.com/documentation/xcode">developer.apple.com/documentation/xcode</a></li>
  <li id="ref-2">Apple Inc. "Installing additional simulator runtimes." <em>Apple Developer Documentation</em>, 2026. <a href="https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes">developer.apple.com</a></li>
  <li id="ref-3">Apple Inc. "Distributing your app for beta testing and releases." <em>Apple Developer Documentation</em>, 2026. <a href="https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases">developer.apple.com</a></li>
</ol>
</div>
`;export{e as default};

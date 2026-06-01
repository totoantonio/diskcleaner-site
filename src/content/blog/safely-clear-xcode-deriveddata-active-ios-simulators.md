---
title: "How to Safely Clear Xcode DerivedData Without Breaking Active iOS Simulators"
description: "A simulator-safe guide to clearing Xcode DerivedData: what to stop first, what not to delete, the safest manual commands, and how to avoid touching active CoreSimulator data."
date: "2026-05-16"
slug: "safely-clear-xcode-deriveddata-active-ios-simulators"
category: "Developer"
author: "Thomas A."
excerpt: "You can safely clear Xcode DerivedData without breaking active iOS simulators if you stop builds and tests first, leave CoreSimulator device data alone, and delete only Xcode's DerivedData folder."
---

# How to Safely Clear Xcode DerivedData Without Breaking Active iOS Simulators

Yes, you can clear Xcode DerivedData without breaking active iOS simulators. The safe rule is simple: stop active builds, tests, previews, and debugging sessions first, then delete only `~/Library/Developer/Xcode/DerivedData`. Do not delete `~/Library/Developer/CoreSimulator` while Simulator devices are booted.

DerivedData and Simulator data are different storage areas. DerivedData is Xcode's build output and index cache. CoreSimulator stores simulator runtimes, devices, installed apps, and simulated device state. Confusing those two folders is what causes most cleanup mistakes.

## Quick Answer

To clear DerivedData safely:

1. Stop running builds, tests, SwiftUI previews, and debug sessions in Xcode.
2. Leave any booted iOS Simulator devices alone unless you intentionally want to erase simulator state.
3. Delete the contents of `~/Library/Developer/Xcode/DerivedData`, not `~/Library/Developer/CoreSimulator`.
4. Reopen or rebuild the project. Xcode recreates the needed build artifacts automatically.

This may make the next build slower, but it should not delete your source code, Xcode project, simulator runtime, simulator device, keychain, photos, app container, or simulator-installed apps.

## What DerivedData Contains

Xcode DerivedData contains generated build products, intermediate files, index data, module caches, logs, and other files Xcode can recreate from your project. The default path is:

```text
~/Library/Developer/Xcode/DerivedData
```

Each project usually gets a subfolder named after the project plus a generated suffix. Over time, those folders can grow into tens of gigabytes, especially when you work across multiple branches, package versions, Xcode versions, or simulator destinations.

DerivedData is safe to remove because it is derived from source. The tradeoff is time: the first build after cleanup has to rebuild more work from scratch.

## What Active iOS Simulators Use Instead

iOS Simulator state lives under CoreSimulator, not DerivedData. The important simulator locations are separate:

```text
~/Library/Developer/CoreSimulator/Devices
~/Library/Developer/CoreSimulator/Runtimes
```

`Devices` contains simulated device state, including installed apps and app containers. `Runtimes` contains installed simulator operating system runtimes. Apple recommends managing simulator runtimes from Xcode Settings under Components, where Xcode shows installed components and storage that can be recovered.<sup><a href="#ref-1">[1]</a></sup>

If your goal is only to clear DerivedData, do not remove CoreSimulator folders manually. That is the boundary that keeps active simulators safe.

## When Clearing DerivedData Can Interrupt Your Work

Deleting DerivedData is low risk, but timing still matters. Avoid clearing it while Xcode is actively using it.

Do not clear DerivedData during:

- An active Xcode build
- A running test suite
- A SwiftUI preview refresh
- A debugging session attached to Simulator
- A command-line `xcodebuild` job
- A package resolution or indexing pass you care about finishing

If you delete build products while a build, test, or debug session is reading them, the likely failure is not permanent damage. It is usually a failed build, a stopped test run, a missing debug symbol, or a need to rebuild and relaunch.

## Safest Manual Method

The safest manual method is to close the active project, quit Xcode if you want to be conservative, and delete only the subfolders inside DerivedData.

In Finder:

1. Open Xcode.
2. Choose Xcode > Settings.
3. Open the Locations section.
4. Use the DerivedData location to reveal the folder in Finder.
5. Move the project folders inside DerivedData to Trash.

Using Trash is safer than permanent deletion because you keep a recovery window. Xcode will rebuild the necessary files the next time you build.

## Safest Terminal Method

If you prefer Terminal, delete the contents of DerivedData rather than typing a broader developer directory path:

```sh
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

Before running it, make sure your builds and tests are stopped. This command targets only DerivedData contents. It does not remove CoreSimulator devices or runtimes.

If you want a more cautious version that moves the folder to Trash instead of permanently deleting it, use Finder or a Trash-first cleanup app. That approach is better when you are cleaning a work machine in the middle of an active project.

## Check Whether Simulators Are Booted

You do not have to shut down booted simulators just to clear DerivedData, but it helps to know what is running.

Use:

```sh
xcrun simctl list devices booted
```

If this prints booted devices, leave CoreSimulator data untouched. If you are attached to one of those simulators from Xcode, stop the debug session before deleting DerivedData.

Apple's simulator tooling is provided through Xcode command-line tools, including `simctl`, which Xcode installs as part of first-launch setup for command-line workflows.<sup><a href="#ref-1">[1]</a></sup>

## What Not to Delete While Simulators Are Active

Avoid these paths while Simulator is booted unless you are intentionally resetting simulator state:

```text
~/Library/Developer/CoreSimulator/Devices
~/Library/Developer/CoreSimulator/Runtimes
```

Deleting from `Devices` can erase simulated devices or app state. Deleting from `Runtimes` can remove platform runtimes that Xcode needs to launch a simulator. Manage runtimes through Xcode Settings > Components instead of removing runtime files directly.<sup><a href="#ref-1">[1]</a></sup>

Also avoid broad commands such as:

```sh
rm -rf ~/Library/Developer/*
```

That command is too wide. It can touch Xcode archives, device support files, simulator state, and other developer data that you may still need.

## Safe Cleanup Decision Table

| Location | Safe during active simulators? | What happens if removed |
|---|---:|---|
| `~/Library/Developer/Xcode/DerivedData` | Usually yes, after stopping builds and debug sessions | Xcode rebuilds generated files |
| `~/Library/Developer/CoreSimulator/Devices` | No | Simulator devices and app state can be erased |
| `~/Library/Developer/CoreSimulator/Runtimes` | No | Simulator OS runtimes can be removed |
| `~/Library/Developer/Xcode/Archives` | Be careful | Old distributable archives may be lost |
| `~/Library/Developer/Xcode/iOS DeviceSupport` | Usually safe if obsolete | Device debugging support may need to be restored |

The key distinction is whether the folder contains generated build output or simulator/device state. DerivedData is generated build output. CoreSimulator is simulator state.

## Best Practice for Teams

On a team Mac, CI machine, or shared development setup, do not run broad cleanup scripts against all developer data. Use a narrow cleanup policy:

- Clear DerivedData by project or by age.
- Keep current simulator runtimes installed.
- Use `xcrun simctl delete unavailable` only for unavailable simulator devices, not active ones.
- Keep recent Xcode archives until releases are safely shipped and reproducible.
- Prefer Trash-first cleanup for local developer workstations.

This preserves active simulator workflows while still reclaiming the biggest low-risk storage category.

## How DiskCleaner Handles This

DiskCleaner separates Developer Data into reviewable items before anything moves. Xcode DerivedData appears as a cleanup candidate, while the app's safety model is review-first and Trash-first: you see files before removal, and cleaned items go to macOS Trash instead of being permanently deleted.

That matters for Xcode cleanup because a mistake is usually caused by selecting the wrong developer folder, not by DerivedData itself. A review step makes the boundary visible before anything changes.

## FAQ

### Can I delete DerivedData while Simulator is open?

Yes, but stop active Xcode builds, tests, previews, and debug sessions first. Simulator being open is not the main issue. Xcode actively reading or writing build products is the issue.

### Will clearing DerivedData uninstall apps from the iOS Simulator?

No. Simulator-installed apps and their containers live under CoreSimulator device data, not DerivedData. Clearing only `~/Library/Developer/Xcode/DerivedData` should not uninstall simulator apps.

### Will clearing DerivedData erase simulator keychain or app documents?

No, not if you only clear DerivedData. Simulator keychain and app data are part of simulator device state under CoreSimulator.

### Why did my app fail to launch after deleting DerivedData?

The app may have been running from build products that Xcode needed for the active debug session. Stop the session, rebuild the app, and run it again. That is a rebuild interruption, not usually permanent simulator damage.

### Should I delete CoreSimulator to free more space?

Not while simulators are active, and not with broad manual deletion. Manage runtimes through Xcode Settings > Components, and remove unavailable devices with `xcrun simctl delete unavailable` when appropriate.

## Bottom Line

Clearing Xcode DerivedData is safe when you keep the target narrow. Stop active Xcode work, delete only `~/Library/Developer/Xcode/DerivedData`, and leave `~/Library/Developer/CoreSimulator` alone unless you explicitly want to reset or remove simulator data.

That gives you the storage win without breaking active iOS simulators.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Downloading and installing additional Xcode components." <em>Apple Developer Documentation</em>, accessed May 16, 2026. <a href="https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes">developer.apple.com</a></li>
  <li id="ref-2">Apple Inc. "Devices and Simulator." <em>Apple Developer Documentation</em>, accessed May 16, 2026. <a href="https://developer.apple.com/documentation/xcode/devices-and-simulator">developer.apple.com</a></li>
  <li id="ref-3">Apple Inc. "Troubleshooting Simulator launch or animation issues." <em>Apple Developer Documentation</em>, accessed May 16, 2026. <a href="https://developer.apple.com/documentation/xcode/troubleshooting-simulator-launch-or-animation-issues">developer.apple.com</a></li>
</ol>
</div>

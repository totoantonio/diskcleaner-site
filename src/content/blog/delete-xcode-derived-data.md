---
title: "How to Delete Xcode DerivedData (And Get Back Gigabytes You Didn't Know Were Gone)"
description: "Xcode DerivedData can silently consume 20–50GB or more on your Mac. Here's exactly what it is, where it lives, when it's safe to delete, and how to prevent it from piling up again."
date: "2026-03-24"
slug: "delete-xcode-derived-data"
category: "Developer"
excerpt: "If you use Xcode even occasionally, DerivedData might be eating 20–50GB on your Mac right now. Here's what it is, how to delete it safely, and why it comes back."
featured: true
---

# How to Delete Xcode DerivedData (And Get Back Gigabytes You Didn't Know Were Gone)

If you've ever looked at your Mac's storage and thought "where did 40GB go?" — and you have Xcode installed — there's a very good chance DerivedData is the answer.

It's one of the most consistent storage surprises for Mac developers: you install Xcode, work on a few projects, and without ever consciously storing anything, your disk shrinks noticeably.

Here's what's happening and what to do about it.

## What Is DerivedData?

DerivedData is Xcode's build cache.<sup><a href="#ref-1">[1]</a></sup>

Every time you compile a project, Xcode stores intermediate build artifacts, compiled modules, index data, and other derived outputs in this folder. The intention is to speed up subsequent builds — rather than recompiling everything from scratch, Xcode checks what's changed and only recompiles what it needs to.

That's good for build times. The problem is that Xcode doesn't aggressively clean up old entries. Projects you haven't touched in months still have their DerivedData sitting on disk. Multiple scheme configurations, multiple Swift module versions, multiple build targets — they all accumulate.

## Where DerivedData Lives

The default location is:

```
~/Library/Developer/Xcode/DerivedData
```

Open Finder, press `⌘ + Shift + G`, paste that path, and press Enter. You'll see one subfolder per project — usually named with the project name followed by a random hash.

On a Mac where Xcode has been used for a year or two across multiple projects, this folder commonly reaches 20–50GB. Heavy users or teams working on large projects (like the iOS system frameworks, game engines, or apps with many targets) can see 100GB+.

## How to Delete DerivedData

### Method 1: From Within Xcode

1. Open Xcode
2. Go to **File → Packages → Reset Package Caches** (for package caches)
3. Or hold **Option** and go to **Xcode → Preferences** — actually the cleanest path is:
4. **Xcode → Settings → Locations** tab
5. Click the arrow next to the DerivedData path to open it in Finder
6. Select all folders inside and delete them

Alternatively, use the keyboard shortcut method: in Xcode, go to **Product → Clean Build Folder** (`⌘ + Shift + K`) for the active project. That only cleans the current project though — not all of DerivedData.

### Method 2: Delete Directly in Terminal

This deletes everything in DerivedData in one command:

```
rm -rf ~/Library/Developer/Xcode/DerivedData
```

macOS and Xcode will recreate the folder automatically the next time you build. This is the fastest method and is completely safe.

### Method 3: Via a Disk Cleaner

Tools like DiskCleaner scan for developer data including DerivedData as a named category. You can see the size before removing it, and it goes to Trash rather than being immediately deleted — so you can restore it if anything unexpected happens.

The Trash-first approach is useful if you're uncertain: you can delete, verify everything still builds correctly, then empty Trash once you're confident.

![DiskCleaner showing Xcode DerivedData in the developer data category](/DiskCleaner_blog.webp)

## Is It Safe to Delete DerivedData?

Yes, completely.

DerivedData contains only derived artifacts — nothing original. Xcode generates all of it from your source code. If you delete the whole folder and then open a project, Xcode rebuilds what it needs on the next build.<sup><a href="#ref-2">[2]</a></sup>

The consequence is a slower first build after deletion. For small projects, you won't notice. For large projects, the first build might take a few minutes longer than usual.

That's it. No project data is stored in DerivedData. No settings, no source files, no team data.

## Other Xcode Storage Locations Worth Checking

DerivedData is the biggest one, but it's not the only place Xcode leaves large files.

### iOS Simulator Runtimes

Each simulator runtime — iOS 17, iOS 18, watchOS 11, etc. — is a multi-gigabyte download.<sup><a href="#ref-3">[3]</a></sup>

Location: `~/Library/Developer/CoreSimulator/Runtimes`

You can manage these in Xcode under **Settings → Platforms**. Runtimes for OS versions you no longer test against can be removed. Each one you delete typically recovers 3–7GB.

### Simulator Device Data

Simulator device states (the contents of simulated devices you've run) live at:

```
~/Library/Developer/CoreSimulator/Devices
```

If you've never cleaned this out, it can contain device states from years of simulator runs. You can delete stale device folders, or use `xcrun simctl delete unavailable` in Terminal to remove simulators for platforms no longer installed.

### Archives

Every time you archive a build for distribution, Xcode saves a copy at `~/Library/Developer/Xcode/Archives`.

Old archives for apps you've already shipped — or projects you've abandoned — can be safely deleted. Xcode's Organizer window shows them in a friendlier UI: **Window → Organizer → Archives**.

### Package Caches

If you use Swift Package Manager, resolved packages are cached at:

```
~/Library/Caches/org.swift.swiftpm
~/Library/org.swift.swiftpm
```

These are generally smaller than DerivedData but worth knowing about.

## Why DerivedData Keeps Coming Back

Deleting DerivedData is not a permanent fix — Xcode rebuilds it every time you compile.

The goal isn't to delete it once and be done. It's to build a habit of occasional cleanup so it doesn't quietly grow to 50GB before you notice.

A few approaches that help:

- **Delete DerivedData before major macOS or Xcode updates** — a clean rebuild after updating avoids stale build artifacts causing cryptic errors
- **Remove simulator runtimes for deprecated OS versions** — you don't need iOS 15 simulators if you're shipping for iOS 17+
- **Check archives quarterly** — old distribution builds are rarely needed after a few update cycles
- **Run a scanner occasionally** — tools that categorize developer data make it easy to see the total at a glance

## The Broader Picture

DerivedData is the single highest-yield storage cleanup for developers on Mac.

Most other cleanup steps — clearing browser cache, screenshots, logs — recover megabytes to low gigabytes. Cleaning DerivedData on a Mac that's been running Xcode for a couple of years commonly recovers 20–50GB in a few seconds.

If you've been struggling with Mac storage and you're a developer, this is almost certainly one of the first places to look.

If you want the broader map beyond DerivedData, read <a href="/blog/which-xcode-folders-are-safe-to-delete/">which Xcode folders are safe to delete on Mac</a>.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Reduce Disk Usage in Xcode." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/documentation/xcode/reducing-your-app-s-size">developer.apple.com</a></li>
  <li id="ref-2">Apple Inc. "Build system — Xcode Help." <em>Xcode User Guide</em>, Apple Developer Documentation, 2024. <a href="https://developer.apple.com/documentation/xcode">developer.apple.com</a></li>
  <li id="ref-3">Apple Inc. "Simulator Help — Download and install additional simulators." <em>Xcode User Guide</em>, Apple Support, 2024. <a href="https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes">developer.apple.com</a></li>
</ol>
</div>

const e=`---
title: "How to Free Up Storage on Mac — A Practical Guide That Actually Works"
description: "When your Mac says storage is full, most fixes people try don't address the real problem. Here's a practical, step-by-step guide to actually freeing up space — without losing anything important."
date: "2026-03-22"
slug: "how-to-free-up-storage-on-mac"
category: "macOS"
excerpt: "Storage full warnings on Mac are frustrating — especially when you can't figure out why. Here's exactly where that space went and how to get it back without guessing."
featured: true
---

# How to Free Up Storage on Mac — A Practical Guide That Actually Works

Your Mac says the disk is almost full. You open Finder, look around, and nothing obvious jumps out. You haven't downloaded a ton of movies. Your Desktop looks normal. So where did it all go?

This is a common situation. And the answer is almost never one big thing — it's a dozen smaller things that accumulated quietly over time.

Here's how to actually find and reclaim that space.

## Step 1: See What's Actually Taking Up Space

Before deleting anything, understand the breakdown.

Go to **Apple menu → About This Mac → More Info → Storage**. You'll get a rough bar chart of storage categories.

The problem is the categories are broad. "System Data" can be anything from cache files to log archives to leftover app data. "Documents" lumps together things you'd keep forever with things you forgot you downloaded in 2021.

For a more useful breakdown, use Finder's **File → Get Info** on large folders, or use a disk analyzer tool that shows you the actual file-level breakdown. Knowing the size before you clean is step one.

## Step 2: Empty the Trash (All of It)

Obvious, but often skipped.

Files in Trash still occupy disk space. And the default Trash isn't the only one — some apps maintain their own trash (Photos has its own Recently Deleted folder, for example).

Check:
- **Finder Trash** — right-click the Trash icon, Empty Trash
- **Photos → Recently Deleted** — tap Delete All
- **Mail → Trash folder** — right-click, Erase Deleted Items

This is the safest cleanup step you can take. If something's already in Trash, you've already decided you don't need it.

## Step 3: Clear Browser Cache

Browser cache is a reliable space hog — especially if you use multiple browsers.<sup><a href="#ref-1">[1]</a></sup>

Safari: **Develop → Empty Caches** (enable Developer menu under Settings → Advanced first)

Chrome: \`⌘ + Shift + Delete\` → All time → Cached images and files → Clear

Firefox: \`⌘ + Shift + Delete\` → Everything → Cache → Clear Now

Each browser maintains its own independent cache. If you use Safari and Chrome regularly, you might be clearing 2–4GB just from this step.

## Step 4: Delete Screenshots and Old Downloads

Screenshots are sneaky. They're small individually — 2–5MB each — but after months of regular use, they stack up.

Default location: \`~/Desktop\` and \`~/Pictures/Screenshots\`

While you're at it, check \`~/Downloads\`. It's easy to download something once, forget about it, and leave it sitting there for two years. Installers, zip files, PDFs — they all accumulate here and rarely get cleaned up automatically.

![DiskCleaner scan showing recoverable space by category](/DiskCleaner_blog.webp)

## Step 5: Remove Xcode Derived Data (If You Develop)

If you have Xcode installed, this is likely your single biggest opportunity.

DerivedData is Xcode's build cache. It grows with every project you compile and can reach 20–50GB or more after sustained development work.<sup><a href="#ref-2">[2]</a></sup>

The folder lives at: \`~/Library/Developer/Xcode/DerivedData\`

You can delete everything inside it safely. Xcode rebuilds it the next time you build a project. The tradeoff is a slower first build — but the storage return is often dramatic.

Simulator runtimes are another big one: \`~/Library/Developer/CoreSimulator/Runtimes\` — each runtime is several gigabytes, and old ones don't delete themselves when you update Xcode.

## Step 6: Uninstall Apps You No Longer Use

Not just the apps — the leftover files they leave behind.

When you drag an app to Trash, the app bundle gets removed. But support files, preferences, caches, and logs stored in \`~/Library/Application Support\` and other Library paths stay put.<sup><a href="#ref-3">[3]</a></sup>

For apps you definitely want gone, use an uninstaller that finds related files — not just the main bundle. This is where a lot of "mystery" storage comes from: years of leftover files from apps you deleted long ago.

## Step 7: Reduce System Data

System Data in macOS storage info is a catch-all label. It includes:<sup><a href="#ref-4">[4]</a></sup>

- System logs and crash reports
- Time Machine local snapshots
- Virtual machine disk images
- Container data (Docker, etc.)
- Misc framework and language data

The hard part is that macOS doesn't break this down further in the default UI. You need to either navigate the file system manually or use a tool that exposes the individual categories.

Time Machine local snapshots are worth checking specifically — macOS keeps these automatically, and they can consume significant space. You can manage them via \`tmutil listlocalsnapshots /\` in Terminal.

## Step 8: Check for Old iOS Backups

If you ever connected an older iPhone or iPad and backed it up locally in Finder, that backup is still on your Mac unless you deleted it.

To find them: open Finder, connect an iPhone or go to Finder → Locations → your device, and look under the General tab for "Manage Backups." Or navigate to \`~/Library/Application Support/MobileSync/Backup\`.

A single iPhone backup can be 10–20GB. Multiple old device backups add up fast.

## A Practical Maintenance Schedule

Rather than doing a massive one-time cleanup, a monthly habit works better:

1. Empty Trash (30 seconds)
2. Clear browser cache (2 minutes)
3. Delete new screenshots you don't need (5 minutes)
4. If you develop: clear DerivedData quarterly (1 minute)
5. Run a full disk scan every few months with a tool that shows categories clearly

The goal isn't getting back every byte — it's keeping storage predictable so the warnings stop catching you off guard.

## Why Storage Gets Tight Even After You Clean

One reason: you cleaned the obvious stuff but missed the background accumulation.

Browser cache comes back. App cache rebuilds. System logs keep writing. Storage management on macOS is ongoing, not a one-time fix.

Another reason: the storage bar in macOS settings is misleading. "Other" and "System Data" categories absorb a lot of legitimate storage without explaining what's inside.

The most effective approach is using a scanner that shows you recoverable categories clearly — so you know where to act instead of guessing.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Google LLC. "HTTP caching." <em>web.dev</em>, Google, 2024. <a href="https://web.dev/articles/http-cache">web.dev/articles/http-cache</a></li>
  <li id="ref-2">Apple Inc. "Reduce the size of your app — Manage Derived Data." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/documentation/xcode/reducing-your-app-s-size">developer.apple.com</a></li>
  <li id="ref-3">Apple Inc. "File System Basics — Library Directories." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html">developer.apple.com</a></li>
  <li id="ref-4">Apple Inc. "About System Data in the storage information for your Mac." <em>Apple Support</em>, 2024. <a href="https://support.apple.com/en-us/102677">support.apple.com/en-us/102677</a></li>
</ol>
</div>
`;export{e as default};

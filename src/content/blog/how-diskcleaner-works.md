---
title: "How DiskCleaner Works — And Why It Never Touches Files Without Asking"
description: "A plain-English look at how DiskCleaner scans your Mac, what it finds, and why nothing is ever deleted without your approval."
date: "2026-03-01"
slug: "how-diskcleaner-works"
category: "How It Works"
excerpt: "DiskCleaner shows every file before it moves. Here's exactly how it works, what it scans, and why your data stays safe."
featured: true
---

# How DiskCleaner Works — And Why It Never Touches Files Without Asking

When we started building DiskCleaner, we had one rule: no mystery actions.

Too many cleaner apps ask you to trust a black box. We didn't want that. If a file is going to move, you should see it first.

## What Happens During a Scan

When you click **Scan**, DiskCleaner checks the places where storage usually leaks on macOS:<sup><a href="#ref-1">[1]</a></sup>

- **App Cache**, including the regenerating QuickLook thumbnail cache
- **Browser Cache** for Chrome, Firefox, Edge, Brave, Arc, and Opera profiles<sup><a href="#ref-2">[2]</a></sup>
- **Screenshots**, **System Logs**, **.DS_Store files**, and **macOS Trash**
- **Developer Data** including Xcode DerivedData, CoreSimulator files, and old iOS DeviceSupport files<sup><a href="#ref-3">[3]</a></sup>
- **Homebrew downloads**, **Large Files**, **iOS backups**, **Apple Mail attachments**, **App Leftovers**, **external storage**, **local Time Machine snapshots**, and **old installers**

The key detail is transparency: category sizes are shown before cleanup, and categories can be expanded so you can review individual items.

You can uncheck anything. Nothing moves until you approve it.

![DiskCleaner scanning categories with expandable file lists](/DiskCleaner_blog.webp)

## Why We Added the Uninstaller

Dragging an app to Trash removes the app bundle, not all the files it left behind.

That's a macOS limitation, not a bug — apps are allowed to write support files to Library paths outside their bundle, and those aren't cleaned up automatically when you delete the app.<sup><a href="#ref-4">[4]</a></sup>

That's why we built an App Uninstaller into DiskCleaner. You drag an app in, DiskCleaner finds related leftovers in common Library paths, and you review the list before removal.

If you've ever deleted a large app and recovered almost no space, this is usually why.

## No Background Cleanup Engine

DiskCleaner does not run scheduled cleanup jobs in the background.

It runs when you open it, scans when you ask, and stops when you close it.

That was deliberate. A cleanup tool should not become another always-on process adding to the very overhead you're trying to manage.

## Privacy and Safety

DiskCleaner is local-first:

- scans run on your Mac
- results stay on your Mac
- normal usage does not require an account

And cleanup is **Trash-first**, so recovery remains possible if you change your mind.

## What DiskCleaner Is Not

We don't market DiskCleaner as a magical optimizer. It does not claim to "fix memory" or perform vague one-click miracles.

It does one thing well: show recoverable files clearly and let you decide what to remove.

## A Practical First Step

If your Mac storage feels confusing, run one scan and review the categories.

Even before deleting anything, most people immediately understand their disk usage better. That's the point of the product.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Manage storage space on your Mac." <em>Mac User Guide</em>, Apple Support, 2024. <a href="https://support.apple.com/guide/mac-help/manage-storage-space-syser5a93c9f/mac">support.apple.com</a></li>
  <li id="ref-2">Google LLC. "HTTP caching." <em>web.dev</em>, Google, 2024. <a href="https://web.dev/articles/http-cache">web.dev/articles/http-cache</a></li>
  <li id="ref-3">Apple Inc. "Reduce Disk Usage in Xcode." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/documentation/xcode/reducing-your-app-s-size">developer.apple.com</a></li>
  <li id="ref-4">Apple Inc. "File System Basics — The Role of the Home Directory." <em>Apple Developer Documentation: File System Programming Guide</em>, 2024. <a href="https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html">developer.apple.com</a></li>
</ol>
</div>

const e=`---
title: "How DiskCleaner Works — And Why It Never Touches Files Without Asking"
description: "A plain-English look at how DiskCleaner scans your Mac, what it finds, and why nothing is ever deleted without your approval."
date: "2026-03-01"
slug: "how-diskcleaner-works"
excerpt: "DiskCleaner shows every file before it moves. Here's exactly how it works, what it scans, and why your data stays safe."
featured: true
---

# How DiskCleaner Works — And Why It Never Touches Files Without Asking

When we started building DiskCleaner, we had one rule: no mystery actions.

Too many cleaner apps ask you to trust a black box. We didn't want that. If a file is going to move, you should see it first.

## What Happens During a Scan

When you click **Scan**, DiskCleaner checks the places where storage usually leaks on macOS:

- **App Cache**
- **Browser Cache** (Safari, Chrome, Firefox, Edge, Arc, and others)
- **Screenshots**
- **Trash**
- **Developer Data** (including Xcode DerivedData and package caches)

The key detail is transparency: category sizes are shown before cleanup, and categories can be expanded so you can review individual items.

You can uncheck anything. Nothing moves until you approve it.

## Why We Added the Uninstaller

Dragging an app to Trash removes the app bundle, not all the files it left behind.

That's why we built an App Uninstaller into DiskCleaner. You drag an app in, DiskCleaner finds related leftovers in common Library paths, and you review the list before removal.

If you've ever deleted a large app and recovered almost no space, this is usually why.

## No Background Cleanup Engine

DiskCleaner does not run scheduled cleanup jobs in the background.

It runs when you open it, scans when you ask, and stops when you close it.

That was deliberate. A cleanup tool should not become another always-on process.

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
`;export{e as default};

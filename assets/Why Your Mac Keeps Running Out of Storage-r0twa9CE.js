const e=`---
title: "Why Your Mac Keeps Running Out of Storage (And What's Actually Eating It)"
description: "If your Mac keeps showing low storage warnings, the problem usually isn't what you think. Here's what's actually consuming your disk space and how to get it back."
date: "2026-03-02"
slug: "why-mac-keeps-running-out-of-storage"
excerpt: "You just bought a Mac with 512 GB of storage. You haven't downloaded anything unusual. You don't have thousands of photos. And yet, here you are — another low storage warning, another afternoon of digging through folders trying to figure out where all the space went. This guide breaks down the real culprits behind disappearing Mac storage: the files macOS creates silently, the caches that never stop growing, the app leftovers that survive uninstallation, and the developer tools that can quietly eat 30 GB without a single warning. If you've ever stared at the storage bar in System Settings and felt confused, this is for you."
featured: true
---

# Why Your Mac Keeps Running Out of Storage (And What's Actually Eating It)

A few years ago, a friend called me frustrated. She'd bought a MacBook Air with 256 GB of storage, barely used it for anything besides work, and was already getting low storage warnings after 18 months. She hadn't installed games. She wasn't storing movies. Her photo library was maybe 10 GB.

So where did the space go?

This comes up more than you'd think. Mac storage has a way of disappearing quietly, over a long period of time, through a dozen different sources that never announce themselves. By the time you notice, you're already in the red.

Here's what's actually happening.

## Your Browser Is a Hoarder

Every time you visit a website, your browser saves pieces of it locally — images, scripts, fonts, layout files — so the page loads faster next time. That's what browser cache is. The idea is sensible. The execution, over time, is not.

Chrome is the worst offender. Leave it running for a year and its cache folder can grow past 5 GB without you doing anything unusual. Safari is cleaner but not immune. If you use multiple browsers — Chrome for work, Safari for personal, Firefox for testing — those caches multiply. Arc users have their own growing cache folder. Edge too.

None of this is the browser doing something wrong. It's doing exactly what it's designed to do. But macOS never cleans it up automatically, and the storage just sits there.

## Apps Leave Junk When You Delete Them

Here's something most Mac users don't know: when you drag an app to Trash, you're only deleting the app itself. The files it created while running — preferences, caches, saved state, support files, logs — stay behind in your Library folder. Every single one of them.

Some apps are tidy. Most aren't. A deleted app might leave behind a few megabytes. A heavily used app like Slack, Spotify, or Adobe anything can leave gigabytes of support files scattered across multiple Library locations that Finder doesn't even show you by default.

Multiply this by every app you've ever installed and removed over the life of your Mac, and you start to understand where the space went.

## Xcode Is in a Category of Its Own

If you've ever installed Xcode — even once, just to get the Command Line Tools — there's a good chance it's contributed significantly to your storage problem.

Xcode stores build artifacts in a folder called DerivedData. Every time you compile a project, it adds to this folder. Old builds don't get cleaned up automatically. A developer who works in Xcode regularly can accumulate 20, 30, even 50 GB in DerivedData alone without realizing it.

On top of that, Xcode installs simulator images for different iOS and watchOS versions. Each one can be several gigabytes. If you've updated Xcode a few times, you might have simulators installed for iOS versions you'll never test against again.

You don't have to be a professional developer for this to affect you. Anyone who's followed an online tutorial, taken a coding class, or experimented with app development has probably triggered this.

## System Data Is a Catch-All for Everything Else

Open System Settings, click General, then Storage. You'll see a breakdown of what's on your drive. One of the categories is called System Data, and it's almost always larger than you'd expect.

System Data is Apple's way of grouping everything that doesn't fit neatly into the other categories — Apps, Photos, Documents. It includes system logs, diagnostic reports, local Time Machine snapshots, iOS device backups stored on your Mac, and a collection of other files that macOS manages in the background.

The frustrating part is that Apple gives you no way to drill into it. You see the number. You see nothing else. There's no "Manage" button, no file list, no explanation. Just a number that's probably bigger than you'd like.

## iOS Backups Nobody Remembers

Speaking of storage surprises — if you've ever connected an iPhone or iPad to your Mac and backed it up through Finder, that backup is sitting in your Library folder right now.

A full iPhone backup is typically between 8 and 20 GB depending on what's on the device. If you've had multiple iPhones, you might have backups from two or three generations of devices still taking up space on a computer you're actively using today.

Old backups from phones you no longer own. Backups made before you switched to iCloud. Duplicate backups from when you upgraded and just wanted to be safe. They add up.

## How to Actually Fix It

The honest answer is that fixing Mac storage requires going through several different locations across your system — many of which Finder hides by default. You can do it manually if you're comfortable navigating hidden Library folders, but it's tedious and easy to get wrong.

DiskCleaner was built specifically for this. When you run a scan, it identifies the safe-to-remove files across all the places that matter — browser cache, app cache, screenshots, developer data, macOS Trash — and shows them to you before touching anything. Every file is visible. Every category is expandable. Nothing moves until you approve it.

The App Uninstaller handles the leftover problem. Drag any app into it and DiskCleaner finds everything that app left behind across all 9 Library locations — the ones Finder doesn't show. You review the list and send it to Trash.

Nothing is permanently deleted. Everything goes through Trash first, so if something looks wrong, you can get it back.

## How Much Space Can You Recover?

It genuinely depends on how long it's been and how you use your Mac. Someone who's never cleaned their Mac and has Xcode installed might recover 40 GB or more. A regular user who's careful but has never thought about browser cache might find 5–10 GB.

DiskCleaner includes 3 free scans — no account, no credit card. Run one and see what's on your machine. Most people are surprised by what shows up.

Download it at **diskcleaner.pro** and find out.`;export{e as default};

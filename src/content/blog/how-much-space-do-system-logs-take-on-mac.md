---
title: "How Much Space Do System Logs Take on Mac — And Is It Safe to Delete Them?"
description: "System logs quietly pile up on your Mac over months and years. This guide covers what they are, where they live, how much space they typically use, and which ones are safe to remove."
date: "2026-03-03"
slug: "how-much-space-do-system-logs-take-on-mac"
category: "macOS"
excerpt: "System logs are one of the quietest consumers of disk space on a Mac. Most users never open them. But after a year or two, they can stack up to several gigabytes — and almost none of it is doing anything useful by then."
featured: true
---

# How Much Space Do System Logs Take on Mac — And Is It Safe to Delete Them?

If you've run a storage scan and seen logs listed as a category, you might have wondered how much space they actually use — and whether deleting them could cause any problems.

The short answer: logs can use anywhere from a few hundred MB to several gigabytes, and for most users, older logs are completely safe to remove.<sup><a href="#ref-1">[1]</a></sup>

## What System Logs Are

macOS continuously records what's happening on your machine. When an app crashes, a system process misbehaves, or a background task runs, macOS writes a log entry — sometimes a full diagnostic report.

These files exist for developers and support technicians to diagnose problems. For the average user, they're never opened at all.

The main types include:

- **Crash reports** — generated when apps or system processes crash unexpectedly
- **Diagnostic reports** — detailed snapshots collected during and after problems
- **Application logs** — written by individual apps to record their own activity
- **System logs** — low-level records from macOS services and daemons
- **Hang reports** — created when an app stops responding<sup><a href="#ref-2">[2]</a></sup>

## Where Logs Live on macOS

macOS stores logs in a few standard locations:

- `~/Library/Logs` — per-user app and diagnostic logs
- `/Library/Logs` — system-wide logs
- `/var/log` — core Unix-level system logs
- `~/Library/Diagnostic Reports` — crash and hang reports for the current user
- `/Library/Diagnostic Reports` — system-level diagnostic reports

These paths are hidden from Finder by default, which is part of why they accumulate unnoticed.<sup><a href="#ref-3">[3]</a></sup>

## How Much Space Do They Actually Use?

It depends on how long the Mac has been in use and how often apps and processes crash or misbehave.

On a relatively healthy Mac used for a year or two:

- Crash and hang reports typically total **50–200 MB**
- Application logs in `~/Library/Logs` often range **100 MB–1 GB**
- System and diagnostic logs in `/Library/Logs` can add another **200 MB–2 GB**

On a Mac used heavily for development, or one that has experienced recurring app crashes:

- Logs can easily reach **3–8 GB** or more
- Xcode and simulator-related logs alone can be enormous
- Some crash-prone apps write hundreds of reports over time

The key thing to understand: these files grow incrementally. A single log file is often just a few kilobytes. But after thousands of entries across months of use, it adds up.

## Are System Logs Safe to Delete?

For most users, yes — with a few distinctions worth knowing.

**Safe to remove:**

- Crash reports older than a few weeks (they've already served their purpose, or weren't opened)
- Application logs from apps you've already troubleshot or that crashed once and recovered
- Hang reports from months ago
- Diagnostic reports that weren't part of an active support investigation

**Be more careful with:**

- Logs from apps you're actively debugging or troubleshooting with someone else
- Log files actively being written to by a running process
- Any logs you've been asked to keep by an app's support team<sup><a href="#ref-4">[4]</a></sup>

In practice, if a log file is more than a month old, you almost certainly don't need it.

## What Most People Do Wrong

Most people either ignore logs entirely (and let them stack up) or try to manually navigate to hidden Library paths and delete files by hand.

The manual approach works but has real risk: the Library folder also contains preference files, support data, and app state that you don't want to delete. Removing the wrong file in the wrong folder can break an app or cause configuration to reset.

## A Safer Approach

The better workflow is to use a scanner that specifically targets log files in the right locations — and shows you what it found before removing anything.

DiskCleaner scans System Logs as a dedicated category, pulling crash reports, diagnostic reports, and application logs from their standard macOS locations. You see a list of everything found with file sizes before anything is moved. Everything goes to Trash, not permanent deletion, so you can review and recover if needed.

## Final Take

System logs are not the biggest storage consumer on most Macs, but they're one of the most consistently overlooked. They accumulate silently, take up real space over time, and carry essentially no risk to remove once they're more than a few weeks old.

If you haven't cleaned logs in a year or two, running a quick scan usually surfaces a few hundred megabytes to several gigabytes of files you don't need.

<div class="blog-references">
<p class="blog-references-label">References</p>
<ol class="references">
  <li id="ref-1">Apple Inc. "Use Console to view logs and activity on your Mac." <em>Apple Support</em>, 2024. <a href="https://support.apple.com/guide/console/welcome/mac">support.apple.com/guide/console</a></li>
  <li id="ref-2">Apple Inc. "Diagnostic Reports." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs">developer.apple.com</a></li>
  <li id="ref-3">Apple Inc. "Access hidden files and folders on your Mac." <em>Apple Support</em>, 2024. <a href="https://support.apple.com/guide/mac-help/show-hidden-files-folders-mac-mh27764/mac">support.apple.com</a></li>
  <li id="ref-4">Apple Inc. "File System Basics — About the macOS File System." <em>Apple Developer Documentation</em>, 2024. <a href="https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html">developer.apple.com</a></li>
</ol>
</div>

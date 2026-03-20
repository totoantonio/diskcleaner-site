# DiskCleaner for Mac

DiskCleaner is a privacy-first macOS cleanup app built around one rule: **show everything before cleanup**.

It helps recover storage from caches, logs, temporary files, browser data, and app leftovers while keeping users in control of every action.

## Website

- Main site: https://www.diskcleaner.pro/
- Download page: https://www.diskcleaner.pro/#download
- Features page: https://www.diskcleaner.pro/#features
- Blog: https://www.diskcleaner.pro/blog

## Core App Features

- Full file preview before cleanup
- Trash-first cleanup workflow (recoverable)
- Local-first scanning and processing
- Zero background cleanup jobs
- Multi-browser cache cleanup support
- Developer data cleanup (for example Xcode and package caches)
- App uninstaller that finds common leftover files

## Screenshots

<img src="src/assets/DiskCleaner.webp" width="49%" alt="DiskCleaner main scan view" />

Direct assets:

- `src/assets/DiskCleaner.webp`

## Product Principles

- Transparency over automation
- Safety over aggressive deletion
- Performance without always-on processes
- Privacy without file-content uploads for normal cleanup workflows

## What DiskCleaner Cleans

DiskCleaner focuses on common storage-heavy categories such as:

- Cache files
- Logs
- Temporary files
- Browser data
- Developer artifacts
- App leftovers after uninstall

## This Repository

This repository contains the **official DiskCleaner website** (marketing site + blog), built with:

- React
- TypeScript
- Vite

## Waitlist Setup (Notify Me Button)

The launch waitlist modal reads this environment variable:

- `VITE_WAITLIST_FORM_ACTION`

Supported values:

- Mailchimp embedded form action URL (recommended for this static site)
- Any JSON webhook endpoint that accepts `{ name, email }`

Example `.env`:

```bash
VITE_WAITLIST_FORM_ACTION="https://YOUR_PREFIX.list-manage.com/subscribe/post?u=XXX&id=YYY"
```

If this variable is missing, the modal shows a setup message instead of submitting.

## Contact

- Support: customersupport@diskcleaner.pro
- Website: https://www.diskcleaner.pro/

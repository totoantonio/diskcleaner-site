# Security

This document describes the public security posture and disclosure path for DiskCleaner.

It is not a third-party audit report. If DiskCleaner completes an independent audit in the future, that history should be added here with dates and scope.

## Scope

This repository contains the DiskCleaner website and public product documentation.

The DiskCleaner product is a macOS cleanup utility positioned around:

- local-first scanning
- review-before-cleanup
- Trash-first removal rather than permanent deletion
- no account requirement for normal use

## Security Model

DiskCleaner is designed to reduce the trust burden usually associated with Mac cleaner software.

The intended security model is:

- file discovery and cleanup decisions happen on-device
- users can review what was found before cleanup
- removed items go through macOS Trash to preserve a recovery window
- the app avoids broad permanent-delete behavior as a default workflow

## Permissions and Access

Depending on the category being reviewed, DiskCleaner may require standard macOS permissions such as:

- Full Disk Access for protected locations
- administrator approval for certain system-level cleanup actions

These permissions should be granted through standard macOS dialogs only.

## Network Behavior

DiskCleaner is positioned as a local-first app.

Public product and trust documentation currently describe the app as:

- not requiring an account for cleanup
- not relying on cloud processing for scan results
- avoiding analytics or telemetry in the cleanup workflow

If network-connected product behavior changes materially in the future, this document should be updated with:

- what is sent
- when it is sent
- why it is necessary

## Data Handling

The intended cleanup workflow may inspect file metadata such as:

- file names
- file paths
- file sizes
- timestamps

Normal cleanup workflows should not require uploading file contents.

## Code Signing and Notarization

DiskCleaner is publicly described as Apple-notarized and expected to pass Gatekeeper.

For each release, advanced users should be able to verify:

- the code signing identity
- the notarization status
- the downloaded build hash, where practical

If reproducible release verification steps are published separately, link them from this file.

## Safe Cleanup Defaults

DiskCleaner's public safety claims are based on these product principles:

- show files before moving them
- allow user review
- use Trash-first cleanup
- avoid touching personal documents, passwords, and protected locations as cleanup junk

These claims should remain aligned with the actual app behavior. If product behavior changes, update this document immediately.

## Supported Reporting Channel

If you believe you found a security issue, email:

- customersupport@diskcleaner.pro

Please include:

- affected app version
- macOS version
- Apple Silicon or Intel
- steps to reproduce
- screenshots or screen recordings if relevant
- impact assessment

## Disclosure Expectations

When reporting a potential vulnerability:

- do not publicly disclose the issue before coordinated review
- do not exfiltrate user data
- do not exploit the issue beyond what is necessary to demonstrate impact

DiskCleaner should acknowledge legitimate reports and evaluate severity based on:

- user-data exposure risk
- unintended file-removal risk
- privilege boundary violations
- code-signing, notarization, or supply-chain impact

## Audit History

No independent third-party audit is documented in this repository at this time.

If an audit is completed later, record:

- auditor
- audit date
- scope
- summary of findings
- remediation status

## Verification References

Related public trust materials:

- Trust page: https://www.diskcleaner.pro/trust
- Help page: https://www.diskcleaner.pro/help
- Privacy Policy: https://www.diskcleaner.pro/privacy-policy
- Terms of Service: https://www.diskcleaner.pro/terms-of-service

#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const dmgPath = path.resolve(process.cwd(), 'public', 'downloads', 'DiskCleaner-macOS.dmg')
const downloadsPath = path.join('public', 'downloads')

console.log(`Checking for DMG at ${dmgPath} ...`)

try {
  const stat = fs.statSync(dmgPath)
  if (!stat.isFile()) {
    console.error('\nERROR: DMG not found or is not a file.')
    console.error('Please add public/downloads/DiskCleaner-macOS.dmg before deploying.\n')
    process.exit(1)
  }
  if (stat.size === 0) {
    console.error('\nERROR: DMG is empty.')
    process.exit(1)
  }

  const downloadChanges = execFileSync(
    'git',
    ['status', '--porcelain=v1', '--untracked-files=all', '--', downloadsPath],
    { encoding: 'utf8' },
  ).trim()

  if (downloadChanges) {
    console.error('\nERROR: public/downloads contains changes:')
    console.error(downloadChanges)
    console.error('\nDeployments must not modify, replace, or delete the published DMG.')
    console.error('Restore or unstage these changes before deploying.\n')
    process.exit(1)
  }

  console.log(`OK: protected DMG present and unchanged (${stat.size} bytes).`)
  process.exit(0)
} catch (err) {
  console.error('\nERROR: unable to verify the protected DMG.')
  console.error(err instanceof Error ? err.message : String(err))
  console.error('Ensure public/downloads/DiskCleaner-macOS.dmg matches the tracked version before deploying.\n')
  process.exit(1)
}

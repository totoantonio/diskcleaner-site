#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const dmgPath = path.resolve(process.cwd(), 'public', 'downloads', 'DiskCleaner-macOS.dmg')

console.log(`Checking for DMG at ${dmgPath} ...`)

try {
  const stat = fs.statSync(dmgPath)
  if (!stat.isFile()) {
    console.error('\nERROR: DMG not found or is not a file.')
    console.error('Please add public/downloads/DiskCleaner-macOS.dmg before deploying.\n')
    process.exit(1)
  }
  console.log('OK: DMG present.')
  process.exit(0)
} catch (err) {
  console.error('\nERROR: DMG missing.')
  console.error('Please add public/downloads/DiskCleaner-macOS.dmg before deploying.\n')
  process.exit(1)
}

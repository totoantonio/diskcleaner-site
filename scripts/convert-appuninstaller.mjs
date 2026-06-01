#!/usr/bin/env node
import sharp from 'sharp'
import path from 'path'
import { access as fsAccess } from 'fs/promises'

const srcDir = path.resolve('src', 'assets')
// Prefer the new `App Uninstaller.webp` if present, otherwise fall back to legacy PNG
const preferredWebp = path.join(srcDir, 'App Uninstaller.webp')
const legacyPng = path.join(srcDir, 'App Uninstaller V2.png')
const input = await (async () => {
  try {
    await fsAccess(preferredWebp)
    return preferredWebp
  } catch {
    return legacyPng
  }
})()

const outputs = [
  { out: path.join(srcDir, 'App Uninstaller.webp'), width: null },
  { out: path.join(srcDir, 'App Uninstaller-1600.webp'), width: 1600 },
  { out: path.join(srcDir, 'App Uninstaller-1024.webp'), width: 1024 },
  { out: path.join(srcDir, 'App Uninstaller-640.webp'), width: 640 },
  { out: path.join(srcDir, 'App Uninstaller-464.webp'), width: 464 },
]

async function run() {
  try {
    const image = sharp(input)
    for (const o of outputs) {
      // Avoid overwriting the source file when input === output
      if (path.resolve(o.out) === path.resolve(input)) {
        console.log('Skipping write for', o.out, '(source file)')
        continue
      }
      if (o.width) {
        await image.resize({ width: o.width }).webp({ quality: 80 }).toFile(o.out)
      } else {
        await image.webp({ quality: 90 }).toFile(o.out)
      }
      console.log('Wrote', o.out)
    }
  } catch (err) {
    console.error('Error converting App Uninstaller images:', err)
    process.exitCode = 1
  }
}

run()

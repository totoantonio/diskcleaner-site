#!/usr/bin/env node
import sharp from 'sharp'
import path from 'path'
import { access as fsAccess } from 'fs/promises'

const srcDir = path.resolve('src', 'assets')
// Prefer a new `RAM Optimizer.webp` if present, otherwise fall back to legacy PNG
const preferredWebp = path.join(srcDir, 'RAM Optimizer.webp')
const legacyPng = path.join(srcDir, 'RAM Optimizer V2.png')
const input = await (async () => {
  try {
    await fsAccess(preferredWebp)
    return preferredWebp
  } catch {
    return legacyPng
  }
})()

const outputs = [
  { out: path.join(srcDir, 'RAM Optimizer.webp'), width: null },
  { out: path.join(srcDir, 'RAM Optimizer-1600.webp'), width: 1600 },
  { out: path.join(srcDir, 'RAM Optimizer-1024.webp'), width: 1024 },
  { out: path.join(srcDir, 'RAM Optimizer-640.webp'), width: 640 },
  { out: path.join(srcDir, 'RAM Optimizer-464.webp'), width: 464 },
]

async function run() {
  try {
    const image = sharp(input)
    for (const o of outputs) {
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
    console.error('Error converting RAM Optimizer images:', err)
    process.exitCode = 1
  }
}

run()

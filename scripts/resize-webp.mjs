#!/usr/bin/env node
import sharp from 'sharp'
import path from 'path'

const input = path.resolve('public', 'DiskCleaner.webp')
const out640 = path.resolve('public', 'DiskCleaner-640.webp')
const out464 = path.resolve('public', 'DiskCleaner-464.webp')

async function run() {
  try {
    await sharp(input).resize({ width: 640 }).webp({ quality: 80 }).toFile(out640)
    console.log('Wrote', out640)
    await sharp(input).resize({ width: 464 }).webp({ quality: 80 }).toFile(out464)
    console.log('Wrote', out464)
  } catch (err) {
    console.error('Error resizing images:', err)
    process.exit(1)
  }
}

run()

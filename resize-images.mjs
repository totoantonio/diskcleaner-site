import sharp from "sharp"

const images = [
  "DiskCleaner.webp",
  "DiskCleaner_Uninstaller.webp",
  "DiskCleaner_ZeroDecision.webp",
  "DiskCleaner_MenuBar.webp",
]

const inputDir = "./src/assets"

async function run() {
  for (const file of images) {
    const inputPath = `${inputDir}/${file}`
    const output464 = `${inputDir}/${file.replace(".webp", "-464.webp")}`
    const output640 = `${inputDir}/${file.replace(".webp", "-640.webp")}`

    await sharp(inputPath)
      .resize({ width: 464 })
      .webp({ quality: 90 })
      .toFile(output464)

    await sharp(inputPath)
      .resize({ width: 640 })
      .webp({ quality: 90 })
      .toFile(output640)

    console.log(`Created: ${output464}`)
    console.log(`Created: ${output640}`)
  }

  console.log("All images resized successfully.")
}

run().catch(console.error)

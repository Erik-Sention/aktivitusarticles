import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function bilderManifestPlugin() {
  const IMG = /\.(jpg|jpeg|png|gif|webp|svg)$/i
  function generate() {
    const bilderDir = path.resolve('public/bilder')
    if (!fs.existsSync(bilderDir)) return

    const categories = {}

    // Root images → "ovrigt"
    const rootFiles = fs.readdirSync(bilderDir)
      .filter(f => IMG.test(f))
      .sort()
    if (rootFiles.length) categories['ovrigt'] = rootFiles.map(f => `/bilder/${f}`)

    // Subfolders → category name = folder name
    const subDirs = fs.readdirSync(bilderDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort()
    for (const dir of subDirs) {
      const subFiles = fs.readdirSync(path.join(bilderDir, dir))
        .filter(f => IMG.test(f))
        .sort()
      if (subFiles.length) categories[dir] = subFiles.map(f => `/bilder/${dir}/${f}`)
    }

    fs.writeFileSync(
      path.resolve('public/bilder-manifest.json'),
      JSON.stringify({ categories }, null, 2)
    )
  }

  return {
    name: 'bilder-manifest',
    buildStart() { generate() },
    configureServer() { generate() },
  }
}

export default defineConfig({
  plugins: [react(), bilderManifestPlugin()],
})

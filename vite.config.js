import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function bilderManifestPlugin() {
  function generate() {
    const bilderDir = path.resolve('public/bilder')
    if (!fs.existsSync(bilderDir)) return
    const files = fs.readdirSync(bilderDir)
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .sort()
    const manifest = { images: files.map(f => `/bilder/${f}`) }
    fs.writeFileSync(
      path.resolve('public/bilder-manifest.json'),
      JSON.stringify(manifest, null, 2)
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

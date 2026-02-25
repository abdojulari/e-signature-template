import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const dir = join(process.cwd(), 'public/social-icons')
const files = readdirSync(dir).filter(f => f.endsWith('.svg'))

for (const file of files) {
  const svgPath = join(dir, file)
  const pngPath = join(dir, file.replace('.svg', '.png'))
  const svg = readFileSync(svgPath, 'utf-8')

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 64 },
    background: 'rgba(0,0,0,0)',
  })
  const rendered = resvg.render()
  const pngBuffer = rendered.asPng()
  writeFileSync(pngPath, pngBuffer)
  console.log(`✓ ${file} → ${file.replace('.svg', '.png')} (${pngBuffer.length} bytes)`)
}

console.log(`\nConverted ${files.length} icons to PNG`)

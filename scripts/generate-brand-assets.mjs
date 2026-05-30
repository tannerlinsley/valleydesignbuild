import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.resolve('public')
const logoSourcePath = path.join(publicDir, 'images/logo-white.svg')
const heroSourcePath = path.join(publicDir, 'images/welder.jpg')

const brand = {
  name: 'Valley Design Build',
  shortName: 'Valley',
  description:
    "Utah's design-build firm for custom pools, pumptracks, skateparks, treehouses, ice rinks, and outdoor entertainment spaces.",
  tagline: 'Ambitious Experiences',
  subtagline: 'For the adventurer and recreator in all of us',
  version: 'valley-20260529-redesign-2',
  url: 'https://valleydesignbuild.com',
  navy: '#001925',
  navy950: '#000d13',
  gray900: '#111827',
  gray950: '#030712',
  cyan700: '#0e7490',
  cyan600: '#0891b2',
  cyan400: '#22d3ee',
  cyan100: '#cffafe',
  white: '#ffffff',
  gray300: '#d1d5db',
}

const logoMarkViewBox = '0 0 1068 1177'
const logoSourceTransform = 'translate(-186.4689, -309.5267)'

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function dataUri(mimeType, buffer) {
  return `data:${mimeType};base64,${buffer.toString('base64')}`
}

function extractLogoMarkPath(svg) {
  const pathTag = svg.match(/<path\b(?=[^>]*\bid="Fill-37")[^>]*>/)?.[0]
  const pathData = pathTag?.match(/\sd="([^"]+)"/)?.[1]

  if (!pathData) {
    throw new Error('Could not find the Valley logo mark path in logo-white.svg.')
  }

  return pathData
}

function logoMarkPath(markPathData, fill = brand.white, opacity = 1) {
  return `<path d="${markPathData}" transform="${logoSourceTransform}" fill="${fill}" fill-rule="evenodd" opacity="${opacity}" />`
}

function buildAppIconSvg(markPathData, options = {}) {
  const {
    radius = 96,
    markX = 86,
    markY = 58,
    markWidth = 340,
    markHeight = 376,
  } = options

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="${escapeXml(brand.name)}">
  <defs>
    <linearGradient id="bg" x1="64" y1="24" x2="448" y2="488" gradientUnits="userSpaceOnUse">
      <stop stop-color="${brand.gray900}" />
      <stop offset="0.56" stop-color="${brand.navy}" />
      <stop offset="1" stop-color="${brand.navy950}" />
    </linearGradient>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(394 86) rotate(126) scale(290 256)">
      <stop stop-color="${brand.cyan400}" stop-opacity="0.42" />
      <stop offset="1" stop-color="${brand.cyan400}" stop-opacity="0" />
    </radialGradient>
    <clipPath id="icon-shape">
      <rect width="512" height="512" rx="${radius}" />
    </clipPath>
  </defs>
  <g clip-path="url(#icon-shape)">
    <rect width="512" height="512" fill="url(#bg)" />
    <rect width="512" height="512" fill="url(#glow)" />
    <path d="M0 386 512 214v298H0V386Z" fill="${brand.cyan700}" opacity="0.32" />
    <path d="M370 0h142v512H240L370 0Z" fill="${brand.cyan600}" opacity="0.12" />
    <rect x="0" y="0" width="512" height="512" fill="none" stroke="#fff" stroke-opacity="0.12" stroke-width="2" />
  </g>
  <svg x="${markX}" y="${markY}" width="${markWidth}" height="${markHeight}" viewBox="${logoMarkViewBox}" overflow="visible">
    ${logoMarkPath(markPathData)}
  </svg>
</svg>`
}

function buildMaskIconSvg(markPathData) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logoMarkViewBox}">
  ${logoMarkPath(markPathData, '#000')}
</svg>`
}

function buildOgSvg({ heroImage, logoImage, markPathData }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(brand.name)} social preview">
  <defs>
    <linearGradient id="photo-fade" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="${brand.gray950}" stop-opacity="0.96" />
      <stop offset="0.48" stop-color="${brand.navy}" stop-opacity="0.88" />
      <stop offset="1" stop-color="${brand.navy950}" stop-opacity="0.5" />
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="160" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="${brand.cyan700}" stop-opacity="0" />
      <stop offset="1" stop-color="${brand.cyan700}" stop-opacity="0.36" />
    </linearGradient>
  </defs>
  <image href="${heroImage}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice" />
  <rect width="1200" height="630" fill="${brand.gray950}" opacity="0.36" />
  <rect width="1200" height="630" fill="url(#photo-fade)" />
  <path d="M0 422 1200 166v464H0V422Z" fill="url(#floor)" />
  <path d="M818 0h382v630H650L818 0Z" fill="${brand.navy950}" opacity="0.42" />
  <path d="M878 0h322v630H748L878 0Z" fill="${brand.cyan600}" opacity="0.15" />
  <svg x="760" y="0" width="520" height="574" viewBox="${logoMarkViewBox}" opacity="0.14">
    ${logoMarkPath(markPathData)}
  </svg>
  <image href="${logoImage}" x="72" y="58" width="520" height="104" preserveAspectRatio="xMinYMid meet" />
  <text x="72" y="278" font-family="PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif" font-size="104" font-weight="700" letter-spacing="0" fill="${brand.white}" text-transform="uppercase">Ambitious</text>
  <text x="72" y="372" font-family="PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif" font-size="104" font-weight="700" letter-spacing="0" fill="${brand.white}" text-transform="uppercase">Experiences</text>
  <text x="76" y="430" font-family="PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif" font-size="36" font-weight="700" font-style="italic" letter-spacing="0" fill="${brand.cyan400}">${escapeXml(brand.subtagline)}</text>
  <text x="76" y="486" font-family="PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif" font-size="30" font-weight="400" letter-spacing="0" fill="${brand.gray300}">Custom pools, pumptracks, skateparks, treehouses, ice rinks, and beyond.</text>
  <text x="76" y="530" font-family="PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="0" fill="${brand.white}">Northern Utah design-build</text>
  <g font-family="PT Sans Narrow, Arial Narrow, Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="0">
    <rect x="76" y="552" width="184" height="52" rx="6" fill="${brand.cyan700}" />
    <text x="168" y="586" text-anchor="middle" fill="${brand.white}">(801) 510-7142</text>
    <text x="292" y="586" fill="${brand.cyan100}">valleydesignbuild.com</text>
  </g>
</svg>`
}

function icoFromPngs(entries) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(entries.length, 4)

  let offset = 6 + entries.length * 16
  const directory = Buffer.concat(
    entries.map(({ size, png }) => {
      const entry = Buffer.alloc(16)
      entry.writeUInt8(size === 256 ? 0 : size, 0)
      entry.writeUInt8(size === 256 ? 0 : size, 1)
      entry.writeUInt8(0, 2)
      entry.writeUInt8(0, 3)
      entry.writeUInt16LE(1, 4)
      entry.writeUInt16LE(32, 6)
      entry.writeUInt32LE(png.length, 8)
      entry.writeUInt32LE(offset, 12)
      offset += png.length
      return entry
    }),
  )

  return Buffer.concat([header, directory, ...entries.map(({ png }) => png)])
}

async function pngFromSvg(svg, size) {
  const width = typeof size === 'number' ? size : size.width
  const height = typeof size === 'number' ? size : size.height

  return sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'cover' })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer()
}

async function writePng(name, buffer) {
  await fs.writeFile(path.join(publicDir, name), buffer)
}

const logoSvg = await fs.readFile(logoSourcePath, 'utf8')
const markPathData = extractLogoMarkPath(logoSvg)

const [heroImageBuffer, logoImageBuffer] = await Promise.all([
  sharp(heroSourcePath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer(),
  sharp(logoSourcePath)
    .resize({ width: 760, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer(),
])

const appIconSvg = buildAppIconSvg(markPathData)
const maskableIconSvg = buildAppIconSvg(markPathData, {
  radius: 0,
  markX: 106,
  markY: 78,
  markWidth: 300,
  markHeight: 330,
})
const maskIconSvg = buildMaskIconSvg(markPathData)
const ogSvg = buildOgSvg({
  heroImage: dataUri('image/jpeg', heroImageBuffer),
  logoImage: dataUri('image/png', logoImageBuffer),
  markPathData,
})

await Promise.all([
  fs.writeFile(path.join(publicDir, 'favicon.svg'), appIconSvg),
  fs.writeFile(path.join(publicDir, 'mask-icon.svg'), maskIconSvg),
  fs.writeFile(path.join(publicDir, 'og-image.svg'), ogSvg),
])

const [
  favicon16,
  favicon32,
  icon180,
  icon192,
  icon512,
  maskable192,
  maskable512,
  ogImage,
] = await Promise.all([
  pngFromSvg(appIconSvg, 16),
  pngFromSvg(appIconSvg, 32),
  pngFromSvg(appIconSvg, 180),
  pngFromSvg(appIconSvg, 192),
  pngFromSvg(appIconSvg, 512),
  pngFromSvg(maskableIconSvg, 192),
  pngFromSvg(maskableIconSvg, 512),
  pngFromSvg(ogSvg, { width: 1200, height: 630 }),
])

await Promise.all([
  writePng('favicon-16x16.png', favicon16),
  writePng('favicon-32x32.png', favicon32),
  writePng('apple-touch-icon.png', icon180),
  writePng('icon-192.png', icon192),
  writePng('icon-512.png', icon512),
  writePng('icon-maskable-192.png', maskable192),
  writePng('icon-maskable-512.png', maskable512),
  writePng('android-chrome-192x192.png', icon192),
  writePng('android-chrome-512x512.png', icon512),
  writePng('logo192.png', icon192),
  writePng('logo512.png', icon512),
  writePng('og-image.png', ogImage),
  fs.writeFile(
    path.join(publicDir, 'favicon.ico'),
    icoFromPngs([
      { size: 16, png: favicon16 },
      { size: 32, png: favicon32 },
    ]),
  ),
])

const iconVersion = `?v=${brand.version}`
const manifest = {
  name: brand.name,
  short_name: brand.shortName,
  description: brand.description,
  id: '/',
  icons: [
    {
      src: `/favicon.svg${iconVersion}`,
      sizes: 'any',
      type: 'image/svg+xml',
    },
    {
      src: `/favicon-32x32.png${iconVersion}`,
      sizes: '32x32',
      type: 'image/png',
    },
    {
      src: `/icon-192.png${iconVersion}`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/icon-512.png${iconVersion}`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: `/icon-maskable-192.png${iconVersion}`,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
    {
      src: `/icon-maskable-512.png${iconVersion}`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
  start_url: '/',
  scope: '/',
  display: 'standalone',
  theme_color: brand.navy,
  background_color: brand.gray950,
  orientation: 'portrait-primary',
  categories: ['business', 'lifestyle'],
  lang: 'en-US',
}

await fs.writeFile(
  path.join(publicDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)

console.log('Generated Valley Design Build favicons, app icons, and OG image.')

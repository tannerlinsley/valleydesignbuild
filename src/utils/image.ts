type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png' | 'gif'
type ImageFit = 'contain' | 'cover' | 'fill'

interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: ImageFormat
  fit?: ImageFit
}

export function optimizeImage(src: string, options: ImageOptions = {}): string {
  // Skip optimization for external URLs
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }

  const params = new URLSearchParams()
  params.set('url', src)

  if (options.width) params.set('w', String(options.width))
  if (options.height) params.set('h', String(options.height))
  if (options.quality) params.set('q', String(options.quality))
  if (options.format) params.set('fm', options.format)
  if (options.fit) params.set('fit', options.fit)

  return `/.netlify/images?${params.toString()}`
}

// Common presets for different use cases
export const imagePresets = {
  thumbnail: (src: string) =>
    optimizeImage(src, { width: 400, quality: 80, format: 'webp' }),

  card: (src: string) =>
    optimizeImage(src, { width: 600, quality: 80, format: 'webp' }),

  hero: (src: string) =>
    optimizeImage(src, { width: 1920, quality: 85, format: 'webp' }),

  gallery: (src: string) =>
    optimizeImage(src, { width: 800, quality: 80, format: 'webp' }),

  galleryFull: (src: string) =>
    optimizeImage(src, { width: 1600, quality: 90, format: 'webp' }),
} as const

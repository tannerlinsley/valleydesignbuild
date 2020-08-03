const withFonts = require('next-fonts')
const withOptimizedImages = require('next-optimized-images')

const baseConfig = {
  experimental: {
    plugins: true,
    modern: true,
  },
  optimizeImages: {
    /* config for next-optimized-images */
    mozjpeg: {
      quality: 70,
    },
    optipng: {
      optimizationLevel: 3,
    },
    optimizeImagesInDev: true,
  },
}

module.exports = [withFonts, withOptimizedImages].reduce(
  (a, b) => b(a),
  baseConfig
)

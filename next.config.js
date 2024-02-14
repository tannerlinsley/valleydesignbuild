// const withFonts = require('next-fonts')
// const withOptimizedImages = require('next-optimized-images')

const baseConfig = {
  images: {
    formats: ['image/webp'],
  },
}

module.exports = [].reduce((a, b) => b(a), baseConfig)

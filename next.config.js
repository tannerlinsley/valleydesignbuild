const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
const withOptimizedImages = require('next-optimized-images')

const baseConfig = {
  exportTrailingSlash: true,
  exportPathMap() {
    return {
      '/': { page: '/' },
    }
  },
}

module.exports = [withCSS, withFonts, withOptimizedImages].reduce(
  (a, b) => b(a),
  baseConfig
)

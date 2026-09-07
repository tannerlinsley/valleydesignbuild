import { BUSINESS_LOCATION } from '~/data/location'
import { brandAssetPath } from './brandAssets'

const SITE_URL = 'https://valleydesignbuild.com'
const SITE_NAME = 'Valley Design Build'
const DEFAULT_IMAGE = `${SITE_URL}${brandAssetPath('/og-image.png')}`
const DEFAULT_IMAGE_ALT =
  'Valley Design Build social preview for Utah outdoor design-build services.'

export const seo = ({
  title,
  description,
  image,
  imageAlt,
  path = '',
  type = 'website',
  keywords,
  noindex = false,
  article,
}: {
  title: string
  description: string
  image?: string
  imageAlt?: string
  path?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  noindex?: boolean
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
  }
}) => {
  const resolvedImageAlt = imageAlt ?? (image ? title : DEFAULT_IMAGE_ALT)
  const canonicalUrl = `${SITE_URL}${path}`
  const ogImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE

  const tags: Array<{ title?: string; name?: string; property?: string; content?: string; rel?: string; href?: string }> = [
    { title },
    { name: 'description', content: description },
    { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },

    // Open Graph
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: resolvedImageAlt },
    { property: 'og:locale', content: 'en_US' },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: resolvedImageAlt },

    // Geo tags for local SEO
    { name: 'geo.region', content: 'US-UT' },
    { name: 'geo.placename', content: 'Farr West, Utah' },
    { name: 'geo.position', content: `${BUSINESS_LOCATION.latitude};${BUSINESS_LOCATION.longitude}` },
    { name: 'ICBM', content: `${BUSINESS_LOCATION.latitude}, ${BUSINESS_LOCATION.longitude}` },
  ]

  if (!image) {
    tags.push(
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    )
  }

  // Add keywords if provided
  if (keywords && keywords.length > 0) {
    tags.push({ name: 'keywords', content: keywords.join(', ') })
  }

  // Add article-specific meta tags
  if (type === 'article' && article) {
    if (article.publishedTime) {
      tags.push({ property: 'article:published_time', content: article.publishedTime })
    }
    if (article.modifiedTime) {
      tags.push({ property: 'article:modified_time', content: article.modifiedTime })
    }
    if (article.author) {
      tags.push({ property: 'article:author', content: article.author })
    }
    if (article.tags) {
      article.tags.forEach(tag => {
        tags.push({ property: 'article:tag', content: tag })
      })
    }
  }

  return tags
}

export const canonicalLink = (path: string) => ({
  rel: 'canonical',
  href: `${SITE_URL}${path}`,
})

export { SITE_URL, SITE_NAME }

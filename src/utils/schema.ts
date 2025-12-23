import { SITE_URL, SITE_NAME } from './seo'

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const BUSINESS_INFO = {
  name: 'Valley Design Build',
  telephone: '+1-801-510-7142',
  email: 'info@valleydesignbuild.com',
  address: {
    streetAddress: '3092 North 2000 West',
    addressLocality: 'Farr West',
    addressRegion: 'UT',
    postalCode: '84404',
    addressCountry: 'US',
  },
  geo: {
    latitude: 41.2040,
    longitude: -112.0830,
  },
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LandscapingBusiness',
    '@id': ORGANIZATION_ID,
    name: BUSINESS_INFO.name,
    image: `${SITE_URL}/images/logo-white.svg`,
    logo: `${SITE_URL}/images/logo-white.svg`,
    url: SITE_URL,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    description: 'Custom pools, pumptracks, skateparks, treehouses, water features, and outdoor entertainment spaces. Building ambitious experiences for families across Northern Utah.',
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    areaServed: [
      { '@type': 'State', name: 'Utah' },
      { '@type': 'City', name: 'Farr West' },
      { '@type': 'City', name: 'Ogden' },
      { '@type': 'City', name: 'Layton' },
      { '@type': 'City', name: 'Salt Lake City' },
      { '@type': 'City', name: 'Logan' },
      { '@type': 'City', name: 'Brigham City' },
      { '@type': 'City', name: 'Roy' },
      { '@type': 'City', name: 'Kaysville' },
      { '@type': 'City', name: 'Bountiful' },
      { '@type': 'City', name: 'Sandy' },
      { '@type': 'City', name: 'Draper' },
      { '@type': 'City', name: 'Morgan' },
    ],
    priceRange: '$$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Check',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/ValleyDesignBuild',
      'https://www.instagram.com/valley_design_build',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Outdoor Experience Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Pools & Spas',
            description: 'Luxury custom swimming pools and spas designed as the centerpiece of your backyard paradise',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Water Features',
            description: 'Dramatic waterfalls, streams, fountains, and water walls that bring movement and sound to your landscape',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Play Houses & Treehouses',
            description: 'Imaginative treehouses and play structures that create magical spaces for adventure and creativity',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Private Skateparks',
            description: 'Private skateparks and bike courses that bring world-class action sports to your backyard',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backyard Pumptracks',
            description: 'Professional pump track circuits for bikes, skates, and scooters—endless laps of pure fun',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Entertainment Structures',
            description: 'Outdoor kitchens, pavilions, theaters, and gathering spaces that elevate outdoor living',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landmark Features',
            description: 'Sculptural elements, artistic features, and architectural statements that define your landscape',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Winterscape & Ice Rinks',
            description: 'Private ice rinks, winter sports features, and year-round outdoor enjoyment solutions',
          },
        },
      ],
    },
  }
}

export function serviceSchema({
  name,
  description,
  url,
  image,
}: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      '@type': 'LandscapingBusiness',
      '@id': ORGANIZATION_ID,
      name: BUSINESS_INFO.name,
    },
    areaServed: {
      '@type': 'State',
      name: 'Utah',
    },
    ...(image && { image: `${SITE_URL}${image}` }),
  }
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function articleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: BUSINESS_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${url}`,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
      },
    }),
  }
}

export function imageGallerySchema(images: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Valley Design Build Project Gallery',
    description: 'Portfolio of custom pools, pumptracks, skateparks, and outdoor entertainment projects by Valley Design Build in Utah',
    url: `${SITE_URL}/gallery`,
    creator: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
    },
    image: images.slice(0, 20).map((img) => ({
      '@type': 'ImageObject',
      url: `${SITE_URL}${img}`,
      caption: 'Project by Valley Design Build',
    })),
  }
}

export function webPageSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
    },
  }
}

export function reviewSchema(reviews: Array<{
  author: string
  reviewBody: string
  ratingValue: number
  location?: string
}>) {
  return reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      '@type': 'LandscapingBusiness',
      '@id': ORGANIZATION_ID,
    },
  }))
}

export function combineSchemas(...schemas: (object | null | undefined)[]) {
  const validSchemas = schemas.filter(Boolean)
  if (validSchemas.length === 0) return null
  if (validSchemas.length === 1) return validSchemas[0]
  return validSchemas
}

export function schemaToScript(schema: object | object[] | null) {
  if (!schema) return null
  return JSON.stringify(schema)
}

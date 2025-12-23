import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { MapPin, Phone, Calendar, CheckCircle } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { ServiceAreaMap } from '~/components/ServiceAreaMap'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/service-area')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Service Area | Valley Design Build Utah',
        description:
          'Valley Design Build serves Northern Utah including Weber County, Davis County, Salt Lake County, Cache County, Box Elder County, and Morgan County. Custom pools, pumptracks, and outdoor experiences within 80 miles of Farr West, UT.',
        path: '/service-area',
        keywords: [
          'custom pool builder weber county',
          'pumptrack builder utah',
          'skatepark contractor northern utah',
          'ogden outdoor builder',
          'layton pool contractor',
          'logan custom builder',
        ],
      }),
    ],
    links: [canonicalLink('/service-area')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Service Area',
            description: 'Valley Design Build service area covering Northern Utah',
            url: 'https://valleydesignbuild.com/service-area',
            about: {
              '@type': 'HomeAndConstructionBusiness',
              '@id': 'https://valleydesignbuild.com/#organization',
            },
          },
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Service Area', url: '/service-area' },
          ]),
        ]),
      },
    ],
  }),
  component: ServiceArea,
})

function ServiceArea() {
  const counties = [
    {
      name: 'Weber County',
      cities: [
        'Farr West',
        'Ogden',
        'Roy',
        'North Ogden',
        'Pleasant View',
        'Harrisville',
        'South Ogden',
        'Washington Terrace',
        'Riverdale',
        'Hooper',
        'West Haven',
        'Plain City',
      ],
      primary: true,
    },
    {
      name: 'Davis County',
      cities: [
        'Layton',
        'Kaysville',
        'Farmington',
        'Bountiful',
        'Centerville',
        'Syracuse',
        'Clearfield',
        'Clinton',
        'South Weber',
        'Fruit Heights',
        'Woods Cross',
      ],
      primary: true,
    },
    {
      name: 'Salt Lake County',
      cities: [
        'Salt Lake City',
        'Sandy',
        'Draper',
        'South Jordan',
        'West Jordan',
        'Riverton',
        'Herriman',
        'Cottonwood Heights',
        'Holladay',
        'Murray',
      ],
      primary: true,
    },
    {
      name: 'Cache County',
      cities: [
        'Logan',
        'North Logan',
        'Hyde Park',
        'Smithfield',
        'Providence',
        'Nibley',
        'Hyrum',
        'River Heights',
      ],
      primary: false,
    },
    {
      name: 'Box Elder County',
      cities: [
        'Brigham City',
        'Tremonton',
        'Perry',
        'Willard',
        'Garland',
        'Honeyville',
        'Corinne',
      ],
      primary: false,
    },
    {
      name: 'Morgan County',
      cities: [
        'Morgan',
        'Mountain Green',
        'Peterson',
        'Porterville',
      ],
      primary: false,
    },
  ]

  return (
    <div className={twMerge('min-h-screen bg-gray-50 dark:bg-navy-900', bodyFont)}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={twMerge(
                'text-4xl md:text-5xl font-bold text-white mb-6 uppercase',
                headingFont,
              )}
            >
              Serving Northern Utah & Beyond
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From Logan to Salt Lake City, we bring ambitious outdoor experiences
              to families across the Wasatch Front and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18015107142"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-md font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call (801) 510-7142
              </a>
              <Link
                to="/contact"
                className="bg-cyan-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Start Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className={twMerge(
                  'text-2xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                  headingFont,
                )}
              >
                Our Service Area
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We serve communities within approximately 80 miles of our home
                base in Farr West, Utah.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <ServiceAreaMap />
            </div>
          </div>
        </div>
      </section>

      {/* Counties Grid */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={twMerge(
                'text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Communities We Serve
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counties.map((county) => (
                <div
                  key={county.name}
                  className="p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <h3
                      className={twMerge(
                        'text-xl font-bold text-gray-900 dark:text-white',
                        headingFont,
                      )}
                    >
                      {county.name}
                    </h3>
                    {county.primary && (
                      <span className="ml-auto text-xs font-semibold px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {county.cities.map((city) => (
                      <span
                        key={city}
                        className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Location Matters */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={twMerge(
                'text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Local Expertise Matters
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Climate Knowledge',
                  description:
                    "We understand Northern Utah's unique climate, including harsh winters, hot summers, and everything in between.",
                },
                {
                  title: 'Terrain Expertise',
                  description:
                    'From mountain properties to valley lots, we design and build features that work with your specific terrain.',
                },
                {
                  title: 'Local Relationships',
                  description:
                    'We have established relationships with local suppliers and know the best materials for our region.',
                },
                {
                  title: 'Quick Response',
                  description:
                    'Being locally based means we can respond quickly to questions, concerns, and ongoing project needs.',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <div>
                    <h3
                      className={twMerge(
                        'text-lg font-bold mb-2 text-gray-900 dark:text-white',
                        headingFont,
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cyan-700">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={twMerge(
              'text-3xl md:text-4xl font-bold text-white mb-6 uppercase',
              headingFont,
            )}
          >
            Not Sure If We Serve Your Area?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Give us a call! We may be able to accommodate projects outside our
            standard service area for the right opportunity.
          </p>
          <a
            href="tel:+18015107142"
            className="inline-flex items-center gap-2 bg-white text-cyan-700 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors text-lg"
          >
            <Phone className="w-5 h-5" />
            Call (801) 510-7142
          </a>
        </div>
      </section>
    </div>
  )
}

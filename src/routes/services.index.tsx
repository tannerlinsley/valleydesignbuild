import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { ArrowRight, Phone, Calendar } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'
import { ServiceCard } from '~/components/ServiceCard'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/services/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Services | Valley Design Build Utah',
        description:
          'Custom pools, pumptracks, private skateparks, treehouses, water features, outdoor kitchens, ice rinks, and backyard builds across Northern Utah.',
        path: '/services',
        keywords: [
          'custom pool builder utah',
          'pumptrack construction',
          'private skatepark builder',
          'treehouse builder utah',
          'outdoor entertainment spaces',
          'water features utah',
          'ice rink installation',
        ],
      }),
    ],
    links: [canonicalLink('/services')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Custom Backyard Construction Services',
            description: 'Custom pools, pumptracks, skateparks, treehouses, ice rinks, and outdoor builds offered by Valley Design Build in Utah',
            numberOfItems: SERVICES.length,
            itemListElement: SERVICES.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: service.title,
                description: service.description,
                url: `https://valleydesignbuild.com/services/${service.slug}`,
              },
            })),
          },
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
          ]),
        ]),
      },
    ],
  }),
  component: ServicesIndex,
})

function ServicesIndex() {
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
              What We Build
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Custom pools, pumptracks, private skateparks, treehouses, water
              features, outdoor kitchens, and ice rinks, planned for your site
              and built by one accountable crew.
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

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.shortTitle}
                description={service.description}
                icon={service.icon}
                slug={service.slug}
                image={service.image}
                viewTransitionName={`service-${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={twMerge(
                'text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Why Hire One Design-Build Crew?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Unusual Work',
                  description:
                    'Pumptracks, skateparks, treehouses, and ice rinks require layout, shaping, structure, drainage, and finish skills that most crews do not keep in house.',
                },
                {
                  title: 'One Accountable Team',
                  description:
                    'The people drawing the plan stay connected to the people building it. That makes the work cleaner when field decisions come up.',
                },
                {
                  title: 'Built for Your Yard',
                  description:
                    'Slope, access, shade, winter, water, and how your family uses the space all shape the final plan.',
                },
                {
                  title: 'Made to Be Used',
                  description:
                    'A backyard should hold up to kids, friends, weather, gear, and repeat use. Pretty only matters if it keeps working.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                >
                  <h3
                    className={twMerge(
                      'text-xl font-bold mb-3 text-gray-900 dark:text-white',
                      headingFont,
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
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
            Ready to Price the Real Thing?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tell us what you want to build and what is already on the property.
            We will help you understand scope, site work, and next steps.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-cyan-700 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors text-lg"
          >
            Get Your Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

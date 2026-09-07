import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import {
  Award,
  Users,
  Sparkles,
  Clock,
  Star,
  Phone,
  Calendar,
} from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      ...seo({
        title: 'About Valley Design Build | Custom Backyard Builds Utah',
        description:
          'Meet Valley Design Build, a Farr West design-build crew for custom pools, pumptracks, private skateparks, treehouses, ice rinks, and outdoor builds across Northern Utah.',
        path: '/about',
        keywords: [
          'about valley design build',
          'utah custom pool builder',
          'pumptrack builder utah',
          'skatepark contractor utah',
          'custom backyard builds',
        ],
      }),
    ],
    links: [canonicalLink('/about')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About Valley Design Build',
            description: 'Learn about the Valley Design Build crew and the custom backyard projects we build across Northern Utah',
            url: 'https://valleydesignbuild.com/about',
            mainEntity: {
              '@type': 'HomeAndConstructionBusiness',
              '@id': 'https://valleydesignbuild.com/#organization',
            },
          },
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
          ]),
        ]),
      },
    ],
  }),
  component: About,
})

function About() {
  const values = [
    {
      icon: Award,
      title: 'Hard Projects',
      description:
        'Pumptracks, skateparks, pools, and ice rinks all have details most crews avoid. That is the work we are set up to take on.',
    },
    {
      icon: Users,
      title: 'Built for Families',
      description:
        'We care about how the project will be used after school, on weekends, in winter, and when everyone ends up outside.',
    },
    {
      icon: Sparkles,
      title: 'Trade Work',
      description:
        'Concrete, metalwork, carpentry, equipment, drainage, and finish details all have to line up for the final build to feel right.',
    },
    {
      icon: Clock,
      title: 'Straight Communication',
      description:
        'You should know what is happening, what changed, and what comes next. We keep the job moving without hiding the hard parts.',
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
              A Utah Crew for Hard Backyard Projects
            </h1>
            <p className="text-xl text-gray-300">
              We design and build pools, pumptracks, skateparks, treehouses,
              ice rinks, and outdoor rooms that need more than a standard
              landscape plan.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className={twMerge(
                    'text-3xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
                    headingFont,
                  )}
                >
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Valley Design Build started in Farr West with a practical
                    idea: the best backyard projects need the design and the
                    build team working together from the first site walk.
                  </p>
                  <p>
                    We are not a typical landscaping company. We take on custom
                    pools, pumptracks, private skateparks, treehouses, outdoor
                    kitchens, water features, and winter builds where grade,
                    drainage, concrete, steel, and finish details all matter.
                  </p>
                  <p>
                    Some clients come with a clean drawing. Some come with a
                    wild idea and a hard site. Either way, we help figure out
                    what can be built, what it will take, and how to make it
                    hold up.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="/images/welder.jpg"
                    alt="Craftsman at work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-4xl font-bold text-white mb-1">
                      Design + Build + Site Work
                    </div>
                    <div className="text-lg text-gray-300">
                      One crew from layout to finish
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={twMerge(
                'text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              How We Work
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value) => {
                const IconComponent = value.icon
                return (
                  <div
                    key={value.title}
                    className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                  >
                    <IconComponent className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-4" />
                    <h3
                      className={twMerge(
                        'text-xl font-bold mb-2 text-gray-900 dark:text-white',
                        headingFont,
                      )}
                    >
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={twMerge(
                'text-3xl font-bold mb-8 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Why People Call Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Star className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white mb-2', headingFont)}>
                  Specialized Expertise
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pumptracks, skateparks, treehouses, and ice rinks take
                  different skills than a patio or planting plan. We have spent
                  years building those details.
                </p>
              </div>
              <div className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Star className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white mb-2', headingFont)}>
                  End-to-End Service
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From the first layout to the final walkthrough, one team is
                  responsible for the result. That keeps decisions clear when
                  the site changes.
                </p>
              </div>
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
            Ready to Talk Through the Site?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tell us what you want to build and where it needs to go. We can
            help you sort out scope, site constraints, and next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18015107142"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-md font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call (801) 510-7142
            </a>
            <Link
              to="/contact"
              className="bg-white text-cyan-700 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Request a Site Walk
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

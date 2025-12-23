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
        title: 'About Valley Design Build | Custom Outdoor Experiences Utah',
        description:
          'Learn about Valley Design Build. We are dreamers and builders creating custom pools, pumptracks, skateparks, treehouses, and ambitious outdoor experiences across Northern Utah.',
        path: '/about',
        keywords: [
          'about valley design build',
          'utah custom pool builder',
          'pumptrack builder utah',
          'skatepark contractor utah',
          'custom outdoor experiences',
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
            description: 'Learn about our company and our passion for building ambitious outdoor experiences',
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
      title: 'Ambitious Vision',
      description:
        'We don\'t just build—we dream big. From backyard pumptracks to professional skateparks, we turn your wildest ideas into reality.',
    },
    {
      icon: Users,
      title: 'Family-Focused',
      description:
        'We build spaces where families come together. Every project is designed to create lasting memories for generations.',
    },
    {
      icon: Sparkles,
      title: 'Expert Craftsmanship',
      description:
        'From custom metalwork to precision concrete finishing, we bring master-level skills to every element of your project.',
    },
    {
      icon: Clock,
      title: 'Dedicated Service',
      description:
        'We treat every project as if it were our own home. Clear communication, reliable timelines, and exceptional results.',
    },
  ]

  const milestones = [
    { year: '2015', event: 'Valley Design Build founded in Farr West, Utah' },
    { year: '2016', event: 'Completed first residential pumptrack project' },
    { year: '2018', event: 'Expanded to include custom pool construction' },
    { year: '2020', event: 'Built first private backyard skatepark' },
    { year: '2022', event: 'Added winterscape and ice rink services' },
    { year: '2024', event: 'Serving families across an 80-mile radius' },
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
              We Are Dreamers & Builders
            </h1>
            <p className="text-xl text-gray-300">
              At Valley Design Build, we believe that our greatest moments of
              adventure, recreation, entertainment, and escape can happen in
              our own backyards.
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
                    Valley Design Build was born from a simple belief: a home
                    is more than just a house. Your backyard should be a
                    destination—a place for adventure, relaxation, and making
                    memories with the people you love.
                  </p>
                  <p>
                    We're not your typical landscaping company. We're dreamers
                    and builders who specialize in the extraordinary—custom
                    pools, pumptracks, skateparks, treehouses, entertainment
                    spaces, and features that turn ordinary properties into
                    amazing experiences.
                  </p>
                  <p>
                    Every project starts with a vision. Whether you're building
                    a place for your kids to ride, a pool to gather around, or
                    an ice rink for winter fun—we bring the expertise,
                    craftsmanship, and passion to make it real.
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
                      All Rolled Into One
                    </div>
                    <div className="text-lg text-gray-300">
                      Design + Build + Dreams
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
              What Drives Us
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

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2
              className={twMerge(
                'text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Our Journey
            </h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-cyan-200 dark:bg-cyan-800 md:-translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={twMerge(
                      'relative flex items-center gap-6',
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                    )}
                  >
                    <div
                      className={twMerge(
                        'hidden md:block flex-1 text-right',
                        index % 2 !== 0 && 'text-left',
                      )}
                    >
                      <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-cyan-600 rounded-full md:-translate-x-1/2 ring-4 ring-white dark:ring-gray-900" />
                    <div className="flex-1 pl-12 md:pl-0">
                      <span className="md:hidden text-lg font-bold text-cyan-600 dark:text-cyan-400 block mb-1">
                        {milestone.year}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Star className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white mb-2', headingFont)}>
                  Specialized Expertise
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We specialize in features most companies won't touch—pumptracks,
                  skateparks, treehouses, and ice rinks require specialized skills
                  we've spent years developing.
                </p>
              </div>
              <div className="p-8 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <Star className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mx-auto mb-4" />
                <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white mb-2', headingFont)}>
                  End-to-End Service
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From initial design to final walkthrough, we handle everything.
                  No subcontractor confusion, no finger-pointing—just one team
                  committed to your vision.
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
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. Contact us for a free
            consultation and see why families across Utah trust Valley Design Build.
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
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

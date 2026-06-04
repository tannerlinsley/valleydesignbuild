import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import {
  Instagram,
  Facebook,
  ExternalLink,
  Phone,
  Calendar,
  MapPin,
  Hammer,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Project Gallery | Valley Design Build Utah',
        description:
          'See recent Valley Design Build projects, including custom pools, pumptracks, skateparks, treehouses, water features, and outdoor builds in Utah.',
        path: '/gallery',
        keywords: [
          'custom pool portfolio utah',
          'pumptrack project photos',
          'skatepark gallery',
          'treehouse builds utah',
          'outdoor living spaces utah',
        ],
      }),
    ],
    links: [canonicalLink('/gallery')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Gallery', url: '/gallery' },
          ]),
        ]),
      },
    ],
  }),
  component: Gallery,
})

function Gallery() {
  const projects = [
    {
      title: 'Backyard Pumptrack',
      location: 'Northern Utah',
      image: '/images/pumptrack.jpg',
      challenge: 'Fit a flowing track into a residential yard without creating drainage problems.',
      result: 'A compact loop for bikes, scooters, skates, and repeat laps close to home.',
      service: 'Pumptracks',
      href: '/services/pumptracks',
    },
    {
      title: 'Pool, Spa, and Patio',
      location: 'Wasatch Front',
      image: '/images/pools.jpg',
      challenge: 'Plan water, equipment, circulation, shade, and patio use as one site.',
      result: 'A pool area that works from afternoon swim time through evening gathering.',
      service: 'Pools + Spa',
      href: '/services/pools-spa',
    },
    {
      title: 'Private Skate Feature',
      location: 'Northern Utah',
      image: '/images/skatepark.jpg',
      challenge: 'Shape transitions, approach, landing, and runoff for riders who will use it every day.',
      result: 'A backyard feature with real flow, clean concrete, and room to progress.',
      service: 'Skate + Bike',
      href: '/services/skate-bike',
    },
    {
      title: 'Water Feature',
      location: 'Northern Utah',
      image: '/images/waterFeature.jpg',
      challenge: 'Get the sound, view, basin, pump access, and winter plan right from the start.',
      result: 'Moving water that feels integrated instead of added after the fact.',
      service: 'Water Features',
      href: '/services/water-features',
    },
    {
      title: 'Treehouse and Play Structure',
      location: 'Northern Utah',
      image: '/images/treehouse.jpg',
      challenge: 'Build something that feels like an adventure without feeling flimsy.',
      result: 'A sturdy play structure planned around age range, access, and the yard around it.',
      service: 'Play Houses',
      href: '/services/play-houses',
    },
    {
      title: 'Outdoor Gathering Space',
      location: 'Northern Utah',
      image: '/images/entertainment.jpg',
      challenge: 'Solve shade, seating, cooking, utilities, storage, and weather protection together.',
      result: 'An outdoor room built for regular use, not one perfect photo.',
      service: 'Entertainment',
      href: '/services/entertainment',
    },
  ]

  return (
    <div className={twMerge('min-h-screen bg-gray-50 dark:bg-navy-900', bodyFont)}>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={twMerge(
                'text-4xl md:text-5xl font-bold text-white mb-6 uppercase',
                headingFont,
              )}
            >
              Our Projects
            </h1>
              <p className="text-xl text-gray-300 mb-8">
              Finished builds, site work, and the details that make unusual
              backyard projects work in Northern Utah.
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
                  Request a Site Walk
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Project Gallery */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <h2
              className={twMerge(
                'text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Recent Build Types
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-400">
              These are the kinds of projects people call us for: high-use
              backyard spaces where grade, drainage, access, structure, and
              finish all matter.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                    <img
                      src={project.image}
                      alt={`${project.title} by Valley Design Build`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/76 via-gray-950/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase text-cyan-200">
                        <MapPin className="h-3.5 w-3.5" />
                        {project.location}
                      </span>
                      <h3 className={twMerge('mt-1 text-2xl font-bold uppercase leading-none', headingFont)}>
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex gap-3">
                      <Hammer className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-700 dark:text-cyan-300" />
                      <p className="text-gray-600 dark:text-gray-300">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-700 dark:text-cyan-300" />
                      <p className="text-gray-700 dark:text-gray-200">
                        {project.result}
                      </p>
                    </div>
                    <Link
                      to={project.href}
                      className="inline-flex items-center gap-2 font-bold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                    >
                      View {project.service}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {[
              {
                name: 'Facebook',
                handle: '@ValleyDesignBuild',
                href: 'https://www.facebook.com/ValleyDesignBuild',
                Icon: Facebook,
                color: 'text-blue-600 dark:text-blue-400',
              },
              {
                name: 'Instagram',
                handle: '@valley_design_build',
                href: 'https://www.instagram.com/valley_design_build',
                Icon: Instagram,
                color: 'text-pink-600 dark:text-pink-400',
              },
            ].map((social) => {
              const Icon = social.Icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-cyan-500 dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="flex items-center gap-4">
                    <Icon className={twMerge('h-7 w-7', social.color)} />
                    <div>
                      <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white', headingFont)}>
                        {social.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {social.handle}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={twMerge(
              'text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
              headingFont,
            )}
          >
            Want to Talk Through a Project?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Send us the site, the rough idea, and anything you already know you
            want. We will help you figure out what is realistic.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-cyan-700 text-white px-8 py-4 rounded-md font-bold hover:bg-cyan-600 transition-colors text-lg"
          >
            Request a Site Walk
          </Link>
        </div>
      </section>
    </div>
  )
}

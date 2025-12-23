import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { Instagram, Facebook, ExternalLink, Phone, Calendar } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Project Gallery | Valley Design Build Utah',
        description:
          'See our latest projects on social media. Custom pools, pumptracks, skateparks, treehouses, water features, and outdoor entertainment spaces in Utah.',
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
              Our Projects
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Check out our latest work on social media. We regularly share photos
              and videos of the ambitious experiences we create for families across
              Northern Utah.
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

      {/* Social Media Links */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2
              className={twMerge(
                'text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Follow Us for Project Updates
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              See our work in progress and completed projects on our social media pages.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href="https://www.facebook.com/ValleyDesignBuild"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-100 dark:bg-gray-800 rounded-xl p-8 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                    <Facebook className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white', headingFont)}>
                      Facebook
                    </h3>
                    <p className="text-sm text-gray-500">@ValleyDesignBuild</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Project photos, behind-the-scenes updates, and community news.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                  Visit Page
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>

              <a
                href="https://www.instagram.com/valley_design_build"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-100 dark:bg-gray-800 rounded-xl p-8 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                    <Instagram className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className={twMerge('text-xl font-bold text-gray-900 dark:text-white', headingFont)}>
                      Instagram
                    </h3>
                    <p className="text-sm text-gray-500">@valley_design_build</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Photos, reels, and stories showcasing our craftsmanship.
                </p>
                <span className="inline-flex items-center gap-2 text-pink-600 dark:text-pink-400 font-semibold group-hover:gap-3 transition-all">
                  Visit Profile
                  <ExternalLink className="w-4 h-4" />
                </span>
              </a>
            </div>
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
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. We'll help you design and
            build the outdoor experience you've always dreamed of.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-cyan-700 text-white px-8 py-4 rounded-md font-bold hover:bg-cyan-600 transition-colors text-lg"
          >
            Get Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

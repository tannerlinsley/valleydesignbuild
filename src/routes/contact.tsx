import { createFileRoute } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { ContactForm } from '~/components/ContactForm'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Contact Us | Valley Design Build Utah',
        description:
          'Get a free consultation from Valley Design Build. Custom pools, pumptracks, skateparks, and more. Call (801) 510-7142 or submit our contact form. We respond within 24 hours.',
        path: '/contact',
        keywords: [
          'custom pool estimate utah',
          'pumptrack builder contact',
          'skatepark contractor utah',
          'free outdoor project consultation',
          'valley design build contact',
        ],
      }),
    ],
    links: [canonicalLink('/contact')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Valley Design Build',
            description: 'Get a free consultation for your outdoor project',
            url: 'https://valleydesignbuild.com/contact',
            mainEntity: {
              '@type': 'HomeAndConstructionBusiness',
              '@id': 'https://valleydesignbuild.com/#organization',
            },
          },
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Contact', url: '/contact' },
          ]),
        ]),
      },
    ],
  }),
  component: Contact,
})

function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '(801) 510-7142',
      href: 'tel:+18015107142',
      description: 'Call us during business hours',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@valleydesignbuild.com',
      href: 'mailto:info@valleydesignbuild.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '3092 North 2000 West, Farr West, UT 84404',
      href: 'https://maps.google.com/?q=3092+North+2000+West+Farr+West+Utah+84404',
      description: 'Serving an 80-mile radius',
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
              Let's Build Something Amazing
            </h1>
            <p className="text-xl text-gray-300">
              Ready to turn your backyard into a destination? Get in touch for
              a free consultation. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2
                    className={twMerge(
                      'text-2xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                      headingFont,
                    )}
                  >
                    Get In Touch
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Whether you're dreaming of a pool, pumptrack, treehouse, or
                    something we haven't built yet—we're ready to make it happen.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const IconComponent = info.icon
                    return (
                      <a
                        key={info.title}
                        href={info.href}
                        target={info.title === 'Address' ? '_blank' : undefined}
                        rel={info.title === 'Address' ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-md group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900/50 transition-colors">
                          <IconComponent className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {info.title}
                          </h3>
                          <p className="text-cyan-600 dark:text-cyan-400">
                            {info.value}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {info.description}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>

                {/* Hours */}
                <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    <h3
                      className={twMerge(
                        'text-lg font-bold text-gray-900 dark:text-white',
                        headingFont,
                      )}
                    >
                      Business Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Monday - Friday
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        8:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Saturday
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        By Appointment
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Sunday
                      </span>
                      <span className="text-gray-500 dark:text-gray-500">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <h2
                    className={twMerge(
                      'text-2xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
                      headingFont,
                    )}
                  >
                    Start Your Project
                  </h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={twMerge(
                'text-2xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Find Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Located in Farr West, Utah, we serve families across an 80-mile
              radius covering all of Northern Utah.
            </p>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.5!2d-112.0272!3d41.2061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3092+N+2000+W%2C+Farr+West%2C+UT+84404!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Valley Design Build Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

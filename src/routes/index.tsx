import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import {
  Phone,
  Calendar,
  Award,
  CheckCircle,
  MapPin,
  ArrowRight,
  Star,
  Hammer,
  ChevronDown,
} from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'
import { ServiceCard } from '~/components/ServiceCard'
import { ContactForm } from '~/components/ContactForm'
import { seo, canonicalLink } from '~/utils/seo'
import { localBusinessSchema, webPageSchema, schemaToScript } from '~/utils/schema'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Valley Design Build | Custom Pools, Pumptracks & Outdoor Experiences in Utah',
        description: 'Utah\'s premier design-build firm for custom pools, backyard pumptracks, private skateparks, treehouses, ice rinks, and luxury outdoor entertainment spaces. Serving Northern Utah families who demand extraordinary. Call (801) 510-7142.',
        path: '/',
        keywords: [
          'custom pool builder utah',
          'backyard pumptrack utah',
          'private skatepark builder',
          'custom treehouse builder utah',
          'backyard ice rink utah',
          'luxury outdoor living utah',
          'landscape design build utah',
          'outdoor entertainment spaces',
          'custom water features utah',
          'residential pumptrack cost',
          'backyard transformation utah',
          'year round outdoor living',
        ],
      }),
    ],
    links: [canonicalLink('/')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          localBusinessSchema(),
          webPageSchema({
            name: 'Valley Design Build | Custom Outdoor Experiences',
            description: 'Utah\'s premier design-build firm for custom pools, pumptracks, skateparks, and luxury outdoor entertainment spaces.',
            url: '/',
          }),
        ]),
      },
    ],
  }),
  component: Home,
})

function Home() {
  const valueProps = [
    { title: 'Custom Design', icon: Award },
    { title: 'Expert Craftsmanship', icon: Hammer },
    { title: 'Free Consultations', icon: CheckCircle },
    { title: 'Serving 80+ Mile Radius', icon: MapPin },
  ]

  const testimonials = [
    {
      name: 'The Anderson Family',
      location: 'Ogden, UT',
      text: 'Valley Design Build created the most incredible backyard pumptrack for our kids. They ride it every single day. The quality and attention to detail exceeded anything we imagined.',
      rating: 5,
    },
    {
      name: 'Mike & Sarah T.',
      location: 'Layton, UT',
      text: "Our custom pool and spa have become the heart of our home. The design team understood exactly what we wanted and delivered beyond our dreams. Worth every penny.",
      rating: 5,
    },
    {
      name: 'The Rodriguez Family',
      location: 'Logan, UT',
      text: "The private skatepark they built in our backyard is professional quality. Our son's friends are jealous, and it's become the neighborhood hangout. Amazing work!",
      rating: 5,
    },
  ]

  return (
    <div className={twMerge('min-h-screen bg-gray-50 dark:bg-navy-900', bodyFont)}>
      {/* Split Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-950 py-8 md:py-12 lg:py-16 min-h-[calc(100dvh-4rem)] flex items-center relative">
        <div className="container mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-center">
            {/* Left - Content (2/5) */}
            <div className="flex flex-col justify-center order-2 lg:order-1 lg:col-span-2">
              <h1
                className={twMerge(
                  'text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight uppercase',
                  headingFont,
                )}
              >
                Ambitious Experiences
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-cyan-600 dark:text-cyan-400 mb-4 md:mb-6 italic">
                For the adventurer and recreator in all of us
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 md:mb-10">
                Custom pools, pumptracks, skateparks, treehouses, ice rinks, and
                beyond. We build the backyard of your dreams.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
                <a
                  href="tel:+18015107142"
                  className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-5 py-3 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-base whitespace-nowrap"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>(801) 510-7142</span>
                </a>
                <Link
                  to="/contact"
                  className="bg-cyan-700 text-white px-5 py-3 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-cyan-600 transition-all flex items-center justify-center gap-2 shadow-lg text-base whitespace-nowrap"
                >
                  <Calendar className="w-5 h-5 flex-shrink-0" />
                  <span>Start Your Project</span>
                </Link>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-3">
                {valueProps.map((prop, index) => {
                  const IconComponent = prop.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <IconComponent className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span className="text-sm font-medium">{prop.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right - Video (3/5) */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="relative aspect-video max-w-sm sm:max-w-md md:max-w-full mx-auto rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/438344317?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={twMerge(
                'text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              What We Build
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From custom pools to private skateparks, we create extraordinary
              outdoor experiences that turn your property into a destination.
            </p>
          </div>

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

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-cyan-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 transition-colors"
            >
              Explore All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Snippet - Dreamers and Builders */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2
                className={twMerge(
                  'text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
                  headingFont,
                )}
              >
                We Are Dreamers & Builders
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At Valley Design Build, we believe that a home is more than just
                a house and that our greatest moments of adventure, recreation,
                entertainment, and escape can happen in our own backyards.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We're not just contractors—we're craftsmen who pour passion into
                every project. From the first sketch to the final detail, we
                build experiences that bring families together and create
                memories that last a lifetime.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/images/welder.jpg"
                alt="Craftsman at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={twMerge(
                'text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We're proud of the relationships we build with every family.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-cyan-500 text-cyan-500 dark:fill-cyan-400 dark:text-cyan-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={twMerge(
                'text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Serving Northern Utah & Beyond
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Based in Farr West, we serve an 80-mile radius covering all of
              Northern Utah and surrounding areas.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                'Weber County',
                'Davis County',
                'Salt Lake County',
                'Cache County',
                'Box Elder County',
                'Morgan County',
              ].map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
            <Link
              to="/service-area"
              className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all"
            >
              View Our Full Service Area
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2
                  className={twMerge(
                    'text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                    headingFont,
                  )}
                >
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your dream project. We typically respond within
                  24 hours.
                </p>
              </div>
              <ContactForm variant="compact" />
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Or call us directly:
                </p>
                <a
                  href="tel:+18015107142"
                  className={twMerge(
                    'text-2xl font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300',
                    headingFont,
                  )}
                >
                  (801) 510-7142
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

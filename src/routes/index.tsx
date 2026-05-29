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
        title:
          'Valley Design Build | Custom Pools, Pumptracks & Backyard Builds in Utah',
        description:
          'Custom pools, backyard pumptracks, private skateparks, treehouses, ice rinks, outdoor living spaces, landscaping, water features, and backyard builds across Northern Utah.',
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
          'backyard design build utah',
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
            name: 'Valley Design Build | Custom Outdoor Builds',
            description:
              'Custom pools, pumptracks, skateparks, treehouses, ice rinks, outdoor living spaces, landscaping, and backyard builds in Northern Utah.',
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
    {
      title: 'Site-shaped design',
      detail: 'Grade, drainage, shade, planting, access, and how the yard gets used.',
      icon: Award,
    },
    {
      title: 'Hands-on craft',
      detail: 'Concrete, steel, water, woodwork, and finishing under one roof.',
      icon: Hammer,
    },
    {
      title: 'Built for seasons',
      detail: 'Summer water, winter ice, and outdoor rooms that earn their keep.',
      icon: CheckCircle,
    },
    {
      title: 'Northern Utah range',
      detail: 'Based in Farr West and building across an 80-mile radius.',
      icon: MapPin,
    },
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
      text: 'Our pool and spa are where everyone ends up in the evening. The team listened, worked through the slope on our lot, and got the details right.',
      rating: 5,
    },
    {
      name: 'The Rodriguez Family',
      location: 'Logan, UT',
      text: "The private skatepark they built in our backyard is professional quality. Our son's friends are jealous, and it's become the neighborhood hangout. Amazing work!",
      rating: 5,
    },
  ]

  const serviceAreas = [
    'Weber County',
    'Davis County',
    'Salt Lake County',
    'Cache County',
    'Box Elder County',
    'Morgan County',
  ]

  return (
    <div
      className={twMerge(
        'vdb-page min-h-screen bg-[#f7faf8] text-gray-900 dark:bg-navy-950 dark:text-gray-100',
        bodyFont,
      )}
    >
      <section className="relative overflow-hidden bg-[#f7faf8] dark:bg-navy-950">
        <div
          className="architectural-mark architectural-mark-hero"
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-5 py-10 sm:px-6 md:px-10 lg:px-16 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start xl:grid-cols-[0.9fr_1.35fr] xl:items-center xl:gap-14">
            <div className="order-2 lg:order-1">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase text-cyan-700 dark:text-cyan-300">
                <span className="border border-cyan-700/30 px-2.5 py-1 dark:border-cyan-300/30">
                  Farr West, Utah
                </span>
                <span className="border border-gray-900/15 px-2.5 py-1 text-gray-600 dark:border-white/20 dark:text-gray-300">
                  Design + Build
                </span>
              </div>
              <h1
                className={twMerge(
                  'max-w-[11ch] text-5xl font-bold uppercase leading-[0.92] text-gray-950 sm:text-6xl lg:text-7xl xl:text-8xl dark:text-white',
                  'lg:max-w-[14ch] xl:max-w-[11ch]',
                  headingFont,
                )}
              >
                Custom Outdoor{' '}
                <span className="block text-cyan-700 dark:text-cyan-300">
                  Builds{' '}
                </span>
                <span className="block">in Utah</span>
              </h1>
              <p className="mt-5 max-w-xl text-xl italic leading-snug text-cyan-700 dark:text-cyan-300 md:text-2xl">
                Pools, pumptracks, skateparks, treehouses, ice rinks, outdoor
                living spaces, and landscaping for families who like to be
                outside.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
                We design and build the parts of a property that get used: the
                pool, the patio, the track, the rink, the shade structure, the
                planting, the water, the grading, and the details that make it
                all work.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+18015107142"
                  className="inline-flex items-center justify-center gap-2 border border-gray-900/15 bg-white px-5 py-3 font-semibold text-gray-950 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-700/40 hover:text-cyan-700 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-cyan-300/40 dark:hover:text-cyan-300"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <span>(801) 510-7142</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-cyan-700 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-900/10 transition-all hover:-translate-y-0.5 hover:bg-cyan-600 dark:bg-cyan-400 dark:text-gray-950 dark:hover:bg-cyan-300"
                >
                  <Calendar className="h-5 w-5 flex-shrink-0" />
                  <span>Start Your Project</span>
                </Link>
              </div>

            </div>

            <div className="order-1 lg:order-2 lg:pt-12 xl:pt-0">
              <div className="relative mx-auto max-w-3xl">
                <div className="hero-video-shell relative aspect-video overflow-hidden bg-gray-900 shadow-2xl shadow-gray-900/20 dark:shadow-black/40">
                  <img
                    src="/images/pumptrack.jpg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />
                  <iframe
                    src="https://player.vimeo.com/video/438344317?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&autopause=0&playsinline=1"
                    className="absolute inset-0 h-full w-full"
                    title="Valley Design Build project reel"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-900/45 to-transparent pointer-events-none" />
                </div>
                <div className="field-note -bottom-6 left-4 max-w-[17rem] bg-white/90 text-gray-800 shadow-lg backdrop-blur dark:bg-navy-900/90 dark:text-gray-200">
                  Build reel: water, concrete, steel, timber, grade.
                </div>
                <div
                  className="absolute -right-8 top-8 hidden origin-center rotate-90 border-y border-gray-900/20 px-3 py-1 text-[11px] font-bold uppercase text-gray-600 dark:border-white/20 dark:text-gray-400 lg:block"
                  aria-hidden="true"
                >
                  80 mile radius
                </div>
              </div>
            </div>

            <div className="order-3 grid gap-4 border-t border-gray-900/10 pt-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4 xl:col-span-1 xl:grid-cols-2 dark:border-white/10">
              {valueProps.map((prop, index) => {
                const IconComponent = prop.icon

                return (
                  <div
                    key={prop.title}
                    className="relative pl-7 text-gray-700 dark:text-gray-300"
                  >
                    <IconComponent className="absolute left-0 top-1 h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                    <span className="block text-[11px] font-bold uppercase text-gray-500 dark:text-gray-400">
                      0{index + 1}
                    </span>
                    <span className="block font-bold text-gray-950 dark:text-white">
                      {prop.title}
                    </span>
                    <span className="block text-sm leading-snug">
                      {prop.detail}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </section>

      <section className="relative overflow-hidden bg-white py-16 dark:bg-gray-950 md:py-24">
        <div className="container relative mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-label">01 / What we build</p>
              <h2
                className={twMerge(
                  'mt-3 max-w-lg text-4xl font-bold uppercase leading-none text-gray-950 md:text-5xl dark:text-white',
                  headingFont,
                )}
              >
                The jobs people call us for.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Pools, pumptracks, private skateparks, treehouses, and ice rinks
                all need more than a nice rendering. They need layout, drainage,
                concrete, carpentry, equipment, and a crew that can solve things
                on site.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border-b border-current pb-1 font-bold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                Explore all services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, index) => (
              <div key={service.slug}>
                <span className="mb-2 block text-xs font-bold uppercase text-gray-400 dark:text-gray-500">
                  Terrain 0{index + 1}
                </span>
                <ServiceCard
                  title={service.shortTitle}
                  description={service.description}
                  icon={service.icon}
                  slug={service.slug}
                  image={service.image}
                  viewTransitionName={`service-${service.slug}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="terrain-strata relative overflow-hidden bg-[#e9f0ed] py-16 dark:bg-navy-900 md:py-24">
        <div className="container relative mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-900 shadow-2xl shadow-gray-900/15">
                <img
                  src="/images/welder.jpg"
                  alt="Craftsman welding custom outdoor project details"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-bold uppercase text-cyan-200">
                    Shop note
                  </span>
                  <p className="max-w-sm text-2xl font-bold leading-none">
                    The drawing only matters if the build holds up.
                  </p>
                </div>
              </div>
              <div className="field-note -right-4 -top-5 hidden max-w-[13rem] bg-navy-900 text-white shadow-xl md:block">
                Corners, welds, edges, drainage, and finish all show up later.
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="section-label">02 / Dreamers and builders</p>
              <h2
                className={twMerge(
                  'mt-3 text-4xl font-bold uppercase leading-none text-gray-950 md:text-5xl dark:text-white',
                  headingFont,
                )}
              >
                Good plans. Better follow-through.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                A backyard project can sound simple until the grade changes, the
                equipment needs access, or the finish has to survive another
                Utah winter.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                We like the unusual jobs: the pool tied into the slope, the
                pumptrack that actually flows, the treehouse that feels sturdy,
                the rink that drains right when spring shows up.
              </p>
              <div className="mt-8 grid gap-4 border-y border-gray-900/10 py-6 sm:grid-cols-3 dark:border-white/10">
                {['Sketch', 'Shape', 'Finish'].map((word, index) => (
                  <div key={word}>
                    <span className="text-xs font-bold uppercase text-cyan-700 dark:text-cyan-300">
                      0{index + 1}
                    </span>
                    <span className="block text-2xl font-bold text-gray-950 dark:text-white">
                      {word}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="mt-7 inline-flex items-center gap-2 border-b border-current pb-1 font-bold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                Learn more about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-16 dark:bg-gray-950 md:py-24">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="section-label">03 / Field reports</p>
              <h2
                className={twMerge(
                  'mt-3 text-4xl font-bold uppercase leading-none text-gray-950 md:text-5xl dark:text-white',
                  headingFont,
                )}
              >
                The proof is whether people use it.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                A good build is easy to spot a year later: kids still ride it,
                people still gather around it, and nobody is babying the
                materials.
              </p>
            </div>

            <div className="grid gap-5">
              {testimonials.map((testimonial, index) => (
                <figure
                  key={testimonial.name}
                  className={twMerge(
                    'relative border-l-2 border-cyan-700 bg-[#f7faf8] p-6 shadow-sm dark:border-cyan-300 dark:bg-white/5 md:p-7',
                    index === 0 && 'md:ml-10',
                    index === 1 && 'md:mr-16',
                    index === 2 && 'md:ml-24',
                  )}
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-cyan-600 text-cyan-600 dark:fill-cyan-300 dark:text-cyan-300"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl italic leading-relaxed text-gray-800 dark:text-gray-200">
                    "{testimonial.text}"
                  </blockquote>
                  <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-bold text-gray-950 dark:text-white">
                      {testimonial.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7faf8] py-16 dark:bg-navy-900 md:py-24">
        <div className="container relative mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-label">04 / Service area</p>
              <h2
                className={twMerge(
                  'mt-3 text-4xl font-bold uppercase leading-none text-gray-950 md:text-5xl dark:text-white',
                  headingFont,
                )}
              >
                Based in Farr West. Built across Northern Utah.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                We serve an 80-mile radius covering the Wasatch Front, Cache
                Valley, and the surrounding counties. If the site is a fit, we
                will come walk it before guessing from a screen.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="border border-gray-900/15 bg-white/60 px-3 py-1.5 text-sm font-bold text-gray-700 dark:border-white/15 dark:bg-white/5 dark:text-gray-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <Link
                to="/service-area"
                className="mt-8 inline-flex items-center gap-2 border-b border-current pb-1 font-bold text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                View full service area
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative overflow-hidden border border-gray-900/10 bg-white shadow-xl shadow-gray-900/5 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                <img
                  src="/images/waterFeature.jpg"
                  alt="Custom water feature in a Northern Utah outdoor landscape"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-bold uppercase text-cyan-200">
                    Farr West base
                  </span>
                  <p className="max-w-sm text-3xl font-bold uppercase leading-none">
                    Built for Utah weather and grade.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-3">
                {[
                  ['80-mile', 'service radius'],
                  ['6+', 'county core'],
                  ['Site-first', 'design visits'],
                ].map(([stat, label]) => (
                  <div
                    key={stat}
                    className="border-l border-cyan-700/40 pl-3 dark:border-cyan-300/40"
                  >
                    <span className="block text-2xl font-bold text-gray-950 dark:text-white">
                      {stat}
                    </span>
                    <span className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blueprint-grid relative overflow-hidden bg-navy-900 py-16 text-white md:py-24">
        <div className="container relative mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="section-label text-cyan-200">05 / Start here</p>
              <h2
                className={twMerge(
                  'mt-3 max-w-lg text-4xl font-bold uppercase leading-none text-white md:text-5xl',
                  headingFont,
                )}
              >
                Bring us the part you are trying to figure out.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-gray-300">
                Tell us what you want to build, where it needs to go, and what
                has made it hard to solve so far. We typically respond within 24
                hours.
              </p>
              <a
                href="tel:+18015107142"
                className={twMerge(
                  'mt-8 inline-flex items-center gap-2 text-3xl font-bold text-cyan-200 transition-colors hover:text-white',
                  headingFont,
                )}
              >
                <Phone className="h-6 w-6" />
                (801) 510-7142
              </a>
            </div>

            <div className="bg-white p-6 shadow-2xl shadow-black/25 dark:bg-gray-950 md:p-8">
              <div className="mb-7 border-b border-gray-200 pb-5 dark:border-gray-800">
                <h2
                  className={twMerge(
                    'text-3xl font-bold uppercase leading-none text-gray-950 dark:text-white',
                    headingFont,
                  )}
                >
                  Project Notes
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  A few details are enough to start the conversation.
                </p>
              </div>
              <ContactForm variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

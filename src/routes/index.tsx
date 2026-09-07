import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import {
  Phone,
  ArrowRight,
} from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'
import { ServiceCard } from '~/components/ServiceCard'
import { ProjectReel } from '~/components/ProjectReel'
import { imagePresets } from '~/utils/image'
import { ContactForm } from '~/components/ContactForm'
import { seo, canonicalLink } from '~/utils/seo'
import { webPageSchema, schemaToScript } from '~/utils/schema'

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
  return (
    <div className={twMerge('vdb-page bg-[#f7faf8] text-gray-900 dark:bg-navy-950 dark:text-gray-100', bodyFont)}>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-5 md:px-10 lg:px-16">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h1 className={twMerge('max-w-lg text-5xl font-bold uppercase leading-[1.02] sm:text-6xl lg:text-7xl', headingFont)}>
                Custom backyards.<br /><span className="text-cyan-700 dark:text-cyan-300">Built in Utah.</span>
              </h1>
              <p className="mt-6 max-w-lg text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                Pools, pumptracks, skateparks, treehouses, and outdoor living spaces. Designed and built around your family and your property.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-cyan-700 px-6 py-3 font-bold text-white hover:bg-cyan-800">
                  Start your project <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:+18015107142" className="inline-flex items-center gap-2 font-bold text-cyan-700 dark:text-cyan-300">
                  <Phone className="h-4 w-4" /> (801) 510-7142
                </a>
              </div>
              <p className="mt-6 text-base text-gray-600 dark:text-gray-400">Based in Farr West, serving Northern Utah.</p>
            </div>
            <ProjectReel />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 dark:bg-gray-950 md:py-20">
        <div className="container mx-auto px-5 md:px-10 lg:px-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className={twMerge('text-4xl font-bold uppercase md:text-5xl', headingFont)}>What do you want to build?</h2>
            <Link to="/gallery" className="inline-flex items-center gap-2 border-b border-current pb-1 font-bold text-cyan-700 dark:text-cyan-300">View gallery <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} title={service.shortTitle} description={service.description} icon={service.icon} slug={service.slug} image={service.image} viewTransitionName={`service-${service.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto grid items-center gap-10 px-5 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <img src={imagePresets.gallery('/images/welder.jpg')} alt="Welding a custom steel structure" loading="lazy" decoding="async" width="800" height="600" className="aspect-[4/3] w-full object-cover" />
          <div>
            <h2 className={twMerge('max-w-lg text-4xl font-bold uppercase leading-tight md:text-5xl', headingFont)}>One team for the design and the build.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">A sloped lot, tight equipment access, drainage, a Utah winter. Those details shape the plan from the start. We bring the concrete, metalwork, carpentry, and site work together so the whole yard works.</p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 border-b border-current pb-1 font-bold text-cyan-700 dark:text-cyan-300">How we work <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-14 text-white md:py-20">
        <div className="container mx-auto grid gap-10 px-5 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div>
            <h2 className={twMerge('max-w-lg text-4xl font-bold uppercase leading-tight md:text-5xl', headingFont)}>Tell us what you have in mind.</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">Send your idea, the city where you want to build, and any timing you have in mind. You do not need finished plans to get started.</p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300">We work within an 80-mile radius of Farr West, including Ogden, Layton, Salt Lake City, and Logan.</p>
            <Link to="/service-area" className="mt-4 inline-flex items-center gap-2 border-b border-current pb-1 text-cyan-300">Check your service area <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="rounded-lg bg-white p-6 text-gray-900 dark:bg-gray-900 sm:p-8"><ContactForm variant="compact" /></div>
        </div>
      </section>
    </div>
  )
}

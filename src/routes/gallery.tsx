import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { ArrowRight } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'
import { imagePresets } from '~/utils/image'
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
  const images = SERVICES.filter((service, index, services) =>
    service.image && services.findIndex((item) => item.image === service.image) === index,
  )

  return (
    <div className={twMerge('bg-[#f7faf8] text-gray-900 dark:bg-navy-950 dark:text-white', bodyFont)}>
      <section className="container mx-auto px-5 py-12 md:px-10 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h1 className={twMerge('text-5xl font-bold uppercase md:text-6xl', headingFont)}>Project gallery</h1>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-cyan-700 px-6 py-3 font-bold text-white hover:bg-cyan-800">Start your project <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-x-7 gap-y-10 md:grid-cols-2">
          {images.map((service, index) => (
            <figure key={service.slug}>
              <a href={service.image} aria-label={`View full photo: ${service.shortTitle}`} className="group block overflow-hidden bg-gray-200 dark:bg-navy-900">
                <img src={imagePresets.gallery(service.image!)} alt={service.title} width="800" height="600" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </a>
              <figcaption className="mt-3">
                <Link to="/services/$slug" params={{ slug: service.slug }} className="inline-flex items-center gap-2 text-xl font-bold hover:text-cyan-700 dark:hover:text-cyan-300">{service.title} <ArrowRight className="h-4 w-4" /></Link>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-gray-300 pt-8 dark:border-gray-700">
          <h2 className="text-xl font-bold">More from the job site</h2>
          <a href="https://www.instagram.com/valley_design_build" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline underline-offset-4 dark:text-cyan-300">Instagram</a>
          <a href="https://www.facebook.com/ValleyDesignBuild" target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline underline-offset-4 dark:text-cyan-300">Facebook</a>
        </div>
      </section>
    </div>
  )
}

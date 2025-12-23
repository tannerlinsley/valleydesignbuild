import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  Calendar,
  CheckCircle,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { headingFont, bodyFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'
import { ContactForm } from '~/components/ContactForm'
import { seo, canonicalLink } from '~/utils/seo'
import { serviceSchema, faqSchema, breadcrumbSchema, schemaToScript } from '~/utils/schema'

function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug)
    if (!service) {
      throw notFound()
    }
    return {
      slug: service.slug,
      title: service.title,
      shortTitle: service.shortTitle,
      description: service.description,
      longDescription: service.longDescription,
      features: service.features,
      process: service.process,
      faqs: service.faqs,
      image: service.image,
    }
  },
  head: ({ loaderData }) => {
    const path = `/services/${loaderData?.slug}`
    const keywords = [
      loaderData?.shortTitle?.toLowerCase(),
      'utah',
      'custom builder',
      'outdoor experiences',
      'northern utah',
      loaderData?.title?.toLowerCase(),
    ].filter(Boolean) as string[]

    const schemas: object[] = [
      serviceSchema({
        name: loaderData?.title || '',
        description: loaderData?.description || '',
        url: path,
        image: loaderData?.image,
      }),
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: loaderData?.shortTitle || '', url: path },
      ]),
    ]

    const faq = faqSchema(loaderData?.faqs || [])
    if (faq) {
      schemas.push(faq)
    }

    return {
      meta: [
        ...seo({
          title: `${loaderData?.title} | Valley Design Build Utah`,
          description: loaderData?.description || '',
          path,
          image: loaderData?.image,
          keywords,
        }),
      ],
      links: [canonicalLink(path)],
      scripts: [
        {
          type: 'application/ld+json',
          children: schemaToScript(schemas),
        },
      ],
    }
  },
  component: ServicePage,
})

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-4">
          {question}
        </span>
        <ChevronDown
          className={twMerge(
            'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 dark:text-gray-300">{answer}</div>
      )}
    </div>
  )
}

function ServicePage() {
  const service = Route.useLoaderData()
  const fullService = getServiceBySlug(service.slug)
  const IconComponent = fullService?.icon || CheckCircle

  const currentIndex = SERVICES.findIndex((s) => s.slug === service.slug)
  const prevService = currentIndex > 0 ? SERVICES[currentIndex - 1] : null
  const nextService =
    currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : null

  return (
    <div className={twMerge('min-h-screen bg-gray-50 dark:bg-navy-900', bodyFont)}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${service.image})`,
            viewTransitionName: `service-${service.slug}-bg`,
          }}
        />
        <div className="absolute inset-0 bg-gray-900/80" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-600/20 backdrop-blur-sm mb-6">
              <IconComponent className="w-8 h-8 text-cyan-400" />
            </div>
            <h1
              className={twMerge(
                'text-4xl md:text-5xl font-bold text-white mb-6 uppercase',
                headingFont,
              )}
              style={{ viewTransitionName: `service-${service.slug}` }}
            >
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{service.description}</p>
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

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to="/services"
              className="text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400"
            >
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white">
              {service.shortTitle}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2
                className={twMerge(
                  'text-2xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
                  headingFont,
                )}
              >
                What We Offer
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mb-12">
              <h2
                className={twMerge(
                  'text-2xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
                  headingFont,
                )}
              >
                Our Process
              </h2>
              <div className="space-y-4">
                {service.process.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-700 text-white flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 pt-1">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {service.faqs.length > 0 && (
              <div className="mb-12">
                <h2
                  className={twMerge(
                    'text-2xl font-bold mb-6 text-gray-900 dark:text-white uppercase',
                    headingFont,
                  )}
                >
                  Frequently Asked Questions
                </h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  {service.faqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2
                  className={twMerge(
                    'text-2xl font-bold mb-2 text-gray-900 dark:text-white uppercase',
                    headingFont,
                  )}
                >
                  Start Your {service.shortTitle} Project
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your vision and we'll get back to you within 24
                  hours.
                </p>
              </div>
              <ContactForm
                variant="compact"
                defaultService={service.shortTitle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {prevService ? (
              <Link
                to="/services/$slug"
                params={{ slug: prevService.slug }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{prevService.shortTitle}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            <Link
              to="/services"
              className="text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              All Services
            </Link>
            {nextService ? (
              <Link
                to="/services/$slug"
                params={{ slug: nextService.slug }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <span className="hidden sm:inline">{nextService.shortTitle}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

import { twMerge } from 'tailwind-merge'
import { headingFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'

interface ContactFormProps {
  className?: string
  variant?: 'default' | 'compact'
  defaultService?: string
}

export function ContactForm({ className = '', variant = 'default', defaultService = '' }: ContactFormProps) {
  const inputClass =
    'w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all'

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className={twMerge('space-y-5', className)}
    >
      {/* Hidden fields for Netlify Forms */}
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </div>

      <div className={variant === 'compact' ? 'grid sm:grid-cols-2 gap-4' : 'space-y-5'}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className={inputClass}
            placeholder="(801) 555-1234"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Service Interested In *
        </label>
        <select id="service" name="service" required className={inputClass} defaultValue={defaultService}>
          <option value="">Select a service...</option>
          {SERVICES.map((service) => (
            <option key={service.slug} value={service.shortTitle}>
              {service.title}
            </option>
          ))}
          <option value="Multiple Services">Multiple Services</option>
          <option value="Not Sure">Not Sure / General Inquiry</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Tell Us About Your Project *
        </label>
        <textarea
          id="message"
          name="message"
          rows={variant === 'compact' ? 3 : 5}
          required
          className={inputClass}
          placeholder="Describe your project, timeline, and any specific requirements..."
        />
      </div>

      <button
        type="submit"
        className={twMerge(
          'w-full bg-cyan-700 text-white px-8 py-4 rounded-md font-semibold hover:bg-cyan-600 transition-all shadow-lg hover:shadow-xl',
          headingFont,
        )}
      >
        Get Your Free Consultation
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        We typically respond within 24 hours. Your information is never shared.
      </p>
    </form>
  )
}

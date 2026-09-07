import { useId, useState, type FormEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { headingFont } from '~/styles/typography'
import { SERVICES } from '~/data/services'

interface ContactFormProps {
  className?: string
  variant?: 'default' | 'compact'
  defaultService?: string
}

export function ContactForm({ className = '', variant = 'default', defaultService = '' }: ContactFormProps) {
  const id = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const fields = new URLSearchParams()
    new FormData(form).forEach((value, name) => {
      if (typeof value === 'string') fields.append(name, value)
    })
    setStatus('sending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: fields.toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all'

  return (
    <form
      name="contact"
      method="POST"
      action="/contact-form.html"
      onSubmit={handleSubmit}
      aria-busy={status === 'sending'}
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
            htmlFor={`${id}-name`}
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor={`${id}-phone`}
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Phone (optional)
          </label>
          <input
            type="tel"
            id={`${id}-phone`}
            name="phone"
            autoComplete="tel"
            className={inputClass}
            placeholder="(801) 555-1234"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${id}-email`}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id={`${id}-email`}
          name="email"
          autoComplete="email"
          required
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-service`}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Service Interested In *
        </label>
        <select id={`${id}-service`} name="service" required className={inputClass} defaultValue={defaultService}>
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
        <label htmlFor={`${id}-city`} className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Project city *</label>
        <input id={`${id}-city`} name="city" autoComplete="address-level2" required className={inputClass} />
      </div>

      <div>
        <label
          htmlFor={`${id}-message`}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Tell Us About Your Project *
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={variant === 'compact' ? 3 : 5}
          required
          className={inputClass}
          placeholder="Describe your project, timeline, and any specific requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className={twMerge(
          'w-full bg-cyan-700 text-white px-8 py-4 rounded-md font-semibold hover:bg-cyan-600 transition-all shadow-lg hover:shadow-xl',
          headingFont,
        )}
      >
        {status === 'sending' ? 'Sending...' : 'Send project details'}
      </button>

      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && <p className="text-cyan-800 dark:text-cyan-200">Thanks, your project details have been sent. We will be in touch.</p>}
        {status === 'error' && <p role="alert" className="text-red-700 dark:text-red-300">Your message could not be sent. Your details are still here so you can try again, or <a href="tel:+18015107142" className="underline">call (801) 510-7142</a>.</p>}
      </div>
    </form>
  )
}

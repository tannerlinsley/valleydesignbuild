import { Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { headingFont } from '~/styles/typography'

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className={twMerge(
            'text-6xl font-bold text-desert-500 mb-4',
            headingFont,
          )}
        >
          404
        </h1>
        <h2
          className={twMerge(
            'text-2xl font-bold text-stone-900 dark:text-white mb-4',
            headingFont,
          )}
        >
          Page Not Found
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="inline-block bg-sage-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-sage-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

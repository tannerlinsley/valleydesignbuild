import { Link, useRouter } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { headingFont } from '~/styles/typography'

export function DefaultCatchBoundary({ error }: { error: Error }) {
  const router = useRouter()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1
          className={twMerge(
            'text-4xl font-bold text-stone-900 dark:text-white mb-4',
            headingFont,
          )}
        >
          Something went wrong
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.invalidate()}
            className="bg-stone-200 dark:bg-stone-700 text-stone-900 dark:text-white px-6 py-3 rounded-md font-semibold hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="bg-sage-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-sage-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

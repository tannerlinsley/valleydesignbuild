import { Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { headingFont } from '~/styles/typography'
import { imagePresets } from '~/utils/image'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  slug: string
  image?: string
  viewTransitionName?: string
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  slug,
  image,
  viewTransitionName,
}: ServiceCardProps) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug }}
      className="tactile-card group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
    >
      <div className="service-card relative h-full min-h-[300px] overflow-hidden border border-gray-200 shadow-md transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-xl dark:border-gray-700 dark:group-hover:border-cyan-500">
        {image && (
          <img
            src={imagePresets.card(image)}
            alt=""
            loading="lazy"
            decoding="async"
            width="600"
            height="400"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              ...(viewTransitionName ? { viewTransitionName: `${viewTransitionName}-bg` } : {}),
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,25,37,0.95) 0%, rgba(0,25,37,0.45) 58%, rgba(0,25,37,0.08) 100%)',
          }}
        />
        {/* Icon in top-left corner */}
        <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center border border-white/20 bg-cyan-700/85 backdrop-blur-sm">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end p-7">
          <h3
            className={twMerge(
              'mb-2 text-2xl font-bold text-white transition-colors group-hover:text-cyan-300',
              headingFont,
            )}
            style={{
              textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)',
              ...(viewTransitionName ? { viewTransitionName } : {}),
            }}
          >
            {title}
          </h3>
          <p
            className="line-clamp-2 text-sm leading-relaxed text-gray-200"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)' }}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

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
      className="group block h-full"
    >
      <div className="relative h-full min-h-[280px] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500">
        {image && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url(${imagePresets.card(image)})`,
              ...(viewTransitionName ? { viewTransitionName: `${viewTransitionName}-bg` } : {}),
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,25,37,0.9) 0%, transparent 50%)' }}
        />
        {/* Icon in top-left corner */}
        <div className="absolute top-3 left-3 w-8 h-8 bg-cyan-700/80 backdrop-blur-sm rounded flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="relative h-full p-6 flex flex-col justify-end">
          <h3
            className={twMerge(
              'text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors',
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
            className="text-gray-200 text-sm leading-relaxed line-clamp-2"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)' }}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}

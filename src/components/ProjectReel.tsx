import { useState } from 'react'
import { Play } from 'lucide-react'
import { imagePresets } from '~/utils/image'

export function ProjectReel() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden bg-navy-900">
      {playing ? (
        <iframe
          src="https://player.vimeo.com/video/438344317?autoplay=1&title=0&byline=0&dnt=1"
          title="Valley Design Build project reel"
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block h-full w-full text-white focus-visible:outline-offset-[-4px]"
          aria-label="Play Valley Design Build project reel"
        >
          <img src={imagePresets.hero('/images/pumptrack.jpg')} alt="Pumptrack with rollers and banked turns" width="1600" height="900" fetchPriority="high" className="h-full w-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16 text-lg font-bold">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-900 transition-transform group-hover:scale-110"><Play className="h-5 w-5" aria-hidden="true" /></span>
            Watch our builds
          </span>
        </button>
      )}
    </div>
  )
}

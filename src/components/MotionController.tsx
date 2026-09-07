import { useEffect } from 'react'

export function MotionController() {
  useEffect(() => {
    const updateScrollState = () => {
      document.documentElement.dataset.pageScrolled =
        window.scrollY > 24 ? 'true' : 'false'
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      delete document.documentElement.dataset.pageScrolled
    }
  }, [])

  return null
}

import { useEffect } from 'react'

const REVEAL_SELECTOR = [
  '[data-reveal]',
  'main section > .container',
  '.tactile-card',
  'main article',
  'main figure',
].join(', ')

export function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const updateScrollState = () => {
      document.documentElement.dataset.pageScrolled =
        window.scrollY > 24 ? 'true' : 'false'
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    if (reduceMotion) {
      document.documentElement.classList.add('motion-reduced')
      return () => {
        window.removeEventListener('scroll', updateScrollState)
      }
    }

    document.documentElement.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    )

    const observedElements = new WeakSet<HTMLElement>()
    let revealIndex = 0

    const observeReveals = () => {
      const revealElements = Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      ).filter((element) => !element.closest('[data-no-reveal]'))

      revealElements.forEach((element) => {
        if (observedElements.has(element)) return

        if (!element.dataset.reveal) {
          element.dataset.reveal = 'up'
        }

        if (!element.style.getPropertyValue('--reveal-delay')) {
          element.style.setProperty(
            '--reveal-delay',
            `${Math.min((revealIndex % 5) * 45, 180)}ms`,
          )
        }

        revealIndex += 1
        observedElements.add(element)
        observer.observe(element)
      })
    }

    const tactileCleanups = new WeakMap<HTMLElement, () => void>()

    const attachTactileCard = (card: HTMLElement) => {
      if (tactileCleanups.has(card)) return

      let frame = 0

      const handlePointerMove = (event: PointerEvent) => {
        if (frame) window.cancelAnimationFrame(frame)

        frame = window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width - 0.5
          const y = (event.clientY - rect.top) / rect.height - 0.5

          card.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`)
          card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`)
          card.style.setProperty(
            '--shine-x',
            `${Math.round((event.clientX - rect.left) / rect.width * 100)}%`,
          )
          card.style.setProperty(
            '--shine-y',
            `${Math.round((event.clientY - rect.top) / rect.height * 100)}%`,
          )
        })
      }

      const resetCard = () => {
        if (frame) window.cancelAnimationFrame(frame)
        card.style.setProperty('--tilt-x', '0deg')
        card.style.setProperty('--tilt-y', '0deg')
        card.style.setProperty('--shine-x', '50%')
        card.style.setProperty('--shine-y', '20%')
      }

      card.addEventListener('pointermove', handlePointerMove)
      card.addEventListener('pointerleave', resetCard)
      card.addEventListener('blur', resetCard)

      tactileCleanups.set(card, () => {
        if (frame) window.cancelAnimationFrame(frame)
        card.removeEventListener('pointermove', handlePointerMove)
        card.removeEventListener('pointerleave', resetCard)
        card.removeEventListener('blur', resetCard)
      })
    }

    const attachTactileCards = () => {
      document
        .querySelectorAll<HTMLElement>('.tactile-card')
        .forEach(attachTactileCard)
    }

    observeReveals()
    attachTactileCards()

    let mutationFrame = 0
    const mutationObserver = new MutationObserver(() => {
      if (mutationFrame) window.cancelAnimationFrame(mutationFrame)
      mutationFrame = window.requestAnimationFrame(() => {
        observeReveals()
        attachTactileCards()
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      if (mutationFrame) window.cancelAnimationFrame(mutationFrame)
      document
        .querySelectorAll<HTMLElement>('.tactile-card')
        .forEach((card) => tactileCleanups.get(card)?.())
      window.removeEventListener('scroll', updateScrollState)
      document.documentElement.classList.remove('motion-ready')
      delete document.documentElement.dataset.pageScrolled
    }
  }, [])

  return null
}

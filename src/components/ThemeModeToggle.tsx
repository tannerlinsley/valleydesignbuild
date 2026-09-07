import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type ThemePreference = 'auto' | 'light' | 'dark'

const THEME_STORAGE_KEY = 'valley-theme'

const modes: {
  value: ThemePreference
  label: string
  icon: typeof Monitor
}[] = [
  { value: 'auto', label: 'Auto', icon: Monitor },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
]

function isThemePreference(value: string | null): value is ThemePreference {
  return value === 'auto' || value === 'light' || value === 'dark'
}

function applyTheme(preference: ThemePreference) {
  const systemPrefersDark = getSystemPrefersDark()
  const resolvedTheme =
    preference === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : preference
  const root = document.documentElement

  root.classList.toggle('dark', resolvedTheme === 'dark')
  root.dataset.themePreference = preference
  root.style.colorScheme = resolvedTheme

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', resolvedTheme === 'dark' ? '#001925' : '#f7faf8')
}

function getSystemPrefersDark() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getResolvedTheme(preference: ThemePreference) {
  return preference === 'auto'
    ? getSystemPrefersDark()
      ? 'dark'
      : 'light'
    : preference
}

export function ThemeModeToggle({ className = '' }: { className?: string }) {
  const [preference, setPreference] = useState<ThemePreference>('auto')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedPreference = localStorage.getItem(THEME_STORAGE_KEY)
    const initialPreference = isThemePreference(storedPreference)
      ? storedPreference
      : 'auto'

    setPreference(initialPreference)
    applyTheme(initialPreference)

    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      const currentPreference = localStorage.getItem(THEME_STORAGE_KEY)

      if (!isThemePreference(currentPreference) || currentPreference === 'auto') {
        applyTheme('auto')
      }
    }

    colorSchemeQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      colorSchemeQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  function updatePreference(nextPreference: ThemePreference) {
    localStorage.setItem(THEME_STORAGE_KEY, nextPreference)
    setPreference(nextPreference)
    applyTheme(nextPreference)
  }

  function togglePreference() {
    if (preference === 'auto') {
      updatePreference(getResolvedTheme(preference) === 'dark' ? 'light' : 'dark')
      return
    }

    updatePreference('auto')
  }

  const activeMode = modes.find((mode) => mode.value === preference) || modes[0]
  const Icon = activeMode.icon
  const resolvedTheme = mounted ? getResolvedTheme(preference) : 'light'
  const nextTheme =
    preference === 'auto'
      ? resolvedTheme === 'dark'
        ? 'light'
        : 'dark'
      : 'device'
  const label =
    preference === 'auto'
      ? `Using device theme. Switch to ${nextTheme} mode.`
      : `Using ${activeMode.label.toLowerCase()} mode. Return to device theme.`

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={togglePreference}
      className={twMerge(
        'inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-transparent text-gray-400/85 transition-colors hover:border-white/10 hover:bg-white/[0.06] hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300',
        preference !== 'auto' &&
          'border-cyan-300/20 bg-cyan-300/10 text-cyan-200 hover:border-cyan-300/30 hover:bg-cyan-300/15 hover:text-cyan-100',
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{activeMode.label}</span>
    </button>
  )
}

import { Phone, Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/service-area', label: 'Service Area' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-white/10"
      style={{ viewTransitionName: 'header' }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div style={{ viewTransitionName: 'logo' }}>
              <img
                src="/images/logo-white.svg"
                alt="Valley Design Build"
                className="h-8 md:h-10"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium text-lg"
                activeProps={{
                  className: 'text-cyan-400 font-medium text-lg',
                }}
                activeOptions={{
                  exact: item.path === '/',
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+18015107142"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2 text-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden xl:inline">(801) 510-7142</span>
            </a>
            <Link
              to="/contact"
              className="bg-cyan-700 text-white px-5 py-2.5 rounded-md hover:bg-cyan-600 transition-colors font-semibold text-lg"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="tel:+18015107142"
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="bg-cyan-700 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors font-semibold text-sm"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-colors font-medium py-2 px-3 rounded-md"
                  activeProps={{
                    className:
                      'text-cyan-400 font-medium py-2 px-3 rounded-md bg-gray-800',
                  }}
                  activeOptions={{
                    exact: item.path === '/',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+18015107142"
                className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800 transition-colors font-medium py-2 px-3 rounded-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                (801) 510-7142
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

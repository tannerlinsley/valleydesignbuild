import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { headingFont } from '~/styles/typography'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { href: '/services/pools-spa', label: 'Pools + Spa' },
  { href: '/services/water-features', label: 'Water Features' },
  { href: '/services/play-houses', label: 'Play Houses' },
  { href: '/services/skate-bike', label: 'Skate + Bike' },
  { href: '/services/pumptracks', label: 'Pumptracks' },
  { href: '/services/entertainment', label: 'Entertainment' },
  { href: '/services/landmarks', label: 'Landmarks' },
  { href: '/services/winterscape', label: 'Winterscape' },
]

export function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white py-16"
      style={{ viewTransitionName: 'footer' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4" style={{ viewTransitionName: 'footer-logo' }}>
              <img
                src="/images/logo-white.svg"
                alt="Valley Design Build"
                className="h-8 mb-2"
              />
              <div className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                Ambitious Experiences
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              We are dreamers and builders. Creating custom pools, pumptracks,
              skateparks, entertainment spaces, and ambitious outdoor
              experiences for the adventurer and recreator in all of us.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ValleyDesignBuild"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/valley_design_build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={twMerge('text-lg font-bold mb-4', headingFont)}>
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+18015107142"
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  (801) 510-7142
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@valleydesignbuild.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  info@valleydesignbuild.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=3092+North+2000+West+Farr+West+Utah+84404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    3092 North 2000 West
                    <br />
                    Farr West, Utah 84404
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Mon-Fri: 8am - 6pm
                  <br />
                  Sat: By Appointment
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={twMerge('text-lg font-bold mb-4', headingFont)}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={twMerge('text-lg font-bold mb-4', headingFont)}>
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Valley Design Build. All rights
              reserved.
            </p>
            <p>Serving Northern Utah & Beyond</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

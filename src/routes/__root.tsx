import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { MotionController } from '~/components/MotionController'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo, canonicalLink } from '~/utils/seo'
import { localBusinessSchema, schemaToScript } from '~/utils/schema'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f7faf8' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Valley Design Build' },
      ...seo({
        title:
          'Valley Design Build | Custom Pools, Pumptracks & Backyard Builds in Utah',
        description:
          'Custom pools, pumptracks, skateparks, treehouses, ice rinks, water features, and outdoor entertainment builds for families across Northern Utah. Call (801) 510-7142.',
        path: '/',
        keywords: [
          'custom pools utah',
          'pumptrack builder utah',
          'backyard skatepark utah',
          'treehouse builder utah',
          'outdoor entertainment utah',
          'landscape design build utah',
          'private ice rink utah',
          'water features utah',
        ],
      }),
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/ptsansnarrow/v18/BngRUXNadjH0qYEzV7ab-oWlsYCByxyK.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/ptsansnarrow/v18/BngSUXNadjH0qYEzV7ab-oWlsbg95DiCUfk.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
      canonicalLink('/'),
    ],
  }),
  component: RootComponent,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootComponent() {
  return (
    <>
      <MotionController />
      <Header />
      <main style={{ viewTransitionName: 'main' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />

        {/* Enhanced LocalBusiness Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schemaToScript(localBusinessSchema()) || '',
          }}
        />

        {/* WebSite Schema for Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Valley Design Build',
              url: 'https://valleydesignbuild.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://valleydesignbuild.com/services?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Theme preference: auto, light, or dark */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = localStorage.getItem('valley-theme');
                var preference = storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'auto' ? storedTheme : 'auto';
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var resolvedTheme = preference === 'auto' ? (systemDark ? 'dark' : 'light') : preference;
                var root = document.documentElement;
                root.classList.toggle('dark', resolvedTheme === 'dark');
                root.dataset.themePreference = preference;
                root.style.colorScheme = resolvedTheme;
                var themeColor = document.querySelector('meta[name="theme-color"]');
                if (themeColor) {
                  themeColor.setAttribute('content', resolvedTheme === 'dark' ? '#001925' : '#f7faf8');
                }
              } catch (error) {
                document.documentElement.style.colorScheme = 'light';
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

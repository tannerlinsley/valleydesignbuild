import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo, canonicalLink } from '~/utils/seo'
import { localBusinessSchema, schemaToScript } from '~/utils/schema'
import { brandAssetPath } from '~/utils/brandAssets'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#001925' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Valley Design Build' },
      ...seo({
        title:
          'Valley Design Build | Custom Pools, Pumptracks & Outdoor Experiences in Utah',
        description:
          'Custom pools, pumptracks, skateparks, treehouses, and outdoor entertainment spaces. Building ambitious experiences for families across Northern Utah. Call (801) 510-7142.',
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
      { rel: 'icon', href: brandAssetPath('/favicon.ico'), sizes: 'any' },
      { rel: 'icon', type: 'image/svg+xml', href: brandAssetPath('/favicon.svg') },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: brandAssetPath('/favicon-32x32.png') },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: brandAssetPath('/favicon-16x16.png') },
      { rel: 'apple-touch-icon', sizes: '180x180', href: brandAssetPath('/apple-touch-icon.png') },
      { rel: 'mask-icon', href: brandAssetPath('/mask-icon.svg'), color: '#0e7490' },
      { rel: 'manifest', href: brandAssetPath('/manifest.json') },
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
    <html lang="en">
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

        {/* Dark mode based on system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
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

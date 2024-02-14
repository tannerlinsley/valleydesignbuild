import React from 'react'
import Script from 'next/script'
import { Metadata } from 'next'
import { PT_Sans_Narrow } from 'next/font/google'
//

// These styles apply to every route in the application
import './globals.css'

// import Navbar from '../components/Navbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ptSans = PT_Sans_Narrow({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title:
    'Valley Design Build - Custom, Specialized & Ambitious Landscape Design/Build',
  description:
    'Valley Design Build is a high-end Utah-based Landscape Design, Architecture & Build Firm specializing in pump tracks, water features, bike paths, swimming pools, private ice-rinks, and ambitious residential experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ptSans.className} bg-gray-900`}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-83864732-1"
      />
      <Script src="https://player.vimeo.com/api/player.js"></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-83864732-1');
          `,
        }}
      />
      <body>
        <Navbar />
        <div className="content">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

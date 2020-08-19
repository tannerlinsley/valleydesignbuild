import React from 'react'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Head from 'next/head'
//

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GlobalStyles = createGlobalStyle`
  ${reset};

  html, body {
    font-family: 'PT Sans Narrow', sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: #00121D;
  }

  body {
    font-size: 1.3rem;
  }

  a {
    text-decoration: none;
    color: inherit
  }

  img {
    max-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bebas Neue', sans-serif;
  }

  ion-icon {
    vertical-align: middle;
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>
            Valley Design Build - Custom, Specialized & Ambitious Landscape
            Design/Build
          </title>
          <meta
            name="description"
            content="Valley Design Build is a high-end Utah-based Landscape Design, Architecture & Build Firm specializing in pump tracks, water features, bike paths, swimming pools, private ice-rinks, and ambitious residential experiences."
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-83864732-1"
          />
          <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
          <script src="https://player.vimeo.com/api/player.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-83864732-1');
          `,
            }}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Bebas+Neue|PT+Sans+Narrow&display=swap"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyles />
        <Navbar />
        <div className="content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    )
  }
}

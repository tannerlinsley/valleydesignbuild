import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import hero from '../assets/images/hero.jpg'
import waterFeature from '../assets/images/waterFeature.jpg'
import treehouse from '../assets/images/treehouse.jpg'
import skatepark from '../assets/images/skatepark.jpg'
import pumptrack from '../assets/images/pumptrack.jpg'
import entertainment from '../assets/images/entertainment.jpg'
import landmark from '../assets/images/landmark.jpg'
import icerink from '../assets/images/icerink.jpg'
import plans from '../assets/images/plans.jpg'
import trees from '../assets/images/trees.svg'

const features = [
  {
    label: 'Water Features',
    image: waterFeature,
    href: '/',
  },
  { label: 'Play Houses', image: treehouse, href: '/' },
  { label: 'Skate + Bike', image: skatepark, href: '/' },
  { label: 'Pumptracks', image: pumptrack, href: '/' },
  { label: 'Entertainment', image: entertainment, href: '/' },
  { label: 'Landmarks', image: landmark, href: '/' },
  { label: 'Winterscape', image: icerink, href: '/' },
]

const Button = styled.button`
  display: inline-block;
  padding: 1rem;
  margin: 0.5rem;
  appearance: none;
  background: white;
  color: #002838;
  border: 0;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-family: 'Bebas Neue', sans-serif;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  :hover {
    cursor: pointer;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`

export default function Home() {
  return (
    <div css={``}>
      <div
        css={`
          background: url(${hero});
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30vh 5vw;
          color: white;
          text-align: center;
          text-shadow: 0 5px 20px black, 0 10px 40px black, 0 20px 60px black;
        `}
      >
        <h1
          css={`
            font-size: 4rem;
            margin-bottom: 1rem;
          `}
        >
          Ambitious Experiences
        </h1>
        <p
          css={`
            width: 400px;
            max-width: 100%;
            font-size: 2rem;
          `}
        >
          For the adventurer, recreater and child in all of us
        </p>
      </div>
      <div
        id="products"
        css={`
          border-top: solid 0.5rem #001925;
          background: #001925;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          font-size: 2.5rem;
          font-weight: bolder;

          > * {
            position: relative;
            flex: 1 0 300px;
            color: white;
            overflow: hidden;
            max-height: 300px;
            border-bottom: solid 0.5rem #001925;

            :before {
              content: '';
              display: block;
              padding-bottom: 80%;
            }

            .background {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-size: cover;
              background-position: center;
              transition: all 0.5s ease;
            }

            :hover > .background {
              transform: scale(1.1);
            }

            .mask {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background: linear-gradient(
                to bottom,
                transparent,
                transparent,
                rgba(0, 0, 0, 0.5)
              );
            }

            span {
              position: absolute;
              bottom: 0;
              left: 0;
              opacity: 0.6;
              padding: 0.3rem 0.5rem;
              text-shadow: 0 0 20px black, 0 0 20px black;
            }
          }
        `}
      >
        {features.map(({ label, image, href }) => (
          <Link href={href} key={href}>
            <a>
              <div
                className="background"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              />
              <div className="mask" />
              <span>{label}</span>
            </a>
          </Link>
        ))}
      </div>
      <div
        id="about"
        css={`
          position: relative;
          padding: 0 5vw;
          backfround: white;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={`
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: url(${plans});
            background-size: cover;
            background-position: center;
            opacity: 0.25;
          `}
        />
        <div
          css={`
            position: relative;
            padding: 10vh 0;
            width: 940px;
            max-width: 100%;
          `}
        >
          <img
            src={trees}
            css={`
              position: absolute;
              left: 650px;
              bottom: -1px;
              height: 80%;
            `}
          />
          <h2
            css={`
              font-size: 3.5rem;
              margin-bottom: 1rem;
            `}
          >
            We are dreamers and builders
          </h2>
          <h3
            css={`
              font-family: 'PT Sans Narrow', sans-serif;
              font-size: 2.5rem;
              font-style: italic;
              margin-bottom: 2rem;
            `}
          >
            All rolled into one.
          </h3>
          <p
            css={`
              font-family: 'PT Sans Narrow', sans-serif;
              font-size: 1.7rem;
              line-height: 1.3;
              width: 500px;
              max-width: 100%;
            `}
          >
            At Valley Design Build, we believe that a home is more than just a
            house and that our greatest moments of adventure, recreation,
            entertainment and escape can happen in our own backyards.
          </p>
        </div>
      </div>
      <div
        id="contact"
        css={`
          padding: calc(12vh + 12vw) 5vw;
          border-top: solid 0.5rem #001925;
          background-image: linear-gradient(147deg, #004f6f 0%, #002e48 99%);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <h2
          css={`
            font-size: 3.8rem;
            color: #ffffff;
            text-align: center;
            margin-bottom: 0.5rem;
          `}
        >
          You bring the idea.
        </h2>
        <h3
          css={`
            font-size: 2.5rem;
            color: #ffffff;
            text-align: center;
            margin-bottom: 1.5rem;
          `}
        >
          We'll do the rest.
        </h3>
        <div
          css={`
            text-align: center;
          `}
        >
          <Button as={'a'} href="tel:+18015107142">
            <ion-icon name="call" style={{ marginRight: '.5rem' }} /> Call Now
          </Button>
          <Button as={'a'} href="sms:+18015107142">
            <ion-icon name="chatbubbles" style={{ marginRight: '.5rem' }} />{' '}
            Message Us
          </Button>
        </div>
      </div>
    </div>
  )
}

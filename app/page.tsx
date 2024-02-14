import React from 'react'

import hero from '../assets/images/hero.jpg'
import plans from '../assets/images/plans.jpg'
import welder from '../assets/images/welder.jpg'

import waterFeature from '../assets/images/waterFeature.jpg'
import treehouse from '../assets/images/treehouse.jpg'
import skatepark from '../assets/images/skatepark.jpg'
import pumptrack from '../assets/images/pumptrack.jpg'
import entertainment from '../assets/images/entertainment.jpg'
import landmark from '../assets/images/landmark.jpg'
import icerink from '../assets/images/icerink.jpg'
import pools from '../assets/images/pools.jpg'

const features = [
  {
    label: 'Pools + Spa',
    image: pools,
    href: '/',
  },
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

export default function Home() {
  return (
    <div className="space-y-2 bg-gray-900">
      <iframe
        title="Promo Video"
        src="https://player.vimeo.com/video/438344317?autoplay=1&title=0&byline=0&portrait=0"
        className="w-full aspect-video"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
      <div
        className="border-t border-[#001925] bg-cover bg-center flex flex-col items-center justify-center py-[25vh] px-[5vw] text-white text-center"
        style={{
          background: `url(${hero.src})`,
        }}
      >
        <h1
          className="text-4xl lg:text-6xl mb-4 uppercase font-bold"
          style={{
            textShadow:
              '0 5px 20px black, 0 10px 40px black, 0 20px 60px black',
          }}
        >
          Ambitious Experiences
        </h1>
        <p
          className="mb-4 text-2xl lg:text-3xl"
          style={{
            textShadow:
              '0 10px 10px black, 0 10px 20px black, 0 10px 30px black, 0 10px 40px black, 0 10px 50px black',
          }}
        >
          For the adventurer and recreator in all of us
        </p>
      </div>
      <div
        id="products"
        className="border-t border-[#001925] bg-[#001925] grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2.5rem font-bold overflow-hidden gap-2"
      >
        {features.map(({ label, image, href }, i) => (
          <a
            href={href}
            key={href + i}
            className="group relative text-white overflow-hidden max-h-[300px] rounded-sm before:content-[''] before:block before:pb-[80%]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            />
            <div
              className="absolute inset-0 "
              style={{
                background:
                  'linear-gradient(to bottom, transparent, transparent, rgba(0, 0, 0, 0.5)',
              }}
            />
            <span
              className="absolute bottom-0 left-0 opacity-60 px-2 py-1 text-2xl lg:text-4xl uppercase"
              style={{
                textShadow: '0 0 20px black, 0 0 20px black',
              }}
            >
              {label}
            </span>
          </a>
        ))}
      </div>
      <div className="relative bg-white text-black text-center">
        <div
          style={{
            background: `url(${plans.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
          }}
          className="absolute inset-0 top-0 bottom-0 right-0 left-0"
        />
        <div className="relative py-[15vh] px-8 max-w-[1000px] mx-auto space-y-4">
          <h2 className="font-bold text-4xl lg:text-5xl uppercase">
            We are dreamers and builders
          </h2>
          <h3 className=" text-3xl lg:text-4xl px-4 lg:px-0 italic">
            All rolled into one.
          </h3>
          <p className="text-xl lg:text-2xl px-4 lg:px-0">
            At Valley Design Build, we believe that a home is more than just a
            house and that our greatest moments of adventure, recreation,
            entertainment and escape can happen in our own backyards.
          </p>
        </div>
      </div>
      <div
        id="contact"
        className="border-t border-[#001925] bg-cover bg-center flex flex-col items-center justify-center py-[12vh] px-[12vw] text-white text-center space-y-6"
        style={{
          background: `url(${welder.src})`,
        }}
      >
        <div
          style={{
            textShadow:
              '0 10px 10px black, 0 10px 20px black, 0 10px 30px black, 0 10px 40px black, 0 10px 50px black',
          }}
        >
          <h2 className="text-4xl lg:text-5xl text-white text-center uppercase font-bold">
            You bring the idea.
          </h2>
          <h3 className="text-2xl lg:text-3xl text-white text-center uppercase">
            We'll do the rest.
          </h3>
        </div>
        <div className="rounded-lg shadow-xl overflow-hidden bg-black">
          <div className="p-2 text-2xl font-bold bg-cyan-900/60">
            Call Us Today
          </div>
          <a
            href="tel:+18015107142"
            className="text-3xl p-4 px-8 bg-cyan-700 block hover:bg-cyan-600 font-bold"
          >
            (801) 510-7142
          </a>
        </div>
        <a
          href="https://www.google.com/maps/place/3092+N+2000+W,+Farr+West,+UT+84404/@41.3142624,-112.0295588,17z/data=!3m1!4b1!4m6!3m5!1s0x87530d48f967df49:0x896ec607254dfdac!8m2!3d41.3142624!4d-112.0269839!16s%2Fg%2F11c12x1y0_?entry=ttu"
          target="_blank"
          rel="noreferrer"
          className="block text-2xl"
          style={{
            textShadow:
              '0 10px 10px black, 0 10px 20px black, 0 10px 30px black, 0 10px 40px black, 0 10px 50px black',
          }}
        >
          3092 North 2000 West
          <br />
          Farr West, Utah, 84404
        </a>
      </div>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import logoWhite from '../assets/images/logoWhite.svg'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Navbar() {
  return (
    <div className="flex items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white gap-2 px-2 sticky top-0 shadow-xl flex-wrap z-10 justify-between">
      <Link href="/" className="logo">
        <img src={logoWhite.src} alt="logo" className="py-4 px-2" />
      </Link>
      <div className="text-xl uppercase font-bold flex items-center flex-wrap gap-2">
        <Link
          href="https://www.instagram.com/valley_design_build"
          target="_blank"
          className="p-2 hover:text-cyan-500 flex items-center gap-1"
        >
          <FaInstagram className="text-2xl" />
        </Link>
        <Link
          href="https://www.facebook.com/ValleyDesignBuild"
          target="_blank"
          className="p-2 hover:text-cyan-500 flex items-center gap-1"
        >
          <FaFacebook className="text-2xl" />
        </Link>
        <Link
          href="https://www.facebook.com/ValleyDesignBuild/photos_by"
          target="_blank"
          className="p-2 hover:text-cyan-500"
        >
          Gallery
        </Link>
        <Link href="#contact" className="p-2 hover:text-cyan-500">
          Contact Us
        </Link>
        <a
          href="tel:+18015107142"
          className="text-xl py-2 px-4 rounded-lg bg-cyan-700 block hover:bg-cyan-600 font-bold"
        >
          (801) 510-7142
        </a>
      </div>
    </div>
  )
}

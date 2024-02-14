import React from 'react'
import Link from 'next/link'

import logoWhite from '../assets/images/logoWhite.svg'

export default function Navbar() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/">
        <img
          src={logoWhite.src}
          alt="logo"
          className="w-[300px] opacity-30 block p-12 mx-auto"
        />
      </Link>
    </div>
  )
}

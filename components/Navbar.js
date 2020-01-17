import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

//

import { NavLinks } from '../utils/Navigation'

import logoWhite from '../assets/images/logoWhite.svg'

//

const Styles = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #001018e0;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  .logo {
    display: block;
    padding: 1rem 1.2rem;

    @media (max-width: 800px) {
      padding: 1rem 0.8rem 0;
    }
  }

  .links {
    padding: 1rem;
    display: flex;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.5rem;
    color: white;

    @media (max-width: 800px) {
      font-size: 1.2rem;
    }

    > * {
      padding: 0.5rem 0.8rem;

      @media (max-width: 800px) {
        padding: 0.5rem 0.6rem;
      }

      :last-child {
        background: #006ba8;
        border-radius: 0.5rem;
      }
    }
  }
`

export default function Navbar() {
  return (
    <Styles>
      <Link href="/">
        <a className="logo">
          <img src={logoWhite} />
        </a>
      </Link>
      <div className="links">
        {NavLinks.map(({ label, href }) => (
          <Link key={href} href={href}>
            <a>{label}</a>
          </Link>
        ))}
      </div>
    </Styles>
  )
}

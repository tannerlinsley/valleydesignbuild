import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

//

import logoWhite from '../assets/images/logoWhite.svg'

//

const Styles = styled.nav`
  background: #001925;

  display: flex;
  align-items: center;

  .logo {
    width: 200px;
    opacity: 0.3;
    display: block;
    padding: 0.7rem;
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
    </Styles>
  )
}

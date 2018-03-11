import React from 'react'

import { viewportLarge } from 'app/components/GlobalStyles'
import Logo from './components/Logo'
import Nav from './components/Nav'

const Header = () =>
  <header className="relative">

    <div className="overlapped-bg absolute zn-1 h-100 w-100 dn-l bg-color-secondary" />
    <div className="pb3 pb0-l mb0-l pb4-l">
      <Logo />
    </div>

    <div className="pt3-l">
      <Nav />
    </div>

    <style jsx>{`
      .overlapped-bg { top: 3rem; }

      @media ${viewportLarge} {
        header { background-color: transparent; }
      }
    `}</style>
  </header>

export default Header

import React from 'react'

import Logo from './components/Logo'
import Nav from './components/Nav'

const Header = () =>
  <header>
    <div className="pb4">
      <Logo />
    </div>

    <div className="pt3">
      <Nav />
    </div>
  </header>

export default Header

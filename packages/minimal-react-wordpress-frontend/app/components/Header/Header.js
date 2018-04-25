import React from 'react'

import { viewportLarge } from 'app/components/GlobalStyles'
import Nav from 'app/scenes/Nav'
import Logo from './components/Logo'
import ShowSearch from 'app/scenes/ShowSearch'
import Search from 'app/scenes/Search'

const Header = () =>
  <header className='relative'>
    <div className='overlapped-bg absolute top-0 z-1 h-100 w-100 dn-l bg-color-primary' />

    <div className='relative z-2 pb3 pb0-l mb0-l pb4-l'>
      <Logo />
    </div>

    <div className='pb3 pt3-l pb5-l'>
      <Nav />
    </div>

    <Search />

    <div className='relative z-3 search-icon-wrapper dn-l absolute top-1 right-1 color-muted'>
      <ShowSearch />
    </div>

    <style jsx>{`
      .overlapped-bg { height: 3rem; }
      .search-icon-wrapper { top: 4rem; }
    `}</style>
  </header>

export default Header

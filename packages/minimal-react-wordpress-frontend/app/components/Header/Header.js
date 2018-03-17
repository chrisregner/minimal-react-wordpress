import React from 'react'

import { viewportLarge, colorMuted, colorPrimary } from 'app/components/GlobalStyles'
import Logo from './components/Logo'
import Nav from './components/Nav'
import SearchBar from 'app/components/SearchBar'
import TagCloud from 'app/components/TagCloud'
import SearchIcon from 'app/components/SearchIcon'

const Header = () =>
  <header className='relative'>
    <div className='overlapped-bg absolute zn-1 h-100 w-100 dn-l bg-color-secondary' />

    <div className='pb3 pb0-l mb0-l pb4-l'>
      <Logo />
    </div>

    <div className='pb3 pt3-l pb5-l'>
      <Nav />
    </div>

    <div className='cf pt0-l pt2-m ph3 pb3 pb0-l pl0-l tl'>
      <div className='fl-m pb0-m pb3 pb3-l pr3-m pr5-l w-40-m w-100-l mw5-l'>
        <SearchBar />
      </div>
      <div className='fl-m w-60-m w-100-l mw5-l'>
        <TagCloud />
      </div>
    </div>

    <div className='search-icon-wrapper dn-l absolute top-1 right-1 color-muted'>
      <SearchIcon />
    </div>

    <style jsx global>{`
      .search-icon-wrapper svg {
        fill: ${colorMuted};
        transition: fill 0.15s ease-in-out;
      }

      .search-icon-wrapper:hover svg, .search-icon-wrapper:focus svg {
        fill: ${colorPrimary}
      }
    `}</style>

    <style jsx>{`
      .overlapped-bg { top: 3rem; }
      .search-icon-wrapper { top: 4rem; }

      @media ${viewportLarge} {
        header { background-color: transparent; }
      }
    `}</style>
  </header>

export default Header

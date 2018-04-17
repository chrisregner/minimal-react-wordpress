import React from 'react'

import { viewportLarge } from 'app/components/GlobalStyles'

const Nav = props =>
  <nav className='font-title ph4 ph0-l ttu f6 tc tl-l'>
    <a href='' className='nav-item mv1 dib db-l ph2 mh1 mh0-l pr0-l active hover-muted pl2-l c-bw3 b--accent b tracked'>His Thoughts</a>
    <a href='' className='nav-item mv1 dib db-l ph2 mh1 mh0-l ph0-l color-muted hover-primary'>His Identity</a>
    <a href='' className='nav-item mv1 dib db-l ph2 mh1 mh0-l ph0-l color-muted hover-primary'>His Whereabouts</a>

    <style jsx>{`
      .active {
        border-bottom-style: solid;
      }

      @media ${viewportLarge} {
        .nav-item {
          margin: .4rem 0 .4rem;
        }

        .active {
          border-bottom-style: none;
          border-left-style: solid;
        }
      }
    `}</style>
  </nav>

export default Nav

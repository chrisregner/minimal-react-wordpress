import React from 'react'

import { viewportLarge } from 'app/components/GlobalStyles'

const Nav = () =>
  <nav className="font-title ph4 ph0-l lh-solid ttu f6 tc tl-l">
    <a href="" className="mv1 pv1 dib db-l ph2 mh1 mh0-l pr0-l active pl2-l c-bw3 border-color-accent b tracked">His Thoughts</a>
    <a href="" className="mv1 pv1 dib db-l ph2 mh1 mh0-l ph0-l color-muted color-hover-primary">His Identity</a>
    <a href="" className="mv1 pv1 dib db-l ph2 mh1 mh0-l ph0-l color-muted color-hover-primary">His Whereabouts</a>

    <style jsx>{`
      .active {
        border-bottom-style: solid;
      }

      @media ${viewportLarge} {
        .active {
          border-bottom-style: none;
          border-left-style: solid;
        }
      }
    `}</style>
  </nav>

export default Nav

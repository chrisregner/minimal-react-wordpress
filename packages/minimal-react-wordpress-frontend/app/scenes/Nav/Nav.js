import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import { viewportLarge } from 'app/components/GlobalStyles'

const Nav = ({ links }) =>
  !links
    ? null
    : <nav className='font-title ph4 ph0-l ttu f6 tc tl-l animated fadeIn'>
      {links.map(({ url, title, isActive }) => {
        const isMailTo = url.startsWith('mailto')
        const TheLink = isMailTo ? 'a' : Link

        return <TheLink
          {...{
            [isMailTo ? 'href' : 'to']: url,
          }}
          key={shortid.generate()}
          data-test='nav-link'
          className={
            'nav-item mv1 dib db-l ph2 mh1 mh0-l ' +
            (isActive
              ? 'active hover-muted pr0-l pl2-l c-bw3 b--accent b tracked'
              : 'ph0-l color-muted hover-primary')
          }
        >
          {title}
        </TheLink>
      })}

      {<style jsx>{`
        .active {
          border-bottom-style: solid;
        }

        @media ${viewportLarge} {
          .nav-item { margin: .4rem 0; }

          .active {
            border-bottom-style: none;
            border-left-style: solid;
          }
        }
      `}</style>}
    </nav>

Nav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })
  ),
}

export default Nav

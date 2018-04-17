import { connect } from 'react-redux'
import { matchPath } from 'react-router-dom'
import { compose, lifecycle, withState, withProps } from 'recompose'

import history from 'app/history'
import Nav from './Nav'
import { getNavLinks } from 'app/state'
import { fetchNavLinks } from 'app/state/common'

const isPageUrl = url =>
  !!matchPath(url, {
    path: '/page/:id',
    exact: true,
  })

// TODO: not finieshed?
const isUrlActive = ({ subjUrl, currentUrl, isNotFound }) => {
  if (isNotFound) return false
  if (isPageUrl(currentUrl) && subjUrl === currentUrl) return true
  if (!isPageUrl(currentUrl) && subjUrl === '/') return true

  return false
}

const NavContainer = compose(
  withState('currentUrl', 'setCurrentUrl'),
  connect(state => ({
    navLinks: getNavLinks(state),
    // isNotFound: getIsNotFound(state),
  }), { fetchNavLinks }),
  lifecycle({
    componentDidMount () {
      this.props.fetchNavLinks()
      this.props.setCurrentUrl(history.getLocation().pathname)

      history.listen((location) => {
        if (this.props.currentUrl !== location.pathname)
          this.props.setCurrentUrl(location.pathname)
      })
    },
  }),
  withProps(({ navLinks, currentUrl }) => ({
    navLinks: navLinks && navLinks.map(navLink =>
      ({ ...navLink, isActive: isUrlActive({ subjUrl: navLink.url, currentUrl }) })),
  }))
)(Nav)

export default NavContainer

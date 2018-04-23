import { connect } from 'react-redux'
import { matchPath } from 'react-router-dom'
import { compose, lifecycle, withState, withPropsOnChange } from 'recompose'

import { getNavLinks } from 'app/state'
import { fetchNavLinks } from 'app/state/common'
import history from 'app/history'
import Nav from './Nav'

const NavContainer = compose(
  connect(
    state => ({ links: getNavLinks(state) }),
    { fetchNavLinks }
  ),

  withState('currentUrl', 'setCurrentUrl'),

  lifecycle({
    componentDidMount () {
      this.props.setCurrentUrl(history.getLocation().pathname)
      this.props.fetchNavLinks()

      history.listen(location =>
        this.props.setCurrentUrl(location.pathname))
    },
  }),

  withPropsOnChange(['links', 'currentUrl'], ({ links, currentUrl }) => ({
    links: links && links.map(link =>
      ({ ...link, isActive: isActive(link.url, currentUrl) })),
  }))
)(Nav)

const isActive = (testedUrl, currentUrl) => {
  if (testedUrl === '/') {
    // case 1 tested url is home
    const matchUrl = criterionUrl =>
      matchPath(currentUrl, {
        path: criterionUrl,
        exact: true,
      })

    return !!(matchUrl('/') || // case 1.1: current url is posts
      matchUrl('/search') || // case 1.1: current url is search
      matchUrl('/post/:postId')) // case 1.1: current url is post
  } else if (testedUrl === currentUrl) {
    // case 2.1: tested url is not home, and current url matches
    return true
  } else {
    // case 2.2: tested url is not home, and current url does NOT matches
    return false
  }
}

export default NavContainer

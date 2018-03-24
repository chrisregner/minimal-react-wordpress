import { connect } from 'react-redux'
import { compose, setDisplayName } from 'recompose'
import withViewport from 'app/containers/withViewport'
import { flagSearchAnimationEnd } from 'app/state/ui'
import { getIsSearchVisible } from 'app/state'
import Search from './Search'

const SearchContainer = compose(
  setDisplayName('SearchContainer'),
  withViewport,
  connect(
    state => ({ isSearchVisible: getIsSearchVisible(state) }),
    { flagSearchAnimationEnd },
  )
)(Search)

export default SearchContainer

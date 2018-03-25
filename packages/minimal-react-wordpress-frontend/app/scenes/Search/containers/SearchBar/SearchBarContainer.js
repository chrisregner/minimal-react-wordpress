import { connect } from 'react-redux'
import { withState, lifecycle, setDisplayName, compose } from 'recompose'

import {
  getIsSearchVisible,
  getIsSearchAnimationDone,
  getSearchKeyword,
} from 'app/state'
import { setSearchKeyword } from 'app/state/page'
import { toggleSearch } from 'app/state/ui'
import withViewport from 'app/containers/withViewport'
import SearchBar from './SearchBar'

const SearchBarContainer = compose(
  setDisplayName('SearchBarContainer'),
  withViewport,
  withState('inputNode', 'setInputNode'),
  connect(
    state => ({
      canSearchFocus: getIsSearchVisible(state) && getIsSearchAnimationDone(state),
      searchKeyword: getSearchKeyword(state),
    }),
    { toggleSearch, setSearchKeyword }
  ),
  lifecycle({
    componentDidUpdate: function () {
      const { viewport, inputNode, canSearchFocus } = this.props
      if (viewport !== 'l' && canSearchFocus) inputNode.focus()
    },
  }),
)(SearchBar)

export default SearchBarContainer

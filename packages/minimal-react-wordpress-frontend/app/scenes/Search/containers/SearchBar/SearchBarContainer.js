import { connect } from 'react-redux'
import { withState, lifecycle, setDisplayName, compose } from 'recompose'

import {
  getIsSearchVisible,
  getIsSearchAnimationDone,
  getSearchKeyword,
} from 'app/state'

import {
  setSearchKeyword,
  resetPage,
  fetchPostList,
} from 'app/state/page'

import { toggleSearch } from 'app/state/ui'
import withViewport from 'app/hoc/withViewport'
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
    dispatch => ({
      toggleSearch: () => dispatch(toggleSearch()),
      setSearchKeyword: (keyword) => {
        dispatch(setSearchKeyword(keyword))
        dispatch(resetPage())
        dispatch(fetchPostList())
      },
    })
  ),
  lifecycle({
    componentDidUpdate: function () {
      const { viewport, inputNode, canSearchFocus } = this.props
      if (viewport !== 'l' && canSearchFocus) inputNode.focus()
    },
  }),
)(SearchBar)

export default SearchBarContainer

import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import { hideSearch } from 'app/state/ui'

const SearchBarContainer = connect(
  null,
  dispatch => ({ hideSearch: () => dispatch(hideSearch()) }),
)(SearchBar)

export default SearchBarContainer

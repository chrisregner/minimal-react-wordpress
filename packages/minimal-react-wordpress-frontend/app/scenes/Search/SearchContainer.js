import { connect } from 'react-redux'
import Search from './Search'
import { getIsSearchVisible } from 'app/state'

const SearchContainer = connect(
  state => ({ isSearchVisible: getIsSearchVisible(state) }),
)(Search)

export default SearchContainer

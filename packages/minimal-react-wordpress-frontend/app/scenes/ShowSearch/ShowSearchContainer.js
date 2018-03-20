import { connect } from 'react-redux'
import { showSearch } from 'app/state/ui'
import ShowSearch from './ShowSearch'

const ShowSearchContainer = connect(
  null,
  dispatch => ({ showSearch: () => dispatch(showSearch()) })
)(ShowSearch)

export default ShowSearchContainer

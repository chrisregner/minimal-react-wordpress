import { connect } from 'react-redux'
import { toggleSearch } from 'app/state/ui'
import ShowSearch from './ShowSearch'

const ShowSearchContainer = connect(null, { toggleSearch })(ShowSearch)

export default ShowSearchContainer

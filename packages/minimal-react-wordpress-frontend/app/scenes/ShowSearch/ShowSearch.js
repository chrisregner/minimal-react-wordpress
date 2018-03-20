import React from 'react'
import PropTypes from 'prop-types'
import SearchIcon from './components/SearchIcon'

const ShowSearch = ({ showSearch }) =>
  <button data-test='show-search-btn' onClick={showSearch} className='bg-transparent button-icon-primary pa0 bn pointer'>
    <SearchIcon />
  </button>

ShowSearch.propTypes = {
  showSearch: PropTypes.func.isRequired,
}

export default ShowSearch

import React from 'react'
import PropTypes from 'prop-types'
import SearchIcon from './components/SearchIcon'

const ShowSearch = ({ toggleSearch }) =>
  <button data-test='show-search-btn' onClick={toggleSearch} className='bg-transparent button-icon-primary pa0 bn pointer'>
    <SearchIcon />
  </button>

ShowSearch.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
}

export default ShowSearch

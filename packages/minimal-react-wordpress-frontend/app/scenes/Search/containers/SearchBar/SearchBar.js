import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from './components/CloseIcon'

const SearchBar = ({ hideSearch }) =>
  <div className='relative'>
    <input
      className='input bt-0 bl-0 br-0 b--muted b--hover-primary pv1 pr3 pr0-l w-100 bg-transparent f5 color-muted hover-primary font-copy'
      type='text'
      placeholder='SEARCH'
    />
    <button
      data-test='hide-search-btn'
      onClick={hideSearch}
      className='hide-search-btn button-icon-primary absolute z-1 top-0 right-0 db dn-l bn pl1 pv1 pr0 bg-transparent pointer'
    >
      <CloseIcon />
    </button>

    <style jsx>{`
      .input {
        margin-bottom: 1px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
      }
    `}</style>
  </div>

SearchBar.propTypes = {
  hideSearch: PropTypes.func.isRequired,
}

export default SearchBar

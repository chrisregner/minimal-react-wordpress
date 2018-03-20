import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'

import SearchBar from './containers/SearchBar'
import TagCloud from './containers/TagCloud'

const Search = ({ isSearchVisible }) =>
  <div data-test='wrapper' className={c('cf db-l pt0-l pt2-m ph3 pb3 pb0-l pl0-l', !isSearchVisible && 'dn')}>
    <div className='fl-m pb0-m pb3 pb3-l pr3-m pr5-l w-40-m w-100-l mw5-l'>
      <SearchBar />
    </div>
    <div className='fl-m w-60-m w-100-l mw5-l'>
      <TagCloud />
    </div>
  </div>

Search.propTypes = {
  isSearchVisible: PropTypes.bool.isRequied,
}

export default Search

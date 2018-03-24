import React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'react-collapse'

import SearchBar from './containers/SearchBar'
import TagCloud from './containers/TagCloud'

const Search = ({ isSearchVisible, viewport, flagSearchAnimationEnd }) =>
  <Collapse
    data-test='wrapper'
    onRest={flagSearchAnimationEnd}
    isOpened={isSearchVisible || viewport === 'l'}
  >
    <div className='cf pt0-l pt2-m ph3 pb3 pb0-l pl0-l'>
      <div className='fl-m pb0-m pb3 pb3-l pr3-m pr5-l w-40-m w-100-l mw5-l'>
        <SearchBar />
      </div>
      <div className='fl-m w-60-m w-100-l mw5-l'>
        <TagCloud />
      </div>
    </div>
  </Collapse>

Search.propTypes = {
  viewport: PropTypes.oneOf(['l', 'm', 's']),
  isSearchVisible: PropTypes.bool.isRequired,
  flagSearchAnimationEnd: PropTypes.func.isRequired,
}

export default Search

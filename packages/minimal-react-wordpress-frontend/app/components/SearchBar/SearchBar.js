import React from 'react'
import CloseIcon from 'app/components/CloseIcon'

const SearchBar = () =>
  <div className='relative'>
    <input
      className='input bt-0 bl-0 br-0 b--muted b--hover-primary pv1 pr3 pr0-l w-100 bg-transparent f5 color-muted hover-primary font-copy'
      type='text'
      placeholder='SEARCH'
    />
    <div className='close-icon-wrapper absolute right-0 dn-l'>
      <CloseIcon />
    </div>

    <style jsx>{`
      .input {
        margin-bottom: 1px;
        border-bottom-width: 2px;
        border-bottom-style: solid;
        transition: color 0.15s ease-in-out, border-color 0.15s ease-in-out;
      }

      .close-icon-wrapper { top: 2px; }
    `}</style>
  </div>

export default SearchBar

import React from 'react'
import PropTypes from 'prop-types'

const Warning = ({ children }) =>
  <div className='b--accent c-bw3 bl pt3 pb4 ph3 bg-color-primary tl animated fadeIn'>
    <h2 className='pb3 font-copy f3'>Apologies</h2>
    {children}
  </div>

Warning.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Warning

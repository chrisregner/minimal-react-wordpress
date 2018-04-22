import React from 'react'
import PropTypes from 'prop-types'

const MainSection = ({ status, content }) => {
  const contentNode = content && content()
  const statusNode = status && status()

  return <React.Fragment>
    {contentNode && <div data-test='content' className='animated fadeIn'>{contentNode}</div>}
    {statusNode && <div data-test='status' className='tc ph3 ph4-ns pb5'>{statusNode}</div>}
  </React.Fragment>
}

MainSection.propTypes = {
  content: PropTypes.func,
  status: PropTypes.func,
}

export default MainSection

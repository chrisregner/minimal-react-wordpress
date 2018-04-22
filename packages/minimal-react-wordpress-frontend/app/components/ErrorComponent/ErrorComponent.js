import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Warning from 'app/components/Warning'

const ErrorComponent = ({ error }) => error.message.includes('404')
  ? <div data-test='not-found'>
    <div className='f-6 b'>404</div>
    <div className='f4 lh-title mb5'>Apologies, what you requested doesn't exist in our website.</div>
    <div>
      <Link to='/' className='button-secondary'>
        Go To Home Page
      </Link>
    </div>
  </div>
  : <Warning data-test='other-error'>
    <p className='pb2'>
        The following <strong>error has occured</strong>.
        Please try reloading or visiting the site again later.
    </p>
    <pre className='color-muted mb4'>{error.message}</pre>
    <Link to='/' className='button-secondary'>
      Go To Home Page
    </Link>
  </Warning>

ErrorComponent.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
}

export default ErrorComponent

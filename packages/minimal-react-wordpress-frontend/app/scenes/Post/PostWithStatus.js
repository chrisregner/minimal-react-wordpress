import React from 'react'
import PropTypes from 'prop-types'

import MainSection from 'app/components/MainSection'
import Warning from 'app/components/Warning'
import PostItem from 'app/components/PostItem'

const PostWithStatus = ({ post, status, error }) =>
  <MainSection
    content={() =>
      post && <PostItem data-test='post' hasReadMore={false} {...post} />
    }

    status={() => {
      switch (status) {
        case 'loading':
          return <button className='button-secondary' data-test='loader'>
              Loading...
          </button>
        case 'loaded-post':
          return null
        case 'error':
          return <Warning data-test='error'>
            <p className='pb2'>
                The following <strong>error has occured</strong>.
                Please try reloading or visiting the site again later.
            </p>
            <pre className='color-muted'>{error.message}</pre>
          </Warning>
      }
    }}
  />

PostWithStatus.propTypes = {
  status: PropTypes.oneOf(['loading', 'loaded-post', 'error']).isRequired,
  error: PropTypes.instanceOf(Error),
  post: PropTypes.object,
}

export default PostWithStatus

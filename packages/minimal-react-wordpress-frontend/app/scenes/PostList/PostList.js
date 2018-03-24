import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import PostItem from './components/PostItem'

const Warning = ({ children }) =>
  <div className='b--accent c-bw3 bl pt3 pb4 ph3 bg-color-primary tl animated fadeIn'>
    <h2 className='pb3 font-copy f3'>My Apologies</h2>
    {children}
  </div>

const Button = ({ children, ...props }) =>
  <button className='button-secondary' {...props}>
    {children}
  </button>

const PostList = ({ postList, loadMore, error, status }) =>
  <Fragment>
    {/* Post items */}
    {postList && postList.length > 0 &&
      <div className='animated fadeIn'>
        {postList.map(postItem =>
          <PostItem
            key={postItem.id}
            data-test={`post-item post-item--${postItem.id}`}
            {...postItem}
          />
        )}
      </div>}

    <div className='tc ph3 ph4-ns pb5'>
      {(() => {
        switch (status) {
          case 'can-load':
            return <Button data-test='load-more-btn' onClick={loadMore}>
              Load More
            </Button>
          case 'loading':
            return <Button data-test='loader'>
              Loading...
            </Button>
          case 'error':
            return <Warning data-test='error'>
              <p className='pb2'>
                The following <strong>error has occured</strong>.
                Please try reloading or visiting the site again later.
              </p>
              <pre className='color-muted'>{error.message}</pre>
            </Warning>
          case 'no-more-match':
            return <Button data-test='no-more-match-msg'>
              No More Match
            </Button>
          case 'no-more-post':
            return <Button data-test='no-more-post-msg'>
              No More Post
            </Button>
          case 'no-match':
            return <Warning data-test='no-match-msg'>
              Your search returns <strong>no match</strong>.
              You can try other keyword and tags, or visit other pages.
            </Warning>
          case 'no-post':
            return <Warning data-test='no-post-msg'>
              There is <strong>no post</strong> at the moment. Please return sometime in the future.
            </Warning>
        }
      })()}
    </div>
  </Fragment>

Warning.propTypes = {
  children: PropTypes.node.isRequired,
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

PostList.propTypes = {
  loadMore: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
  postList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  status: PropTypes.oneOf([
    'can-load',
    'loading',
    'error',
    'no-more-match',
    'no-more-post',
    'no-match',
    'no-post',
  ]),
}

export default PostList

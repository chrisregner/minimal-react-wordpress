import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import PostItem from './components/PostItem'

const Button = ({ children, ...props }) =>
  <button className='button-secondary' {...props}>
    {children}
  </button>

const PostList = ({ isLoading, postList, loadMore, error, isThereMorePost = true }) => {
  const canLoadMore = isThereMorePost && !isLoading

  return <Fragment>
    {/* Post items */}
    {postList &&
      <div className='animated fadeIn'>
        {postList.map(postItem =>
          <PostItem
            key={postItem.id}
            data-test={`post-item post-item--${postItem.id}`}
            {...postItem}
          />
        )}
      </div>}

    {error
      ? <div data-test='error' className='mh3 mh4-ns mb4 b--accent c-bw3 bl pa3 bg-color-primary animated fadeIn'>
        {/* Error */}
        <p className='pb3'>The error below has occured. Please try reloading or visiting the site again later.</p>
        <pre><em>{error.message}</em></pre>
      </div>
      : <div className='pb5 ph4 tc'>
        {/* Load More Button */}
        {canLoadMore && <Button data-test='load-more-btn' onClick={loadMore}>
          Load More
        </Button>}

        {/* Loader */}
        {isLoading && <Button data-test='loader'>
          Loading...
        </Button>}

        {/* No More Post Message */}
        {!isThereMorePost && !isLoading && <Button data-test='no-more-post'>
          No More Post
        </Button>}
      </div>}
  </Fragment>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

PostList.propTypes = {
  loadMore: PropTypes.func.isRequired,
  isThereMorePost: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  postList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
}

export default PostList

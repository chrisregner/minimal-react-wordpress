import React from 'react'
import PropTypes from 'prop-types'

import MainSection from 'app/components/MainSection'
import Warning from 'app/components/Warning'
import PostItem from 'app/components/PostItem'

const PostList = ({ postList, loadMore, clearSearch, error, status }) =>
  <MainSection
    content={() => {
      const hasPost = postList && postList.length > 0

      return hasPost
        ? <div className='animated fadeIn'>
          {postList.map(postItem =>
            <PostItem
              key={postItem.id}
              data-test={`post-item post-item--${postItem.id}`}
              {...postItem}
            />
          )}
        </div>
        : null
    }}

    status={() => {
      switch (status) {
        case 'can-load':
          return <button className='button-secondary' data-test='load-more-btn' onClick={loadMore}>
              Load More
          </button>
        case 'loading':
          return <button className='button-secondary' data-test='loader'>
              Loading...
          </button>
        case 'error':
          return <Warning data-test='error'>
            <p className='pb2'>
                The following <strong>error has occured</strong>.
                Please try reloading or visiting the site again later.
            </p>
            <pre className='color-muted'>{error.message}</pre>
          </Warning>
        case 'no-more-match':
          return <button className='button-secondary' data-test='no-more-match-msg'>
              No More Match
          </button>
        case 'no-more-post':
          return <button className='button-secondary' data-test='no-more-post-msg'>
              No More Post
          </button>
        case 'no-match':
          return <Warning data-test='no-match-msg'>
              Your search returns <strong>no match</strong>.
              You can try other keyword and tags, or visit other pages.
            <div className='pt4'>
              <button className='button-secondary' data-test='clear-search-btn' onClick={clearSearch}>
                Clear Search
              </button>
            </div>
          </Warning>
        case 'no-post':
          return <Warning data-test='no-post-msg'>
              There is <strong>no post</strong> at the moment. Please return sometime in the future.
          </Warning>
      }
    }}
  />

PostList.propTypes = {
  loadMore: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
  postList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  status: PropTypes.string.isRequired,
}

export default PostList

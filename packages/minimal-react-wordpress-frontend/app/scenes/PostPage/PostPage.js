import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import MainSection from 'app/components/MainSection'
import Warning from 'app/components/Warning'
import PostItem from 'app/components/PostItem'

const PostPage = ({ post, status, error }) =>
  <MainSection
    content={() =>
      <React.Fragment>
        {post &&
          <div className='animated fadeIn'>
            <PostItem data-test='post' hasReadMore={false} {...post} />
          </div>}

        {(post && (post.prev || post.next)) &&
          <div className='cf ph3 ph4-ns pb6'>
            <div className='link-wrapper fl-ns w-50-ns'>
              {post.prev &&
                <Link
                  data-test='prev-link'
                  to={`/post/${post.prev.id}`}
                >
                  <span className='color-muted f5 lh-title'>Previous</span> <br />
                  <span className='underline f4 lh-title'>{post.prev.title}</span>
                </Link>}
            </div>
            <div className='link-wrapper fl-ns w-50-ns tr'>
              {post.next &&
                <Link
                  data-test='next-link'
                  to={`/post/${post.next.id}`}
                >
                  <span className='color-muted f5 lh-title'>Next</span> <br />
                  <span className='underline f4 lh-title'>{post.next.title}</span>
                </Link>}
            </div>
          </div>}

        <style jsx>{`
          .link-wrapper { min-height: 1px; }
        `}</style>
      </React.Fragment>
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

PostPage.propTypes = {
  status: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Error),
  post: PropTypes.object,
}

export default PostPage

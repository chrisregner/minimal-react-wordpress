import React, { Fragment } from 'react'

import PostItem from './components/PostItem'

const PostList = () =>
  <Fragment>
    <PostItem />
    <PostItem />
    <PostItem hasImage={false} />
    <div className="pb5 ph4 tc">
      <a href="" className="button-secondary">Load More</a>
    </div>
  </Fragment>

export default PostList

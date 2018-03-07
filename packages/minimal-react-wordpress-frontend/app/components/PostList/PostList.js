import React from 'react'

import PostItem from './components/PostItem'

const PostList = () =>
  <div className="mh6 min-vh-100 bg-color-secondary">
    <div className="pt4">
      <PostItem />
      <PostItem />
      <PostItem hasImage={false} />
      <div className="pb5 ph4 tc">
        <a href="" className="button-secondary">Load More</a>
      </div>
    </div>
  </div>

export default PostList

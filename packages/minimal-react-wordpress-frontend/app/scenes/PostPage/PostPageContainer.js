import {
  compose,
  lifecycle,
  setDisplayName,
  withPropsOnChange,
  withState,
} from 'recompose'

import { connect } from 'react-redux'
import omit from 'ramda/src/omit'
import SmoothScroll from 'smooth-scroll'

import {
  fetchPost,
  toggleSearchTag,
  resetPage,
  fetchPostList,
} from 'app/state/page'

import { getPostWithTags, getStatus, getError } from 'app/state'
import PostPage from './PostPage'

const PostPageContainer = compose(
  setDisplayName('PostPageContainer'),

  connect(
    state => ({
      post: getPostWithTags(state),
      status: getStatus(state),
      error: getError(state),
    }),
    dispatch => ({
      fetchPost: postId => dispatch(fetchPost(postId)),
      toggleTag: (tagId) => {
        dispatch(toggleSearchTag(tagId))
        dispatch(resetPage())
        dispatch(fetchPostList())
      },
    }),
  ),

  withState('postId', 'setPostId'),

  lifecycle({
    componentDidMount () {
      const postId = this.props.match.params.postId
      this.props.fetchPost(postId)
      this.props.setPostId(postId)
    },
    componentDidUpdate () {
      const oldPostId = this.props.postId
      const newPostId = this.props.match.params.postId

      if (oldPostId !== newPostId) {
        this.props.fetchPost(newPostId)
        this.props.setPostId(newPostId)
        scrollToTop()
      }
    },
  }),

  // Map toggleTag() action to each tag in each posts
  withPropsOnChange(['post'], ({ post, toggleTag }) => ({
    post: (post && post.tags)
      ? {
        ...post,
        tags: post.tags.map(tag => ({
          toggleTag: () => toggleTag(tag.id),
          ...omit(['count'], tag),
        })),
      }
      : post,
  }))
)(PostPage)

/**
 * Internal functions
 */

const scrollToTop = () => {
  const scroll = new SmoothScroll()
  const anchor = document.querySelector('#root')
  scroll.animateScroll(anchor)
}

export default PostPageContainer

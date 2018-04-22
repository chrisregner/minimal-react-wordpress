import { compose, lifecycle, setDisplayName, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import omit from 'ramda/src/omit'

import {
  fetchPost,
  toggleSearchTag,
  resetPage,
  fetchPostList,
} from 'app/state/page'

import { getPostWithTags, getStatus, getError } from 'app/state'
import PostWithStatus from './PostWithStatus'

const PostContainer = compose(
  setDisplayName('PostContainer'),

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

  lifecycle({
    componentDidMount () {
      this.props.fetchPost(this.props.match.params.postId)
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
)(PostWithStatus)

export default PostContainer

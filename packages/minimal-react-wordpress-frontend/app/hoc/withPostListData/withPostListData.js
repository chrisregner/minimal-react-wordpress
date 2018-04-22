import omit from 'ramda/src/omit'
import { connect } from 'react-redux'
import { compose, withPropsOnChange } from 'recompose'

import {
  fetchMorePostList,
  toggleSearchTag,
  clearSearch,
  resetPage,
  fetchPostList,
} from 'app/state/page'

import {
  getPostExcerptsWithTags,
  getError,
  getStatus,
} from 'app/state'

const withPostListData = compose(
  // Get necessary data and actions from redux
  connect(
    state => ({
      postList: getPostExcerptsWithTags(state),
      error: getError(state),
      status: getStatus(state),
    }),
    dispatch => ({
      loadMore: () => {
        dispatch(fetchMorePostList())
      },
      toggleTag: (tagId) => {
        dispatch(toggleSearchTag(tagId))
        dispatch(resetPage())
        dispatch(fetchPostList())
      },
      clearSearch: () => {
        dispatch(clearSearch())
        dispatch(resetPage())
        dispatch(fetchPostList())
      },
    })
  ),

  // Map toggleTag() action to each tag in each posts
  withPropsOnChange(['postList'], ({ postList, toggleTag }) => ({
    postList: postList.map(post => post.tags
      ? {
        ...post,
        tags: post.tags.map(tag => ({
          toggleTag: () => toggleTag(tag.id),
          ...omit(['count'], tag),
        })),
      }
      : post),
  }))
)

export default withPostListData

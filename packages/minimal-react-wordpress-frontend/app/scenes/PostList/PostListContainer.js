import { connect } from 'react-redux'
import { lifecycle, setDisplayName, compose } from 'recompose'

import {
  fetchPostList,
  fetchMorePostList,
  clearSearch,
} from 'app/state/page'

import {
  getPostList,
  getError,
  getStatus,
} from 'app/state'

import PostList from './PostList'

const enhance = compose(
  setDisplayName('PostListContainer'),
  connect(
    state => ({
      postList: getPostList(state),
      error: getError(state),
      status: getStatus(state),
    }),
    ({
      loadMore: fetchMorePostList,
      fetchPostList, clearSearch,
    })
  ),
  lifecycle({
    componentDidMount () {
      this.props.fetchPostList()
    },
  }),
)

export default enhance(PostList)

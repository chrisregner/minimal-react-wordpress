import { connect } from 'react-redux'
import { lifecycle, setDisplayName, compose } from 'recompose'

import { fetchPostList, fetchMorePostList } from 'app/state/postList'
import PostList from './PostList'
import {
  getPostList,
  getError,
  getStatus,
} from 'app/state'

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
      fetchPostList,
    })
  ),
  lifecycle({
    componentDidMount () {
      this.props.fetchPostList()
    },
  }),
)

export default enhance(PostList)

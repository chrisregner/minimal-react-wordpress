import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import { fetchPostList, fetchMorePostList } from 'app/state/postList'
import PostList from './PostList'
import {
  getPostList,
  getError,
  getIsLoading,
  getIsThereMorePost,
} from 'app/state'

const enhance = compose(
  connect(
    state => ({
      postList: getPostList(state),
      error: getError(state),
      isLoading: getIsLoading(state),
      isThereMorePost: getIsThereMorePost(state),
    }),
    dispatch => ({
      fetchPostList: () => dispatch(fetchPostList()),
      loadMore: () => dispatch(fetchMorePostList()),
    })
  ),
  lifecycle({
    componentDidMount () {
      this.props.fetchPostList()
    },
  }),
)

export default enhance(PostList)

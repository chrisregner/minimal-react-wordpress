import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import PostList from 'app/components/PostList'
import { fetchPostList, fetchMorePostList } from 'app/state/postList'
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

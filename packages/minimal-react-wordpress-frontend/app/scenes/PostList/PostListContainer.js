import { connect } from 'react-redux'
import { lifecycle, setDisplayName, compose } from 'recompose'

import { clearSearch, resetPage, fetchPostList } from 'app/state/page'

import withPostListData from 'app/hoc/withPostListData'
import DumbPostList from 'app/components/PostList'

const PostList = compose(
  setDisplayName('PostListContainer'),
  connect(null, dispatch => ({
    fetchFirstPosts: () => {
      dispatch(clearSearch())
      dispatch(resetPage())
      dispatch(fetchPostList())
    },
  })),
  withPostListData,
  lifecycle({
    componentDidMount () {
      this.props.fetchFirstPosts()
    },
  }),
)(DumbPostList)

export default PostList

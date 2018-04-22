import {
  compose,
  lifecycle,
  setDisplayName,
  withState,
} from 'recompose'

import { connect } from 'react-redux'

import { fetchPage } from 'app/state/page'
import { getPage, getStatus, getError } from 'app/state'
import scrollToTop from 'app/utils/scrollToTop'
import PostPage from 'app/components/PostPage'

const CustomPageContainer = compose(
  setDisplayName('CustomPageContainer'),

  connect(
    state => ({
      post: getPage(state),
      status: getStatus(state),
      error: getError(state),
    }),
    dispatch => ({
      fetchPage: pageId => dispatch(fetchPage(pageId)),
    }),
  ),

  withState('pageId', 'setPageId'),

  lifecycle({
    componentDidMount () {
      const pageId = this.props.match.params.pageId
      this.props.fetchPage(pageId)
      this.props.setPageId(pageId)
    },
    componentDidUpdate () {
      const oldPageId = this.props.pageId
      const newPageId = this.props.match.params.pageId

      if (oldPageId !== newPageId) {
        this.props.fetchPage(newPageId)
        this.props.setPageId(newPageId)
        scrollToTop()
      }
    },
  }),

)(PostPage)

export default CustomPageContainer

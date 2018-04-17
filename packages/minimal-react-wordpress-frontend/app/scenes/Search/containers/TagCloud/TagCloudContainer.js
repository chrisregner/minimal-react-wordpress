import { connect } from 'react-redux'
import { compose, mapProps, lifecycle } from 'recompose'

import {
  toggleSearchTag,
  fetchTags,
  resetPage,
  fetchPostList,
} from 'app/state/page'
import { getSearchTags } from 'app/state'
import TagCloud from 'app/components/TagCloud'

const TagCloudContainer = compose(
  connect(
    state => ({
      tags: getSearchTags(state),
    }),
    dispatch => ({
      toggleSearchTag: (tagId) => {
        dispatch(toggleSearchTag(tagId))
        dispatch(resetPage())
        dispatch(fetchPostList())
      },
      fetchTags: () => dispatch(fetchTags()),
    })
  ),
  lifecycle({
    componentDidMount () {
      this.props.fetchTags()
    },
  }),
  mapProps(({ tags, toggleSearchTag }) => ({
    tags: tags && tags.map(tag => ({
      ...tag,
      toggleTag: toggleSearchTag.bind(null, tag.id),
    })),
  }))
)(TagCloud)

export default TagCloudContainer

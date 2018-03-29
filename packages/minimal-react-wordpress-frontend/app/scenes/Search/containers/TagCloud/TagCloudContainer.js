import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'

import { getSearchTags } from 'app/state'
import { toggleSearchTag } from 'app/state/page'
import TagCloud from 'app/components/TagCloud'

const TagCloudContainer = compose(
  connect(
    state => ({
      tags: getSearchTags(state),
    }),
    { toggleSearchTag }
  ),
  mapProps(({ tags, toggleSearchTag }) => ({
    tags: tags && tags.map(tag => ({
      ...tag,
      toggleTag: toggleSearchTag.bind(null, tag.id),
    })),
  }))
)(TagCloud)

export default TagCloudContainer

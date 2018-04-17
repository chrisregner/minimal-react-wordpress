import React from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'

export const activeClass = 'color-primary hover-muted b underline'
export const inactiveClass = 'color-muted hover-primary underline'

const TagCloud = ({ tags }) => (tags && tags.length)
  ? <React.Fragment>
    {tags.map((tag, i) =>
      <span data-test='tag-item' key={shortid.generate()}>
        <a
          href=''
          data-test='link'
          onClick={(ev) => {
            tag.toggleTag()
            ev.preventDefault()
          }}
          className={tag.isActive ? activeClass : inactiveClass}
        >
          <span data-test='name'>{tag.name}</span>
          {tag.count && <span data-test='count'>({tag.count})</span>}
        </a>
        {(i < tags.length - 1) && <span data-test='separator'>,&ensp;</span>}
      </span>
    )}
  </React.Fragment>
  : null

TagCloud.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    toggleTag: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  })),
}

export default TagCloud

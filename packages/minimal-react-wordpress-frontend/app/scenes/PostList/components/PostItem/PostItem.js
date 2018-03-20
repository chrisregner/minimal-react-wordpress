import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import sanitize from 'app/utils/sanitizeDom'
import format from 'date-fns/format'

const createImageProps = ({ mediumLargeSrc, largeSrc, fullSrc, altText }) => {
  let srcSet = ''

  if (mediumLargeSrc) srcSet += (mediumLargeSrc + ' 768w')
  if (largeSrc) srcSet += (',' + largeSrc + ' 1024w')
  if (!largeSrc && mediumLargeSrc && fullSrc) srcSet += ',' + fullSrc + ' 1024w'

  return {
    src: largeSrc || fullSrc,
    alt: altText,
    srcSet,
  }
}

const PostItem = ({ id, title, excerpt, modified, date, featuredMedia }) => {
  const imageProps = featuredMedia && createImageProps(featuredMedia)

  return <section className='pb5'>
    {/* Featured Image */}
    {featuredMedia &&
      <Link data-test='post-link' to={`/post/${id}`} className='db nl3 nr3 nl4-m nr4-m nl5-l nr5-l shadow-1 shadow-hover-2'>
        <img
          data-test='featured-media'
          className='mb4'
          sizes='100%'
          {...imageProps}
        />
      </Link>}

    <div className='ph3 ph4-ns'>
      {/* Title */}
      <Link data-test='post-link' to={`/post/${id}`} className='hover-muted'>
        <h2 data-test='title' className='mb3 mb2-ns f2' dangerouslySetInnerHTML={{ __html: sanitize(title) }} />
      </Link>

      <div className='pt1 pb2 f7 font-title color-muted tracked ttu'>
        {/* Date */}
        <span data-test='date'>
          {modified ? 'updated' : 'created'}&ensp;
          {format(modified || date, 'MMM D, YYYY')}
        </span>
        &ensp;<b>&middot;</b>&ensp;

        {/* Tags */}
        <a href='' className='color-muted hover-primary underline'>Alpha</a>,&ensp;
        <a href='' className='color-muted hover-primary underline'>Beta</a>,&ensp;
        <a href='' className='color-muted hover-primary underline'>Gamma</a>
      </div>

      {/* Excerpt */}
      <div data-test='excerpt' className='wp-content pt1 pb4' dangerouslySetInnerHTML={{ __html: sanitize(excerpt) }} />

      {/* Post Link */}
      <Link data-test='post-link' to={`/post/${id}`} className='button-primary mb5'>Read More</Link>

      {/* Divider */}
      <div className='divider center w-third bg-color-muted' />
    </div>

    <style jsx>{`
      .divider { height: 2px; }
    `}</style>
  </section>
}

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  modified: PropTypes.instanceOf(Date),
  featuredMedia: PropTypes.shape({
    altText: PropTypes.string.isRequired,
    fullSrc: PropTypes.string.isRequired,
    mediumLargeSrc: PropTypes.string,
    largeSrc: PropTypes.string,
  }),
}

export default PostItem

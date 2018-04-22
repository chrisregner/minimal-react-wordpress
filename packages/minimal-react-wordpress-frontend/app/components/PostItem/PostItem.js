import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import pipe from 'ramda/src/pipe'

import { colorAccent, bgColorPrimary } from 'app/components/GlobalStyles'
import sanitize from 'app/utils/sanitizeDom'
import format from 'date-fns/format'
import TagCloud from 'app/components/TagCloud'

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

const PostItem = ({ id, title, content, modified, date, featuredMedia, tags, hasReadMore }) => {
  const imageProps = featuredMedia && createImageProps(featuredMedia)

  return <section className='pb5'>
    {/* Featured Image */}
    {featuredMedia &&
      <Link data-test='featured-media-link' to={`/post/${id}`} className='db nl3 nr3 nl4-m nr4-m nl5-l nr5-l shadow-1 shadow-hover-2'>
        <img
          data-test='featured-media'
          className='mb4'
          sizes='100%'
          {...imageProps}
        />
      </Link>}

    <div className='ph3 ph4-ns'>
      {/* Title */}
      <Link data-test='title-link' to={`/post/${id}`} className='hover-muted'>
        <h2 data-test='title' className='mb3 mb2-ns f2' dangerouslySetInnerHTML={{ __html: cleanHtml(title) }} />
      </Link>

      <div className='pt1 pb3 f7 font-title color-muted tracked ttu'>
        {/* Date */}
        <span data-test='date'>
          {modified ? 'updated' : 'created'}&ensp;
          {format(modified || date, 'MMM D, YYYY')}
        </span>

        {/* Tags */}
        {tags && tags.length > 0 &&
          <React.Fragment>
            &ensp;<b>&middot;</b>&ensp;
            <TagCloud data-test='tags' tags={tags} />
          </React.Fragment>}
      </div>

      {/* Excerpt */}
      <div data-test='content' className='wp-content pt1 mb4' dangerouslySetInnerHTML={{ __html: cleanHtml(content) }} />

      {/* Post Link */}
      {hasReadMore !== false && <Link data-test='read-more-link' to={`/post/${id}`} className='button-primary'>Read More</Link>}

      {/* Divider */}
      <div className='divider mt5 center w-third bg-color-muted' />
    </div>

    <style jsx>{`
      .divider { height: 2px; }

      {/**
        * WordPress content styles
        */}
      .wp-content > :global(*:first-child) { margin-top: 0 !important; }
      .wp-content > :global(*:last-child) { margin-bottom: 0 !important; }

      .wp-content :global(h1),
      .wp-content :global(h2),
      .wp-content :global(h3),
      .wp-content :global(h4),
      .wp-content :global(h5),
      .wp-content :global(h6) {
        margin: 1.6rem 0;
        line-height: 1.2;
      }

      .wp-content :global(p) { margin: 1.6rem 0; }
      .wp-content :global(img) { margin: 1.6rem auto; }
      .wp-content :global(a) { text-decoration: underline; }

      .wp-content :global(blockquote) {
        margin: 1.8rem 0;
        border-left: 3px solid ${colorAccent};
        padding: 1.6rem;
        background-color: ${bgColorPrimary};
        color: #555555;
      }

      .wp-content :global(blockquote) > :global(*:first-child) { margin-top: 0 !important; }
      .wp-content :global(blockquote) > :global(*:last-child) { margin-bottom: 0 !important; }

      .wp-content :global(ul),
      .wp-content :global(ol) {
        margin: 1.8rem 0;
        padding: 0 0 0 1.2em;
      }

      .wp-content :global(hr)::before { content: '* * *'; }
      .wp-content :global(hr) {
        margin: 2.5rem 0;
        border: none;
        height: 1em;
        text-align: center;
        font-size: 1.2rem;
      }


    `}</style>
  </section>
}

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  modified: PropTypes.instanceOf(Date),
  tags: PropTypes.arrayOf(PropTypes.object),
  hasReadMore: PropTypes.bool,
  featuredMedia: PropTypes.shape({
    altText: PropTypes.string.isRequired,
    fullSrc: PropTypes.string.isRequired,
    mediumLargeSrc: PropTypes.string,
    largeSrc: PropTypes.string,
  }),
}

/**
 * Internal Functions
 */

const removeEmptyTags = str => str.replace(/<[^\/>][^>]*><\/[^>]+>/gim, '') // eslint-disable-line no-useless-escape
const cleanHtml = pipe(sanitize, removeEmptyTags)

export default PostItem

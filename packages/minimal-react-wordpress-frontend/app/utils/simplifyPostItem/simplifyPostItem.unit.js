import { describe, it } from 'mocha'
import { assert } from 'chai'
import path from 'ramda/src/path'
import pipe from 'ramda/src/pipe'

import { generateRawPostItem } from 'app/test'
import simplifyPostItem from './simplifyPostItem'

describe('utils/simplifyPostItem()', () => {
  it('should return the posts and its basic details', () => {
    const post = generateRawPostItem()
    const expected = {
      id: post.id,
      date: new Date(post.date),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
    }

    const actual = simplifyPostItem(post)

    assert.deepEqual(actual, expected)
  })

  it('should return the modified date, if any, along with the post’s basic details', () => {
    const post = generateRawPostItem({ hasModifiedDate: true })
    const expected = {
      id: post.id,
      date: new Date(post.date),
      modified: new Date(post.modified),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
    }

    const actual = simplifyPostItem(post)

    assert.deepEqual(actual, expected)
  })

  const featuredMediaPath = path(['_embedded', 'wp:featuredmedia', 0])
  const featuredMediaSizesPath = pipe(
    featuredMediaPath,
    path(['media_details', 'sizes']),
  )

  it('should return the featured media, if any, along with the post’s basic details', () => {
    const post = generateRawPostItem({ hasFeaturedMedia: true })
    const expected = {
      id: post.id,
      date: new Date(post.date),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      featuredMedia: {
        altText: featuredMediaPath(post).alt_text,
        mediumLargeSrc: featuredMediaSizesPath(post).medium_large.source_url,
        largeSrc: featuredMediaSizesPath(post).large.source_url,
        fullSrc: featuredMediaSizesPath(post).full.source_url,
      },
    }

    const actual = simplifyPostItem(post)

    assert.deepEqual(actual, expected)
  })

  it('should be able to handle featured media without medium-large source', () => {
    const post = generateRawPostItem({ hasFeaturedMedia: true })

    delete featuredMediaSizesPath(post).medium_large

    const expected = {
      id: post.id,
      date: new Date(post.date),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      featuredMedia: {
        altText: featuredMediaPath(post).alt_text,
        largeSrc: featuredMediaSizesPath(post).large.source_url,
        fullSrc: featuredMediaSizesPath(post).full.source_url,
      },
    }

    const actual = simplifyPostItem(post)

    assert.deepEqual(actual, expected)
  })

  it('should be able to handle featured media without large source', () => {
    const post = generateRawPostItem({ hasFeaturedMedia: true })

    delete featuredMediaSizesPath(post).large

    const expected = {
      id: post.id,
      date: new Date(post.date),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      featuredMedia: {
        altText: featuredMediaPath(post).alt_text,
        mediumLargeSrc: featuredMediaSizesPath(post).medium_large.source_url,
        fullSrc: featuredMediaSizesPath(post).full.source_url,
      },
    }

    const actual = simplifyPostItem(post)

    assert.deepEqual(actual, expected)
  })

  it('should return the tag ids, if any, along with the post’s basic details', () => {
    const post = generateRawPostItem({ hasTags: true })
    const tagsPath = path(['_embedded', 'wp:term', 1])

    const expected = {
      id: post.id,
      date: new Date(post.date),
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      tags: tagsPath(post).map(tag => tag.id),
    }

    const actual = simplifyPostItem(post)

    assert.deepEqual(actual, expected)
  })
})

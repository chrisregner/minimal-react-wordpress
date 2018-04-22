import React from 'react'
import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { Link } from 'react-router-dom'

import {
  makeSetupComponentTest,
  findTestComponent as find,
  generatePostItem,
  generateTags,
} from 'app/test'
import TagCloud from 'app/components/TagCloud'
import PostItem from './PostItem'

describe('components/PostList/components/PostItem', () => {
  let setup

  before(() => {
    setup = makeSetupComponentTest({
      Component: PostItem,
      props: generatePostItem(),
    })
  })

  it('should render the sanitized title', () => {
    (() => {
      const props = { title: '<div>foo<script>alert(0)</script></div>' }
      assert.include(
        find(setup({ props }), 'title').html(),
        '<div>foo</div>'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { title: '<div>bar<script>alert(0)</script></div>' }
      assert.include(
        find(setup({ props }), 'title').html(),
        '<div>bar</div>'
      )
    })()
  })

  it('should render the title without empty tags', () => {
    (() => {
      const props = { title: '<div>foo<div></div></div>' }
      assert.include(
        find(setup({ props }), 'title').html(),
        '<div>foo</div>'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { title: '<div>bar<p></p></div>' }
      assert.include(
        find(setup({ props }), 'title').html(),
        '<div>bar</div>'
      )
    })()
  })

  it('should render title with link wrapper', () => {
    const testWith = ({ postId, title }) => {
      const props = { id: postId, title }
      const titleLinkWrpr = find(setup({ props }), 'title-link')

      assert.isTrue(titleLinkWrpr.is(Link))
      assert.equal(titleLinkWrpr.prop('to'), `/post/${postId}`)
    }

    testWith({ postId: 123, title: '<div>foo</div>' })
    testWith({ postId: 456, title: '<div>bar</div>' })
  })

  it('should render the sanitized content', () => {
    (() => {
      const props = { content: '<div>foo<script>alert(0)</script></div>' }
      assert.include(
        find(setup({ props }), 'content').html(),
        '<div>foo</div>'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { content: '<div>bar<script>alert(0)</script></div>' }
      assert.include(
        find(setup({ props }), 'content').html(),
        '<div>bar</div>'
      )
    })()
  })

  it('should render the content without empty tags', () => {
    (() => {
      const props = { content: '<div>foo<div></div></div>' }
      assert.include(
        find(setup({ props }), 'content').html(),
        '<div>foo</div>'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { content: '<div>bar<p></p></div>' }
      assert.include(
        find(setup({ props }), 'content').html(),
        '<div>bar</div>'
      )
    })()
  })

  it('should render the created date, if there is NO modied date', () => {
    (() => {
      const props = { date: new Date(2018, 2, 15) }
      assert.include(
        find(setup({ props }), 'date').text(),
        'Mar 15, 2018'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { date: new Date(1998, 5, 1) }
      assert.include(
        find(setup({ props }), 'date').text(),
        'Jun 1, 1998'
      )
    })()
  })

  it('should render the modified date in place of created date, if any', () => {
    (() => {
      const props = { modified: new Date(2018, 2, 15) }
      assert.include(
        find(setup({ props }), 'date').text(),
        'Mar 15, 2018'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { modified: new Date(1998, 5, 1) }
      assert.include(
        find(setup({ props }), 'date').text(),
        'Jun 1, 1998'
      )
    })()
  })

  it('should indicate that rendered date is creation date and NOT modified, if there is no modified date', () => {
    (() => {
      const props = { date: new Date(2018, 2, 15) }
      const date = find(setup({ props }), 'date').text()
      assert.include(date, 'created')
      assert.notInclude(date, 'updated')
    })(); // eslint-disable-line semi

    (() => {
      const props = { date: new Date(1998, 5, 1) }
      const date = find(setup({ props }), 'date').text()
      assert.include(date, 'created')
      assert.notInclude(date, 'updated')
    })()
  })

  it('should indicate that rendered date is modified date and not CREATED, if any', () => {
    (() => {
      const props = { modified: new Date(2018, 2, 15) }
      const date = find(setup({ props }), 'date').text()
      assert.include(date, 'updated')
      assert.notInclude(date, 'created')
    })(); // eslint-disable-line semi

    (() => {
      const props = { modified: new Date(1998, 5, 1) }
      const date = find(setup({ props }), 'date').text()
      assert.include(date, 'updated')
      assert.notInclude(date, 'created')
    })()
  })

  it('should render read-more-link', () => {
    const testWith = ({ postId }) => {
      const props = { id: postId }
      const readMoreWrpr = find(setup({ props }), 'read-more-link')

      assert.isTrue(readMoreWrpr.is(Link))
      assert.equal(readMoreWrpr.prop('to'), `/post/${postId}`)
    }

    testWith({ postId: 123 })
    testWith({ postId: 456 })
  })

  it('should NOT render read-more-link when hasReadMore prop is false', () => {
    const testWith = ({ postId }) => {
      const props = { id: postId, hasReadMore: false }
      const readMoreWrpr = find(setup({ props }), 'read-more-link')

      assert.equal(readMoreWrpr.length, 0)
    }

    testWith({ postId: 123 })
    testWith({ postId: 456 })
  })

  it('should render featured media with link wrapper', () => {
    const testWith = (postId) => {
      const featuredMedia = {
        'altText': '',
        'mediumLargeSrc': '',
        'largeSrc': '',
        'fullSrc': '',
      }

      const props = { id: postId, featuredMedia }
      const imageLinkWrpr = find(setup({ props }), 'featured-media-link')

      assert.isTrue(imageLinkWrpr.is(Link))
      assert.equal(imageLinkWrpr.prop('to'), `/post/${postId}`)
    }

    testWith(123)
    testWith(456)
  })

  it('should render a responsive featured media with alt text, if any', () => {
    const featuredMedia = {
      'altText': 'foo',
      'mediumLargeSrc': 'source/to/medium-large-foo-img-768w.jpg',
      'largeSrc': 'source/to/large-foo-img-1024w.jpg',
      'fullSrc': 'source/to/full.jpg',
    }

    const props = { featuredMedia }
    const imageWrpr = find(setup({ props }), 'featured-media')

    assert.isTrue(
      imageWrpr.matchesElement(
        <img
          srcSet='source/to/medium-large-foo-img-768w.jpg 768w,source/to/large-foo-img-1024w.jpg 1024w'
          src='source/to/large-foo-img-1024w.jpg'
          alt='foo'
        />
      )
    )
  })

  it('should be able to handle featured images without largeSrc', () => {
    const featuredMedia = {
      'altText': 'foo',
      'mediumLargeSrc': 'source/to/medium-large-foo-img-768w.jpg',
      'fullSrc': 'source/to/full.jpg',
    }

    const props = { featuredMedia }
    const imageWrpr = find(setup({ props }), 'featured-media')

    assert.isTrue(
      imageWrpr.matchesElement(
        <img
          srcSet='source/to/medium-large-foo-img-768w.jpg 768w,source/to/full.jpg 1024w'
          src='source/to/full.jpg'
          alt='foo'
        />
      )
    )
  })

  it('should be able to handle featured images without largeSrc and mediumLargeSrc', () => {
    const featuredMedia = {
      'altText': 'foo',
      'fullSrc': 'source/to/full.jpg',
    }

    const props = { featuredMedia }
    const imageWrpr = find(setup({ props }), 'featured-media')

    assert.isTrue(
      imageWrpr.matchesElement(
        <img
          src='source/to/full.jpg'
          alt='foo'
        />
      )
    )
  })

  it('should render tags with correct props and component', () => {
    const tags = generateTags().map(tags => ({
      toggleTag: () => {},
      isActive: false,
    }))
    const props = { tags }
    const tagsWrpr = find(setup({ props }), 'tags')

    assert.isTrue(tagsWrpr.is(TagCloud))
    assert.equal(tagsWrpr.prop('tags'), tags)
  })
})

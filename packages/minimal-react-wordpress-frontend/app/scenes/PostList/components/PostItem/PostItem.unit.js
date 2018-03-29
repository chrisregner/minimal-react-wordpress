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

  it('should render the excerpt', () => {
    (() => {
      const props = { excerpt: '<div>foo<script>alert(0)</script></div>' }
      assert.include(
        find(setup({ props }), 'excerpt').html(),
        '<div>foo</div>'
      )
    })(); // eslint-disable-line semi

    (() => {
      const props = { excerpt: '<div>bar<script>alert(0)</script></div>' }
      assert.include(
        find(setup({ props }), 'excerpt').html(),
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

  it('should render 3 post links when there is featured media', () => {
    const props = {
      id: 123,
      featuredMedia: {
        altText: '',
        fullSrc: '',
      },
    }

    const postLinks = find(setup({ props }), 'post-link')

    assert.equal(postLinks.length, 3)
    postLinks.forEach((link) => {
      assert.equal(link.prop('to'), '/post/123')
      assert.isTrue(link.is(Link))
    })
  })

  it('should render 2 post links when there is NO featured media', () => {
    const props = {
      id: 123,
    }

    const postLinks = find(setup({ props }), 'post-link')

    assert.equal(postLinks.length, 2)
    postLinks.forEach((link) => {
      assert.equal(link.prop('to'), '/post/123')
      assert.isTrue(link.is(Link))
    })
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

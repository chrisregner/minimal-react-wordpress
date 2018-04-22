import React from 'react'
import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { Link, MemoryRouter } from 'react-router-dom'

import {
  findTestComponent as find,
  testSubComponents as testSubCmpts,
  makeSetupComponentTest,
  generatePostItem,
} from 'app/test'

import Warning from 'app/components/Warning'
import PostItem from 'app/components/PostItem'
import PostPage from './PostPage'

describe('components/PostPage', () => {
  let setup, setupWithoutDive
  before(() => {
    const props = { status: 'loading', location: {} }
    setupWithoutDive = makeSetupComponentTest({
      Component: props =>
        <MemoryRouter>
          <PostPage {...props} />
        </MemoryRouter>,
      props,
    })

    setup = (...args) => setupWithoutDive(...args)
      .find(PostPage)
      .dive() // dive into PostPage itself
      .dive() // dive past the PostPage's MainSection wrapper
  })

  it('should render correct props when status is "loading" and there is NO post', () => {
    const props = { status: 'loading' }
    const wrapper = setup({ props })

    testSubCmpts(wrapper, {
      'loader': 1,
      'error': 0,
      'post': 0,
    })
  })

  it('should render correct props when status is "loaded-post" and there is post', () => {
    const fakePost = generatePostItem()
    const props = { status: 'loaded-post', post: fakePost }
    const wrapper = setup({ props })

    testSubCmpts(wrapper, {
      'loader': 0,
      'error': 0,
      'post': [1, (postWrapper) => {
        assert.isTrue(postWrapper.is(PostItem), 'post should be a <PostItem /> component')
        assert.deepInclude(postWrapper.props(), fakePost, 'post should have post as props')
      }],
    })
  })

  it('should render correct props when there is error and there is NO post', () => {
    const testWith = ({ error }) => {
      const props = { status: 'error', error }
      const wrapper = setup({ props })

      testSubCmpts(wrapper, {
        'loader': 0,
        'post': 0,
        'error': [1, (errorWrapper) => {
          assert.isTrue(errorWrapper.is(Warning), 'error should be a <Warning /> component')
          assert.include(errorWrapper.dive().text(), error.message, 'error should render error message')
        }],
      })
    }

    testWith({ error: new Error('some error') })
    testWith({ error: new Error('some other error') })
  })

  it('should render next link, if any', () => {
    const testWith = (next) => {
      const fakePost = {
        ...generatePostItem(),
        url: '',
        next,
      }
      const props = { post: fakePost }
      const nextLink = find(setupWithoutDive({ props, useMount: true }), 'next-link')
        .find(Link) // choose the <Link /> over <a /> (there will be two matches)

      assert.equal(nextLink.prop('to'), `/post/${next.id}`)
      assert.include(nextLink.html(), next.title)
      assert.isTrue(nextLink.is(Link))
    }

    testWith({ id: 123, title: 'some next link' })
    testWith({ id: 456, title: 'some other next link' })
  })

  it('should render prev link, if any', () => {
    const testWith = (prev) => {
      const fakePost = {
        ...generatePostItem(),
        url: '',
        prev,
      }
      const props = { post: fakePost }
      const prevLink = find(setupWithoutDive({ props, useMount: true }), 'prev-link')
        .find(Link) // choose the <Link /> over <a /> (there will be two matches)

      assert.equal(prevLink.prop('to'), `/post/${prev.id}`)
      assert.include(prevLink.html(), prev.title)
      assert.isTrue(prevLink.is(Link))
    }

    testWith({ id: 123, title: 'some prev link' })
    testWith({ id: 456, title: 'some other prev link' })
  })
})

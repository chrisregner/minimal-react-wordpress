import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import {
  makeSetupComponentTest,
  generatePostList,
  testSubComponents,
  findTestComponent as find,
} from 'app/test'

import Warning from 'app/components/Warning'
import PostItem from 'app/components/PostItem'
import PostList from './PostList'

describe('scenes/PostList/PostListComponent', () => {
  let setup, loadMoreTd, clearSearchTd

  before(() => {
    loadMoreTd = td.func()
    clearSearchTd = td.func()

    const setupWithoutDive = makeSetupComponentTest({
      Component: PostList,
      props: { loadMore: loadMoreTd, clearSearch: clearSearchTd },
    })

    setup = (...args) => setupWithoutDive(...args).dive()
  })

  afterEach(td.reset)

  it('should render post list when there are posts', () => {
    const postList = generatePostList()
    const postItems = find(setup({ props: { postList } }), 'post-item')

    postItems.forEach((postItem, i) => {
      assert.include(
        postItem.props(),
        postList[i],
        'post-item should have the correct props'
      )

      assert.isTrue(
        postItem.is(PostItem),
        'post-item should be the correct component'
      )
    })
  })
  it('should render the correct component when status is "loading"', () => {
    const props = { status: 'loading' }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'loader': 1,
      'load-more-btn': 0,
      'error': 0,
      'no-more-post-msg': 0,
      'no-more-match-msg': 0,
      'no-post-msg': 0,
      'no-match-msg': 0,
    })
  })

  it('should render the correct component when status is "can-load"', () => {
    const props = { status: 'can-load' }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'loader': 0,
      'load-more-btn': [1, (loadMoreBtn) => {
        td.verify(loadMoreTd(), { times: 0, ignoreExtraArgs: true })
        loadMoreBtn.simulate('click')
        td.verify(loadMoreTd(), { times: 1, ignoreExtraArgs: true })
        loadMoreBtn.simulate('click')
        td.verify(loadMoreTd(), { times: 2, ignoreExtraArgs: true })
      }],
      'error': 0,
      'no-more-post-msg': 0,
      'no-more-match-msg': 0,
      'no-post-msg': 0,
      'no-match-msg': 0,
    })
  })

  it('should render the correct component when status is "error"', () => {
    const testWith = (errMsg) => {
      const props = { status: 'error', error: new Error(errMsg) }
      const wrapper = setup({ props })

      testSubComponents(wrapper, {
        'loader': 0,
        'load-more-btn': 0,
        'error': [1, (error) => {
          error.dive().text()
          assert.isTrue(error.is(Warning), 'error should be a <Warning /> component')
          assert.include(error.dive().text(), errMsg, 'error should render error message')
        }],
        'no-more-post-msg': 0,
        'no-more-match-msg': 0,
        'no-post-msg': 0,
        'no-match-msg': 0,
      })
    }

    testWith('some error message')
    testWith('some other error message')
  })

  it('should render the correct component when status is "no-more-post"', () => {
    const props = { status: 'no-more-post' }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'loader': 0,
      'load-more-btn': 0,
      'error': 0,
      'no-more-post-msg': 1,
      'no-more-match-msg': 0,
      'no-post-msg': 0,
      'no-match-msg': 0,
    })
  })

  it('should render the correct component when status is "no-more-match"', () => {
    const props = { status: 'no-more-match' }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'loader': 0,
      'load-more-btn': 0,
      'error': 0,
      'no-more-post-msg': 0,
      'no-more-match-msg': 1,
      'no-post-msg': 0,
      'no-match-msg': 0,
    })
  })

  it('should render the correct component when status is "no-post"', () => {
    const props = { status: 'no-post' }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'loader': 0,
      'load-more-btn': 0,
      'error': 0,
      'no-more-post-msg': 0,
      'no-more-match-msg': 0,
      'no-post-msg': [1, (noPostMsg) => {
        assert.isTrue(noPostMsg.is(Warning), 'no-post-msg should be a <Warning /> component')
      }],
      'no-match-msg': 0,
    })
  })

  it('should render the correct component when status is "no-match"', () => {
    const props = { status: 'no-match' }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'loader': 0,
      'load-more-btn': 0,
      'error': 0,
      'no-more-post-msg': 0,
      'no-more-match-msg': 0,
      'no-post-msg': 0,
      'no-match-msg': [1, (noMatchMsg) => {
        assert.isTrue(noMatchMsg.is(Warning), 'no-match-msg should be a <Warning /> component')

        // assert that clear search is called when clear-search-btn is clicked
        const clearSearchBtn = find(noMatchMsg, 'clear-search-btn')
        td.verify(clearSearchTd(), { times: 0, ignoreExtraArgs: true })
        clearSearchBtn.simulate('click')
        td.verify(clearSearchTd(), { times: 1, ignoreExtraArgs: true })
        clearSearchBtn.simulate('click')
        td.verify(clearSearchTd(), { times: 2, ignoreExtraArgs: true })
      }],
    })
  })
})

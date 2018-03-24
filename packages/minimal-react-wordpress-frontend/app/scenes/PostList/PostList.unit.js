import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import {
  makeSetupComponentTest,
  generatePostList,
  testSubComponents,
  findTestComponent as find,
} from 'app/test'
import PostItem from './components/PostItem'
import PostList from './PostList'

describe('scenes/PostList/PostListComponent', () => {
  let setup, loadMoreTd

  before(() => {
    loadMoreTd = td.func()
    setup = makeSetupComponentTest({
      Component: PostList,
      props: { loadMore: loadMoreTd },
    })
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
      'load-more-btn': [1, (button) => {
        td.verify(loadMoreTd(), { times: 0, ignoreExtraArgs: true })
        button.simulate('click')
        td.verify(loadMoreTd(), { times: 1, ignoreExtraArgs: true })
        button.simulate('click')
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
          const actual = error.dive().text()
          const expected = errMsg
          assert.include(actual, expected)
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
      'no-post-msg': 1,
      'no-match-msg': 0,
    })
  })

  it('TODO: no-match call to action (e.g. clear search)')
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
      'no-match-msg': 1,
    })
  })
})

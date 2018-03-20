import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import {
  makeSetupComponentTest,
  generatePostList,
  testSubComponents,
} from 'app/test'
import PostItem from './components/PostItem'
import PostList from './PostList'

describe('scenes/PostList/PostListComponent', () => {
  let setup, loadMoreTd

  before(() => {
    loadMoreTd = td.func()
    setup = makeSetupComponentTest({
      Component: PostList,
      props: {
        isLoading: false,
        loadMore: loadMoreTd,
      },
    })
  })

  afterEach(() => {
    td.reset()
  })

  it('should render the correct components, when there is NO error', () => {
    const postList = generatePostList()
    const wrapper = setup({ props: { postList } })

    testSubComponents(wrapper, {
      'post-item': [10, (postItems) => {
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
      }],
      'load-more-btn': [1, (loadMoreBtn) => {
        assert.equal(td.explain(loadMoreTd).callCount, 0, 'loadMore() should not be called by default')
        loadMoreBtn.simulate('click')
        td.verify(loadMoreTd())
      }],
      'error': 0,
      'loader': 0,
      'no-more-post': 0,
    })
  })

  it('should render the correct components, when there is error', () => {
    const props = { error: new Error('foobar') }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'error': [1, (error) => {
        assert.include(error.text(), 'foobar', 'error should render the error msg')
      }],
      'load-more-btn': 0,
      'loader': 0,
      'no-more-post': 0,
    })
  })

  it('should render the correct components, when loading', () => {
    const props = { isLoading: true }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'error': 0,
      'load-more-btn': 0,
      'loader': 1,
      'no-more-post': 0,
    })
  })

  it('should render the correct components, when there is NO more post and it is NOT loading', () => {
    const props = { isThereMorePost: false }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'error': 0,
      'load-more-btn': 0,
      'loader': 0,
      'no-more-post': 1,
    })
  })

  it('should render the correct components, when there is NO more post and it is loading', () => {
    const props = { isThereMorePost: false, isLoading: true }
    const wrapper = setup({ props })

    testSubComponents(wrapper, {
      'error': 0,
      'load-more-btn': 0,
      'loader': 1,
      'no-more-post': 0,
    })
  })
})

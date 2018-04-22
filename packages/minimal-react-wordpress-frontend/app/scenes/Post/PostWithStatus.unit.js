import { describe, it, before } from 'mocha'
import { assert } from 'chai'

import {
  testSubComponents as testSubCmpts,
  makeSetupComponentTest,
  generatePostItem,
} from 'app/test'

import Warning from 'app/components/Warning'
import PostItem from 'app/components/PostItem'
import PostWithStatus from './PostWithStatus'

describe('scenes/Post/PostWithStatus', () => {
  let setup
  before(() => {
    const setupWithoutDive = makeSetupComponentTest({
      Component: PostWithStatus,
    })

    setup = (...args) => setupWithoutDive(...args).dive()
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
})

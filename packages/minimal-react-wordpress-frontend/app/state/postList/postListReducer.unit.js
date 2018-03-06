import { describe } from 'mocha'
import { assert } from 'chai'
import { call } from 'ramda'

import postListReducer from './postListReducer'
import * as actions from './postListActions'

describe('state/postListReducer', () => {
  describe('fetchPostList()', () => {
    const { fetchPostList } = actions

    it('should set page to 1', () => {
      const actual = postListReducer({}, fetchPostList()).page
      assert.equal(actual, 1)
    })

    it('should set isLoading to true', () => {
      const actual = postListReducer({}, fetchPostList()).isLoading
      assert.isTrue(actual)
    })
  })

  describe('fetchMorePostList()', () => {
    const { fetchMorePostList } = actions

    it('should increment page by 1', () => {
      call(() => {
        const initialState = { page: 1 }
        const actual = postListReducer(initialState, fetchMorePostList()).page
        assert.equal(actual, 2)
      })

      call(() => {
        const initialState = { page: 10 }
        const actual = postListReducer(initialState, fetchMorePostList()).page
        assert.equal(actual, 11)
      })
    })

    it('should set isLoading to true', () => {
      const { fetchMorePostList } = actions

      call(() => {
        const initialState = { page: 1, isLoading: false }
        const actual = postListReducer(initialState, fetchMorePostList()).isLoading
        assert.isTrue(actual)
      })

      call(() => {
        const initialState = { page: 10, isLoading: true }
        const actual = postListReducer(initialState, fetchMorePostList()).isLoading
        assert.isTrue(actual,)
      })
    })
  })

  const makeSamplePayload = (payloadPart) => ({
    posts: [],
    totalPages: 0,
    ...payloadPart
  })

  describe('setPostList()', () => {
    const { setPostList } = actions

    it('should set posts', () => {
      call(() => {
        const initialState = {}
        const payload = makeSamplePayload({ posts: ['foo'] })
        const actual = postListReducer(initialState, setPostList(payload)).posts
        assert.deepEqual(actual, ['foo'])
      })

      call(() => {
        const initialState = { posts: ['bar'] }
        const payload = makeSamplePayload({ posts: ['baz'] })
        const actual = postListReducer(initialState, setPostList(payload)).posts
        assert.deepEqual(actual, ['baz'])
      })
    })

    it('should set totalPages', () => {
      call(() => {
        const initialState = {}
        const payload = makeSamplePayload({ totalPages: 10 })
        const actual =
          postListReducer(initialState, setPostList(payload)).totalPages
        assert.equal(actual, 10)
      })

      call(() => {
        const initialState = { totalPages: 10 }
        const payload = makeSamplePayload({ totalPages: 20 })
        const actual =
          postListReducer(initialState, setPostList(payload)).totalPages
        assert.equal(actual, 20)
      })
    })

    it('should set isLoading to false', () => {
      call(() => {
        const initialState = {}
        const payload = makeSamplePayload()
        const actual = postListReducer(initialState, setPostList(payload)).isLoading
        assert.isFalse(actual)
      })

      call(() => {
        const initialState = { isLoading: true }
        const payload = makeSamplePayload()
        const actual = postListReducer(initialState, setPostList(payload)).isLoading
        assert.isFalse(actual)
      })
    })
  })

  describe('addPostList()', () => {
    const { addPostList } = actions
    const makeSampleInitState = (initStatePart) => ({ posts: [], ...initStatePart })

    it('should set posts', () => {
      call(() => {
        const initialState = { posts: ['foo', 'bar'] }
        const payload = makeSamplePayload({ posts: ['baz', 'ketchup'] })
        const actual = postListReducer(initialState, addPostList(payload)).posts
        assert.deepEqual(actual,  ['foo', 'bar', 'baz', 'ketchup'])
      })

      call(() => {
        const initialState = { posts: ['baz', 'ketchup'] }
        const payload = makeSamplePayload({ posts: ['cats', 'dragons'] })
        const actual = postListReducer(initialState, addPostList(payload)).posts
        assert.deepEqual(actual,  ['baz', 'ketchup', 'cats', 'dragons'])
      })
    })

    it('should set totalPages', () => {
      call(() => {
        const initialState = makeSampleInitState()
        const payload = makeSamplePayload({ totalPages: 10 })
        const actual =
          postListReducer(initialState, addPostList(payload)).totalPages
        assert.equal(actual, 10)
      })

      call(() => {
        const initialState = makeSampleInitState({ totalPages: 10 })
        const payload = makeSamplePayload({ totalPages: 20 })
        const actual =
          postListReducer(initialState, addPostList(payload)).totalPages
        assert.equal(actual, 20)
      })
    })

    it('should set isLoading to false', () => {
      call(() => {
        const initialState = makeSampleInitState()
        const payload = makeSamplePayload()
        const actual = postListReducer(initialState, addPostList(payload)).isLoading
        assert.isFalse(actual)
      })

      call(() => {
        const initialState = makeSampleInitState({ isLoading: true })
        const payload = makeSamplePayload()
        const actual = postListReducer(initialState, addPostList(payload)).isLoading
        assert.isFalse(actual)
      })
    })
  })

  describe('setError()', () => {
    it('should set the error', () => {
      const { setError } = actions

      call(() => {
        const initialState = {}
        const payload = new Error('foo')
        const actual = postListReducer(initialState, setError(payload)).error
        assert.deepEqual(actual, payload)
      })

      call(() => {
        const initialState = { error: new Error('bar') }
        const payload = new Error('baz')
        const actual = postListReducer(initialState, setError(payload)).error
        assert.deepEqual(actual, payload)
      })
    })
  })
})

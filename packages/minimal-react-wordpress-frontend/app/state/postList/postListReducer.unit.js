import { describe, it } from 'mocha'
import { assert } from 'chai'
import call from 'ramda/src/call'

import postListReducer, {
  fetchPostList,
  fetchMorePostList,
  setPostList,
  addPostList,
  setError,
  getPostList,
  getIsLoading,
  getError,
  getPage,
  getIsThereMorePost,
} from './postListReducer'

describe('state/postListReducer', () => {
  describe('fetchPostList()', () => {
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
      call(() => {
        const initialState = { page: 1, isLoading: false }
        const actual = postListReducer(initialState, fetchMorePostList()).isLoading
        assert.isTrue(actual)
      })

      call(() => {
        const initialState = { page: 10, isLoading: true }
        const actual = postListReducer(initialState, fetchMorePostList()).isLoading
        assert.isTrue(actual)
      })
    })
  })

  const makeSamplePayload = payloadPart => ({
    postList: [],
    totalPages: 0,
    ...payloadPart,
  })

  describe('setPostList()', () => {
    it('should set postList', () => {
      call(() => {
        const initialState = {}
        const payload = makeSamplePayload({ postList: ['foo'] })
        const actual = postListReducer(initialState, setPostList(payload)).postList
        assert.deepEqual(actual, ['foo'])
      })

      call(() => {
        const initialState = { postList: ['bar'] }
        const payload = makeSamplePayload({ postList: ['baz'] })
        const actual = postListReducer(initialState, setPostList(payload)).postList
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
    const makeSampleInitState = initStatePart => ({ postList: [], ...initStatePart })

    it('should add postList to existing ones', () => {
      call(() => {
        const initialState = { postList: ['foo', 'bar'] }
        const payload = makeSamplePayload({ postList: ['baz', 'ketchup'] })
        const actual = postListReducer(initialState, addPostList(payload)).postList
        assert.deepEqual(actual, ['foo', 'bar', 'baz', 'ketchup'])
      })

      call(() => {
        const initialState = { postList: ['baz', 'ketchup'] }
        const payload = makeSamplePayload({ postList: ['cats', 'dragons'] })
        const actual = postListReducer(initialState, addPostList(payload)).postList
        assert.deepEqual(actual, ['baz', 'ketchup', 'cats', 'dragons'])
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

    it('should set isLoading to false', () => {
      call(() => {
        const initialState = { isLoading: true }
        const payload = new Error('foo')
        const actual = postListReducer(initialState, setError(payload)).isLoading
        assert.isFalse(actual)
      })

      call(() => {
        const initialState = { isLoading: true, error: new Error('bar') }
        const payload = new Error('baz')
        const actual = postListReducer(initialState, setError(payload)).isLoading
        assert.isFalse(actual)
      })
    })
  })
})

describe('state/postList/selectors', () => {
  describe('getPostList()', () => {
    it('should work', () => {
      assert.equal(
        getPostList({
          postList: 'foo',
          someOtherState: 'bar',
        }),
        'foo',
      )

      assert.equal(
        getPostList({
          postList: 'baz',
          someOtherState: 'ketchup',
        }),
        'baz',
      )
    })
  })

  describe('getIsLoading()', () => {
    it('should work', () => {
      assert.equal(
        getIsLoading({
          isLoading: 'foo',
          someOtherState: 'bar',
        }),
        'foo',
      )

      assert.equal(
        getIsLoading({
          isLoading: 'baz',
          someOtherState: 'ketchup',
        }),
        'baz',
      )
    })
  })

  describe('getError()', () => {
    it('should work', () => {
      assert.equal(
        getError({
          error: 'foo',
          someOtherState: 'bar',
        }),
        'foo',
      )

      assert.equal(
        getError({
          error: 'baz',
          someOtherState: 'ketchup',
        }),
        'baz',
      )
    })
  })

  describe('getPage()', () => {
    it('should work', () => {
      assert.equal(
        getPage({
          page: 'foo',
          someOtherState: 'bar',
        }),
        'foo',
      )

      assert.equal(
        getPage({
          page: 'baz',
          someOtherState: 'ketchup',
        }),
        'baz',
      )
    })
  })

  describe('getIsThereMorePost()', () => {
    it('should return true when page is lower than total pages', () => {
      assert.isTrue(
        getIsThereMorePost({
          page: 1,
          totalPages: 2,
          someOtherState: 'bar',
        }),
      )

      assert.isTrue(
        getIsThereMorePost({
          page: 5,
          totalPages: 10,
          someOtherState: 'ketchup',
        }),
      )
    })

    it('should return false when page is equal to the total pages', () => {
      assert.isFalse(
        getIsThereMorePost({
          page: 1,
          totalPages: 1,
          someOtherState: 'bar',
        }),
      )

      assert.isFalse(
        getIsThereMorePost({
          page: 10,
          totalPages: 10,
          someOtherState: 'ketchup',
        }),
      )
    })
  })
})

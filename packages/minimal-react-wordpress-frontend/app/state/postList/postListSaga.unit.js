import { describe } from 'mocha'
import { assert } from 'chai'
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'

import * as wpapi from 'app/api/wpapi'
import postListSaga from './postListSaga'
import { setPostList, fetchPostList, setError } from './postListActions'

describe('state/postListSaga', () => {
  describe('FETCH_POST_LIST', () => {
    it('should call SET_POST_LIST with correct payload on success (#1)', () => {
      const fakeResponse = {
        data: 'foo',
        headers: {
          'x-wp-totalpages': 'bar',
        }
      }

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), fakeResponse]
        ])
        .put(setPostList({ posts: 'foo', totalPages: 'bar' }))
        .dispatch(fetchPostList())
        .run()
    })

    it('should call SET_POST_LIST with correct payload on success (#1)', () => {
      const fakeResponse = {
        data: 'baz',
        headers: {
          'x-wp-totalpages': 'ketchup',
        }
      }

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), fakeResponse]
        ])
        .put(setPostList({ posts: 'baz', totalPages: 'ketchup' }))
        .dispatch(fetchPostList())
        .run()
    })

    it('should call SET_ERROR with correct payload on error (#1)', () => {
      const err = new Error('foo')

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), throwError(err)]
        ])
        .put(setError(err))
        .dispatch(fetchPostList())
        .run()
    })

    it('should call SET_ERROR with correct payload on error (#2)', () => {
      const err = new Error('bar')

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), throwError(err)]
        ])
        .put(setError(err))
        .dispatch(fetchPostList())
        .run()
    })
  })

  describe('FETCH_MORE_POST_LIST', () => {
    it('should call ADD_POST_LIST with correct payload on success')
    it('should call SET_ERROR with correct payload on error')
  })
})

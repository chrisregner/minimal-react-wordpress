import { describe, it } from 'mocha'
import { call, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'

import * as wpapi from 'app/api/wpapi'
import simplifyPostList from 'app/utils/simplifyPostList'
import postListSaga from './postListSaga'
import { getPage } from 'app/state'
import { generateRawPostList } from 'app/test'
import {
  setPostList,
  addPostList,
  fetchPostList,
  fetchMorePostList,
  setError,
} from './postListReducer'

describe.skip('state/postListSaga', () => {
  describe('FETCH_POST_LIST', () => {
    it('should call SET_POST_LIST with simplified posts and other data on success (#1)', () => {
      const fakePosts = generateRawPostList(10)
      const fakeResponse = {
        data: fakePosts,
        headers: {
          'x-wp-totalpages': 10,
        },
      }

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), fakeResponse],
        ])
        .put(setPostList({ postList: simplifyPostList(fakePosts), totalPages: 10 }))
        .dispatch(fetchPostList())
        .silentRun()
    })

    it('should call SET_POST_LIST with simplified posts and other data on success (#1)', () => {
      const fakePosts = generateRawPostList(5)
      const fakeResponse = {
        data: fakePosts,
        headers: {
          'x-wp-totalpages': 5,
        },
      }

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), fakeResponse],
        ])
        .put(setPostList({ postList: simplifyPostList(fakePosts), totalPages: 5 }))
        .dispatch(fetchPostList())
        .silentRun()
    })

    it('should call SET_ERROR with correct payload on error (#1)', () => {
      const err = new Error('foo')

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), throwError(err)],
        ])
        .put(setError(err))
        .dispatch(fetchPostList())
        .silentRun()
    })

    it('should call SET_ERROR with correct payload on error (#2)', () => {
      const err = new Error('bar')

      return expectSaga(postListSaga)
        .provide([
          [call(wpapi.wpFetchPostList), throwError(err)],
        ])
        .put(setError(err))
        .dispatch(fetchPostList())
        .silentRun()
    })
  })

  describe('FETCH_MORE_POST_LIST', () => {
    it('should call ADD_POST_LIST with simplified posts and other data on success (#1)', () => {
      const fakePosts = generateRawPostList(10)
      const fakeResponse = {
        data: fakePosts,
        headers: {
          'x-wp-totalpages': 10,
        },
      }

      return expectSaga(postListSaga)
        .provide([
          [select(getPage), 2],
          [call(wpapi.wpFetchPostList, { page: 2 }), fakeResponse],
        ])
        .put(addPostList({ postList: simplifyPostList(fakePosts), totalPages: 10 }))
        .dispatch(fetchMorePostList())
        .silentRun()
    })

    it('should call ADD_POST_LIST with simplified posts and other data on success (#2)', () => {
      const fakePosts = generateRawPostList(5)
      const fakeResponse = {
        data: fakePosts,
        headers: {
          'x-wp-totalpages': 5,
        },
      }

      return expectSaga(postListSaga)
        .provide([
          [select(getPage), 5],
          [call(wpapi.wpFetchPostList, { page: 5 }), fakeResponse],
        ])
        .put(addPostList({ postList: simplifyPostList(fakePosts), totalPages: 5 }))
        .dispatch(fetchMorePostList())
        .silentRun()
    })

    it('should call SET_ERROR with correct payload on error (#1)', () => {
      const err = new Error('foo')

      return expectSaga(postListSaga)
        .provide([
          [select(getPage), 2],
          [call(wpapi.wpFetchPostList, { page: 2 }), throwError(err)],
        ])
        .put(setError(err))
        .dispatch(fetchMorePostList())
        .silentRun()
    })

    it('should call SET_ERROR with correct payload on error (#2)', () => {
      const err = new Error('bar')

      return expectSaga(postListSaga)
        .provide([
          [select(getPage), 5],
          [call(wpapi.wpFetchPostList, { page: 5 }), throwError(err)],
        ])
        .put(setError(err))
        .dispatch(fetchMorePostList())
        .silentRun()
    })
  })
})

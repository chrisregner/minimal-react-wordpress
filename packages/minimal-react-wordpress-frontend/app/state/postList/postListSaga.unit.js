import { describe, it } from 'mocha'
import { call, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'

import * as api from 'app/api/wpapi'
import * as fromState from 'app/state'
import * as fromPostList from './postList'
import simplifyPostList from 'app/utils/simplifyPostList'
import postListSaga from './postListSaga'
import { generateRawPostList } from 'app/test'

describe('state/postListSaga', () => {
  describe('*fromPostList.fetchPostList()', () => {
    it('should fetch with any relevant parameters from state and put the response with SET_POST_LIST', () => {
      // With page = 1, totalpages = 1
      const testFirstPathWith = (trigger) => {
        const fakePosts = generateRawPostList()
        const fakeResponse = {
          data: fakePosts,
          headers: {
            'x-wp-totalpages': ' 1',
          },
        }

        return expectSaga(postListSaga)
          .provide([
            [select(fromState.getPage), 1],
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getSearchTags), undefined],
            [call(api.wpFetchPostList, {
              page: 1,
              search: undefined,
              tags: undefined,
            }), fakeResponse],
          ])
          .put(fromPostList.addPostList({
            postList: simplifyPostList(fakePosts),
            totalPages: 1,
          }))
          .dispatch(trigger())
          .silentRun()
      }

      // With page = 5, totalpages = 10, some search keywords, some search tags
      const testSecondPathWith = (trigger) => {
        const fakePosts = generateRawPostList()
        const fakeResponse = {
          data: fakePosts,
          headers: {
            'x-wp-totalpages': '10',
          },
        }

        return expectSaga(postListSaga)
          .provide([
            [select(fromState.getPage), 5],
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getSearchTags), ['some', 'search', 'tags']],
            [call(api.wpFetchPostList, {
              page: 5,
              search: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            }), fakeResponse],
          ])
          .put(fromPostList.addPostList({
            postList: simplifyPostList(fakePosts),
            totalPages: 10,
          }))
          .dispatch(trigger())
          .silentRun()
      }

      return Promise.all([
        testFirstPathWith(fromPostList.fetchPostList),
        testFirstPathWith(fromPostList.fetchMorePostList),
        testFirstPathWith(fromPostList.setSearchKeyword),
        testFirstPathWith(fromPostList.addSearchTag),
        testFirstPathWith(fromPostList.removeSearchTag),
        testSecondPathWith(fromPostList.fetchPostList),
        testSecondPathWith(fromPostList.fetchMorePostList),
        testSecondPathWith(fromPostList.setSearchKeyword),
        testSecondPathWith(fromPostList.addSearchTag),
        testSecondPathWith(fromPostList.removeSearchTag),
      ])
    })

    it('should fetch and put any error with SET_ERROR', () => {
      // With page = 1, totalpages = 1, some error
      const testFirstPathWith = (trigger) => {
        const e = new Error('some error')
        return expectSaga(postListSaga)
          .provide([
            [select(fromState.getPage), 1],
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getSearchTags), undefined],
            [call(api.wpFetchPostList, {
              page: 1,
              search: undefined,
              tags: undefined,
            }), throwError(e)],
          ])
          .put(fromPostList.setError(e))
          .dispatch(trigger())
          .silentRun()
      }

      // With page = 5, totalpages = 10, some search keywords, some other error
      const testSecondPathWith = (trigger) => {
        const e = new Error('some other error')
        return expectSaga(postListSaga)
          .provide([
            [select(fromState.getPage), 5],
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getSearchTags), ['some', 'search', 'tags']],
            [call(api.wpFetchPostList, {
              page: 5,
              search: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            }), throwError(e)],
          ])
          .put(fromPostList.setError(e))
          .dispatch(trigger())
          .silentRun()
      }

      return Promise.all([
        testFirstPathWith(fromPostList.fetchPostList),
        testFirstPathWith(fromPostList.fetchMorePostList),
        testFirstPathWith(fromPostList.setSearchKeyword),
        testFirstPathWith(fromPostList.addSearchTag),
        testFirstPathWith(fromPostList.removeSearchTag),
        testSecondPathWith(fromPostList.fetchPostList),
        testSecondPathWith(fromPostList.fetchMorePostList),
        testSecondPathWith(fromPostList.setSearchKeyword),
        testSecondPathWith(fromPostList.addSearchTag),
        testSecondPathWith(fromPostList.removeSearchTag),
      ])
    })
  })
})

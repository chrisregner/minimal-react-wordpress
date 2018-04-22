import { describe, it, before, afterEach } from 'mocha'
import { call, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import td from 'testdouble'
import qs from 'query-string'
import pipeP from 'ramda/src/pipeP'

import simplifyPostItem from 'app/utils/simplifyPostItem'
import simplifyPostList from 'app/utils/simplifyPostList'
import simplifyTags from 'app/utils/simplifyTags'
import * as tu from 'app/test'
import * as api from 'app/api/wpapi'
import * as fromState from 'app/state'
import * as fromPage from './page'

describe('state/page/saga', () => {
  let fromPageSaga, historyTd, resourceObservableTd

  before(() => {
    td.reset()
    historyTd = td.replace('../../history').default
    resourceObservableTd = td.replace('../../services/resourceObservable').default
    fromPageSaga = require('./pageSaga')
  })

  afterEach(td.reset)

  describe('*fetchPostList()', () => {
    it('should fetch post list with some parameters from state and put the response', () => {
      // With page = 1, totalpages = 1
      const testVariationOne = () => {
        const fakePosts = tu.generateRawPostList()
        const fakeResponse = {
          data: fakePosts,
          headers: {
            'x-wp-totalpages': ' 1',
          },
        }

        return expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPostListPage), 1],
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getActiveSearchTagsIds), undefined],
            [call(api.fetchPostList, {
              page: 1,
              search: undefined,
              tags: undefined,
            }), fakeResponse],
          ])
          .put(fromPage.addPostList({
            postList: simplifyPostList(fakePosts),
            totalPages: 1,
          }))
          .run()
      }

      // With page = 5, totalpages = 10, some search keywords, some search tags
      const testVariationTwo = () => {
        const fakePosts = tu.generateRawPostList()
        const fakeResponse = {
          data: fakePosts,
          headers: {
            'x-wp-totalpages': '10',
          },
        }

        return expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPostListPage), 5],
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
            [call(api.fetchPostList, {
              page: 5,
              search: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            }), fakeResponse],
          ])
          .put(fromPage.addPostList({
            postList: simplifyPostList(fakePosts),
            totalPages: 10,
          }))
          .run()
      }

      return Promise.all([
        testVariationOne(),
        testVariationTwo(),
      ])
    })

    it('should fetch post list with some parameters from state and put any error', async () => {
      // With page = 1, totalpages = 1, some error
      const testVariationOne = async () => {
        const consoleErrorTd = td.replace(console, 'error')
        const e = new Error('some error')

        td.verify(consoleErrorTd(), { times: 0, ignoreExtraArgs: true })

        await expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPostListPage), 1],
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getActiveSearchTagsIds), undefined],
            [call(api.fetchPostList, {
              page: 1,
              search: undefined,
              tags: undefined,
            }), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()

        td.verify(consoleErrorTd(e), { times: 1 })
      }

      // With page = 5, totalpages = 10, some search keywords, some other error
      const testVariationTwo = async () => {
        const consoleErrorTd = td.replace(console, 'error')
        const e = new Error('some other error')

        td.verify(consoleErrorTd(), { times: 0, ignoreExtraArgs: true })

        await expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPostListPage), 5],
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
            [call(api.fetchPostList, {
              page: 5,
              search: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            }), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()

        td.verify(consoleErrorTd(e), { times: 1 })
      }

      await testVariationOne()
      await testVariationTwo()
    })
  })

  describe('*fetchPost()', () => {
    it('should fetch post with some params from payload, and put the response', () => {
      const fakePost = tu.generateRawPostItem()
      const fakeResponse = { data: fakePost }

      return expectSaga(fromPageSaga.fetchPost, { payload: 123 })
        .provide([
          [call(api.fetchPost, 123), fakeResponse],
        ])
        .put(fromPage.setPost(simplifyPostItem(fakePost)))
        .run()
    })

    it('should fetch post with some params from payload, and put and log any error', async () => {
      const testWith = async ({ e, postId }) => {
        const logTd = td.replace(console, 'error')

        td.verify(logTd(), { times: 0, ignoreExtraArgs: true })

        await expectSaga(fromPageSaga.fetchPost, { payload: postId })
          .provide([
            [call(api.fetchPost, postId), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()

        td.verify(logTd(e), { times: 1, ignoreExtraArgs: false })
        td.reset()
      }

      await testWith({
        e: new Error('some error'),
        postId: 123,
      })
      await testWith({
        e: new Error('some other error'),
        postId: 456,
      })
    })
  })

  describe('*fetchPage()', () => {
    it('should fetch page with some params from payload, and put the response', () => {
      const fakePage = tu.generateRawPostItem()
      const fakeResponse = { data: fakePage }

      return expectSaga(fromPageSaga.fetchPage, { payload: 123 })
        .provide([
          [call(api.fetchPage, 123), fakeResponse],
        ])
        .put(fromPage.setPage(simplifyPostItem(fakePage)))
        .run()
    })

    it('should fetch page with some params from payload, and put and log any error', async () => {
      const testWith = async ({ e, pageId }) => {
        const logTd = td.replace(console, 'error')

        td.verify(logTd(), { times: 0, ignoreExtraArgs: true })

        await expectSaga(fromPageSaga.fetchPage, { payload: pageId })
          .provide([
            [call(api.fetchPage, pageId), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()

        td.verify(logTd(e), { times: 1, ignoreExtraArgs: false })
        td.reset()
      }

      await testWith({
        e: new Error('some error'),
        pageId: 123,
      })
      await testWith({
        e: new Error('some other error'),
        pageId: 456,
      })
    })
  })

  describe('*fetchTags', () => {
    it('should call ro.subscribe() with correct args', () => {
      return expectSaga(fromPageSaga.fetchTags)
        .provide([
          [call(api.fetchTags), { data: [] }],
        ])
        .run()
        .then(() => {
          td.verify(resourceObservableTd.resolveResource('tags'))
        })
    })

    it('should fetch tags and put the response', () => {
      const rawTags = tu.generateRawTags()
      return expectSaga(fromPageSaga.fetchTags)
        .provide([
          [call(api.fetchTags), { data: rawTags }],
        ])
        .put(fromPage.setSearchTags(simplifyTags(rawTags)))
        .run()
    })

    it('should fetch tags and log any error', async () => {
      const testWith = async (error) => {
        const consoleErrorTd = td.replace(console, 'error')

        td.verify(consoleErrorTd(), { times: 0, ignoreExtraArgs: true })
        await expectSaga(fromPageSaga.fetchTags)
          .provide([
            [call(api.fetchTags), throwError(error)],
          ])
          .run()

        td.verify(consoleErrorTd(error), { times: 1 })
        td.reset()
      }

      await testWith(new Error('some error'))
      await testWith(new Error('some other error'))
    })
  })

  describe('*syncRoute()', () => {
    it('should push history to home if there is NO search query, current page is search, and there is NO pre-search page', () => {
      td.when(historyTd.getLocation()).thenReturn({ pathname: '/search' })
      td.verify(historyTd.push(), { times: 0, ignoreExtraArgs: true })

      return expectSaga(fromPageSaga.syncRoute)
        .provide([
          [select(fromState.getSearchKeyword), undefined],
          [select(fromState.getActiveSearchTagsIds), undefined],
        ])
        .run()
        .then(() => {
          const expectedRoute = '/'
          td.verify(historyTd.push(expectedRoute), { times: 1 })
        })
    })

    it('should push history to search if there is search query and current page is NOT search', () => {
      // with some keyword
      const testVariationOne = () => {
        td.when(historyTd.getLocation()).thenReturn({ pathname: '/some/page' })
        td.verify(historyTd.push(), { times: 0, ignoreExtraArgs: true })

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), undefined],
          ])
          .run()
          .then(() => {
            const expectedRoute = '/search?' + qs.stringify({ keyword: 'some search keyword' })
            td.verify(historyTd.push(expectedRoute), { times: 1 })
            td.reset()
          })
      }

      // with some tags
      const testVariationTwo = () => {
        td.when(historyTd.getLocation()).thenReturn({ pathname: '/some/page' })
        td.verify(historyTd.push(), { times: 0, ignoreExtraArgs: true })

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
          ])
          .run()
          .then(() => {
            const expectedRoute = '/search?' + qs.stringify({ tags: ['some', 'search', 'tags'] })
            td.verify(historyTd.push(expectedRoute), { times: 1 })
            td.reset()
          })
      }

      // with some keyword and tags
      const testVariationThree = () => {
        td.when(historyTd.getLocation()).thenReturn({ pathname: '/some/page' })
        td.verify(historyTd.push(), { times: 0, ignoreExtraArgs: true })

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
          ])
          .run()
          .then(() => {
            const expectedRoute = '/search?' + qs.stringify({
              keyword: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            })

            td.verify(historyTd.push(expectedRoute), { times: 1 })
            td.reset()
          })
      }

      return pipeP(
        testVariationOne,
        testVariationTwo,
        testVariationThree,
      )()
    })

    it('should replace history with updated query if there is search query and current page is search', () => {
      // with some keyword
      const testVariationOne = () => {
        td.when(historyTd.getLocation()).thenReturn({ pathname: '/search' })
        td.verify(historyTd.replace(), { times: 0, ignoreExtraArgs: true })

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), undefined],
          ])
          .run()
          .then(() => {
            const expectedRoute = '/search?' + qs.stringify({ keyword: 'some search keyword' })
            td.verify(historyTd.replace(expectedRoute), { times: 1 })
            td.reset()
          })
      }

      // with some tags
      const testVariationTwo = () => {
        td.when(historyTd.getLocation()).thenReturn({ pathname: '/search' })
        td.verify(historyTd.replace(), { times: 0, ignoreExtraArgs: true })

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
          ])
          .run()
          .then(() => {
            const expectedRoute = '/search?' + qs.stringify({ tags: ['some', 'search', 'tags'] })
            td.verify(historyTd.replace(expectedRoute), { times: 1 })
            td.reset()
          })
      }

      // with some keyword and tags
      const testVariationThree = () => {
        td.when(historyTd.getLocation()).thenReturn({ pathname: '/search' })
        td.verify(historyTd.replace(), { times: 0, ignoreExtraArgs: true })

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
          ])
          .run()
          .then(() => {
            const expectedRoute = '/search?' + qs.stringify({
              keyword: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            })

            td.verify(historyTd.replace(expectedRoute), { times: 1 })
            td.reset()
          })
      }

      return pipeP(
        testVariationOne,
        testVariationTwo,
        testVariationThree,
      )()
    })

    it('should push history to pre-search page if there is NO search query and current page is search', () => {
      // with some pre-search route
      const testVariationOne = [
        // sets pre-search route
        () => {
          td.when(historyTd.getLocation()).thenReturn({ pathname: '/some/page' })

          return expectSaga(fromPageSaga.syncRoute)
            .provide([
              [select(fromState.getSearchKeyword), 'some search keyword'],
              [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
            ])
            .run()
        },
        // asserts that history goes back to pre-search route
        () => {
          td.reset()
          td.when(historyTd.getLocation()).thenReturn({ pathname: '/search' })
          td.verify(historyTd.push(), { times: 0, ignoreExtraArgs: true })

          return expectSaga(fromPageSaga.syncRoute)
            .provide([
              [select(fromState.getSearchKeyword), undefined],
              [select(fromState.getActiveSearchTagsIds), undefined],
            ])
            .run()
            .then(() => {
              const expectedRoute = '/some/page'
              td.verify(historyTd.push(expectedRoute), { times: 1 })
              td.reset()
            })
        },
      ]

      // with some other pre-search route
      const testVariationTwo = [
        // sets pre-search route
        () => {
          td.when(historyTd.getLocation()).thenReturn({ pathname: '/some/other/page' })

          return expectSaga(fromPageSaga.syncRoute)
            .provide([
              [select(fromState.getSearchKeyword), 'some search keyword'],
              [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
            ])
            .run()
        },
        // asserts that history goes back to pre-search route
        () => {
          td.reset()
          td.when(historyTd.getLocation()).thenReturn({ pathname: '/search' })
          td.verify(historyTd.push(), { times: 0, ignoreExtraArgs: true })

          return expectSaga(fromPageSaga.syncRoute)
            .provide([
              [select(fromState.getSearchKeyword), undefined],
              [select(fromState.getActiveSearchTagsIds), undefined],
            ])
            .run()
            .then(() => {
              const expectedRoute = '/some/other/page'
              td.verify(historyTd.push(expectedRoute), { times: 1 })
              td.reset()
            })
        },
      ]

      return pipeP(...testVariationOne, ...testVariationTwo)()
    })

    it('should log and put any error', async () => {
      const testWith = async (error) => {
        const consoleErrorTd = td.replace(console, 'error')
        td.verify(consoleErrorTd(), { times: 0, ignoreExtraArgs: true })

        await expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), throwError(error)],
          ])
          .put(fromPage.setError(error))
          .run()

        td.verify(consoleErrorTd(error), { times: 1 })
        td.reset()
      }

      await testWith(new Error('some error'))
      await testWith(new Error('some other error'))
    })
  })
})

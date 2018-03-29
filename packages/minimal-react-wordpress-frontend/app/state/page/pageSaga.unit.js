import { describe, it, before, afterEach } from 'mocha'
import { call, select } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import td from 'testdouble'
import qs from 'query-string'
import pipeP from 'ramda/src/pipeP'

import { generateRawPostList, generateRawTags } from 'app/test'
import simplifyPostList from 'app/utils/simplifyPostList'
import simplifyTags from 'app/utils/simplifyTags'
import * as api from 'app/api/wpapi'
import * as fromState from 'app/state'
import * as fromPage from './page'

describe('state/page/saga', () => {
  let fromPageSaga, historyTd, getLocationTd

  before(() => {
    td.reset()
    historyTd = td.replace('../../history').default
    getLocationTd = td.replace('../../utils/getLocation').default

    fromPageSaga = require('./pageSaga')
  })

  afterEach(td.reset)

  describe('*fetchPostList()', () => {
    it('should fetch post list with some parameters from state and put the response', () => {
      // With page = 1, totalpages = 1
      const testVariationOne = () => {
        const fakePosts = generateRawPostList()
        const fakeResponse = {
          data: fakePosts,
          headers: {
            'x-wp-totalpages': ' 1',
          },
        }

        return expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPage), 1],
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getActiveSearchTagsIds), undefined],
            [call(api.apiFetchPostList, {
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
        const fakePosts = generateRawPostList()
        const fakeResponse = {
          data: fakePosts,
          headers: {
            'x-wp-totalpages': '10',
          },
        }

        return expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPage), 5],
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
            [call(api.apiFetchPostList, {
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

    it('should fetch post list with some parameters from state and put any error', () => {
      // With page = 1, totalpages = 1, some error
      const testVariationOne = () => {
        const e = new Error('some error')

        return expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPage), 1],
            [select(fromState.getSearchKeyword), undefined],
            [select(fromState.getActiveSearchTagsIds), undefined],
            [call(api.apiFetchPostList, {
              page: 1,
              search: undefined,
              tags: undefined,
            }), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()
      }

      // With page = 5, totalpages = 10, some search keywords, some other error
      const testVariationTwo = () => {
        const e = new Error('some other error')

        return expectSaga(fromPageSaga.fetchPostList)
          .provide([
            [select(fromState.getPage), 5],
            [select(fromState.getSearchKeyword), 'some search keyword'],
            [select(fromState.getActiveSearchTagsIds), ['some', 'search', 'tags']],
            [call(api.apiFetchPostList, {
              page: 5,
              search: 'some search keyword',
              tags: ['some', 'search', 'tags'],
            }), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()
      }

      return Promise.all([
        testVariationOne(),
        testVariationOne(),
        testVariationOne(),
        testVariationTwo(),
        testVariationTwo(),
      ])
    })
  })

  describe('*syncRoute()', () => {
    it('should push history to home if there is NO search query, current page is search, and there is NO pre-search page', () => {
      td.when(getLocationTd()).thenReturn({ pathname: '/search' })
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
        td.when(getLocationTd()).thenReturn({ pathname: '/some/page' })
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
        td.when(getLocationTd()).thenReturn({ pathname: '/some/page' })
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
        td.when(getLocationTd()).thenReturn({ pathname: '/some/page' })
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
        td.when(getLocationTd()).thenReturn({ pathname: '/search' })
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
        td.when(getLocationTd()).thenReturn({ pathname: '/search' })
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
        td.when(getLocationTd()).thenReturn({ pathname: '/search' })
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
          td.when(getLocationTd()).thenReturn({ pathname: '/some/page' })

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
          td.when(getLocationTd()).thenReturn({ pathname: '/search' })
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
          td.when(getLocationTd()).thenReturn({ pathname: '/some/other/page' })

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
          td.when(getLocationTd()).thenReturn({ pathname: '/search' })
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

    it('should put any error', () => {
      const testVariationOne = () => {
        const e = new Error('some error')

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()
      }

      const testVariationTwo = () => {
        const e = new Error('some other error')

        return expectSaga(fromPageSaga.syncRoute)
          .provide([
            [select(fromState.getSearchKeyword), throwError(e)],
          ])
          .put(fromPage.setError(e))
          .run()
      }

      return Promise.all([
        testVariationOne(),
        testVariationOne(),
        testVariationTwo(),
      ])
    })
  })

  describe('*fetchTags', () => {
    it('should fetch tags and put the response', () => {
      const rawTags = generateRawTags()
      return expectSaga(fromPageSaga.fetchTags)
        .provide([
          [call(api.apiFetchTags), { data: rawTags }],
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
            [call(api.apiFetchTags), throwError(error)],
          ])
          .run()

        td.verify(consoleErrorTd(error), { times: 1 })
        td.reset()
      }

      await testWith(new Error('some error'))
      await testWith(new Error('some other error'))
    })
  })

  describe('*fetchTags', () => {
    it('should fetch nav links and put the response')
    it('should fetch nav links and log any error')
  })
})

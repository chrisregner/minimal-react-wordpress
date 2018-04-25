import { describe, it, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import axios from 'axios'
import * as fromWpApi from './wpapi'

describe('api/wp-api', () => {
  afterEach(td.reset)

  describe('fetchPostList()', () => {
    it('should fetch post list with correct params and return the response', () => {
      const testWith = ({ params, expected }) => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress-heroku/wp-json/wp/v2/posts',
          { params: { _embed: 1, ...params } },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn(expected)

        assert.equal(fromWpApi.fetchPostList(params), expected)
      }

      testWith({
        params: undefined,
        expected: 'some post list',
      })

      testWith({
        params: { someParamKey: 'some param value' },
        expected: 'some post other list',
      })
    })
  })

  describe('fetchPage()', () => {
    it('should fetch page with correct params and return the response', () => {
      const testWith = ({ pageId, expected }) => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress-heroku/wp-json/wp/v2/pages/' + pageId,
          { params: { _embed: 1 } },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn(expected)

        assert.equal(fromWpApi.fetchPage(pageId), expected)
      }

      testWith({
        pageId: 123,
        expected: 'some page',
      })

      testWith({
        pageId: 456,
        expected: 'some other page',
      })
    })
  })

  describe('fetchTags()', () => {
    it('should fetch tags with correct params and return the response', () => {
      const testWith = (response) => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress-heroku/wp-json/wp/v2/tags',
          { params: { per_page: 100 } },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn(response)

        assert.equal(fromWpApi.fetchTags(), response)
      }

      testWith('some tags')
      testWith('some other tags')
    })
  })

  describe('fetchNavLinks()', () => {
    it('should fetch tags with correct params and return the response', () => {
      const testWith = (response) => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = 'http://localhost/minimal-react-wordpress-heroku/wp-json/wp-api-menus/v2/menu-locations/primary'

        td.when(getTd(expectedArgs))
          .thenReturn(response)

        assert.equal(fromWpApi.fetchNavLinks(), response)
      }

      testWith('some response')
      testWith('some other response')
    })
  })
})

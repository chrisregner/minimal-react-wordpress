import { describe, it, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import axios from 'axios'
import * as fromWpApi from './wpapi'

describe('api/wp-api', () => {
  afterEach(td.reset)

  describe('apiFetchPostList()', () => {
    it('should fetch post list with correct params and return the response', () => {
      const testWith = ({ params, expected }) => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts',
          { params: { _embed: 1, ...params } },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn(expected)

        assert.equal(fromWpApi.apiFetchPostList(params), expected)
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

  describe('apiFetchTags()', () => {
    it('should fetch tags with correct params and return the response', () => {
      const testWith = (response) => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress/wp-json/wp/v2/tags',
          { params: { per_page: 100 } },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn(response)

        assert.equal(fromWpApi.apiFetchTags(), response)
      }

      testWith('some tags')
      testWith('some other tags')
    })
  })
})

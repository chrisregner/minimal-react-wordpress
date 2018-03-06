import { describe, before } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import axios from 'axios'
import { call } from 'ramda'
import { wpFetchPostList } from './wpapi'

describe('api/wp-api', () => {
  describe('wpFetchPostList()', () => {
    it('should return the result of fetch called with correct arguments', () => {
      call(() => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts',
          { params: 'foo' },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn('bar')

        assert.equal(wpFetchPostList('foo'), 'bar')

        td.reset()
      })

      call(() => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts',
          { params: 'baz' },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn('ketchup')

        assert.equal(wpFetchPostList('baz'), 'ketchup')

        td.reset()
      })
    })
  })
})
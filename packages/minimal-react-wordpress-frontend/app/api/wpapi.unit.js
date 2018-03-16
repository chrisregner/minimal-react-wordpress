import { describe, it } from 'mocha'
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
          {
            params: {
              _embed: 1,
            },
          },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn('foo')

        assert.equal(wpFetchPostList(), 'foo')

        td.reset()
      })

      call(() => {
        const getTd = td.replace(axios, 'get')
        const expectedArgs = [
          'http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts',
          {
            params: {
              _embed: 1,
              foo: 'bar',
            },
          },
        ]

        td.when(getTd(...expectedArgs))
          .thenReturn('baz')

        assert.equal(wpFetchPostList({ foo: 'bar' }), 'baz')

        td.reset()
      })
    })
  })
})

import { describe, it, before, after } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import call from 'ramda/src/call'

describe('utils/simplifyPostList()', () => {
  let simplifyPostList, simplifyPostItemTd

  before(() => {
    simplifyPostItemTd = td.replace('../simplifyPostItem').default
    simplifyPostList = require('./simplifyPostList').default
  })

  after(() => {
    td.reset()
  })

  it('should return the result when the passed array is mapped with simplifyPostItem()', () => {
    call(() => {
      const rawPostList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const simplifiedPostList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

      rawPostList.forEach((rawPostItem, i) => {
        td.when(simplifyPostItemTd(rawPostItem), { ignoreExtraArgs: true })
          .thenReturn(simplifiedPostList[i])
      })

      assert.deepEqual(
        simplifyPostList(rawPostList),
        simplifiedPostList
      )
    })

    call(() => {
      const rawPostList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      const simplifiedPostList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      rawPostList.forEach((rawPostItem, i) => {
        td.when(simplifyPostItemTd(rawPostItem), { ignoreExtraArgs: true })
          .thenReturn(simplifiedPostList[i])
      })

      assert.deepEqual(
        simplifyPostList(rawPostList),
        simplifiedPostList
      )
    })
  })
})

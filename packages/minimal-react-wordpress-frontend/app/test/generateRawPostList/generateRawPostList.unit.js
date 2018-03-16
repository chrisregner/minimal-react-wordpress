import { describe, it, before, after } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import call from 'ramda/src/call'

describe('utils/generateRawPostList', () => {
  let generateRawPostList, generateRawPostItemTd

  before(() => {
    generateRawPostItemTd = td.replace('../generateRawPostItem').default
    generateRawPostList = require('./generateRawPostList').default
  })

  after(() => {
    td.reset()
  })

  it('should return an array containing returned values from calling generateRawPostItem() 10 times', () => {
    call(() => {
      const fakePostList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      td.when(generateRawPostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generateRawPostList(),
        fakePostList
      )
    })

    call(() => {
      const fakePostList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      td.when(generateRawPostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generateRawPostList(),
        fakePostList
      )
    })
  })

  it('should optionally return an array of custom length', () => {
    call(() => {
      const fakePostList = [1]
      td.when(generateRawPostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generateRawPostList(1),
        fakePostList
      )
    })

    call(() => {
      const fakePostList = ['a', 'b', 'c', 'd', 'e']
      td.when(generateRawPostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generateRawPostList(5),
        fakePostList
      )
    })
  })

  it('should be able to pass parameters to generateRawPostItem()', () => {
    call(() => {
      const fakePostList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      td.when(generateRawPostItemTd('foo')).thenReturn(...fakePostList)
      assert.deepEqual(
        generateRawPostList(10, 'foo'),
        fakePostList
      )
    })

    call(() => {
      const fakePostList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      td.when(generateRawPostItemTd('bar')).thenReturn(...fakePostList)
      assert.deepEqual(
        generateRawPostList(10, 'bar'),
        fakePostList
      )
    })
  })
})

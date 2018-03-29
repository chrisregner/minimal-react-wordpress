import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import call from 'ramda/src/call'

describe('test/generatePostList', () => {
  let generatePostList, generatePostItemTd

  before(() => {
    generatePostItemTd = td.replace('../generatePostItem').default
    generatePostList = require('./generatePostList').default
  })

  afterEach(td.reset)

  it('should return an array containing returned values from calling generatePostItem() 10 times', () => {
    call(() => {
      const fakePostList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      td.when(generatePostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generatePostList(),
        fakePostList
      )
    })

    call(() => {
      const fakePostList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      td.when(generatePostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generatePostList(),
        fakePostList
      )
    })
  })

  it('should optionally return an array of custom length', () => {
    call(() => {
      const fakePostList = [1]
      td.when(generatePostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generatePostList(1),
        fakePostList
      )
    })

    call(() => {
      const fakePostList = ['a', 'b', 'c', 'd', 'e']
      td.when(generatePostItemTd(undefined)).thenReturn(...fakePostList)
      assert.deepEqual(
        generatePostList(5),
        fakePostList
      )
    })
  })

  it('should be able to pass parameters to generatePostItem()', () => {
    call(() => {
      const fakePostList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      td.when(generatePostItemTd('foo')).thenReturn(...fakePostList)
      assert.deepEqual(
        generatePostList(10, 'foo'),
        fakePostList
      )
    })

    call(() => {
      const fakePostList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      td.when(generatePostItemTd('bar')).thenReturn(...fakePostList)
      assert.deepEqual(
        generatePostList(10, 'bar'),
        fakePostList
      )
    })
  })
})

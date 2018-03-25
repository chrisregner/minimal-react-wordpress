import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import call from 'ramda/src/call'

describe('utils/generatePostItem', () => {
  let generatePostItem, generateRawPostItemTd, simplifyPostItemTd

  before(() => {
    simplifyPostItemTd = td.replace('../../utils/simplifyPostItem').default
    generateRawPostItemTd = td.replace('../generateRawPostItem').default
    generatePostItem = require('./generatePostItem').default
  })

  afterEach(td.reset)

  it('should return the result of simplifyPostItem(generateRawPostItem())', () => {
    call(() => {
      td.when(generateRawPostItemTd()).thenReturn('foo')
      td.when(simplifyPostItemTd('foo')).thenReturn('bar')

      assert.equal(generatePostItem(), 'bar')
    })

    call(() => {
      td.when(generateRawPostItemTd()).thenReturn('alpha')
      td.when(simplifyPostItemTd('alpha')).thenReturn('beta')

      assert.equal(generatePostItem(), 'beta')
    })
  })

  it('should be able to pass the parameters to generateRawPostItem()', () => {
    call(() => {
      td.when(generateRawPostItemTd('ketchup')).thenReturn('foo')
      td.when(simplifyPostItemTd('foo')).thenReturn('bar')

      assert.equal(generatePostItem('ketchup'), 'bar')
    })

    call(() => {
      td.when(generateRawPostItemTd('gamma')).thenReturn('alpha')
      td.when(simplifyPostItemTd('alpha')).thenReturn('beta')

      assert.equal(generatePostItem('gamma'), 'beta')
    })
  })
})

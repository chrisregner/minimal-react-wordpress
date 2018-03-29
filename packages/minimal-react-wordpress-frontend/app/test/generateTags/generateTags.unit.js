import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import call from 'ramda/src/call'

describe('test/generateTags', () => {
  let generateTags, generateRawTagsTd, simplifyTagsTd

  before(() => {
    simplifyTagsTd = td.replace('../../utils/simplifyTags').default
    generateRawTagsTd = td.replace('../generateRawTags').default
    generateTags = require('./generateTags').default
  })

  afterEach(td.reset)

  it('should return the result of simplifyTags(generateRawTags())', () => {
    call(() => {
      td.when(generateRawTagsTd()).thenReturn('foo')
      td.when(simplifyTagsTd('foo')).thenReturn('bar')

      assert.equal(generateTags(), 'bar')
    })

    call(() => {
      td.when(generateRawTagsTd()).thenReturn('alpha')
      td.when(simplifyTagsTd('alpha')).thenReturn('beta')

      assert.equal(generateTags(), 'beta')
    })
  })
})

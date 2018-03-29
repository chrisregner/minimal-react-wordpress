import { describe, it } from 'mocha'
import { assert } from 'chai'

import rawTagsSchema from './rawTagsSchema'
import generateRawTags from './generateRawTags'

describe('test/generateRawTags()', () => {
  it('should work', () => {
    const fakeTags = generateRawTags()
    const schemaError = rawTagsSchema.validate(fakeTags).error
    assert.isNull(schemaError)
  })
})

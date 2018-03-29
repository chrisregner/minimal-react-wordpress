import { describe, it } from 'mocha'
import { assert } from 'chai'

import { generateRawTags } from 'app/test'
import simplifyTags from './simplifyTags'

describe('utils/simplifyTags', () => {
  it('should work', () => {
    const tags = generateRawTags()
    const actual = simplifyTags(tags)
    const expected = tags.map(({ id, name, count }) => ({ id, name, count }))
    assert.deepEqual(actual, expected)
  })
})

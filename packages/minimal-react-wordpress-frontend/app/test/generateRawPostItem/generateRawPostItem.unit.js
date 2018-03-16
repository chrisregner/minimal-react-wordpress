import { describe, it } from 'mocha'
import { assert } from 'chai'

import generateRawPostItem from './generateRawPostItem'
import {
  basePostSchema,
  postWithModifiedDate,
  postWithFeaturedMediaSchema,
  postWithTagsSchema,
} from './rawPostSchema'

describe('utils/generateRawPostItem', () => {
  it('should generate posts with basic and excess details', () => {
    const fakePost = generateRawPostItem()
    const actual = basePostSchema.validate(fakePost).error
    assert.isNull(actual)
  })

  it('should optionally generate posts with featured media’s basic and excess details', () => {
    const fakePost = generateRawPostItem({ hasFeaturedMedia: true })
    const actual = postWithFeaturedMediaSchema.validate(fakePost).error
    assert.isNull(actual)
  })

  it('should optionally generate posts with modified date', () => {
    const fakePost = generateRawPostItem({ hasModifiedDate: true })
    const actual = postWithModifiedDate.validate(fakePost).error
    assert.isNull(actual)
  })

  it('should optionally generate posts with tags’ basic and excess details', () => {
    const fakePost = generateRawPostItem({ hasTags: true })
    const actual = postWithTagsSchema.validate(fakePost).error
    assert.isNull(actual)
  })
})

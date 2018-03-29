import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import pipe from 'ramda/src/pipe'
import map from 'ramda/src/map'
import omit from 'ramda/src/omit'

import {
  findTestComponent as find,
  makeSetupComponentTest,
  generateTags,
} from 'app/test'

import TagCloud, * as fromTagCloud from './TagCloud'

describe('scenes/Search/containers/TagCloud/TagCloudComponent', () => {
  let setup
  const addTagKeys = tag => ({
    toggleTag: td.func(),
    isActive: false,
    ...tag,
  })

  const generateTagsProp = pipe(
    generateTags,
    map(pipe(
      addTagKeys,
      omit(['id']),
    ))
  )

  before(() => {
    setup = makeSetupComponentTest({
      Component: TagCloud,
    })
  })

  afterEach(td.reset)

  it('should NOT render when there is no tags', () => {
    assert.isTrue(
      setup().equals(null)
    )
  })

  it('should render each tags their name', () => {
    const tags = generateTagsProp()
    const props = { tags }
    const tagNames = find(setup({ props }), ['tag-item', 'name'])

    assert.equal(tagNames.length, 10)
    tagNames.forEach((tagNamem, i) => {
      const actual = find(tagNamem, 'name').text()
      const expected = tags[i].name
      assert.equal(actual, expected)
    })
  })

  it('should render each tags their count, if any', () => {
    const tags = generateTagsProp()
    const props = { tags }
    const tagCounts = find(setup({ props }), ['tag-item', 'count'])

    assert.equal(tagCounts.length, 10)
    tagCounts.forEach((tagCountm, i) => {
      const actual = find(tagCountm, 'count').text()
      const expected = tags[i].count
      assert.include(actual, expected)
    })
  })

  it('should call toggleTag() respectively when a tag is clicked', () => {
    const tags = generateTagsProp()
    const props = { tags }
    const tagLinks = find(setup({ props }), ['tag-item', 'link'])

    assert.equal(tagLinks.length, 10)
    tagLinks.forEach((tagLink, i) => {
      const toggleTagTd = tags[i].toggleTag
      td.verify(toggleTagTd(), { times: 0, ignoreExtraArgs: true })
      tagLink.simulate('click')
      td.verify(toggleTagTd(), { times: 1, ignoreExtraArgs: true })
    })
  })

  it('should render active tags differently compared to inactive tags', () => {
    const testWith = (activeTags) => {
      const tags = generateTagsProp()
        .map((tag, i) => activeTags.includes(i)
          ? ({ ...tag, isActive: true })
          : tag)
      const props = { tags }
      const tagLinks = find(setup({ props }), ['tag-item', 'link'])

      assert.equal(tagLinks.length, 10)
      tagLinks.forEach((tagLink, i) => {
        const { activeClass, inactiveClass } = fromTagCloud
        const expected = activeTags.includes(i) ? activeClass : inactiveClass
        const actual = tagLink.prop('className')
        assert.equal(actual, expected)
      })
    }

    testWith([1, 3, 5, 7, 9])
    testWith([0, 2, 4, 6, 8])
  })

  it('should render separator after each tag item, except the last one', () => {
    const props = { tags: generateTagsProp() }
    const tagItems = find(setup({ props }), 'tag-item')

    assert.equal(tagItems.length, 10)
    tagItems.forEach((tagItem, i) => {
      const actual = find(tagItem, 'separator').exists()
      if (i === 9) assert.isFalse(actual, 'expected tag-item to NOT render separator at index 9')
      else assert.isTrue(actual, 'expected tag-item to render separator at index ' + i)
    })
  })
})

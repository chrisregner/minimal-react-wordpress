import { assert } from 'chai'
import forEachObjIndexed from 'ramda/src/forEachObjIndexed'

import { findTestComponent as find } from 'app/test'

const testSubComponents = (wrapper, expectations) => {
  forEachObjIndexed((expectation, matcher) => {
    const componentCount = typeof expectation === 'number' ? expectation : expectation[0]
    const customCondition = typeof expectation === 'number' ? () => {} : expectation[1]
    const subwrapper = find(wrapper, matcher)

    customCondition(subwrapper)
    assert.equal(
      subwrapper.length,
      componentCount,
      `expected ${componentCount} ${matcher} to be rendered`
    )
  }, expectations)
}

export default testSubComponents

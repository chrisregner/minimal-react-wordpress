import { describe, it } from 'mocha'
import { assert } from 'chai'

import uiReducer, * as fromUi from './ui'

describe('state/ui/reducer', () => {
  it('default state', () => {
    const expected = { isSearchVisible: false, isSearchAnimationDone: true }
    assert.deepEqual(uiReducer(undefined, {}), expected)
  })

  it('TOGGLE_SEARCH', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = uiReducer(initState, fromUi.toggleSearch())
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({
      initState: {
        isSearchVisible: false,
      },
      expected: {
        isSearchVisible: true,
        isSearchAnimationDone: false,
      },
    })

    testWith({
      initState: {
        isSearchVisible: true,
        isSearchAnimationDone: true,
      },
      expected: {
        isSearchVisible: false,
        isSearchAnimationDone: false,
      },
    })

    testWith({
      initState: {
        isSearchVisible: true,
        isSearchAnimationDone: false,
      },
      expected: {
        isSearchVisible: false,
        isSearchAnimationDone: false,
      },
    })
  })

  it('FLAG_SEARCH_ANIMATION_END', () => {
    const testWith = (passedInitState) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = uiReducer(initState, fromUi.flagSearchAnimationEnd())
      const expected = { isSearchAnimationDone: true, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({})
    testWith({ isSearchVisible: false })
    testWith({ isSearchVisible: true })
  })
})

describe('state/ui/selectors', () => {
  it('getIsSearchVisible()', () => {
    assert.equal(
      fromUi.getIsSearchVisible({
        isSearchVisible: 'foo',
        someOtherState: 'bar',
      }),
      'foo',
    )

    assert.equal(
      fromUi.getIsSearchVisible({
        isSearchVisible: 'baz',
        someOtherState: 'ketchup',
      }),
      'baz',
    )
  })

  it('getIsSearchAnimationDone()', () => {
    assert.equal(
      fromUi.getIsSearchAnimationDone({
        isSearchAnimationDone: 'foo',
        someOtherState: 'bar',
      }),
      'foo',
    )

    assert.equal(
      fromUi.getIsSearchAnimationDone({
        isSearchAnimationDone: 'baz',
        someOtherState: 'ketchup',
      }),
      'baz',
    )
  })
})

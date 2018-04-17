import { describe, it } from 'mocha'
import { assert } from 'chai'

import uiReducer, * as fromUi from './ui'

describe('state/ui/reducer', () => {
  it('should return the correct default state', () => {
    const expected = { isSearchVisible: false, isSearchAnimationDone: true }
    assert.deepEqual(uiReducer(undefined, {}), expected)
  })

  describe('TOGGLE_SEARCH', () => {
    it('should toggle search visibility, apply static changes correctly and save other keys', () => {
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
  })

  describe('FLAG_SEARCH_ANIMATION_END', () => {
    it('should set isSearchAnimationDone to true and save other keys', () => {
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

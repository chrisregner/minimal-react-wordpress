import { describe, it } from 'mocha'
import { assert } from 'chai'
import call from 'ramda/src/call'

import uiReducer, {
  showSearch,
  hideSearch,
  getIsSearchVisible,
} from './uiReducer'

describe('state/ui/reducer', () => {
  it('should return the correct default state', () => {
    const expected = { isSearchVisible: false }
    assert.deepEqual(uiReducer(undefined, {}), expected)
  })

  describe('showSearch()', () => {
    it('should set isSearchVisible to true', () => {
      call(() => {
        const initState = undefined
        assert.deepInclude(
          uiReducer(initState, showSearch()),
          { isSearchVisible: true }
        )
      })

      call(() => {
        const initState = { isSearchVisible: false }
        assert.deepInclude(
          uiReducer(initState, showSearch()),
          { isSearchVisible: true }
        )
      })
    })

    describe('hideSearch()', () => {
      it('should set isSearchVisible to false', () => {
        call(() => {
          const initState = undefined
          assert.deepInclude(
            uiReducer(initState, hideSearch()),
            { isSearchVisible: false },
          )
        })

        call(() => {
          const initState = { isSearchVisible: true }
          assert.deepInclude(
            uiReducer(initState, hideSearch()),
            { isSearchVisible: false },
          )
        })
      })
    })
  })
})

describe('state/ui/selectors', () => {
  describe('getIsSearchVisible()', () => {
    it('should work', () => {
      assert.equal(
        getIsSearchVisible({
          isSearchVisible: 'foo',
          someOtherState: 'bar',
        }),
        'foo',
      )

      assert.equal(
        getIsSearchVisible({
          isSearchVisible: 'baz',
          someOtherState: 'ketchup',
        }),
        'baz',
      )
    })
  })
})

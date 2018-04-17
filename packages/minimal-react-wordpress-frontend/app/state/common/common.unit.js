import { describe, it } from 'mocha'
import { assert } from 'chai'

import commonReducer, * as fromCommon from './common'

describe('app/state/common/reducer', () => {
  describe('setNavLinks()', () => {
    it('should fetch nav with some parameters from state and put the response', () => {
      const testWith = ({
        initState: passedInitState,
        expected: passedExpected,
        payload,
      }) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = commonReducer(initState, fromCommon.setNavLinks(payload))
        const expected = { ...passedExpected, otherKey: 'otherValue' }
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: {},
        payload: 'some nav',
        expected: { navLinks: 'some nav' },
      })

      testWith({
        initState: { navLinks: 'some old nav' },
        payload: 'some new nav',
        expected: { navLinks: 'some new nav' },
      })
    })
  })
})

describe('app/state/common/selectors', () => {
  it('getNavLinks()', () => {
    assert.equal(
      fromCommon.getNavLinks({
        navLinks: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromCommon.getNavLinks({
        navLinks: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })
})

import React from 'react'
import { describe, it, before } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'
import Search from './Search'
import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

describe('components/Search/SearchComponent', () => {
  let setup

  before(() => {
    setup = makeSetupComponentTest({
      Component: Search,
      props: { isSearchVisible: true },
    })
  })

  it('should render without crashing', () => {
    assert.isTrue(shallow(<Search />).exists())
  })

  it('should be hidden in non-desktop devices when isSearchVisible is false', () => {
    const props = { isSearchVisible: false }
    const actual = find(setup({ props }), 'wrapper').prop('className')
    const expected = 'dn'
    assert.include(actual, expected)
  })

  it('should NOT be hidden in non-desktop devices when isSearchVisible is true', () => {
    const props = { isSearchVisible: true }
    const actual = find(setup({ props }), 'wrapper').prop('className')
    const expected = 'dn'
    assert.notInclude(actual, expected)
  })
})

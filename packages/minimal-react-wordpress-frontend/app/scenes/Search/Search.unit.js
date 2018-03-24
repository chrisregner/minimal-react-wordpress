import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'
import { Collapse } from 'react-collapse'
import Search from './Search'
import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

describe('components/Search/SearchComponent', () => {
  let setup, flagSearchAnimationEndTd

  before(() => {
    flagSearchAnimationEndTd = td.func()
    setup = makeSetupComponentTest({
      Component: Search,
      props: {
        isSearchVisible: false,
        flagSearchAnimationEnd: flagSearchAnimationEndTd,
        viewport: undefined,
      },
    })
  })

  afterEach(td.reset)

  it('should render correct component as wrapper', () => {
    const wrapper = find(setup(), 'wrapper')
    assert.isTrue(wrapper.is(Collapse))
  })

  it('should pass correct props to wrapper', () => {
    const wrapper = find(setup(), 'wrapper')
    assert.equal(wrapper.prop('onRest'), flagSearchAnimationEndTd)
  })

  const getVisibility = wrapper =>
    find(wrapper, 'wrapper').prop('isOpened')

  it('should be visible in any viewport when isSearchVisible is true', () => {
    const possibleViewports = [undefined, 'l', 'm', 's']

    possibleViewports.forEach((viewport) => {
      const props = { isSearchVisible: true, viewport }
      const isVisible = getVisibility(setup({ props }))
      assert.isTrue(isVisible, `expected wrapper to be visible in the viewport "${viewport}"`)
    })
  })

  it('should still be visible in the viewport "l" when isSearchVisible is false', () => {
    const props = { isSearchVisible: false, viewport: 'l' }
    const isVisible = getVisibility(setup({ props }))
    assert.isTrue(isVisible)
  })

  it('should be NOT be visible in all viewports except "l" when isSearchVisible is false', () => {
    const possibleViewports = [undefined, 'm', 's']

    possibleViewports.forEach((viewport) => {
      const props = { isSearchVisible: false, viewport }
      const isVisible = getVisibility(setup({ props }))
      assert.isFalse(isVisible, `expected wrapper to be NOT visible in the viewport "${viewport}"`)
    })
  })
})

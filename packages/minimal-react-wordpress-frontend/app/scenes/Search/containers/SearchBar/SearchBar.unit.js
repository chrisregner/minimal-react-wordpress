import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import SearchBar from './SearchBar'
import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

describe('components/Search/containers/SearchBar/SearchBarComponent', () => {
  let setup, hideSearchTd

  before(() => {
    hideSearchTd = td.func()

    setup = makeSetupComponentTest({
      Component: SearchBar,
      props: {
        hideSearch: hideSearchTd,
      },
    })
  })

  afterEach(td.reset)

  it('should render without crashing', () => {
    assert.isTrue(setup().exists())
  })

  it('should call hideSearch() when "hide search" button is clicked', () => {
    const hideSearchBtn = find(setup(), 'hide-search-btn')
    td.verify(hideSearchTd(), { times: 0, ignoreExtraArgs: true })
    hideSearchBtn.simulate('click')
    td.verify(hideSearchTd())
  })

  it('should call setSearch() with the value when search input value is changed')
})

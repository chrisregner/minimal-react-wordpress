import { describe, it, before, afterEach } from 'mocha'
import td from 'testdouble'
import ShowSearch from './ShowSearch'
import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

describe('scenes/ShowSearch/ShowSearchComponent', () => {
  let setup, toggleSearchTd

  before(() => {
    toggleSearchTd = td.func()
    setup = makeSetupComponentTest({
      Component: ShowSearch,
      props: { toggleSearch: toggleSearchTd },
    })
  })

  afterEach(td.reset)

  it('should call toggleSearch() when "show search" button is clicked', () => {
    const toggleSearchBtn = find(setup(), 'show-search-btn')
    td.verify(toggleSearchTd(), { times: 0, ignoreExtraArgs: true })
    toggleSearchBtn.simulate('click')
    td.verify(toggleSearchTd())
  })
})

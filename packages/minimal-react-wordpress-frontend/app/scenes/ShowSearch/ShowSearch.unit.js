import { describe, it, before, afterEach } from 'mocha'
import td from 'testdouble'
import ShowSearch from './ShowSearch'
import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

describe('scenes/ShowSearch/ShowSearchComponent', () => {
  let setup, showSearchTd

  before(() => {
    showSearchTd = td.func()
    setup = makeSetupComponentTest({
      Component: ShowSearch,
      props: { showSearch: showSearchTd },
    })
  })

  afterEach(td.reset)

  it('should call showSearch() when "show search" button is clicked', () => {
    const showSearchBtn = find(setup(), 'show-search-btn')
    td.verify(showSearchTd(), { times: 0, ignoreExtraArgs: true })
    showSearchBtn.simulate('click')
    td.verify(showSearchTd())
  })
})

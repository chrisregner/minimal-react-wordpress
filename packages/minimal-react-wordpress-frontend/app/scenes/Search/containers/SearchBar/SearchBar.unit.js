import { describe, it, before, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import SearchBar from './SearchBar'
import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

describe('components/Search/containers/SearchBar/SearchBarComponent', () => {
  let setup, toggleSearchTd, setInputNodeTd, setSearchKeywordTd

  before(() => {
    toggleSearchTd = td.func()
    setInputNodeTd = td.func()
    setSearchKeywordTd = td.func()

    setup = makeSetupComponentTest({
      Component: SearchBar,
      props: {
        toggleSearch: toggleSearchTd,
        setInputNode: setInputNodeTd,
        setSearchKeyword: setSearchKeywordTd,
      },
    })
  })

  afterEach(td.reset)

  it('should render without crashing', () => {
    assert.isTrue(setup().exists())
  })

  it('should call toggleSearch() when "hide search" button is clicked', () => {
    const toggleSearchBtn = find(setup(), 'hide-search-btn')
    td.verify(toggleSearchTd(), { times: 0, ignoreExtraArgs: true })
    toggleSearchBtn.simulate('click')
    td.verify(toggleSearchTd())
  })

  it('should pass setInputNode() as ref prop to the input', () => {
    td.verify(setInputNodeTd(), { times: 0, ignoreExtraArgs: true })
    const wrapper = setup({ useMount: true })
    const inputNode = find(wrapper, 'input').instance()
    td.verify(setInputNodeTd(inputNode), { times: 1 })
  })

  it('should call setSearch() with the value when search input value is changed', () => {
    const input = find(setup(), 'input')
    td.verify(setSearchKeywordTd(), { times: 0, ignoreExtraArgs: true })
    input.simulate('change', { target: { value: 'some value' } })
    td.verify(setSearchKeywordTd('some value'))
    input.simulate('change', { target: { value: 'some other value' } })
    td.verify(setSearchKeywordTd('some other value'))
  })
})

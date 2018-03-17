import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import SearchBar from './SearchBar'

describe('components/SearchBar', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<SearchBar />).exists())
  })
})

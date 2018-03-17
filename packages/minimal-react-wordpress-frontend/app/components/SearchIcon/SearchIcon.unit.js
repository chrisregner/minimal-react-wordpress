import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import SearchIcon from './SearchIcon'

describe('components/SearchIcon', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<SearchIcon />).exists())
  })
})

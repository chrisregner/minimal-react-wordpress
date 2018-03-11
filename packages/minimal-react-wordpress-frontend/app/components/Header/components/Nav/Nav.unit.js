import React from 'react'
import { describe } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import Nav from './Nav'

describe('components/Header/components/Nav', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<Nav />).exists())
  })
})
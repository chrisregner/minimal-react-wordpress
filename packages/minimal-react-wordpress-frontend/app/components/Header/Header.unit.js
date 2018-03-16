import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import Header from './Header'

describe('components/Header', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<Header />).exists())
  })
})

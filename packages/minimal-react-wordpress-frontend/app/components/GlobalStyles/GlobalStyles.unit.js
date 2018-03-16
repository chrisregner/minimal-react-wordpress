import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import GlobalStyles from './GlobalStyles'

describe('components/GlobalStyles', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<GlobalStyles />).exists())
  })
})

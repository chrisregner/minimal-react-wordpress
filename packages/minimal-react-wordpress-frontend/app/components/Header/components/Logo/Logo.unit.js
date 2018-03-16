import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import Logo from './Logo'

describe('components/Header/components/Logo', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<Logo />).exists())
  })
})

import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import CloseIcon from './CloseIcon'

describe('components/CloseIcon', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<CloseIcon />).exists())
  })
})

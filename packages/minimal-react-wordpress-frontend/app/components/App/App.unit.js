import React from 'react'
import { describe } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import App from './App'

describe('components/App', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<App />).exists())
  })
})
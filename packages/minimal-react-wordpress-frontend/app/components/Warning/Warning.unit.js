import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import Warning from './Warning'

describe('components/Warning', () => {
  it('should render children', () => {
    const testWith = ({ children }) => {
      const wrapper = shallow(<Warning>{children}</Warning>)
      assert.isTrue(wrapper.containsMatchingElement(children))
    }

    testWith({ children: <div>foo</div> })
    testWith({ children: <p>bar</p> })
  })
})

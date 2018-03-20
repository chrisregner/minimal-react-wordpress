import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import TagCloud from './TagCloud'

describe('scenes/TagCloud/TagCloudComponent', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<TagCloud />).exists())
  })
})

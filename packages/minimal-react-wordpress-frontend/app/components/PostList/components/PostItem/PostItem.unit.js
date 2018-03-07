import React from 'react'
import { describe } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import PostItem from './PostItem'

describe('components/PostList/components/PostItem', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<PostItem />).exists())
  })
})
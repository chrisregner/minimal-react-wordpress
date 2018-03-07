import React from 'react'
import { describe } from 'mocha'
import { assert } from 'chai'
import { shallow } from 'enzyme'

import PostList from './PostList'

describe('components/PostList', () => {
  it('should render without crashing', () => {
    assert.isTrue(shallow(<PostList />).exists())
  })
})
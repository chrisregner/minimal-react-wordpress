import React from 'react'
import { describe, it } from 'mocha'
import { shallow } from 'enzyme'
import { assert } from 'chai'

import { testSubComponents as testSubCmpts } from 'app/test'
import ErrorComponent from './ErrorComponent'

describe('app/components/Error', () => {
  it('should render correct structure when error status is 404', () => {
    const error = new Error('Request failed with status code 404')
    const wrapper = shallow(<ErrorComponent error={error} />)

    testSubCmpts(wrapper, {
      'not-found': 1,
      'other-error': 0,
    })
  })

  it('should render correct structure when error status is NOT 404', () => {
    const testWith = (e) => {
      const wrapper = shallow(<ErrorComponent error={e} />)

      testSubCmpts(wrapper, {
        'not-found': 0,
        'other-error': [1, (otherError) => {
          assert.include(otherError.dive().text(), e.message)
        }],
      })
    }

    testWith(new Error('some error'))
    testWith(new Error('some other error'))
  })
})

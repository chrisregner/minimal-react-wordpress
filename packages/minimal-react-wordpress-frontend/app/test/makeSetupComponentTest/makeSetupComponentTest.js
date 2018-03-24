import React from 'react'
import { shallow, mount } from 'enzyme'
import mergeDeepRight from 'ramda/src/mergeDeepRight'

const makeSetupComponentTest = (defaultOpts = {}) => (opts = {}) => {
  const { Component, useMount, props } = mergeDeepRight(defaultOpts, opts)
  const renderer = useMount ? mount : shallow

  return renderer(<Component {...props} />)
}

export default makeSetupComponentTest

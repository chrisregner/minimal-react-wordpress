import React from 'react'
import { describe, it, before } from 'mocha'
import { assert } from 'chai'

import {
  makeSetupComponentTest,
  findTestComponent as find,
} from 'app/test'

import MainSection from './MainSection'

describe('components/MainSection', () => {
  let setup
  before(() => {
    const props = {
      content: () => null,
      status: () => null,
    }

    setup = makeSetupComponentTest({ Component: MainSection, props })
  })

  it('should render content prop in correct wrapper', () => {
    const testWith = ({ content }) => {
      const props = { content }
      const contentWrapper = find(setup({ props }), 'content').childAt(0)

      assert.isTrue(contentWrapper.matchesElement(content()))
    }

    testWith({ content: () => <div>foo</div> })
    testWith({ content: () => <p>bar</p> })
  })

  it('should render status prop in correct wrapper', () => {
    const testWith = ({ status }) => {
      const props = { status }
      const statusWrapper = find(setup({ props }), 'status').childAt(0)

      assert.isTrue(statusWrapper.matchesElement(status()))
    }

    testWith({ status: () => <div>foo</div> })
    testWith({ status: () => <p>bar</p> })
  })

  it('should not render wrapper for content when content is falsy or null component', () => {
    const testWith = ({ content }) => {
      const props = { content }
      const contentWrapper = find(setup({ props }), 'content')

      assert.equal(contentWrapper.length, 0)
    }

    testWith({ content: undefined })
    testWith({ content: () => null })
  })

  it('should not render wrapper for content when content is falsy or null component', () => {
    const testWith = ({ status }) => {
      const props = { status }
      const statusWrapper = find(setup({ props }), 'status')

      assert.equal(statusWrapper.length, 0)
    }

    testWith({ status: undefined })
    testWith({ status: () => null })
  })
})

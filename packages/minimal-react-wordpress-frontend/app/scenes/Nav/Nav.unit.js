import React from 'react'
import { describe, it } from 'mocha'
import { assert } from 'chai'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Link } from 'react-router-dom'

import { findTestComponent as find } from 'app/test'
import Nav from './Nav'

describe('components/Header/components/Nav', () => {
  it('should render null without links', () => {
    assert.isTrue(
      shallow(<Nav />).equals(null)
    )
  })

  it('should render each nav links', () => {
    const testWith = (links) => {
      const wrapper = mount(
        <MemoryRouter>
          <Nav links={links} />
        </MemoryRouter>
      )

      const linksWrapper = find(wrapper, 'nav-link').find(Link) // filter out <a /> duplicates

      assert.equal(links.length, linksWrapper.length)
      linksWrapper.forEach((linkWrapper, i) => {
        assert.equal(linkWrapper.prop('to'), links[i].url)
        assert.include(linkWrapper.text(), links[i].title)
      })
    }

    testWith([
      { title: 'first nav link', url: '/first/url', isActive: false },
      { title: 'second nav link', url: '/second/url', isActive: false },
    ])

    testWith([
      { title: 'first nav link', url: '/first/url', isActive: false },
      { title: 'second nav link', url: '/second/url', isActive: false },
      { title: 'third nav link', url: '/third/url', isActive: false },
    ])
  })

  it('should highlight active nav link', () => {
    const testWith = (links) => {
      const wrapper = shallow(<Nav links={links} />)
      const linksWrapper = find(wrapper, 'nav-link')

      const activeIndex = links.findIndex(link => link.isActive)
      const inactiveIndex = links.findIndex(link => !link.isActive)
      const activeClass = linksWrapper.at(activeIndex).prop('className')
      const inactiveClass = linksWrapper.at(inactiveIndex).prop('className')

      assert.notEqual(activeClass, inactiveClass, 'navLink should have active class that is different from inactive class')
      assert.isString(activeClass, 'navLink should have string active class')
      assert.isString(inactiveClass, 'navLink should have string inactive class')

      linksWrapper.forEach((linkWrapper, i) => {
        const actual = linkWrapper.prop('className')
        const expected = i === activeIndex ? activeClass : inactiveClass
        assert.equal(actual, expected)
      })
    }

    testWith([
      { title: 'first nav link', url: '/first/url', isActive: true },
      { title: 'second nav link', url: '/second/url', isActive: false },
    ])

    testWith([
      { title: 'first nav link', url: '/first/url', isActive: false },
      { title: 'second nav link', url: '/second/url', isActive: true },
      { title: 'third nav link', url: '/third/url', isActive: false },
    ])
  })

  it('should not use just use <a /> instead of <Link /> for "mailto:" links', () => {
    const testWith = (links) => {
      const wrapper = shallow(<Nav links={links} />)
      const linksWrapper = find(wrapper, 'nav-link')

      linksWrapper.forEach((linkWrapper, i) => {
        if (links[i].url.startsWith('mailto:')) {
          assert.equal(linkWrapper.prop('href'), links[i].url)
          assert.isTrue(linkWrapper.is('a'))
        } else {
          assert.equal(linkWrapper.prop('to'), links[i].url)
          assert.isTrue(linkWrapper.is(Link))
        }
      })
    }

    testWith([
      { title: 'first mailto link', url: 'mailto:some@email.com', isActive: false },
      { title: 'second nav link', url: '/second/url', isActive: false },
    ])

    testWith([
      { title: 'first nav link', url: '/first/url', isActive: false },
      { title: 'second mailto link', url: 'mailto:some.other@email.com', isActive: false },
      { title: 'third nav link', url: '/third/url', isActive: false },
    ])
  })
})

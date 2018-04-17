import { describe, it } from 'mocha'
import { assert } from 'chai'

import simplifyNavLinks from './simplifyNavLinks'

describe('app/utils/simplifyNavLinks', () => {
  it('should extract the title and url', () => {
    assert.deepEqual(
      simplifyNavLinks([
        { title: 'some title', url: '/some/url/', otherKey: 'something' },
        { title: 'some other title', url: '/some/other/url/', otherKey: 'some other thing' },
      ]),
      [
        { title: 'some title', url: '/some/url/' },
        { title: 'some other title', url: '/some/other/url/' },
      ]
    )

    assert.deepEqual(
      simplifyNavLinks([
        { title: 'alpha', url: '/alpha/url/', otherKey: 'alpha' },
        { title: 'beta', url: '/beta/url/', otherKey: 'beta' },
        { title: 'gamma', url: '/gamma/url/', otherKey: 'gamma' },
      ]),
      [
        { title: 'alpha', url: '/alpha/url/' },
        { title: 'beta', url: '/beta/url/' },
        { title: 'gamma', url: '/gamma/url/' },
      ]
    )
  })

  it('should modify url based on object_id if object is page', () => {
    assert.deepEqual(
      simplifyNavLinks([
        { title: 'some title', url: '/some/url/', otherKey: 'something' },
        {
          object_id: 1,
          object: 'page',
          title: 'some other title',
          url: '/some/other/url/',
          otherKey: 'some other thing',
        },
      ]),
      [
        { title: 'some title', url: '/some/url/' },
        { title: 'some other title', url: '/page/1' },
      ],
    )

    assert.deepEqual(
      simplifyNavLinks([
        {
          object_id: 1,
          object: 'page',
          title: 'some page title',
          url: '/some/other/url/',
          otherKey: 'some other thing',
        },
        { title: 'some title', url: '/some/url/', otherKey: 'something' },
        {
          object_id: 2,
          object: 'page',
          title: 'some other page title',
          url: '/some/other/url/',
          otherKey: 'some other thing',
        },
      ]),
      [
        { title: 'some page title', url: '/page/1' },
        { title: 'some title', url: '/some/url/' },
        { title: 'some other page title', url: '/page/2' },
      ],
    )
  })
})

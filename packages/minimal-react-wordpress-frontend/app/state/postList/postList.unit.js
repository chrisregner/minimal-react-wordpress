import { describe, it } from 'mocha'
import { assert } from 'chai'

import postListReducer, * as fromPostList from './postList'

describe('state/postList/reducer', () => {
  it('default state', () => {
    const expected = {}
    assert.deepEqual(postListReducer(undefined, {}), expected)
  })

  it('FETCH_POST_LIST', () => {
    const testWith = (passedInitState) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.fetchPostList())
      const expected = {
        postList: [],
        page: 1,
        status: 'loading',
        searchKeyword: '',
        searchTags: [],
        otherKey: 'otherValue',
      }

      assert.deepInclude(actual, expected)
    }

    testWith({})
    testWith({
      postList: ['some post'],
      page: 2,
      status: 'some-other-status',
      searchKeyword: 'some search keyword',
      searchTags: ['some', 'search', 'tags'],
    })
  })

  it('FETCH_MORE_POST_LIST', () => {
    const testWith = ({ initState: passedInitState, expected: passedExpected }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.fetchMorePostList())
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({
      initState: { page: 1 },
      expected: { page: 2, status: 'loading' },
    })

    testWith({
      initState: { page: 10, status: 'some-other-status' },
      expected: { page: 11, status: 'loading' },
    })
  })

  it('SET_SEARCH_KEYWORD', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.setSearchKeyword(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({
      initState: {},
      payload: 'some search keyword',
      expected: {
        postList: [],
        searchKeyword: 'some search keyword',
        status: 'loading',
        page: 1,
      },
    })

    testWith({
      initState: {
        searchKeyword: 'old search keyword',
        status: 'some-other-status',
        page: 10,
      },
      payload: 'new search keyword',
      expected: {
        postList: [],
        searchKeyword: 'new search keyword',
        status: 'loading',
        page: 1,
      },
    })
  })

  it('ADD_SEARCH_TAG', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.addSearchTag(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({
      initState: {},
      payload: 'some tag',
      expected: {
        postList: [],
        searchTags: ['some tag'],
        status: 'loading',
        page: 1,
      },
    })

    testWith({
      initState: { searchTags: [] },
      payload: 'some tag',
      expected: {
        postList: [],
        searchTags: ['some tag'],
        status: 'loading',
        page: 1,
      },
    })

    testWith({
      initState: {
        searchTags: ['old tag'],
        status: 'some-other-status',
        page: 10,
      },
      payload: 'new tag',
      expected: {
        postList: [],
        searchTags: ['old tag', 'new tag'],
        status: 'loading',
        page: 1,
      },
    })
  })

  it('REMOVE_SEARCH_TAG', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.removeSearchTag(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({
      initState: {
        searchTags: ['existing tag'],
      },
      payload: 'existing tag',
      expected: {
        postList: [],
        searchTags: [],
        status: 'loading',
        page: 1,
      },
    })

    testWith({
      initState: {
        searchTags: ['existing tag', 'other existing tag'],
        status: 'some-other-status',
        page: 10,
      },
      payload: 'existing tag',
      expected: {
        postList: [],
        searchTags: ['other existing tag'],
        status: 'loading',
        page: 1,
      },
    })
  })

  describe('ADD_POST_LIST', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.addPostList(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    it('should add post list to existing ones', () => {
      testWith({
        initState: {},
        payload: { postList: ['some post'], totalPages: 10 },
        expected: { postList: ['some post'] },
      })

      testWith({
        initState: { postList: [] },
        payload: { postList: ['some post'], totalPages: 10 },
        expected: { postList: ['some post'] },
      })

      testWith({
        initState: { postList: ['existing post'] },
        payload: { postList: ['newer post'], totalPages: 10 },
        expected: { postList: ['existing post', 'newer post'] },
      })
    })

    it('should set status to "can-load" if page is greater than zero and is less than total pages', () => {
      testWith({
        initState: { page: 1 },
        payload: { postList: [], totalPages: 10 },
        expected: { status: 'can-load' },
      })

      testWith({
        initState: { page: 5, status: 'some-other-status' },
        payload: { postList: [], totalPages: 20 },
        expected: { status: 'can-load' },
      })
    })

    it('should set status to "no-more-post" if page is greater than zero, page is equal to total pages and there is NO any search params', () => {
      testWith({
        initState: { page: 1 },
        payload: { postList: [], totalPages: 1 },
        expected: { status: 'no-more-post' },
      })

      testWith({
        initState: {
          page: 10,
          searchKeyword: '',
          searchTags: [],
          status: 'some-other-status',
        },
        payload: { postList: [], totalPages: 10 },
        expected: { status: 'no-more-post' },
      })
    })

    it('should set status to "no-more-match" if page is greater than zero, page is equal to total pages and there is any search params', () => {
      testWith({
        initState: { page: 1, searchKeyword: 'some search keyword' },
        payload: { postList: [], totalPages: 1 },
        expected: { status: 'no-more-match' },
      })

      testWith({
        initState: { page: 10, searchTags: ['some', 'search', 'tag'] },
        payload: { postList: [], totalPages: 10 },
        expected: { status: 'no-more-match' },
      })

      testWith({
        initState: {
          page: 100,
          searchKeyword: 'some search keyword',
          searchTags: ['some', 'search', 'tag'],
          status: 'some-other-status',
        },
        payload: { postList: [], totalPages: 100 },
        expected: { status: 'no-more-match' },
      })
    })

    it('should set status to "no-post" if total pages is zero and there is NO any search params', () => {
      testWith({
        initState: { page: 0 },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-post' },
      })

      testWith({
        initState: {
          page: 0,
          searchKeyword: '',
          searchTags: [],
          status: 'some-other-status',
        },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-post' },
      })
    })

    it('should set status to "no-match" if total pages is zero and there is any search params', () => {
      testWith({
        initState: { page: 0, searchKeyword: 'some search keyword' },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-match' },
      })

      testWith({
        initState: { page: 0, searchTags: ['some', 'search', 'tag'] },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-match' },
      })

      testWith({
        initState: {
          page: 0,
          searchKeyword: 'some search keyword',
          searchTags: ['some', 'search', 'tag'],
          status: 'some-other-status',
        },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-match' },
      })
    })
  })

  it('SET_ERROR', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = postListReducer(initState, fromPostList.setError(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    testWith({
      initState: {},
      payload: 'some error',
      expected: {
        error: 'some error',
        status: 'error',
      },
    })

    testWith({
      initState: {
        error: 'old error',
        status: 'some-other-status',
      },
      payload: 'new error',
      expected: {
        error: 'new error',
        status: 'error',
      },
    })
  })
})

describe('state/postList/selectors', () => {
  it('getPostList()', () => {
    assert.equal(
      fromPostList.getPostList({
        postList: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPostList.getPostList({
        postList: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getError()', () => {
    assert.equal(
      fromPostList.getError({
        error: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPostList.getError({
        error: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getPage()', () => {
    assert.equal(
      fromPostList.getPage({
        page: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPostList.getPage({
        page: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getSearchKeyword()', () => {
    assert.equal(
      fromPostList.getSearchKeyword({
        searchKeyword: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPostList.getSearchKeyword({
        searchKeyword: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getSearchTags()', () => {
    assert.equal(
      fromPostList.getSearchTags({
        searchTags: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPostList.getSearchTags({
        searchTags: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getStatus()', () => {
    assert.equal(
      fromPostList.getStatus({
        status: 'foo',
        otherKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPostList.getStatus({
        status: 'baz',
        otherKey: 'some other value',
      }),
      'baz',
    )
  })
})

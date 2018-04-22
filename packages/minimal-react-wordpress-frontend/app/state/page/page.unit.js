import { describe, it } from 'mocha'
import { assert } from 'chai'

import * as actionTypes from 'app/state/actionTypes'
import pageReducer, * as fromPage from './page'

describe('state/page/reducer', () => {
  /* Common Actions */
  it('should return the correct default state', () => {
    const expected = {
      postList: [],
      searchTags: [],
      status: 'loading',
    }

    assert.deepEqual(pageReducer(undefined, {}), expected)
  })

  describe('RESET_PAGE', () => {
    it('should clear post list, set page to 1, set status to loading, and copy other keys', () => {
      const testWith = (passedInitState) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = pageReducer(initState, fromPage.resetPage())
        const expected = {
          postList: [],
          postListPage: 1,
          status: 'loading',
          otherKey: 'otherValue',
        }

        assert.deepInclude(actual, expected)
      }

      testWith({})
      testWith({
        postList: ['some post'],
        postListPage: 2,
        status: 'some-other-status',
      })
    })
  })

  describe('ADD_POST_LIST', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = pageReducer(initState, fromPage.addPostList(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    it('should add post list to existing ones, save page, apply static changes correctly, and save other keys', () => {
      testWith({
        initState: { postListPage: 1 },
        payload: { postList: ['some post'], totalPages: 10 },
        expected: { postList: ['some post'], postListPage: 1 },
      })

      testWith({
        initState: { postList: [], postListPage: 1 },
        payload: { postList: ['some post'], totalPages: 10 },
        expected: { postList: ['some post'], postListPage: 1 },
      })

      testWith({
        initState: { postList: ['existing post'], postListPage: 10 },
        payload: { postList: ['newer post'], totalPages: 10 },
        expected: { postList: ['existing post', 'newer post'], postListPage: 10 },
      })
    })

    it('should set status to "can-load" if postListPage is greater than zero and is less than total pages', () => {
      testWith({
        initState: { postListPage: 1 },
        payload: { postList: [], totalPages: 10 },
        expected: { status: 'can-load' },
      })

      testWith({
        initState: { postListPage: 5, status: 'some-other-status' },
        payload: { postList: [], totalPages: 20 },
        expected: { status: 'can-load' },
      })
    })

    it('should set status to "no-more-post" if postListPage is greater than zero, postListPage is equal to total pages and there is NO any search params', () => {
      testWith({
        initState: { postListPage: 1 },
        payload: { postList: [], totalPages: 1 },
        expected: { status: 'no-more-post' },
      })

      testWith({
        initState: {
          postListPage: 10,
          searchKeyword: '',
          searchTags: [],
          status: 'some-other-status',
        },
        payload: { postList: [], totalPages: 10 },
        expected: { status: 'no-more-post' },
      })
    })

    it('should set status to "no-more-match" if postListPage is greater than zero, postListPage is equal to total pages and there is any search params', () => {
      testWith({
        initState: { postListPage: 1, searchKeyword: 'some search keyword' },
        payload: { postList: [], totalPages: 1 },
        expected: { status: 'no-more-match' },
      })

      testWith({
        initState: { postListPage: 10, searchTags: ['some', 'search', 'tag'] },
        payload: { postList: [], totalPages: 10 },
        expected: { status: 'no-more-match' },
      })

      testWith({
        initState: {
          postListPage: 100,
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
        initState: { postListPage: 0 },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-post' },
      })

      testWith({
        initState: {
          postListPage: 0,
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
        initState: { postListPage: 0, searchKeyword: 'some search keyword' },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-match' },
      })

      testWith({
        initState: { postListPage: 0, searchTags: ['some', 'search', 'tag'] },
        payload: { postList: [], totalPages: 0 },
        expected: { status: 'no-match' },
      })

      testWith({
        initState: {
          postListPage: 0,
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
    it('should set the error and status, and save other keys', () => {
      const testWith = ({
        initState: passedInitState,
        expected: passedExpected,
        payload,
      }) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = pageReducer(initState, fromPage.setError(payload))
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

  /* Post List Actions */
  describe('FETCH_POST_LIST', () => {
    it('should have an action creator', () => {
      assert.deepEqual(
        fromPage.fetchPostList(),
        { type: actionTypes.FETCH_POST_LIST }
      )
    })
  })

  describe('FETCH_MORE_POST_LIST', () => {
    it('should increment the postListPage, apply static changes correctly, and save other keys', () => {
      const testWith = ({ initState: passedInitState, expected: passedExpected }) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = pageReducer(initState, fromPage.fetchMorePostList())
        const expected = { ...passedExpected, otherKey: 'otherValue' }
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: { postListPage: 1 },
        expected: { postListPage: 2, status: 'loading' },
      })

      testWith({
        initState: { postListPage: 10, status: 'some-other-status' },
        expected: { postListPage: 11, status: 'loading' },
      })
    })
  })

  /* Search Actions */
  describe('SET_SEARCH_KEYWORD', () => {
    const testWith = ({
      initState: passedInitState,
      expected: passedExpected,
      payload,
    }) => {
      const initState = { ...passedInitState, otherKey: 'otherValue' }
      const actual = pageReducer(initState, fromPage.setSearchKeyword(payload))
      const expected = { ...passedExpected, otherKey: 'otherValue' }
      assert.deepInclude(actual, expected)
    }

    it('should set the searchKeyword and save other keys', () => {
      testWith({
        initState: {},
        payload: 'some search keyword',
        expected: { searchKeyword: 'some search keyword' },
      })

      testWith({
        initState: { searchKeyword: 'old search keyword' },
        payload: 'new search keyword',
        expected: { searchKeyword: 'new search keyword' },
      })
    })
  })

  describe('SET_SEARCH_TAGS', () => {
    it('should save tags with each having isActive property set to false, and save other keys', () => {
      const testWith = ({ initState: passedInitState, payload }) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = pageReducer(initState, fromPage.setSearchTags(payload))
        const expected = {
          searchTags: payload.map(tag => ({ isActive: false, ...tag })),
          otherKey: 'otherValue',
        }

        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: {},
        payload: [{ name: 'some' }, { name: 'tags' }],
      })

      testWith({
        initState: { searchTags: 'some old tags' },
        payload: [{ name: 'some' }, { name: 'other' }, { name: 'tags' }],
      })
    })
  })

  describe('TOGGLE_SEARCH_TAG', () => {
    it('should toggle the active property of the tag matched by id, and save other keys', () => {
      const testWith = ({
        initState: passedInitState,
        expected: passedExpected,
        payload,
      }) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = pageReducer(initState, fromPage.toggleSearchTag(payload))
        const expected = { ...passedExpected, otherKey: 'otherValue' }
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: {
          searchTags: [
            { id: 1, name: 'some tag', isActive: false },
            { id: 2, name: 'some other tag', isActive: false },
            { id: 3, name: 'another tag', isActive: false },
          ],
        },
        payload: 1,
        expected: {
          searchTags: [
            { id: 1, name: 'some tag', isActive: true },
            { id: 2, name: 'some other tag', isActive: false },
            { id: 3, name: 'another tag', isActive: false },
          ],
        },
      })

      testWith({
        initState: {
          searchTags: [
            { id: 1, name: 'some tag', isActive: false },
            { id: 2, name: 'some other tag', isActive: true },
            { id: 3, name: 'another tag', isActive: true },
          ],
          postList: ['some', 'post', 'list'],
          status: 'some-other-status',
          page: 10,
        },
        payload: 2,
        expected: {
          searchTags: [
            { id: 1, name: 'some tag', isActive: false },
            { id: 2, name: 'some other tag', isActive: false },
            { id: 3, name: 'another tag', isActive: true },
          ],
        },
      })
    })
  })

  describe('SET_SEARCH_PARAMS', () => {
    it('should copy other keys', () => {
      const testWith = (initState) => {
        const actual = pageReducer(initState, fromPage.setSearchParams())
        assert.deepInclude(actual, initState)
      }

      testWith({ searchTags: [], somekey: 'some value' })
      testWith({ searchTags: [], somekey: 'some value', someOtherKey: 'some other value' })
    })

    it('should set the keyword, if any', () => {
      const testWith = ({ initState, payload, expected }) => {
        const actual = pageReducer(initState, fromPage.setSearchParams(payload))
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: { searchTags: [] },
        payload: { searchKeyword: 'some keyword' },
        expected: { searchKeyword: 'some keyword' },
      })

      testWith({
        initState: { searchTags: [], searchKeyword: 'some old keyword' },
        payload: { searchKeyword: 'some new keyword' },
        expected: { searchKeyword: 'some new keyword' },
      })
    })

    it('should set the keyword to empty string, if passed keyword is falsy', () => {
      const testWith = ({ initState, payload, expected }) => {
        const actual = pageReducer(initState, fromPage.setSearchParams(payload))
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: { searchTags: [] },
        payload: { searchKeyword: undefined },
        expected: { searchKeyword: '' },
      })

      testWith({
        initState: { searchTags: [], searchKeyword: 'some old keyword' },
        payload: { searchKeyword: null },
        expected: { searchKeyword: '' },
      })
    })

    it('should activate the any of the passed tags, and deactivate the rest', () => {
      const testWith = ({ initState, payload, expected }) => {
        const actual = pageReducer(initState, fromPage.setSearchParams(payload))
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: {
          searchTags: [
            { id: 1, name: 'first-tag', isActive: false, count: 1 },
            { id: 2, name: 'second-tag', isActive: false, count: 4 },
          ],
        },
        payload: { searchTags: [1, 2] },
        expected: {
          searchTags: [
            { id: 1, name: 'first-tag', isActive: true, count: 1 },
            { id: 2, name: 'second-tag', isActive: true, count: 4 },
          ],
        },
      })

      testWith({
        initState: {
          searchTags: [
            { id: 1, name: 'first-tag', isActive: true, count: 1 },
            { id: 2, name: 'second-tag', isActive: true, count: 4 },
            { id: 3, name: 'third-tag', isActive: false, count: 3 },
          ],
        },
        payload: { searchTags: [1, 3] },
        expected: {
          searchTags: [
            { id: 1, name: 'first-tag', isActive: true, count: 1 },
            { id: 2, name: 'second-tag', isActive: false, count: 4 },
            { id: 3, name: 'third-tag', isActive: true, count: 3 },
          ],
        },
      })
    })
  })

  describe('CLEAR_SEARCH', () => {
    it('should clear search keyword and save other keys', () => {
      const testWith = ({
        initState: passedInitState,
        expected: passedExpected,
      }) => {
        const initState = { ...passedInitState, otherKey: 'otherValue' }
        const actual = pageReducer(initState, fromPage.clearSearch())
        const expected = { ...passedExpected, otherKey: 'otherValue' }
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: { searchTags: [] },
        expected: { searchKeyword: '' },
      })

      testWith({
        initState: {
          searchKeyword: 'some search keyword',
          searchTags: [],
        },
        expected: { searchKeyword: '' },
      })
    })

    it('should reset tags properly, if any', () => {
      const testWith = ({ initState, expected }) => {
        const actual = pageReducer(initState, fromPage.clearSearch())
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: {
          searchTags: [
            { id: 1, name: 'foo', isActive: true, count: 1 },
            { id: 2, name: 'bar', isActive: true, count: 4 },
            { id: 3, name: 'baz', isActive: true, count: 3 },
          ],
        },
        expected: {
          searchTags: [
            { id: 1, name: 'foo', isActive: false, count: 1 },
            { id: 2, name: 'bar', isActive: false, count: 4 },
            { id: 3, name: 'baz', isActive: false, count: 3 },
          ],
        },
      })

      testWith({
        initState: {
          searchTags: [
            { id: 1, name: 'foo', isActive: false, count: 1 },
            { id: 2, name: 'bar', isActive: true, count: 4 },
            { id: 3, name: 'baz', isActive: false, count: 3 },
            { id: 4, name: 'ketchup', isActive: true, count: 1 },
          ],
        },
        expected: {
          searchTags: [
            { id: 1, name: 'foo', isActive: false, count: 1 },
            { id: 2, name: 'bar', isActive: false, count: 4 },
            { id: 3, name: 'baz', isActive: false, count: 3 },
            { id: 4, name: 'ketchup', isActive: false, count: 1 },
          ],
        },
      })
    })

    it('should just copy tags, if tags is just an empty array', () => {
      const testWith = ({ initState, expected }) => {
        const actual = pageReducer(initState, fromPage.clearSearch())
        assert.deepInclude(actual, expected)
      }

      testWith({
        initState: {
          searchTags: [],
        },
        expected: {
          searchTags: [],
        },
      })
    })
  })

  /* Post Page Actions */
  describe('FETCH_POST', () => {
    it('should reset post and status, and copy other keys', () => {
      const testWith = ({ initState: passedInitState, expected }) => {
        const initState = { otherKey: 'some value', ...passedInitState }
        assert.deepInclude(
          pageReducer(initState, fromPage.fetchPost()),
          {
            post: null,
            status: 'loading',
            otherKey: 'some value',
          }
        )
      }

      testWith({ initState: {} })
      testWith({
        initState: {
          post: 'some old post',
          status: 'some other status',
        },
      })
    })
  })

  describe('SET_POST', () => {
    it('should set post, update status, and copy other keys', () => {
      const testWith = ({ initState: passedInitState, payload, expected }) => {
        const initState = { otherKey: 'some value', ...passedInitState }
        assert.deepInclude(
          pageReducer(initState, fromPage.setPost(payload)),
          { otherKey: 'some value', ...expected }
        )
      }

      testWith({
        initState: {},
        payload: 'some post',
        expected: {
          post: 'some post',
          status: 'loaded-post',
        },
      })

      testWith({
        initState: {
          post: 'some old post',
          status: 'some other status',
        },
        payload: 'some other post',
        expected: {
          post: 'some other post',
          status: 'loaded-post',
        },
      })
    })
  })

  /* Custom Page Actions */
  describe('FETCH_PAGE', () => {
    it('should reset page and status, and copy other keys', () => {
      const testWith = ({ initState: passedInitState, expected }) => {
        const initState = { otherKey: 'some value', ...passedInitState }
        assert.deepInclude(
          pageReducer(initState, fromPage.fetchPage()),
          {
            page: null,
            status: 'loading',
            otherKey: 'some value',
          }
        )
      }

      testWith({ initState: {} })
      testWith({
        initState: {
          page: 'some old page',
          status: 'some other status',
        },
      })
    })
  })

  describe('SET_PAGE', () => {
    it('should set page, update status, and copy other keys', () => {
      const testWith = ({ initState: passedInitState, payload, expected }) => {
        const initState = { otherKey: 'some value', ...passedInitState }
        assert.deepInclude(
          pageReducer(initState, fromPage.setPage(payload)),
          { otherKey: 'some value', ...expected }
        )
      }

      testWith({
        initState: {},
        payload: 'some page',
        expected: {
          page: 'some page',
          status: 'loaded-page',
        },
      })

      testWith({
        initState: {
          page: 'some old page',
          status: 'some other status',
        },
        payload: 'some other page',
        expected: {
          page: 'some other page',
          status: 'loaded-page',
        },
      })
    })
  })
})

describe('state/page/selectors', () => {
  describe('getPostExcerptsWithTags()', () => {
    it('should get the post and map the excerpt to content', () => {
      const testWith = ({ initState: passedInitState, expected }) => {
        const initState = {
          ...passedInitState,
          otherStateKey: 'some other value',
        }

        fromPage.getPostExcerptsWithTags(initState).forEach((page, i) => {
          assert.deepInclude(
            page,
            expected[i],
          )
        })
      }

      testWith({
        initState: {
          postList: [
            {
              content: 'first post content',
              excerpt: 'first post excerpt',
              otherKeys: 'first post other infos',
            },
            {
              content: 'second post content',
              excerpt: 'second post excerpt',
              otherKeys: 'second post other infos',
            },
          ],
        },
        expected: [
          {
            content: 'first post excerpt',
            otherKeys: 'first post other infos',
          },
          {
            content: 'second post excerpt',
            otherKeys: 'second post other infos',
          },
        ],
      })

      testWith({
        initState: {
          postList: [
            {
              content: 'first post content',
              excerpt: 'first post excerpt',
              otherKeys: 'first post other infos',
            },
            {
              content: 'second post content',
              excerpt: 'second post excerpt',
              otherKeys: 'second post other infos',
            },
            {
              content: 'third post content',
              excerpt: 'third post excerpt',
              otherKeys: 'third post other infos',
            },
          ],
        },
        expected: [
          {
            content: 'first post excerpt',
            otherKeys: 'first post other infos',
          },
          {
            content: 'second post excerpt',
            otherKeys: 'second post other infos',
          },
          {
            content: 'third post excerpt',
            otherKeys: 'third post other infos',
          },
        ],
      })
    })

    it('should add url based on id', () => {
      const testWith = ({ initState, expected }) => {
        fromPage.getPostExcerptsWithTags(initState).forEach((page, i) => {
          assert.deepInclude(
            page,
            expected[i],
          )
        })
      }

      testWith({
        initState: {
          postList: [
            { id: 123 },
            { id: 456 },
            { id: 789 },
          ],
        },
        expected: [
          { id: 123, url: '/post/123' },
          { id: 456, url: '/post/456' },
          { id: 789, url: '/post/789' },
        ],
      })

      testWith({
        initState: {
          postList: [
            { id: 123 },
            { id: 456 },
          ],
        },
        expected: [
          { id: 123, url: '/post/123' },
          { id: 456, url: '/post/456' },
        ],
      })
    })

    it('should also get the tags of the posts if any', () => {
      const testWith = ({ initState, expected }) => {
        fromPage.getPostExcerptsWithTags(initState).forEach((page, i) => {
          assert.deepInclude(
            page,
            expected[i],
          )
        })
      }

      testWith({
        initState: {
          postList: [
            { title: 'first post', tags: [1, 2] },
            { title: 'second post', tags: [2, 3] },
          ],
          searchTags: [
            { id: 1, name: 'tag-one' },
            { id: 2, name: 'tag-two' },
            { id: 3, name: 'tag-three' },
          ],
        },
        expected: [
          {
            title: 'first post',
            content: undefined,
            tags: [
              { id: 1, name: 'tag-one' },
              { id: 2, name: 'tag-two' },
            ],
          },
          {
            title: 'second post',
            content: undefined,
            tags: [
              { id: 2, name: 'tag-two' },
              { id: 3, name: 'tag-three' },
            ],
          },
        ],
      })

      testWith({
        initState: {
          postList: [
            { title: 'first post' },
            { title: 'second post', tags: [2] },
          ],
          searchTags: [
            { id: 1, name: 'tag-one' },
            { id: 2, name: 'tag-two' },
            { id: 3, name: 'tag-three' },
          ],
        },
        expected: [
          { title: 'first post', content: undefined },
          {
            title: 'second post',
            content: undefined,
            tags: [{ id: 2, name: 'tag-two' }],
          },
        ],
      })
    })
  })

  describe('getPostWithTags()', () => {
    it('should get the post and add url based on id', () => {
      const testWith = ({ initState, expected }) =>
        assert.deepInclude(
          fromPage.getPostWithTags({
            ...initState,
            otherStateKey: 'some other value',
          }),
          expected,
        )

      testWith({
        initState: {
          post: { id: 123, title: 'some post' },
        },
        expected: { id: 123, title: 'some post', url: '/post/123' },
      })

      testWith({
        initState: {
          post: { id: 456, title: 'some other post' },
        },
        expected: { id: 456, title: 'some other post', url: '/post/456' },
      })
    })

    it('should also get the tags of the posts if any', () => {
      assert.deepInclude(
        fromPage.getPostWithTags({
          post: { title: 'some post', tags: [1, 3] },
          searchTags: [
            { id: 1, name: 'tag-one' },
            { id: 2, name: 'tag-two' },
            { id: 3, name: 'tag-three' },
          ],
          otherStateKey: 'some other value',
        }),
        {
          title: 'some post',
          tags: [
            { id: 1, name: 'tag-one' },
            { id: 3, name: 'tag-three' },
          ],
        },
      )

      assert.deepInclude(
        fromPage.getPostWithTags({
          post: { title: 'some other post', tags: [2] },
          searchTags: [
            { id: 1, name: 'tag-one' },
            { id: 2, name: 'tag-two' },
            { id: 3, name: 'tag-three' },
          ],
          otherKey: 'some other value',
        }),
        {
          title: 'some other post',
          tags: [{ id: 2, name: 'tag-two' }],
        },
      )
    })
  })

  describe('getPage()', () => {
    it('should get page and add url based on id', () => {
      const testWith = ({ initState, expected }) =>
        assert.deepEqual(
          fromPage.getPage({ ...initState, otherStateKey: 'some other value' }),
          expected
        )

      testWith({
        initState: {
          page: { id: 123, title: 'some post' },
        },
        expected: { id: 123, title: 'some post', url: '/123' },
      })

      testWith({
        initState: {
          page: { id: 456, title: 'some other post' },
        },
        expected: { id: 456, title: 'some other post', url: '/456' },
      })
    })
  })

  it('getPostListPage()', () => {
    assert.equal(
      fromPage.getPostListPage({
        postListPage: 'foo',
        otherStateKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPage.getPostListPage({
        postListPage: 'baz',
        otherStateKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getError()', () => {
    assert.equal(
      fromPage.getError({
        error: 'foo',
        otherStateKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPage.getError({
        error: 'baz',
        otherStateKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getSearchKeyword()', () => {
    assert.equal(
      fromPage.getSearchKeyword({
        searchKeyword: 'foo',
        otherStateKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPage.getSearchKeyword({
        searchKeyword: 'baz',
        otherStateKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getSearchTags()', () => {
    assert.equal(
      fromPage.getSearchTags({
        searchTags: 'foo',
        otherStateKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPage.getSearchTags({
        searchTags: 'baz',
        otherStateKey: 'some other value',
      }),
      'baz',
    )
  })

  it('getActiveSearchTagsIds()', () => {
    assert.deepEqual(
      fromPage.getActiveSearchTagsIds({
        searchTags: [
          { id: 1, name: 'some tag', isActive: true },
          { id: 2, name: 'some other tag', isActive: true },
          { id: 3, name: 'another tag', isActive: true },
        ],
        otherStateKey: 'some other value',
      }),
      [1, 2, 3],
    )

    assert.deepEqual(
      fromPage.getActiveSearchTagsIds({
        searchTags: [
          { id: 1, name: 'some tag', isActive: false },
          { id: 2, name: 'some other tag', isActive: true },
          { id: 3, name: 'another tag', isActive: false },
          { id: 4, name: 'new tag', isActive: true },
        ],
        otherStateKey: 'some other value',
      }),
      [2, 4],
    )
  })

  it('getStatus()', () => {
    assert.equal(
      fromPage.getStatus({
        status: 'foo',
        otherStateKey: 'some other value',
      }),
      'foo',
    )

    assert.equal(
      fromPage.getStatus({
        status: 'baz',
        otherStateKey: 'some other value',
      }),
      'baz',
    )
  })
})

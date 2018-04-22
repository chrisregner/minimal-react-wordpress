import { handleActions, createAction } from 'redux-actions'

import {
  /* Common Actions */
  RESET_PAGE,
  SET_ERROR,
  /* Post List Actions */
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  ADD_POST_LIST,
  /* Search Actions */
  SET_SEARCH_KEYWORD,
  TOGGLE_SEARCH_TAG,
  CLEAR_SEARCH,
  SET_SEARCH_PARAMS,
  FETCH_SEARCH_TAGS,
  SET_SEARCH_TAGS,
  /* Post Page Actions */
  FETCH_POST,
  SET_POST,
  /* Post Page Actions */
  FETCH_PAGE,
  SET_PAGE,
} from 'app/state/actionTypes'

/**
 * sample state:
 * ...
 */

const defaultState = {
  postList: [],
  searchTags: [],
  status: 'loading',
}

const pageReducer = handleActions({
  /* Common Actions */
  [RESET_PAGE]: ({ ...state }) => ({
    ...state,
    postList: [],
    postListPage: 1,
    status: 'loading',
  }),

  [SET_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
    status: 'error',
  }),

  /* Post List Actions */
  [FETCH_MORE_POST_LIST]: ({ postListPage, ...state }) => ({
    ...state,
    postListPage: postListPage + 1,
    status: 'loading',
  }),

  [ADD_POST_LIST]: ({ postList, postListPage, ...state }, { payload }) => ({
    ...state, postListPage,
    postList: (postList || []).concat(payload.postList),
    status: (() => {
      const { totalPages } = payload
      const hasSearchParam = getHasFilter(state)

      if (totalPages > 0 && postListPage < totalPages) return 'can-load'
      if (totalPages > 0 && postListPage === totalPages && hasSearchParam) return 'no-more-match'
      if (totalPages > 0 && postListPage === totalPages && !hasSearchParam) return 'no-more-post'
      if (totalPages === 0 && hasSearchParam) return 'no-match'
      if (totalPages === 0 && !hasSearchParam) return 'no-post'
    })(),
  }),

  /* Search Actions */
  [SET_SEARCH_KEYWORD]: (state, { payload }) => ({
    ...state,
    searchKeyword: payload,
  }),

  [TOGGLE_SEARCH_TAG]: ({ searchTags, ...state }, { payload }) => ({
    ...state,
    searchTags: searchTags.map(tag => tag.id === payload
      ? { ...tag, isActive: !tag.isActive }
      : tag),
  }),

  [SET_SEARCH_PARAMS]: (state, { payload = {} }) => ({
    ...state,
    searchKeyword: payload.searchKeyword || '',
    searchTags: state.searchTags.map(tag => ({
      ...tag,
      isActive: !!((payload.searchTags || []).includes(tag.id)),
    })),
  }),

  [SET_SEARCH_TAGS]: (state, { payload }) => ({
    ...state,
    searchTags: payload.map(tag => ({ isActive: false, ...tag })),
  }),

  [CLEAR_SEARCH]: ({ searchTags, ...state }) => ({
    ...state,
    searchKeyword: '',
    searchTags: searchTags.map(tag => ({
      ...tag, isActive: false,
    })),
  }),

  /* Post Page Actions */
  [FETCH_POST]: state => ({
    ...state,
    status: 'loading',
    post: null,
  }),

  [SET_POST]: (state, { payload }) => ({
    ...state,
    status: 'loaded-post',
    post: payload,
  }),

  /* Custom Page Actions */
  [FETCH_PAGE]: state => ({
    ...state,
    status: 'loading',
    page: null,
  }),

  [SET_PAGE]: (state, { payload }) => ({
    ...state,
    status: 'loaded-page',
    page: payload,
  }),
}, defaultState)

/**
 * Action Creators
 */

/* Common Actions */
export const resetPage = createAction(RESET_PAGE)
export const setError = createAction(SET_ERROR)

/* Post List Actions */
export const fetchPostList = createAction(FETCH_POST_LIST)
export const fetchMorePostList = createAction(FETCH_MORE_POST_LIST)
export const addPostList = createAction(ADD_POST_LIST)

/* Search Actions */
export const setSearchKeyword = createAction(SET_SEARCH_KEYWORD)
export const toggleSearchTag = createAction(TOGGLE_SEARCH_TAG)
export const setSearchParams = createAction(SET_SEARCH_PARAMS)
export const clearSearch = createAction(CLEAR_SEARCH)
export const fetchTags = createAction(FETCH_SEARCH_TAGS)
export const setSearchTags = createAction(SET_SEARCH_TAGS)

/* Post Page Actions */
export const fetchPost = createAction(FETCH_POST)
export const setPost = createAction(SET_POST)

/* Custom Page Actions */
export const fetchPage = createAction(FETCH_PAGE)
export const setPage = createAction(SET_PAGE)

/**
 * Selectors
 */
export const getError = state => state.error
export const getStatus = state => state.status
export const getSearchKeyword = state => state.searchKeyword
export const getSearchTags = state => state.searchTags

export const getPostWithTags = ({ post, searchTags }) =>
  post && {
    ...post,
    url: `/post/${post.id}`,
    tags: post.tags && post.tags.map(postTagId =>
      searchTags.find(searchTag => searchTag.id === postTagId)
    ),
  }

export const getPostExcerptsWithTags = ({ postList, searchTags }) =>
  postList.map(post =>
    ({
      ...post,
      content: post.excerpt,
      url: `/post/${post.id}`,
      tags: post.tags && post.tags.map(postTagId =>
        searchTags.find(searchTag => searchTag.id === postTagId)
      ),
    }))

export const getPage = ({ page }) =>
  page && {
    ...page,
    url: `/${page.id}`,
  }

export const getActiveSearchTagsIds = state =>
  state
    .searchTags
    .filter(tag => tag.isActive)
    .map(tag => tag.id)

/* Internal Functions */
const getHasFilter = ({ searchKeyword, searchTags }) =>
  !!((searchKeyword && searchKeyword.length) || (searchTags && searchTags.length))

export default pageReducer

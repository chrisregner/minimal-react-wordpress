import { handleActions, createAction } from 'redux-actions'
import without from 'ramda/src/without'

import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_SEARCH_KEYWORD,
  ADD_SEARCH_TAG,
  REMOVE_SEARCH_TAG,
  ADD_POST_LIST,
  SET_ERROR,
} from 'app/state/actionTypes'

/**
 * sample state:
 * ...
 */

const defaultState = {}
const postListReducer = handleActions({
  [FETCH_POST_LIST]: state => ({
    ...state,
    postList: [],
    page: 1,
    searchKeyword: '',
    searchTags: [],
    status: 'loading',
  }),

  [FETCH_MORE_POST_LIST]: ({ page, ...state }) => ({
    ...state,
    page: page + 1,
    status: 'loading',
  }),

  [SET_SEARCH_KEYWORD]: (state, { payload }) => ({
    ...state,
    postList: [],
    searchKeyword: payload,
    page: 1,
    status: 'loading',
  }),

  [ADD_SEARCH_TAG]: ({ searchTags = [], ...state }, { payload }) => ({
    ...state,
    postList: [],
    searchTags: [...searchTags, payload],
    page: 1,
    status: 'loading',
  }),

  [REMOVE_SEARCH_TAG]: ({ searchTags = [], ...state }, { payload }) => ({
    ...state,
    postList: [],
    searchTags: without([payload], searchTags),
    page: 1,
    status: 'loading',
  }),

  [ADD_POST_LIST]: ({ postList, ...state }, { payload }) => ({
    ...state,
    postList: (postList || []).concat(payload.postList),
    status: (() => {
      const { page, searchKeyword, searchTags } = state
      const { totalPages } = payload
      const hasSearchParam =
        !!((searchKeyword && searchKeyword.length) || (searchTags && searchTags.length))

      if (totalPages > 0 && page < totalPages) return 'can-load'
      if (totalPages > 0 && page === totalPages && hasSearchParam) return 'no-more-match'
      if (totalPages > 0 && page === totalPages && !hasSearchParam) return 'no-more-post'
      if (totalPages === 0 && hasSearchParam) return 'no-match'
      if (totalPages === 0 && !hasSearchParam) return 'no-post'
    })(),
  }),

  [SET_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
    status: 'error',
  }),
}, defaultState)

/* Action Creators */
export const fetchPostList = createAction(FETCH_POST_LIST)
export const fetchMorePostList = createAction(FETCH_MORE_POST_LIST)
export const setSearchKeyword = createAction(SET_SEARCH_KEYWORD)
export const addSearchTag = createAction(ADD_SEARCH_TAG)
export const removeSearchTag = createAction(REMOVE_SEARCH_TAG)
export const addPostList = createAction(ADD_POST_LIST)
export const setError = createAction(SET_ERROR)

/* Selectors */
export const getPostList = state => state.postList
export const getError = state => state.error
export const getPage = state => state.page
export const getSearchKeyword = state => state.searchKeyword
export const getSearchTags = state => state.searchTags
export const getStatus = state => state.status

export default postListReducer

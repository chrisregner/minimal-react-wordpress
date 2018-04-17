import { handleActions, createAction } from 'redux-actions'

import {
  RESET_PAGE,
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  FETCH_TAGS,
  SET_SEARCH_KEYWORD,
  SET_SEARCH_TAGS,
  TOGGLE_SEARCH_TAG,
  CLEAR_SEARCH,
  ADD_POST_LIST,
  SET_ERROR,
  SET_SEARCH_PARAMS,
} from 'app/state/actionTypes'

/**
 * sample state:
 * ...
 */

const defaultState = { postList: [], searchTags: [] }
const pageReducer = handleActions({
  [RESET_PAGE]: ({ ...state }) => ({
    ...state,
    postList: [],
    page: 1,
    status: 'loading',
  }),

  [FETCH_MORE_POST_LIST]: ({ page, ...state }) => ({
    ...state,
    page: page + 1,
    status: 'loading',
  }),

  [SET_SEARCH_KEYWORD]: (state, { payload }) => ({
    ...state,
    searchKeyword: payload,
  }),

  [SET_SEARCH_TAGS]: (state, { payload }) => ({
    ...state,
    searchTags: payload.map(tag => ({ isActive: false, ...tag })),
  }),

  [TOGGLE_SEARCH_TAG]: ({ searchTags, ...state }, { payload }) => ({
    ...state,
    searchTags: searchTags.map(tag => tag.id === payload
      ? { ...tag, isActive: !tag.isActive }
      : tag),
  }),

  [CLEAR_SEARCH]: ({ searchTags, ...state }) => ({
    ...state,
    searchKeyword: '',
    searchTags: searchTags.map(tag => ({
      ...tag, isActive: false,
    })),
  }),

  [SET_SEARCH_PARAMS]: (state, { payload = {} }) => ({
    ...state,
    searchKeyword: payload.searchKeyword || '',
    searchTags: state.searchTags.map(tag => ({
      ...tag,
      isActive: !!((payload.searchTags || []).includes(tag.id)),
    })),
  }),

  [ADD_POST_LIST]: ({ postList, page, ...state }, { payload }) => ({
    ...state, page,
    postList: (postList || []).concat(payload.postList),
    status: (() => {
      const { totalPages } = payload
      const hasSearchParam = getHasFilter(state)

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
export const resetPage = createAction(RESET_PAGE)
export const fetchPostList = createAction(FETCH_POST_LIST)
export const fetchMorePostList = createAction(FETCH_MORE_POST_LIST)
export const fetchTags = createAction(FETCH_TAGS)
export const setSearchKeyword = createAction(SET_SEARCH_KEYWORD)
export const setSearchTags = createAction(SET_SEARCH_TAGS)
export const setSearchParams = createAction(SET_SEARCH_PARAMS)
export const toggleSearchTag = createAction(TOGGLE_SEARCH_TAG)
export const clearSearch = createAction(CLEAR_SEARCH)
export const addPostList = createAction(ADD_POST_LIST)
export const setError = createAction(SET_ERROR)

/* Selectors */
export const getPostListWithTags = ({ postList, searchTags }) =>
  postList.map(({ tags, ...postItem }) => tags
    ? {
      tags: tags.map(postTagId =>
        searchTags.find(tag => tag.id === postTagId)
      ),
      ...postItem,
    }
    : postItem
  )

export const getError = state => state.error
export const getPage = state => state.page
export const getSearchKeyword = state => state.searchKeyword
export const getSearchTags = state => state.searchTags
export const getActiveSearchTagsIds = state =>
  state
    .searchTags
    .filter(tag => tag.isActive)
    .map(tag => tag.id)
export const getStatus = state => state.status

/* Internal Functions */
const getHasFilter = ({ searchKeyword, searchTags }) =>
  !!((searchKeyword && searchKeyword.length) || (searchTags && searchTags.length))

export default pageReducer

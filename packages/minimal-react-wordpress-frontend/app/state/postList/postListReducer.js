import { handleActions, createAction } from 'redux-actions'

import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_POST_LIST,
  ADD_POST_LIST,
  SET_ERROR,
} from 'app/state/actionTypes'

/**
 * sample state:
 * ...
 */

const defaultState = {}
const postListReducer = handleActions({
  [FETCH_POST_LIST]: () => ({ page: 1, isLoading: true }),

  [FETCH_MORE_POST_LIST]: ({ page, ...state }) => ({
    ...state,
    page: page + 1,
    isLoading: true,
  }),

  [SET_POST_LIST]: (state, { payload: { postList, totalPages } }) => ({
    ...state, postList, totalPages,
    isLoading: false,
  }),

  [ADD_POST_LIST]: ({ postList, ...state }, { payload }) => ({
    ...state,
    postList: postList.concat(payload.postList),
    totalPages: payload.totalPages,
    isLoading: false,
  }),

  [SET_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
    isLoading: false,
  }),
}, defaultState)

/* Action Creators */
export const fetchPostList = createAction(FETCH_POST_LIST)
export const fetchMorePostList = createAction(FETCH_MORE_POST_LIST)
export const setPostList = createAction(SET_POST_LIST)
export const addPostList = createAction(ADD_POST_LIST)
export const setError = createAction(SET_ERROR)

/* Selectors */
export const getPostList = state => state.postList
export const getIsLoading = state => state.isLoading
export const getError = state => state.error
export const getPage = state => state.page
export const getIsThereMorePost = state => state.page < state.totalPages

export default postListReducer

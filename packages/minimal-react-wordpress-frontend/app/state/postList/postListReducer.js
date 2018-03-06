import { handleActions } from 'redux-actions'
import { indentity as noop } from 'ramda'

import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_POST_LIST,
  ADD_POST_LIST,
  SET_ERROR,
} from 'app/state/actionTypes'

const defaultState = {}
const postListReducer = handleActions({
  [FETCH_POST_LIST]: () => ({ page: 1, isLoading: true }),

  [FETCH_MORE_POST_LIST]: ({ page, ...state }) => ({
    ...state,
    page: page + 1,
    isLoading: true
  }),

  [SET_POST_LIST]: (state, { payload: { posts, totalPages } }) => ({
    ...state,
    isLoading: false,
    posts, totalPages,
  }),

  [ADD_POST_LIST]: ({ posts, ...state }, { payload }) => ({
    ...state,
    posts: posts.concat(payload.posts),
    totalPages: payload.totalPages,
    isLoading: false,
  }),

  [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
}, defaultState)

export default postListReducer
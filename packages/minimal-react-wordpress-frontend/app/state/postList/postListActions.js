import { createAction } from 'redux-actions'
import { indentity as noop } from 'ramda'

import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_POST_LIST,
  ADD_POST_LIST,
  SET_ERROR,
} from 'app/state/actionTypes'

export const fetchPostList = createAction(FETCH_POST_LIST)
export const fetchMorePostList = createAction(FETCH_MORE_POST_LIST)
export const setPostList = createAction(SET_POST_LIST)
export const addPostList = createAction(ADD_POST_LIST)
export const setError = createAction(SET_ERROR)

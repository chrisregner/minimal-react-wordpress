import { handleActions, createAction } from 'redux-actions'

import {
  SHOW_SEARCH,
  HIDE_SEARCH,
} from 'app/state/actionTypes'

/**
 * sample state:
 * ...
 */

const defaultState = { isSearchVisible: false }
const uiReducer = handleActions({
  [SHOW_SEARCH]: () => ({ isSearchVisible: true }),
  [HIDE_SEARCH]: () => ({ isSearchVisible: false }),
}, defaultState)

/* Action creators */
export const showSearch = createAction(SHOW_SEARCH)
export const hideSearch = createAction(HIDE_SEARCH)

/* Selectors */
export const getIsSearchVisible = state => state.isSearchVisible

export default uiReducer

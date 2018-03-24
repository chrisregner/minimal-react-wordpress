import { handleActions, createAction } from 'redux-actions'

import { TOGGLE_SEARCH, FLAG_SEARCH_ANIMATION_END } from 'app/state/actionTypes'

/**
 * sample state:
 * ...
 */

const defaultState = { isSearchVisible: false, isSearchAnimationDone: true }
const uiReducer = handleActions({
  [TOGGLE_SEARCH]: ({ isSearchVisible, ...state }) => ({
    ...state,
    isSearchVisible: !isSearchVisible,
    isSearchAnimationDone: false,
  }),

  [FLAG_SEARCH_ANIMATION_END]: state => ({
    ...state,
    isSearchAnimationDone: true,
  }),
}, defaultState)

/* Action creators */
export const toggleSearch = createAction(TOGGLE_SEARCH)
export const flagSearchAnimationEnd = createAction(FLAG_SEARCH_ANIMATION_END)

/* Selectors */
export const getIsSearchVisible = state => state.isSearchVisible
export const getIsSearchAnimationDone = state => state.isSearchAnimationDone

export default uiReducer

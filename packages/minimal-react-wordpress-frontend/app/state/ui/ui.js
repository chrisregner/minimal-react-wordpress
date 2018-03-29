import { handleActions, createAction } from 'redux-actions'

import {
  TOGGLE_SEARCH,
  FLAG_SEARCH_ANIMATION_END,
  FETCH_NAV_LINKS,
  SET_NAV_LINKS,
} from 'app/state/actionTypes'

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

  [SET_NAV_LINKS]: (state, { payload }) => ({
    ...state,
    navLinks: payload,
  }),
}, defaultState)

/* Action creators */
export const fetchNavLinks = createAction(FETCH_NAV_LINKS)
export const toggleSearch = createAction(TOGGLE_SEARCH)
export const flagSearchAnimationEnd = createAction(FLAG_SEARCH_ANIMATION_END)
export const setNavLinks = createAction(SET_NAV_LINKS)

/* Selectors */
export const getIsSearchVisible = state => state.isSearchVisible
export const getIsSearchAnimationDone = state => state.isSearchAnimationDone

export default uiReducer

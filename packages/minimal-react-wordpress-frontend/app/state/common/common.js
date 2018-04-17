import { handleActions, createAction } from 'redux-actions'

import { FETCH_NAV_LINKS, SET_NAV_LINKS } from 'app/state/actionTypes'

const defaultState = {}
const commonReducer = handleActions({
  [SET_NAV_LINKS]: (state, { payload }) => ({
    ...state,
    navLinks: payload,
  }),
}, defaultState)

/* Action Creators */
export const fetchNavLinks = createAction(FETCH_NAV_LINKS)
export const setNavLinks = createAction(SET_NAV_LINKS)

/* Selectors */
export const getNavLinks = state => state.navLinks

export default commonReducer

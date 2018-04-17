import { combineReducers } from 'redux'

import pageReducer, * as fromPage from './page'
import uiReducer, * as fromUi from './ui'
import commonReducer, * as fromCommon from './common'

const rootReducer = combineReducers({
  page: pageReducer,
  ui: uiReducer,
  common: commonReducer,
})

// page selectors
export const getPostListWithTags = ({ page }) => fromPage.getPostListWithTags(page)
export const getError = ({ page }) => fromPage.getError(page)
export const getPage = ({ page }) => fromPage.getPage(page)
export const getSearchKeyword = ({ page }) => fromPage.getSearchKeyword(page)
export const getSearchTags = ({ page }) => fromPage.getSearchTags(page)
export const getActiveSearchTagsIds = ({ page }) => fromPage.getActiveSearchTagsIds(page)
export const getStatus = ({ page }) => fromPage.getStatus(page)

// ui selectors
export const getIsSearchVisible = ({ ui }) => fromUi.getIsSearchVisible(ui)
export const getIsSearchAnimationDone = ({ ui }) => fromUi.getIsSearchAnimationDone(ui)

// common selectors
export const getNavLinks = ({ common }) => fromCommon.getNavLinks(common)

export default rootReducer

import { combineReducers } from 'redux'

import pageReducer, * as fromPage from './page'
import uiReducer, * as fromUi from './ui'

const rootReducer = combineReducers({
  page: pageReducer,
  ui: uiReducer,
})

// page selectors
export const getPostList = ({ page }) => fromPage.getPostList(page)
export const getError = ({ page }) => fromPage.getError(page)
export const getPage = ({ page }) => fromPage.getPage(page)
export const getSearchKeyword = ({ page }) => fromPage.getSearchKeyword(page)
export const getSearchTags = ({ page }) => fromPage.getSearchTags(page)
export const getActiveSearchTagsIds = ({ page }) => fromPage.getActiveSearchTagsIds(page)
export const getStatus = ({ page }) => fromPage.getStatus(page)

// ui selectors
export const getIsSearchVisible = ({ ui }) => fromUi.getIsSearchVisible(ui)
export const getIsSearchAnimationDone = ({ ui }) => fromUi.getIsSearchAnimationDone(ui)

export default rootReducer

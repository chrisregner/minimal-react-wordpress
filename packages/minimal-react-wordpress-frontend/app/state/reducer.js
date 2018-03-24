import { combineReducers } from 'redux'

import postListReducer, * as fromPostList from './postList'
import uiReducer, * as fromUi from './ui'

const rootReducer = combineReducers({
  page: postListReducer,
  ui: uiReducer,
})

// postList selectors
export const getPostList = ({ page }) => fromPostList.getPostList(page)
export const getError = ({ page }) => fromPostList.getError(page)
export const getPage = ({ page }) => fromPostList.getPage(page)
export const getSearchKeyword = ({ page }) => fromPostList.getSearchKeyword(page)
export const getSearchTags = ({ page }) => fromPostList.getSearchTags(page)
export const getStatus = ({ page }) => fromPostList.getStatus(page)

// ui selectors
export const getIsSearchVisible = ({ ui }) => fromUi.getIsSearchVisible(ui)
export const getIsSearchAnimationDone = ({ ui }) => fromUi.getIsSearchAnimationDone(ui)

export default rootReducer

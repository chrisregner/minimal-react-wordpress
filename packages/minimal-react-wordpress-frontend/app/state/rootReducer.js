import { combineReducers } from 'redux'

import postListReducer, * as fromPostList from './postList'
import uiReducer, * as fromUi from './ui'

const rootReducer = combineReducers({
  page: postListReducer,
  ui: uiReducer,
})

// postList selectors
export const getPostList = ({ page }) => fromPostList.getPostList(page)
export const getIsLoading = ({ page }) => fromPostList.getIsLoading(page)
export const getError = ({ page }) => fromPostList.getError(page)
export const getPage = ({ page }) => fromPostList.getPage(page)
export const getIsThereMorePost = ({ page }) => fromPostList.getIsThereMorePost(page)

// ui selectors
export const getIsSearchVisible = ({ ui }) => fromUi.getIsSearchVisible(ui)

export default rootReducer

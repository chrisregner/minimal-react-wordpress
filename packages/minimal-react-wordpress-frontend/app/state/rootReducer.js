import { combineReducers } from 'redux'

import postListReducer, * as postListSelectors from './postList/postListReducer'

const rootReducer = combineReducers({
  page: postListReducer,
})

export const getPostList = ({ page }) => postListSelectors.getPostList(page)
export const getIsLoading = ({ page }) => postListSelectors.getIsLoading(page)
export const getError = ({ page }) => postListSelectors.getError(page)
export const getPage = ({ page }) => postListSelectors.getPage(page)
export const getIsThereMorePost = ({ page }) => postListSelectors.getIsThereMorePost(page)

export default rootReducer

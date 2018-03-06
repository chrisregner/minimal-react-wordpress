import { combineReducers } from 'redux'

import postListReducer from './postList/postListReducer'

const rootReducer = combineReducers({
  page: postListReducer
})

export default rootReducer

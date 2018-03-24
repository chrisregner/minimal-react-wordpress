import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import sagas from './saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  // preloadedState,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(sagas)

export default store

/**

planned state shape:

{
  pageSpecific: {
    pageType,
    posts,
    isLoading,
    availablePosts,
    pageNo,
    searchString,
    searchTags,
    error,
  },
  pageSpecific: {
    pageType,
    post,
    isLoading,
    error,
    otherLinks: {
      relatedLinks,
      prevLink,
      nextLink,
      errors: {
        relatedLink,
        prevNextLinks,
      },
    }
  },
  common: {
    isNotFound,
    nav {
      links,
      activeLink?,
      error,
    }
  },
}

planned action types:

- common
  - SET_NOT_FOUND
  - FETCH_NAV
  - SET_NAV
  - SET_NAV_ERROR
- post list
  - SET_ERROR
  - initial
    - FETCH_POST_LIST
    - SET_POST_LIST
  - additional
    - FETCH_MORE_POST_LIST
    - ADD_POST_LIST
  - search
    - SET_SEARCH_STRING
    - SET_ERROR_NO_SEARCH_MATCH
    - ADD_SEARCH_TAG
    - REMOVE_SEARCH_TAG
- post single
  - SET_ERROR
  - FETCH_POST_SINGLE
  - FETCH_POST_SINGLE_RELATED_LINKS?
  - SET_POST_SINGLE_RELATED_LINKS?
  - SET_POST_SINGLE_RELATED_LINKS_ERROR?
  - FETCH_POST_SINGLE_NEXT_PREV_LINKS?
  - SET_POST_SINGLE_NEXT_PREV_LINKS?
  - SET_POST_SINGLE_NEXT_PREV_LINKS_ERROR?
  - SET_POST_SINGLE
- page
  - SET_ERROR
  - FETCH_PAGE
  - SET_PAGE

*/

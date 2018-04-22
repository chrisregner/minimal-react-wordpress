import { call, put, takeLatest, select } from 'redux-saga/effects'
import qs from 'query-string'

import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  FETCH_POST,
  FETCH_PAGE,
  SET_SEARCH_KEYWORD,
  FETCH_SEARCH_TAGS,
  TOGGLE_SEARCH_TAG,
  CLEAR_SEARCH,
} from 'app/state/actionTypes'

import {
  fetchPost as apiFetchPost,
  fetchPostList as apiFetchPostList,
  fetchPage as apiFetchPage,
  fetchTags as apiFetchTags,
} from 'app/api/wpapi'

import {
  setError,
  addPostList,
  setPost,
  setPage,
  setSearchTags,
} from './page'

import {
  getPage,
  getSearchKeyword,
  getActiveSearchTagsIds,
} from 'app/state'

import ro from 'app/services/resourceObservable'
import simplifyPostItem from 'app/utils/simplifyPostItem'
import simplifyPostList from 'app/utils/simplifyPostList'
import simplifyTags from 'app/utils/simplifyTags'
import history from 'app/history'

export function * fetchPostList (action) {
  try {
    const { data, headers } = yield call(apiFetchPostList, {
      page: yield select(getPage),
      search: yield select(getSearchKeyword),
      tags: yield select(getActiveSearchTagsIds),
    })

    yield put(addPostList({
      postList: simplifyPostList(data),
      totalPages: Number(headers['x-wp-totalpages']),
    }))
  } catch (e) {
    console.error(e)
    yield put(setError(e))
  }
}

export function * fetchPost ({ payload: postId }) {
  try {
    const { data } = yield call(apiFetchPost, postId)
    const post = simplifyPostItem(data)

    yield put(setPost(post))
  } catch (e) {
    yield put(setError(e))
    console.error(e)
  }
}

export function * fetchPage ({ payload: pageId }) {
  try {
    const { data } = yield call(apiFetchPage, pageId)
    const page = simplifyPostItem(data)

    yield put(setPage(page))
  } catch (e) {
    yield put(setError(e))
    console.error(e)
  }
}

export function * fetchTags () {
  try {
    const { data } = yield call(apiFetchTags)
    const tags = simplifyTags(data)

    yield put(setSearchTags(tags))
    ro.resolveResource('tags')
  } catch (e) {
    console.error(e)
  }
}

/**
 * This saga updates history as the search-related state changes. It updates in 4 cases:
 *
 * #1 When ON search route, but state HAS NO search params and we HAVE NO saved pre-search route,
 *   it should push history to home
 * #2 When ON search route, but state HAS NO search params and we HAVE saved pre-search route,
 *   it should push history to home
 * #3 When ON search route and state HAS search params,
 *   it should replace history with search route, with search params as query (this is to ensure
 *   that search query is always updated upon state search param change)
 * #4 When NOT ON a search param, but state HAS search params
 *   it should push history to search, with search params as query
 */

let preSearchRoute
export function * syncRoute () {
  try {
    const keyword = yield select(getSearchKeyword)
    const tags = yield select(getActiveSearchTagsIds)
    const hasSearchParam = !!(keyword && keyword.length) || !!(tags && tags.length)
    const currentRoute = history.getLocation().pathname
    const isOnSearchRoute = currentRoute === '/search'
    const query = {}

    if (keyword && keyword.length) query.keyword = keyword
    if (tags && tags.length) query.tags = tags
    if (hasSearchParam && !isOnSearchRoute) preSearchRoute = currentRoute

    if (!hasSearchParam && !preSearchRoute && isOnSearchRoute) // case 1
      history.push('/')
    else if (!hasSearchParam && preSearchRoute && isOnSearchRoute) // case 2
      history.push(preSearchRoute)
    else if (hasSearchParam && isOnSearchRoute) // case 3
      history.replace('/search?' + qs.stringify(query))
    else if (hasSearchParam && !isOnSearchRoute) // case 4
      history.push('/search?' + qs.stringify(query))
  } catch (e) {
    console.error(e)
    yield put(setError(e))
  }
}

export default function * pageSaga () {
  yield takeLatest([
    FETCH_POST_LIST,
    FETCH_MORE_POST_LIST,
  ], fetchPostList)

  yield takeLatest([
    FETCH_POST,
  ], fetchPost)

  yield takeLatest([
    SET_SEARCH_KEYWORD,
    TOGGLE_SEARCH_TAG,
    CLEAR_SEARCH,
  ], syncRoute)

  yield takeLatest([
    FETCH_SEARCH_TAGS,
  ], fetchTags)

  yield takeLatest([
    FETCH_PAGE,
  ], fetchPage)
}

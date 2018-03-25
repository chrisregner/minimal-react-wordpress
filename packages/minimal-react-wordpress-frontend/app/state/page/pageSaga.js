import { call, put, takeLatest, select } from 'redux-saga/effects'
import qs from 'query-string'

import * as wpapi from 'app/api/wpapi'
import simplifyPostList from 'app/utils/simplifyPostList'
import history from 'app/history'
import getLocation from 'app/utils/getLocation'
import { addPostList, setError } from './page'
import {
  getPage,
  getSearchKeyword,
  getSearchTags,
} from 'app/state'
import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_SEARCH_KEYWORD,
  ADD_SEARCH_TAG,
  REMOVE_SEARCH_TAG,
  CLEAR_SEARCH,
} from 'app/state/actionTypes'

export function * fetchPostList () {
  try {
    const { data, headers } = yield call(wpapi.wpFetchPostList, {
      page: yield select(getPage),
      search: yield select(getSearchKeyword),
      tags: yield select(getSearchTags),
    })

    yield put(addPostList({
      postList: simplifyPostList(data),
      totalPages: Number(headers['x-wp-totalpages']),
    }))
  } catch (e) {
    yield put(setError(e))
  }
}

let preSearchRoute
export function * syncRoute () {
  try {
    const keyword = yield select(getSearchKeyword)
    const tags = yield select(getSearchTags)
    const hasSearchParam = !!(keyword && keyword.length) || !!(tags && tags.length)
    const currentRoute = getLocation().pathname
    const isOnSearchRoute = currentRoute === '/search'
    const query = {}

    if (keyword && keyword.length) query.keyword = keyword
    if (tags && tags.length) query.tags = tags
    if (hasSearchParam && !isOnSearchRoute) preSearchRoute = currentRoute

    if (!hasSearchParam && !preSearchRoute && isOnSearchRoute)
      history.push('/')
    else if (hasSearchParam && !isOnSearchRoute)
      history.push('/search?' + qs.stringify(query))
    else if (hasSearchParam && isOnSearchRoute)
      history.replace('/search?' + qs.stringify(query))
    else if (!hasSearchParam && preSearchRoute && isOnSearchRoute)
      history.push(preSearchRoute)
  } catch (e) {
    yield put(setError(e))
  }
}

export default function * pageSaga () {
  yield takeLatest([
    FETCH_POST_LIST,
    FETCH_MORE_POST_LIST,
    SET_SEARCH_KEYWORD,
    ADD_SEARCH_TAG,
    REMOVE_SEARCH_TAG,
    CLEAR_SEARCH,
  ], fetchPostList)

  yield takeLatest([
    SET_SEARCH_KEYWORD,
    ADD_SEARCH_TAG,
    REMOVE_SEARCH_TAG,
    CLEAR_SEARCH,
  ], syncRoute)
}

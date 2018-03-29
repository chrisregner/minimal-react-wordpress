import { call, put, takeLatest, select } from 'redux-saga/effects'
import qs from 'query-string'

import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_SEARCH_KEYWORD,
  FETCH_TAGS,
  TOGGLE_SEARCH_TAG,
  CLEAR_SEARCH,
} from 'app/state/actionTypes'

import {
  getPage,
  getSearchKeyword,
  getActiveSearchTagsIds,
} from 'app/state'

import { addPostList, setError, setSearchTags } from './page'
import { apiFetchPostList, apiFetchTags } from 'app/api/wpapi'
import simplifyPostList from 'app/utils/simplifyPostList'
import simplifyTags from 'app/utils/simplifyTags'
import history from 'app/history'
import getLocation from 'app/utils/getLocation'

export function * fetchPostList () {
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
    yield put(setError(e))
  }
}

let preSearchRoute
export function * syncRoute () {
  try {
    const keyword = yield select(getSearchKeyword)
    const tags = yield select(getActiveSearchTagsIds)
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

export function * fetchTags () {
  try {
    const { data } = yield call(apiFetchTags)
    const tags = simplifyTags(data)

    yield put(setSearchTags(tags))
  } catch (e) {
    console.error(e)
  }
}

export default function * pageSaga () {
  yield takeLatest([
    FETCH_POST_LIST,
    FETCH_MORE_POST_LIST,
    SET_SEARCH_KEYWORD,
    TOGGLE_SEARCH_TAG,
  ], fetchPostList)

  yield takeLatest([
    SET_SEARCH_KEYWORD,
    TOGGLE_SEARCH_TAG,
    CLEAR_SEARCH,
  ], syncRoute)

  yield takeLatest([FETCH_TAGS], fetchTags)
}

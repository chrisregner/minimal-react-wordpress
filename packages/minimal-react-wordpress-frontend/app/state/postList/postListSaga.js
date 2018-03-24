import { call, put, takeLatest, select } from 'redux-saga/effects'

import simplifyPostList from 'app/utils/simplifyPostList'
import * as wpapi from 'app/api/wpapi'
import { getPage, getSearchKeyword, getSearchTags } from 'app/state'
import { addPostList, setError } from './postList'
import {
  FETCH_POST_LIST,
  FETCH_MORE_POST_LIST,
  SET_SEARCH_KEYWORD,
  ADD_SEARCH_TAG,
  REMOVE_SEARCH_TAG,
} from 'app/state/actionTypes'

function * fetchPostList () {
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

export default function * postListSaga () {
  yield takeLatest([
    FETCH_POST_LIST,
    FETCH_MORE_POST_LIST,
    SET_SEARCH_KEYWORD,
    ADD_SEARCH_TAG,
    REMOVE_SEARCH_TAG,
  ], fetchPostList)
}

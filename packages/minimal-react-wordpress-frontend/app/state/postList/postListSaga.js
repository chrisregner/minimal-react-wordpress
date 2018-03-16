import { call, put, takeLatest, select } from 'redux-saga/effects'

import simplifyPostList from 'app/utils/simplifyPostList'
import * as wpapi from 'app/api/wpapi'
import { getPage } from 'app/state'
import { setPostList, addPostList, setError } from './postListReducer'
import { FETCH_POST_LIST, FETCH_MORE_POST_LIST } from 'app/state/actionTypes'

function * fetchPostList () {
  try {
    const { data, headers } = yield call(wpapi.wpFetchPostList)

    yield put(setPostList({
      postList: simplifyPostList(data),
      totalPages: headers['x-wp-totalpages'],
    }))
  } catch (e) {
    yield put(setError(e))
  }
}

function * fetchMorePostList () {
  try {
    const page = yield select(getPage)
    const { data, headers } = yield call(wpapi.wpFetchPostList, { page })

    yield put(addPostList({
      postList: simplifyPostList(data),
      totalPages: headers['x-wp-totalpages'],
    }))
  } catch (e) {
    yield put(setError(e))
  }
}

export default function * postListSaga () {
  yield takeLatest(FETCH_POST_LIST, fetchPostList)
  yield takeLatest(FETCH_MORE_POST_LIST, fetchMorePostList)
}

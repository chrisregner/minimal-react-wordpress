import { call, put, takeEvery } from 'redux-saga/effects'

import { FETCH_POST_LIST } from 'app/state/actionTypes'
import * as wpapi from 'app/api/wpapi'
import { setPostList, setError } from './postListActions'

function* fetchUser(/*action*/) {
  try {
    const { data, headers } = yield call(wpapi.wpFetchPostList/*, action.payload*/)

    yield put(setPostList({
      posts: data,
      totalPages: headers['x-wp-totalpages'],
    }))
  } catch (e) {
    yield put(setError(e))
  }
}

export default function* postListSaga() {
  yield takeEvery(FETCH_POST_LIST, fetchUser)
}

import { fork } from 'redux-saga/effects'

import postListSaga from './postList/postListSaga'

const rootSaga = function* rootSaga() {
  yield [
    fork(postListSaga),
  ]
}

export default rootSaga

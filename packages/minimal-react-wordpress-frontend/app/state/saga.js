import { fork, all } from 'redux-saga/effects'

import pageSaga from './page/pageSaga'
import commonSaga from './common/commonSaga'

const rootSaga = function * rootSaga () {
  yield all([
    fork(pageSaga),
    fork(commonSaga),
  ])
}

export default rootSaga

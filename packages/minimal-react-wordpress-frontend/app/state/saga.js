import { fork } from 'redux-saga/effects'

import pageSaga from './page/pageSaga'

const rootSaga = function * rootSaga () {
  yield [
    fork(pageSaga),
  ]
}

export default rootSaga

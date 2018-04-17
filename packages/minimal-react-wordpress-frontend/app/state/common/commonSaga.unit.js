import { describe, it, afterEach } from 'mocha'
import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { throwError } from 'redux-saga-test-plan/providers'
import td from 'testdouble'

import simplifyNavLinks from 'app/utils/simplifyNavLinks'
import * as api from 'app/api/wpapi'
import * as fromCommon from './common'
import * as fromCommonSaga from './commonSaga'

describe('state/common/saga', () => {
  afterEach(td.reset)

  it('should fetch nav link and put the response', () => {
    const testWith = (res) => {
      return expectSaga(fromCommonSaga.fetchNavLinks)
        .provide([
          [call(api.apiFetchNavLinks), { data: res }],
        ])
        .put(fromCommon.setNavLinks(simplifyNavLinks(res)))
        .run()
    }

    return Promise.all([
      testWith([{ title: 'some nav', url: '/some/url' }]),
      testWith([
        { title: 'some nav', url: '/some/url' },
        { title: 'some other nav', url: '/some/other/url' },
      ]),
    ])
  })

  it('should fetch nav link and log any error', async () => {
    const testWith = async (err) => {
      const consoleErrorTd = td.replace(console, 'error')

      td.verify(consoleErrorTd(), { times: 0, ignoreExtraArgs: true })
      await expectSaga(fromCommonSaga.fetchNavLinks)
        .provide([
          [call(api.apiFetchNavLinks), throwError(err)],
        ])
        .run()

      td.verify(consoleErrorTd(err), { times: 1 })
      td.reset()
    }

    await testWith(new Error('some error'))
    await testWith(new Error('some other error'))
  })
})

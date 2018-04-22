import { call, put, takeLatest } from 'redux-saga/effects'

import { FETCH_NAV_LINKS } from 'app/state/actionTypes'

import simplifyNavLinks from 'app/utils/simplifyNavLinks'
import { setNavLinks } from './common'
import { fetchNavLinks as apiFetchNavLinks } from 'app/api/wpapi'

export function * fetchNavLinks () {
  try {
    const { data } = yield call(apiFetchNavLinks)
    const navLinks = simplifyNavLinks(data)
    yield put(setNavLinks(navLinks))
  } catch (e) {
    console.error(e)
  }
}

export default function * () {
  yield takeLatest([FETCH_NAV_LINKS], fetchNavLinks)
}

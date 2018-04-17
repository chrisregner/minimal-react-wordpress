import { describe, it } from 'mocha'
import { assert } from 'chai'

import times from 'ramda/src/times'
import { resourceObservableFactory } from './resourceObservable'

describe('services/resourceObservable', () => {
  describe('resolveResource()', () => {
    it('should resolve any promises returned by subscribe() if resource matches', () => {
      const ro = resourceObservableFactory()

      // subscribe first...
      const resourceSubscribers = Promise.all([
        ro.subscribe('some resource'),
        ro.subscribe('some resource'),
        ro.subscribe('some resource'),
      ])

      // then resolve
      ro.resolveResource('some resource')
      return resourceSubscribers
    })

    it('should resolve any promises returned by subscribe() that is called later if resource matches', () => {
      const ro = resourceObservableFactory()

      // resolve first...
      ro.resolveResource('some resource')

      // then subscribe
      return Promise.all([
        ro.subscribe('some resource'),
        ro.subscribe('some resource'),
        ro.subscribe('some resource'),
      ])
    })

    it('should NOT resolve promise returned by subscribe() if resource does NOT matches')
  })

  describe('rejectResource()', () => {
    it('should reject any promises returned by subscribe() if resource matches, with correct reason', (done) => {
      let assertionCount = 0
      const ro = resourceObservableFactory()
      const reason = new Error('some reason')

      // subscribe first...
      times(() => {
        ro.subscribe('some resource')
          .catch((e) => {
            assertionCount++
            assert.equal(e, reason)

            if (assertionCount === 3) done()
          })
      }, 3)

      // then reject
      ro.rejectResource('some resource', reason)
    })

    it('should reject any promises returned by subscribe() that is called later if resource matches, with correct reason', (done) => {
      let assertionCount = 0
      const ro = resourceObservableFactory()
      const reason = new Error('some reason')

      // reject first...
      ro.rejectResource('some resource', reason)

      // then subscribe
      times(() => {
        ro.subscribe('some resource')
          .catch((e) => {
            assertionCount++
            assert.equal(e, reason)

            if (assertionCount === 3) done()
          })
      }, 3)
    })

    it('should NOT reject promise returned by subscribe() if resource does NOT matches')
  })
})

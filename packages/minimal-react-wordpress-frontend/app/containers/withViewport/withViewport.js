import { withState, lifecycle, mapProps, compose } from 'recompose'
import pick from 'ramda/src/pick'

const WithViewport = compose(
  withState('viewport', 'setViewport'),
  lifecycle({
    componentWillMount: function () {
      this.props.setViewport(getViewport())

      window.addEventListener('optimizedResize', () => {
        const newViewport = getViewport()
        if (newViewport !== this.props.viewport)
          this.props.setViewport(newViewport)
      })
    },
  }),
  mapProps(pick(['viewport']))
)

/**
 * Create throttled event "optimizedResize"
 * from https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

/* global requestAnimationFrame, CustomEvent */

const throttle = (type, name, obj) => {
  obj = obj || window
  let running = false
  const func = () => {
    if (running) return
    running = true
    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent(name))
      running = false
    })
  }

  obj.addEventListener(type, func)
}

throttle('resize', 'optimizedResize')

/* --- */

const getViewport = () => {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  if (width >= 960) return 'l'
  if (width >= 480 && width < 960) return 'm'
  if (width < 480) return 's'
}

export default WithViewport

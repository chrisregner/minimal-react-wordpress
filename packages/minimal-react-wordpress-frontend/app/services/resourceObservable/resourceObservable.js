const resourceObservableFactory = () => {
  const subscribers = {}
  const rejections = {}
  const resolved = []

  const resolveResource = (resource) => {
    resolved.push(resource)

    if (subscribers[resource]) {
      subscribers[resource].forEach(({ resolve }) => resolve())
      delete subscribers[resource]
    }
  }

  const rejectResource = (resource, reason) => {
    rejections[resource] = reason

    if (subscribers[resource]) {
      subscribers[resource].forEach(({ reject }) => reject(reason))
      delete subscribers[resource]
    }
  }

  const subscribe = resource => new Promise(
    (resolve, reject) => {
      if (resolved.includes(resource)) {
        resolve()
        return
      }

      if (resource in rejections) {
        reject(rejections[resource])
        return
      }

      if (subscribers[resource])
        subscribers[resource].push({ resolve, reject })
      else
        subscribers[resource] = [{ resolve, reject }]
    }
  )

  return {
    resolveResource,
    rejectResource,
    subscribe,
  }
}

const resourceObservable = resourceObservableFactory()

export { resourceObservableFactory }
export default resourceObservable

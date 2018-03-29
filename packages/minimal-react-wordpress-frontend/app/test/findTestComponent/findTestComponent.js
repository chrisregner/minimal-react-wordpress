import curry from 'ramda/src/curry'

const find = (wrapper, matcher) =>
  wrapper.findWhere(x =>
    x.prop('data-test') &&
    x.prop('data-test')
      .trim()
      .split(' ')
      .includes(matcher)
  )

const findTestComponent = curry(
  (wrapper, matcher) => {
    if (typeof matcher === 'string')
      return find(wrapper, matcher)

    if (Array.isArray(matcher))
      return matcher.reduce(
        (currentWrapper, matcher) => find(currentWrapper, matcher),
        wrapper
      )
  }
)

export default findTestComponent

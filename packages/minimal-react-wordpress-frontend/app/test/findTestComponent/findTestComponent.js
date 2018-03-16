import curry from 'ramda/src/curry'

const findTestComponent = curry(
  (wrapper, matcher) => wrapper.findWhere(x =>
    x.prop('data-test') &&
    x.prop('data-test')
      .trim()
      .split(' ')
      .includes(matcher)
  )
)

export default findTestComponent

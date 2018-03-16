import generatePostItem from 'app/test/generatePostItem'
import times from 'ramda/src/times'

const generatePostList = (qty, options) => times(
  () => generatePostItem(options),
  qty || 10
)

export default generatePostList

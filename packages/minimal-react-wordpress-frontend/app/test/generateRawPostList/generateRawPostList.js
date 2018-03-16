import generateRawPostItem from 'app/test/generateRawPostItem'
import times from 'ramda/src/times'

const generateRawPostList = (qty, options) => times(
  () => generateRawPostItem(options),
  qty || 10
)

export default generateRawPostList

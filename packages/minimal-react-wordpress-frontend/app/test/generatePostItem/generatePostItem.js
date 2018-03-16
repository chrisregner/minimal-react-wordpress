import pipe from 'ramda/src/pipe'
import generateRawPostItem from 'app/test/generateRawPostItem'
import simplifyPostItem from 'app/utils/simplifyPostItem'

const generatePostItem = pipe(generateRawPostItem, simplifyPostItem)

export default generatePostItem

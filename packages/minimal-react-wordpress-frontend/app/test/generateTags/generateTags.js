import pipe from 'ramda/src/pipe'
import generateRawTags from 'app/test/generateRawTags'
import simplifyTags from 'app/utils/simplifyTags'

const generateTags = pipe(generateRawTags, simplifyTags)

export default generateTags

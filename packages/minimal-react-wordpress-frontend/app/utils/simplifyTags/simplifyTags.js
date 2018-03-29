
import map from 'ramda/src/map'
import pick from 'ramda/src/pick'

const simplifyTags = map(pick(['id', 'name', 'count']))

export default simplifyTags

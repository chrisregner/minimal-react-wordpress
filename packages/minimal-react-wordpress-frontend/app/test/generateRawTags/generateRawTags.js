import faker from 'faker'
import times from 'ramda/src/times'

const generateRawTags = () => times(() => ({
  id: Math.abs(faker.random.number()),
  count: Math.abs(faker.random.number()),
  name: faker.lorem.word(),
  someUnusedKey: faker.lorem.word(),
}), 10)

export default generateRawTags

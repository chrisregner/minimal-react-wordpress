import faker from 'faker'
import times from 'ramda/src/times'

const wrapInObjWithHtml = string => ({
  rendered: '<div>' + string + '</div>',
  excess_detail: null,
})

const generateObjWithSourceUrl = () => ({
  source_url: faker.lorem.word(),
  excess_detail: null,
})

const generateTagObj = () => ({
  id: Math.abs(faker.random.number()),
  name: faker.lorem.word(),
  excess_detail: null,
})

const generateRawPostItem = ({
  hasFeaturedMedia, hasTags, hasModifiedDate,
} = {}) => {
  const rawPost = {
    id: Math.abs(faker.random.number()),
    date: faker.date.recent().toISOString(),
    title: wrapInObjWithHtml(faker.lorem.words()),
    content: wrapInObjWithHtml(faker.lorem.paragraphs()),
    excerpt: wrapInObjWithHtml(faker.lorem.paragraph()),
    excess_detail: null,
  }

  if (hasModifiedDate)
    rawPost.modified = faker.date.recent().toISOString()

  if (hasFeaturedMedia)
    rawPost._embedded = {
      'wp:featuredmedia': [{
        alt_text: faker.lorem.sentence(),
        media_details: {
          sizes: {
            medium: generateObjWithSourceUrl(),
            medium_large: generateObjWithSourceUrl(),
            large: generateObjWithSourceUrl(),
            full: generateObjWithSourceUrl(),
            excess_detail: null,
          },
        },
        excess_detail: null,
      }],
      excess_detail: null,
    }

  if (hasTags) {
    const exisitingEmbedded = rawPost._embedded || {}
    const tagsQty = faker.random.number({ min: 1, max: 5 })

    rawPost._embedded = {
      ...exisitingEmbedded,
      'wp:term': [
        null,
        times(generateTagObj, tagsQty),
      ],
      excess_detail: null,
    }
  }

  return rawPost
}

export default generateRawPostItem

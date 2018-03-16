import path from 'ramda/src/path'
import pipe from 'ramda/src/pipe'
import pick from 'ramda/src/pick'

const tagsPath = path(['_embedded', 'wp:term', 1])
const featuredMediaPath = path(['_embedded', 'wp:featuredmedia', 0])
const createFMediaSizePath = size => pipe(
  featuredMediaPath,
  path(['media_details', 'sizes', size, 'source_url']),
)

const simplifyPostItem = (post) => {
  const simplifiedPost = {
    id: post.id,
    date: new Date(post.date),
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered,
  }

  if (post.modified)
    simplifiedPost.modified = new Date(post.modified)

  if (featuredMediaPath(post)) {
    simplifiedPost.featuredMedia = {
      altText: featuredMediaPath(post).alt_text,
    }

    simplifiedPost.featuredMedia.fullSrc = createFMediaSizePath('full')(post)

    if (createFMediaSizePath('medium_large')(post))
      simplifiedPost.featuredMedia.mediumLargeSrc = createFMediaSizePath('medium_large')(post)

    if (createFMediaSizePath('large')(post))
      simplifiedPost.featuredMedia.largeSrc = createFMediaSizePath('large')(post)
  }

  if (tagsPath(post) && tagsPath(post).length)
    simplifiedPost.tags = tagsPath(post).map(pick(['id', 'name']))

  return simplifiedPost
}

export default simplifyPostItem

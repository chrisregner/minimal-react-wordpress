import path from 'ramda/src/path'
import pipe from 'ramda/src/pipe'

const getTags = path(['_embedded', 'wp:term', 1])
const getFeaturedMedia = path(['_embedded', 'wp:featuredmedia', 0])
const createFMediaSizePath = size => pipe(
  getFeaturedMedia,
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

  if (post.prev)
    simplifiedPost.prev = post.prev

  if (post.next)
    simplifiedPost.next = post.next

  if (post.modified)
    simplifiedPost.modified = new Date(post.modified)

  if (getFeaturedMedia(post)) {
    simplifiedPost.featuredMedia = {
      altText: getFeaturedMedia(post).alt_text,
    }

    simplifiedPost.featuredMedia.fullSrc = createFMediaSizePath('full')(post)

    if (createFMediaSizePath('medium_large')(post))
      simplifiedPost.featuredMedia.mediumLargeSrc = createFMediaSizePath('medium_large')(post)

    if (createFMediaSizePath('large')(post))
      simplifiedPost.featuredMedia.largeSrc = createFMediaSizePath('large')(post)
  }

  if (getTags(post) && getTags(post).length)
    simplifiedPost.tags = getTags(post).map(tag => tag.id)

  return simplifiedPost
}

export default simplifyPostItem

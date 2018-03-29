import axios from 'axios'

const POST_LIST_ENDPOINT = 'http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts'
const TAGS_ENDPOINT = 'http://localhost/minimal-react-wordpress/wp-json/wp/v2/tags'

export const apiFetchPostList = (params = {}) =>
  axios.get(POST_LIST_ENDPOINT, {
    params: {
      ...params,
      _embed: 1,
    },
  })

export const apiFetchTags = () =>
  axios.get(TAGS_ENDPOINT, {
    params: { per_page: 100 },
  })

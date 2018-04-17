import axios from 'axios'

const POST_LIST_ENDPOINT = 'http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts'
const TAGS_ENDPOINT = 'http://localhost/minimal-react-wordpress/wp-json/wp/v2/tags'
const NAV_LINKS_ENDPOINT = 'http://localhost/minimal-react-wordpress/wp-json/wp-api-menus/v2/menu-locations/primary'

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

export const apiFetchNavLinks = () =>
  axios.get(NAV_LINKS_ENDPOINT)

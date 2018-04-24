import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://minimal-react-wordpress.herokuapp.com'
  : 'http://localhost/minimal-react-wordpress/'
const POST_LIST_ENDPOINT = baseUrl + '/wp-json/wp/v2/posts'
const PAGE_ENDPOINT = baseUrl + '/wp-json/wp/v2/pages'
const TAGS_ENDPOINT = baseUrl + '/wp-json/wp/v2/tags'
const NAV_LINKS_ENDPOINT = baseUrl + '/wp-json/wp-api-menus/v2/menu-locations/primary'

export const fetchPostList = (params = {}) =>
  axios.get(POST_LIST_ENDPOINT, {
    params: { _embed: 1, ...params },
  })

export const fetchPost = postId =>
  axios.get(`${POST_LIST_ENDPOINT}/${postId}`, {
    params: { _embed: 1 },
  })

export const fetchPage = page =>
  axios.get(`${PAGE_ENDPOINT}/${page}`, {
    params: { _embed: 1 },
  })

export const fetchTags = () =>
  axios.get(TAGS_ENDPOINT, {
    params: { per_page: 100 },
  })

export const fetchNavLinks = () =>
  axios.get(NAV_LINKS_ENDPOINT)

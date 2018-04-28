import http from './http'

const POST_LIST_ENDPOINT = 'wp-json/wp/v2/posts'
const PAGE_ENDPOINT = 'wp-json/wp/v2/pages'
const TAGS_ENDPOINT = 'wp-json/wp/v2/tags'
const NAV_LINKS_ENDPOINT = 'wp-json/wp-api-menus/v2/menu-locations/primary'

export const fetchPostList = (params = {}) =>
  http.get(POST_LIST_ENDPOINT, {
    params: { _embed: 1, ...params },
  })

export const fetchPost = postId =>
  http.get(`${POST_LIST_ENDPOINT}/${postId}`, {
    params: { _embed: 1 },
  })

export const fetchPage = page =>
  http.get(`${PAGE_ENDPOINT}/${page}`, {
    params: { _embed: 1 },
  })

export const fetchTags = () =>
  http.get(TAGS_ENDPOINT, {
    params: { per_page: 100 },
  })

export const fetchNavLinks = () =>
  http.get(NAV_LINKS_ENDPOINT)

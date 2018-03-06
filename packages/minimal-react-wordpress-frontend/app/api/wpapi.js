import axios from 'axios'

export const wpFetchPostList = (params = {}) =>
  axios.get('http://localhost/minimal-react-wordpress/wp-json/wp/v2/posts', { params })

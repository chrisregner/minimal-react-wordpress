import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

const http = axios.create({
  // baseURL: process.env.NODE_ENV === 'production'
  //   ? 'https://minimal-react-wordpress.herokuapp.com/index.php/'
  //   : 'http://localhost/minimal-react-wordpress-heroku/',
  baseURL: 'https://minimal-react-wordpress.herokuapp.com/index.php/',
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, true)),
})

export default http

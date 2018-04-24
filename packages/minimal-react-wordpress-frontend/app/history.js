import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory({
  basename: process.env.NODE_ENV === 'production'
    ? 'https://chrisregner.github.io/minimal-react-wordpress/'
    : '/'
})

history.getLocation = () => history.location

export default history

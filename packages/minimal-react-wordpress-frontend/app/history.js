import createHashHistory from 'history/createHashHistory'

const history = createHashHistory({
  basename: process.env.NODE_ENV === 'production'
    ? '/minimal-react-wordpress'
    : '/'
})

history.getLocation = () => history.location

export default history

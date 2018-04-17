import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

history.getLocation = () => history.location

export default history

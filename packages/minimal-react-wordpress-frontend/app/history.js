import createHashHistory from 'history/createHashHistory'

const history = createHashHistory()

history.getLocation = () => history.location

export default history

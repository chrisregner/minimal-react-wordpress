import App from './App'
import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import { fetchTags } from 'app/state/page'

const AppContainer = compose(
  connect(null, { fetchTags }),
  lifecycle({
    componentDidMount: function () {
      this.props.fetchTags()
    },
  })
)(App)

export default AppContainer

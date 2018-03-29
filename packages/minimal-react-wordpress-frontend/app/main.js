// import 'es6-promise/auto'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import history from 'app/history'
import App from 'app/scenes/App'
import store from 'app/state/store'

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

render(App)

if (module.hot)
  module.hot.accept('app/scenes/App', () => render(App))

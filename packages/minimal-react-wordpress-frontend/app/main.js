// import 'es6-promise/auto'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom'

import App from 'app/components/App'
import store from 'app/state'

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

render(App)

if (module.hot)
  module.hot.accept('app/components/App', () => { render(App) })

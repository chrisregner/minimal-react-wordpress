import React from 'react'
import { Route, Switch } from 'react-router-dom'

import GlobalStyles from 'app/components/GlobalStyles'
import Header from 'app/components/Header'
import ErrorComponent from 'app/components/ErrorComponent'
import PostList from 'app/scenes/PostList'
import PostPage from 'app/scenes/PostPage'
import SearchResult from 'app/scenes/SearchResult'
import CustomPage from 'app/scenes/CustomPage'

const App = () =>
  <div className='cf'>
    <div className='header-wrapper fixed-l mh3 mh4-m mh0-l pl4-l pt6-l pb3 pb0-l w-third-l'>
      <Header />
    </div>
    <div className='fr-l pr4-l w-two-thirds-l'>
      <div className='mh3 mh4-m mh5-l min-vh-100 bg-color-secondary'>
        <div className='pt4-l'>
          <Switch>
            <Route exact path='/' component={PostList} />
            <Route exact path='/search' component={SearchResult} />
            <Route exact path='/post/:postId' component={PostPage} />
            <Route exact path='/:pageId' component={CustomPage} />
            <Route render={() =>
              <div className='ph3 ph4-ns tc'>
                <ErrorComponent error={new Error('404')} />
              </div>
            } />
          </Switch>
        </div>
      </div>
    </div>

    <GlobalStyles />
  </div>

export default App
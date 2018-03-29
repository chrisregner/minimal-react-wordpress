import React from 'react'
import { Route } from 'react-router-dom'

import GlobalStyles from 'app/components/GlobalStyles'
import Header from 'app/components/Header'
import PostList from 'app/scenes/PostList'

const App = () =>
  <div className='cf'>
    <div className='header-wrapper fixed-l mh3 mh4-m mh0-l pl4-l pt6-l pb3 pb0-l w-third-l'>
      <Header />
    </div>
    <div className='fr-l pr4-l w-two-thirds-l'>
      <div className='mh3 mh4-m mh5-l min-vh-100 bg-color-secondary'>
        <div className='pt4-l'>
          <PostList />
        </div>
      </div>
    </div>

    <Route exact path='/' />
    <Route path='/search' />
    <Route path='/post/:postid' />

    <GlobalStyles />
  </div>

export default App

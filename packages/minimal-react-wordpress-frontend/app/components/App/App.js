import React from 'react'

import GlobalStyles from 'app/components/GlobalStyles'
import Header from 'app/components/Header'
import PostList from 'app/components/PostList'

const App = () =>
  <div className="cf">
    <div className="fixed w-third ph4 pt6">
      <Header />
    </div>
    <div className="fr w-two-thirds pr4">
      <PostList />
    </div>

    <GlobalStyles />
  </div>

export default App

import React from 'react'

import GlobalStyles from 'app/components/GlobalStyles'
import Header from 'app/components/Header'
import PostList from 'app/components/PostList'

const App = () =>
  <div className="cf">
    <div className="header-wrapper fixed-l mh3 mh4-m mh0-l mb2 mb0-l pl4-l pt6-l pb4 pb0-l w-third-l">
      <Header />
    </div>
    <div className="fr-l pr4-l w-two-thirds-l">
      <div className="mh3 mh4-m mh5-l pt4-l min-vh-100 bg-color-secondary">
        <PostList />
      </div>
    </div>

    <GlobalStyles />
  </div>

export default App

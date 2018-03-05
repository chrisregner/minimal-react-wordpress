# parts/features

- posts
  - no more posts
  - no posts
- additional load
- search
  - by string
  - by tag
- pages
- nav
- footer
- posts page
- 404

# parts/features details

- posts
  - intial load
    - on page load, call FETCH_POSTS
      - set the state.postsPage.availablePosts
      - set the state.postsPage.currentPage to 1
      - fetch
        - SET_POSTS; OR
        - SET_ERROR
  - additional load
    - on load more button click, call FETCH_MORE_POSTS
      - set the state.postsPage.availablePosts
      - increment the state.postsPage.currentPage
      - fetch with the incremented currentPage, searchString (if any), and searchTags (if any)
        - ADD_POSTS; OR
        - SET_ERROR
- search
  - search by string
    - on search string call, SET_SEARCH_STRING
      - set the state.postsPage.availablePosts
      - set the state.postsPage.currentPage to 1
      - set the state.postsPage.searchString to the input value
      - fetch with the searchString and searchTags (if any)
        - SET_POSTS; OR
        - SET_ERROR; OR
        - SET_POSTS_SEARCH_NO_MATCH
  - search by tag functionality
    - on tag add/remove, call ADD/REMOVE_SEARCH_TAG
      - set the state.postsPage.availablePosts
      - set the state.postsPage.currentPage to 1
      - add/remove the tag to/from state.postsPage.searchTags
      - fetch with the searchTags and searchString (if any)
        - SET_POSTS; OR
        - SET_ERROR; OR
        - SET_POSTS_SEARCH_NO_MATCH
  - common
    - SET_POSTS?
    - ADD_POSTS?
    - SET_ERROR?
- pages
  - FETCH_PAGE
  - DISPLAY_PAGE
  - SET_ERROR
- nav
  - check if home nav item is active
    - match if url is "/" or "/?whateverquery=foo"
  - check if a page nav item is active
    - match if url param pageId is matching the item
- footer
  - static?
- post page
  - post itself
  - next and prev links
  - related links
  - disqus comment system
- no more posts
  - just compare the availablePosts and posts.length
- 404 page
  - make a root level component that conditionally renders in place of regular contents based on redux state

# state shape:

```
{
  pageSpecific: {
    pageType: 'postList',
    availablePosts: Integer,
    searchString: String,
    searchTags: Array<String>,
    currentPage: Integer,
    posts: Array<Object>,
  },
  pageSpecific: {
    pageType: 'postSingle',
    post: Object,
  },
  common: {
    error: String?,
  },
}
```

# tools

- mocha-chai-enzyme-td
- react router dom
- axios
- styled-jsx
- tachyons
- wordpress
- wp-api-post (wp plugin)
- fakerpress (wp plugin)

# misc

- promise polyfill?

---

# v1 package infos

- dependencies
  - axios
  - date-fns
  - es6-promise
  - ramda
  - react
  - react-dom
  - react-router-dom
  - recompose
  - redux
  - redux-actions
  - redux-saga
  - styled-jsx
- dev dependencies
  - autoprefixer
  - axios-mock-adapter
  - babel-core
  - babel-eslint
  - babel-loader
  - babel-plugin-transform-class-properties
  - babel-plugin-transform-object-entries
  - babel-plugin-transform-object-rest-spread
  - babel-polyfill
  - babel-preset-env
  - babel-preset-react
  - babel-register
  - chai
  - chunk-manifest-webpack-plugin
  - cross-env
  - css-loader
  - cssnano
  - enzyme
  - enzyme-adapter-react-16
  - eslint
  - eslint-config-standard
  - eslint-config-standard-react
  - eslint-plugin-import
  - eslint-plugin-node
  - eslint-plugin-promise
  - eslint-plugin-react
  - eslint-plugin-standard
  - faker
  - fast-deep-equal
  - file-loader
  - html-webpack-plugin
  - image-webpack-loader
  - jsdom
  - json-loader
  - mocha
  - postcss-flexbugs-fixes
  - postcss-loader
  - prop-types
  - qs
  - react-hot-loader
  - react-router-test-context
  - redux-saga-test-plan
  - style-loader
  - testdouble
  - uglifyjs-webpack-plugin
  - webpack
  - webpack-bundle-analyzer
  - webpack-chunk-hash
  - webpack-dev-server

## scripts

`start`: `webpack-dev-server --hot`
`mocha`: `cross-env BABEL_ENV=test cross-env NODE_PATH=app mocha --require babel-register --require babel-polyfill --require tests/setupTest.js`
`test`: `yarn mocha --reporter spec --watch app/**/*.unit.js app/**/*.integ.js`
`test-unit`: `yarn mocha --reporter spec --watch app/**/*.unit.js`
`test-integ`: `yarn mocha --reporter spec --watch app/**/*.integ.js`
`lint`: `yarn lint-src && yarn lint-test`
`lint-src`: `eslint --ignore-pattern \`**/*.unit.js\` --ignore-pattern \`**/*.integ.js\` --ignore-pattern \`dist/**\` --fix **/*.js`
`lint-test`: `eslint --env mocha --fix \`**/*.{unit,integ}.js\`

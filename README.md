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
  - highlighting active links
- footer
- posts page
- 404

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

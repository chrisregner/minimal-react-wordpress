style wp content
test
lint
commit

---

reducer
saga
wp api
components
container
integrate to App

---

move ui/tag actions to common/tag??

---


- post page
- post page, prev/next posts???
- custom page
- routes
- 404
- nav
- misc
  - x browser test

---

# parts/features check list

- posts
  - starting from post page
  - not starting from post page
  - loading
  - no post
  - no more post
  - can load more
  - load more
- search
  - starting from search page
  - not starting from search page
  - by string
  - by tag
  - no match
  - no more match
  - can load more
  - load more
- post
  - starting from post page
  - not starting from post page
  - load post
- page
  - starting from post page
  - not starting from post page
  - load post
- nav
  - highlighting active links
    - when in posts
    - when in post
    - when in search
    - when in page
    - when in 404
- footer
- 404

# optional features

- place holder to be put above loaders

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

# bug

- When you go directly to search page with search url params, the search params won't be recognized by the app. They have to be inputted through the app itself
- when fetching correct content when clearing search

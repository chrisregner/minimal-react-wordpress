import { connect } from 'react-redux'
import { lifecycle, setDisplayName, compose } from 'recompose'
import qs from 'query-string'

import { resetPage, fetchPostList, setSearchParams } from 'app/state/page'

import history from 'app/history'
import withPostListData from 'app/hoc/withPostListData'
import ro from 'app/services/resourceObservable'
import DumbPostList from 'app/components/PostList'

const SearchResults = compose(
  setDisplayName('SearchResults'),
  connect(null, dispatch => ({
    fetchSearchResults: (searchParams) => {
      dispatch(resetPage())
      dispatch(setSearchParams(searchParams))
      dispatch(fetchPostList())
    },
  })),
  withPostListData,
  lifecycle({
    componentDidMount: async function () {
      const { search } = history.getLocation()
      const { keyword, tags } = qs.parse(search)
      const searchParams = { searchKeyword: keyword }

      await ro.subscribe('tags')

      if (tags)
        if (!Array.isArray(tags))
          searchParams.searchTags = [Number(tags)]
        else
          searchParams.searchTags = tags.map(Number)

      this.props.fetchSearchResults(searchParams)
    },
  }),
)(DumbPostList)

export default SearchResults

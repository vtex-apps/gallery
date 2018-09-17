import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { loaderPropTypes } from '../../constants/propTypes'

/**
 * Search Result Component.
 */
export default class InfiniteScrollLoaderResult extends Component {
  render() {
    const {
      renderSpinner,
      renderFilters,
      renderBreadcrumb,
      renderTotalProducts,
      renderOrderBy,
      renderGallery,
      to,
      onSetFetchMoreLoading,
      maxItemsPerPage,
      fetchMore,
      onFetchMoreProducts,
      recordsFiltered,
      fetchMoreLoading,
      products,
    } = this.props

    return (
      <InfiniteScroll
        dataLength={products.length}
        next={() => {
          onSetFetchMoreLoading(true)

          return fetchMore({
            variables: {
              from: to,
              to: to + maxItemsPerPage - 1,
            },
            updateQuery: onFetchMoreProducts,
          })
        }}
        hasMore={products.length < recordsFiltered}
      >
        <div className="vtex-search-result vtex-search-result--infinite-scroll pv5 ph9-l ph7-m ph5-s">
          {renderBreadcrumb()}
          {renderTotalProducts()}
          {renderFilters()}
          <div className="vtex-search-result__border" />
          {renderOrderBy()}
          {renderGallery()}
          {fetchMoreLoading && renderSpinner()}
        </div>
      </InfiniteScroll>
    )
  }
}

InfiniteScrollLoaderResult.propTypes = loaderPropTypes
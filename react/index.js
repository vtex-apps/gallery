import './global.css'

import React, { Component } from 'react'
import QueryString from 'query-string'
import ProductSummary from 'vtex.product-summary/index'

import SearchResult from './components/SearchResult'
import { SORT_OPTIONS } from './components/OrderBy'
import SearchResultInfiniteScroll from './components/SearchResultInfiniteScroll'
import { searchResultPropTypes } from './constants/propTypes'
import { getPagesArgs, getBaseMap } from './constants/SearchHelpers'

const DEFAULT_MAX_ITEMS_PER_PAGE = 10
const PAGINATION_TYPES = ['show-more', 'infinite-scroll']

/**
 * Search Result Container Component.
 */
export default class SearchResultContainer extends Component {
  constructor(props) {
    super(props)
    const { maxItemsPerPage } = props
    props.setContextVariables({ maxItemsPerPage })
  }

  state = {
    fetchMoreLoading: false,
  }

  get breadcrumbsProps() {
    const {
      params: { category, department, term },
    } = this.props

    const categories = []

    if (department) {
      categories.push(department)
    }

    if (category) {
      categories.push(`${department}/${category}/`)
    }

    return {
      term,
      categories,
    }
  }

  getLinkProps = (spec, useEmptyMapAndRest = false) => {
    const {
      rest,
      map,
      pagesPath,
      params,
    } = this.props
    const filters = Array.isArray(spec) ? spec : [spec]

    if (filters.length === 0) {
      return {
        page: pagesPath,
        params,
      }
    }

    const pageProps = filters.reduce(
      (linkProps, filter) => {
        const { type, ordenation, pageNumber, isSelected, path, name, link, slug } = filter
        const order = ordenation || linkProps.query.order

        return getPagesArgs({
          ...linkProps,
          query: {
            ...linkProps.query,
            order,
          },
          pagesPath: linkProps.page,
          name,
          slug: slug || name,
          link,
          path,
          type,
          pageNumber,
          isUnselectLink: isSelected,
        })
      },
      {
        page: pagesPath,
        params,
        query: {
          order: this.props.orderBy,
          map: useEmptyMapAndRest
            ? getBaseMap(map, rest).split(',').filter(x => x)
            : map.split(','),
          rest: useEmptyMapAndRest ? [] : rest.split(',').filter(x => x),
        },
      }
    )

    const queryString = QueryString.stringify({
      ...pageProps.query,
      map: pageProps.query.map.join(','),
      rest: pageProps.query.rest.join(',') || undefined,
    })

    return {
      page: pageProps.page,
      queryString: queryString,
      params: pageProps.params,
    }
  }

  handleFetchMoreProducts = (prev, { fetchMoreResult }) => {
    this.setState({
      fetchMoreLoading: false,
    })

    if (!fetchMoreResult) return prev

    return {
      search: {
        ...prev.search,
        products: [...prev.search.products, ...fetchMoreResult.search.products],
      },
    }
  }

  handleSetFetchMoreLoading = (fetchMoreLoading) => {
    this.setState({ fetchMoreLoading })
  }

  render() {
    const breadcrumbsProps = this.breadcrumbsProps

    return (
      <SearchResult
        breadcrumbsProps={breadcrumbsProps}
        onSetFetchMoreLoading={this.handleSetFetchMoreLoading}
        onFetchMoreProducts={this.handleFetchMoreProducts}
        getLinkProps={this.getLinkProps}
        {...this.props}
      />
    )
  }
}

SearchResultContainer.propTypes = searchResultPropTypes

SearchResultContainer.defaultProps = {
  orderBy: SORT_OPTIONS[0].value,
  rest: '',
  maxItemsPerPage: DEFAULT_MAX_ITEMS_PER_PAGE,
}

SearchResultContainer.uiSchema = {
  maxItemsPerLine: {
    'ui:widget': 'radio',
    'ui:options': {
      inline: true,
    },
  },
}

SearchResultContainer.getSchema = props => {
  return {
    title: 'editor.search-result.title',
    description: 'editor.search-result.description',
    type: 'object',
    properties: {
      maxItemsPerPage: {
        title: 'editor.search-result.maxItemsPerPage.title',
        type: 'number',
        default: DEFAULT_MAX_ITEMS_PER_PAGE,
      },
      summary: {
        title: 'editor.search-result.summary.title',
        type: 'object',
        properties: ProductSummary.getSchema(props).properties,
      },
    },
  }
}

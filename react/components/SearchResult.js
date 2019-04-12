import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'

import LoadingOverlay from './LoadingOverlay'
import { searchResultPropTypes } from '../constants/propTypes'
import LayoutModeSwitcher, { LAYOUT_MODE } from './LayoutModeSwitcher'

import searchResult from '../searchResult.css'

/**
 * Search Result Component.
 */
class SearchResult extends Component {
  static propTypes = searchResultPropTypes

  static defaultProps = {
    mobileLayout: {
      mode1: LAYOUT_MODE[0].value,
      mode2: LAYOUT_MODE[1].value,
    },
  }

  state = {
    mobileLayoutMode: this.props.mobileLayout.mode1,
    showLoadingAsOverlay: false,
    // The definitions bellow are required because
    // on SSR the getDerivedStateFromProps isn't called
    products: this.props.products,
    recordsFiltered: this.props.recordsFiltered,
    brands: this.props.brands,
    map: this.props.map,
    params: this.props.params,
    priceRange: this.props.priceRange,
    priceRanges: this.props.priceRanges,
    specificationFilters: this.props.specificationFilters,
    tree: this.props.tree,
    hiddenFacets: this.props.hiddenFacets,
  }

  handleMobileLayoutChange = e => {
    e.preventDefault()

    const modes = [this.props.mobileLayout.mode1, this.props.mobileLayout.mode2]
    const modeIndex = (modes.indexOf(this.state.mobileLayoutMode) + 1) % 2
    const currentMode = modes[modeIndex]

    this.setState({
      mobileLayoutMode: currentMode,
    })
  }

  static getDerivedStateFromProps(props) {
    // Do not use the props when the query is loading
    // so we can show the previous products when the
    // overlay is on the screen
    if (!props.loading) {
      if (!props.mobileLayout.mode1 && !props.mobileLayout.mode2) {
        props.mobileLayout.mode1 = LAYOUT_MODE[0].value
        props.mobileLayout.mode2 = LAYOUT_MODE[1].value
      }

      const {
        products,
        recordsFiltered,
        brands,
        map,
        params,
        priceRange,
        priceRanges,
        specificationFilters,
        tree,
        hiddenFacets,
      } = props

      return {
        products,
        recordsFiltered,
        brands,
        map,
        params,
        priceRange,
        priceRanges,
        specificationFilters,
        tree,
        hiddenFacets,
      }
    }

    return null
  }

  componentDidMount() {
    if (!this.props.loading) {
      this.setState({
        showLoadingAsOverlay: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.setState({
        showLoadingAsOverlay: true,
      })
    }
  }

  render() {
    const {
      children,
      breadcrumbsProps,
      loading,
      fetchMoreLoading,
      summary,
      orderBy,
      runtime: {
        hints: { mobile },
      },
    } = this.props
    const {
      mobileLayoutMode,
      recordsFiltered,
      products = [],
      brands,
      map,
      params,
      priceRange,
      priceRanges,
      specificationFilters,
      tree,
      hiddenFacets,
      showLoadingAsOverlay,
    } = this.state

    const term =
      params && params.term ? decodeURIComponent(params.term) : undefined

    if (!products.length && !loading) {
      return <ExtensionPoint id="not-found" term={term} />
    }

    const hideFacets = !map || !map.length
    const showLoading = loading && !fetchMoreLoading
    const showContentLoader = showLoading && !showLoadingAsOverlay

    return (
      <LoadingOverlay loading={showLoading && showLoadingAsOverlay}>
        <div className={`${searchResult.container} w-100 mw9`}>
          <div className={`${searchResult.breadcrumb} db-ns dn-s`}>
            <ExtensionPoint id="breadcrumb" {...breadcrumbsProps} />
          </div>
          <ExtensionPoint id="search-title" params={params} />
          <ExtensionPoint
            id="total-products"
            recordsFiltered={recordsFiltered}
          />
          {!hideFacets && (
            <ExtensionPoint
              id="filter-navigator"
              brands={brands}
              showFilters={!!map}
              params={params}
              priceRange={priceRange}
              priceRanges={priceRanges}
              specificationFilters={specificationFilters}
              tree={tree}
              hiddenFacets={hiddenFacets}
              loading={showContentLoader}
            />
          )}
          <div className={searchResult.resultGallery}>
            {showContentLoader ? (
              <div className="w-100 flex justify-center">
                <div className="w3 ma0">
                  <Spinner />
                </div>
              </div>
            ) : (
              <ExtensionPoint
                id="gallery"
                products={products}
                summary={summary}
                className="bn"
                mobileLayoutMode={mobileLayoutMode}
              />
            )}
            {children}
          </div>
          {mobile && (
            <div
              className={`${searchResult.border} bg-muted-5 h-50 self-center`}
            />
          )}
          <ExtensionPoint id="order-by" orderBy={orderBy} />
          {mobile && (
            <div
              className={`${searchResult.border2} bg-muted-5 h-50 self-center`}
            />
          )}
          {mobile && (
            <div
              className={`${
                searchResult.switch
              } flex justify-center items-center`}
            >
              <LayoutModeSwitcher
                activeMode={mobileLayoutMode}
                onChange={this.handleMobileLayoutChange}
              />
            </div>
          )}
        </div>
      </LoadingOverlay>
    )
  }
}

export default withRuntimeContext(SearchResult)

import React, { Component } from 'react'
import { Spinner } from 'vtex.styleguide'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import classNames from 'classnames'
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
    hiddenFacets: {
      layoutMode1: LAYOUT_MODE[0].value,
      layoutMode2: LAYOUT_MODE[1].value,
    },
    easeDuration: '500ms',
    easeDelay: '80ms'
  }

  state = {
    galleryLayoutMode: this.props.hiddenFacets.layoutMode1 || LAYOUT_MODE[0].value,
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
    rest: this.props.rest,
    specificationFilters: this.props.specificationFilters,
    tree: this.props.tree,
    hiddenFacets: this.props.hiddenFacets,
    scrollValue: 0,
    scrollDirection: 'up'
  }

  handleLayoutChange = e => {
    e.preventDefault()

    const defaultModes = [this.props.hiddenFacets.layoutMode1, this.props.hiddenFacets.layoutMode2]
    const modeIndex = (defaultModes.indexOf(this.state.galleryLayoutMode) + 1) % 2
    const currentMode = defaultModes[modeIndex]

    this.setState({
      galleryLayoutMode: currentMode,
    })
  }

  static getDerivedStateFromProps(props) {
    // Do not use the props when the query is loading
    // so we can show the previous products when the
    // overlay is on the screen
    if (!props.loading) {
      if (!props.hiddenFacets.layoutMode1 && !props.hiddenFacets.layoutMode2) {
        props.hiddenFacets.layoutMode1 = LAYOUT_MODE[0].value
        props.hiddenFacets.layoutMode2 = LAYOUT_MODE[1].value
      }

      const {
        products,
        recordsFiltered,
        brands,
        map,
        params,
        priceRange,
        priceRanges,
        rest,
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
        rest,
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

    const {runtime: { hints: { mobile } }} = this.props

    if (mobile) document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    const {runtime: { hints: { mobile } }} = this.props

    if(mobile) document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scroll = this.props.leanMode ? Infinity : window.scrollY
    
    if (typeof scroll !== 'number') return

    scroll > this.state.scrollValue ? this.handleScrollDown() : this.handleScrollUp()

    this.setState({scrollValue: scroll})
  }

  handleScrollUp = () => {
    this.setState({scrollDirection: 'up'})
  }

  handleScrollDown = () => {
    this.setState({scrollDirection: 'down'})
  }

  getSearchOptionsBar = () => {
    const {
      getLinkProps,
      loading,
      fetchMoreLoading,
      orderBy,
      runtime: { hints: { mobile } },
    } = this.props
    const {
      galleryLayoutMode,
      brands,
      map,
      query,
      params,
      priceRange,
      priceRanges,
      rest,
      specificationFilters,
      tree,
      hiddenFacets,
    } = this.state

    const hideFacets = !map || !map.length

    return (
      <React.Fragment>
        {!hideFacets && (
            <ExtensionPoint
              id="filter-navigator"
              brands={brands}
              getLinkProps={getLinkProps}
              map={map}
              params={params}
              priceRange={priceRange}
              priceRanges={priceRanges}
              query={query}
              rest={rest}
              specificationFilters={specificationFilters}
              tree={tree}
              hiddenFacets={hiddenFacets}
              loading={loading && !fetchMoreLoading}
            />
        )}
        {mobile && <div className={`${searchResult.border} bg-muted-5 h-50 self-center`} />}
          <ExtensionPoint id="order-by" className={searchResult.orderBy}
            orderBy={orderBy}
            getLinkProps={getLinkProps}
          />
          {mobile && <div className={`${searchResult.border2} bg-muted-5 h-50 self-center`} />}
          {mobile && <div className={`${searchResult.switch} flex justify-center items-center`}>
            <div className="dn-ns db-s">
              <LayoutModeSwitcher
                activeMode={galleryLayoutMode}
                onChange={this.handleLayoutChange}
              />
            </div>
          </div>}
      </React.Fragment>
    )
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
      runtime: { hints: { mobile } },
    } = this.props
    const {
      galleryLayoutMode,
      recordsFiltered,
      products,
      params,
      showLoadingAsOverlay,
      scrollDirection
    } = this.state

    const term = params && params.term
      ? decodeURIComponent(params.term) : undefined

    if (!products.length && !loading) {
      return (
        <ExtensionPoint id="not-found" term={term} />
      )
    }

    const showLoading = loading && !fetchMoreLoading
    const showContentLoader = showLoading && !showLoadingAsOverlay
    const searchOptionsBarClasses = classNames({ 'flex justify-center flex-auto fixed w-100 z-1 bg-base bb bw1 b--light-gray nl3': mobile })
    const searchOptionsBarVisibility = scrollDirection === 'up' ? 'animated fadeInDownBig faster' : 'animated fadeOutUpBig slower'

    return (
      <LoadingOverlay loading={showLoading && showLoadingAsOverlay}>
        <div className={`${searchResult.container} w-100 mw9`}>
          <div className={`${searchResult.breadcrumb} db-ns dn-s`}>
            <ExtensionPoint id="breadcrumb" {...breadcrumbsProps} />
          </div>
          <ExtensionPoint id="total-products"
              recordsFiltered={recordsFiltered}
          />
          {mobile ? 
          (
            <div className={`${searchResult.searchOptionsBar} ${searchOptionsBarClasses} ${searchOptionsBarVisibility}`}>
              {this.getSearchOptionsBar()}
            </div> 
          ) : (this.getSearchOptionsBar())
          }
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
                layoutMode={galleryLayoutMode}
              />
            )}
            {children}
          </div>
        </div>
      </LoadingOverlay>
    )
  }
}
export default withRuntimeContext(SearchResult)
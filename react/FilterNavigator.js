import classNames from 'classnames'
import PropTypes from 'prop-types'
import { map, flatten, prop } from 'ramda'
import React, { useMemo } from 'react'
import ContentLoader from 'react-content-loader'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { ExtensionPoint } from 'vtex.render-runtime'
import FilterSidebar from './components/FilterSidebar'
import SelectedFilters from './components/SelectedFilters'
import AvailableFilters from './components/AvailableFilters'
import DepartmentFilters from './components/DepartmentFilters'
import {
  facetOptionShape,
  paramShape,
  hiddenFacetsSchema,
} from './constants/propTypes'
import useSelectedFilters from './hooks/useSelectedFilters'
import useFacetNavigation from './hooks/useFacetNavigation'

import styles from './searchResult.css'
import { CATEGORIES_TITLE } from './utils/getFilters'

/**
 * Wrapper around the filters (selected and available) as well
 * as the popup filters that appear on mobile devices
 */
const FilterNavigator = ({
  showFilters,
  priceRange,
  tree = [],
  specificationFilters = [],
  priceRanges = [],
  brands = [],
  loading = false,
  filters = [],
  hiddenFacets = {},
}) => {
  const {
    hints: { mobile },
  } = useRuntime()

  const navigateToFacet = useFacetNavigation()

  const selectedFilters = useSelectedFilters(
    useMemo(() => {
      const options = [
        ...map(prop('facets'), specificationFilters),
        ...brands,
        ...priceRanges,
      ]

      return flatten(options)
    }, [brands, priceRanges, specificationFilters])
  ).filter(facet => facet.selected)

  const filterClasses = classNames({
    'flex items-center justify-center flex-auto h-100': mobile,
  })

  if (!showFilters) {
    return null
  }

  if (loading && !mobile) {
    return (
      <div className={styles.filters}>
        <ContentLoader
          style={{
            width: '100%',
            height: '100%',
          }}
          width="230"
          height="320"
          y="0"
          x="0"
        >
          <rect width="100%" height="1em" />
          <rect width="100%" height="8em" y="1.5em" />
          <rect width="100%" height="1em" y="10.5em" />
          <rect width="100%" height="8em" y="12em" />
        </ContentLoader>
      </div>
    )
  }

  if (mobile) {
    return (
      <div className={styles.filters}>
        <div className={filterClasses}>
          <FilterSidebar filters={filters} tree={tree} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.filters}>
      <div className={filterClasses}>
        <div className="bb b--muted-4">
          <h5 className="t-heading-5 mv5">
            <FormattedMessage id="store/search-result.filter-button.title" />
          </h5>
        </div>
        <SelectedFilters filters={selectedFilters} />
        <DepartmentFilters
          title={CATEGORIES_TITLE}
          tree={tree}
          isVisible={!hiddenFacets.categories}
          onCategorySelect={navigateToFacet}
        />
        <AvailableFilters filters={filters} priceRange={priceRange} />
      </div>
      <ExtensionPoint id="shop-review-summary" />
    </div>
  )
}

FilterNavigator.propTypes = {
  /** Categories tree */
  tree: PropTypes.arrayOf(facetOptionShape),
  /** Params from pages */
  params: paramShape,
  /** List of brand filters (e.g. Samsung) */
  brands: PropTypes.arrayOf(facetOptionShape),
  /** List of specification filters (e.g. Android 7.0) */
  specificationFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      facets: PropTypes.arrayOf(facetOptionShape),
    })
  ),
  /** List of price ranges filters (e.g. from-0-to-100) */
  priceRanges: PropTypes.arrayOf(facetOptionShape),
  /** Current price range filter query parameter */
  priceRange: PropTypes.string,
  /** Enables or disables filters */
  showFilters: PropTypes.bool,
  /** Loading indicator */
  loading: PropTypes.bool,
  ...hiddenFacetsSchema,
}

export default FilterNavigator

import PropTypes from 'prop-types'
import React from 'react'
import { intlShape, injectIntl } from 'react-intl'

import FacetItem from './FacetItem'
import FilterOptionTemplate from './FilterOptionTemplate'
import { facetOptionShape } from '../constants/propTypes'

/**
 * Search Filter Component.
 */
const SelectedFilters = ({ filters = [], intl }) => {
  const title = intl.formatMessage({ id: 'search.selected-filters' })
  return (
    <FilterOptionTemplate
      title={title}
      filters={filters}
      collapsable={false}
      selected
    >
      {facet => <FacetItem key={facet.name} facet={facet} />}
    </FilterOptionTemplate>
  )
}

SelectedFilters.propTypes = {
  /** Selected filters. */
  filters: PropTypes.arrayOf(facetOptionShape).isRequired,
  /** Intl instance. */
  intl: intlShape,
}

export default injectIntl(SelectedFilters)

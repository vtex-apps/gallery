/* global __RUNTIME__ */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { flatten } from 'ramda'

import SelectedFilters from './SelectedFilters'
import AvailableFilters from './AvailableFilters'
import AccordionFilterContainer from './AccordionFilterContainer'
import { formatCategoriesTree, mountOptions, getMapByType } from '../constants/SearchHelpers'
import { facetOptionShape, paramShape } from '../constants/propTypes'

export const CATEGORIES_TYPE = 'Categories'
export const BRANDS_TYPE = 'Brands'
export const PRICE_RANGES_TYPE = 'PriceRanges'
export const SPECIFICATION_FILTERS_TYPE = 'SpecificationFilters'

const CATEGORIES_TITLE = 'search.filter.title.categories'
const BRANDS_TITLE = 'search.filter.title.brands'
const PRICE_RANGES_TITLE = 'search.filter.title.price-ranges'

export default class FiltersContainer extends Component {
  static propTypes = {
    getLinkProps: PropTypes.func.isRequired,
    tree: PropTypes.arrayOf(facetOptionShape),
    params: paramShape.isRequired,
    brands: PropTypes.arrayOf(facetOptionShape),
    specificationFilters: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      facets: PropTypes.arrayOf(facetOptionShape),
    })),
    priceRanges: PropTypes.arrayOf(facetOptionShape),
    map: PropTypes.string.isRequired,
    rest: PropTypes.string.isRequired,
  }

  static defaultProps = {
    tree: [],
    specificationFilters: [],
    priceRanges: [],
    brands: [],
  }

  get availableCategories() {
    const params = this.props.params
    const categories = this.categories

    const categoriesCount = this.props.map
      .split(',')
      .filter(m => m === getMapByType(CATEGORIES_TYPE))
      .length

    const currentPath = [params.department, params.category, params.subcategory]
      .filter(v => v)
      .join('/')

    return categories
      .filter(c => c.level === categoriesCount)
      .filter(c => c.path.toLowerCase().startsWith(currentPath.toLowerCase()))
  }

  get categories() {
    const { tree } = this.props

    if (!tree || tree.length === 0) {
      return []
    }

    return formatCategoriesTree(tree)
  }

  get selectedFilters() {
    const {
      brands,
      specificationFilters,
      priceRanges,
      map,
      rest,
    } = this.props

    const categories = this.categories

    const options = [
      ...mountOptions(categories, CATEGORIES_TYPE, map, rest),
      ...specificationFilters.map(spec =>
        mountOptions(spec.facets, SPECIFICATION_FILTERS_TYPE, map, rest)
      ),
      ...mountOptions(brands, BRANDS_TYPE, map, rest),
      ...mountOptions(priceRanges, PRICE_RANGES_TYPE, map, rest),
    ]

    return flatten(options).filter(opt => opt.selected)
  }

  render() {
    const {
      specificationFilters = [],
      brands,
      priceRanges,
      map,
      rest,
      getLinkProps,
    } = this.props
    const categories = this.availableCategories

    const filters = [
      {
        type: CATEGORIES_TYPE,
        title: CATEGORIES_TITLE,
        options: categories,
        oneSelectedCollapse: true,
      },
      ...specificationFilters.map(spec => ({
        type: SPECIFICATION_FILTERS_TYPE,
        title: spec.name,
        options: spec.facets,
      })),
      {
        type: BRANDS_TYPE,
        title: BRANDS_TITLE,
        options: brands,
      },
      {
        type: PRICE_RANGES_TYPE,
        title: PRICE_RANGES_TITLE,
        options: priceRanges,
      },
    ]

    if (__RUNTIME__.hints.mobile) {
      return (
        <AccordionFilterContainer
          filters={filters}
          getLinkProps={getLinkProps}
          map={map}
          rest={rest}
        />
      )
    }

    return (
      <Fragment>
        <SelectedFilters
          filters={this.selectedFilters}
          getLinkProps={getLinkProps}
        />
        <AvailableFilters
          getLinkProps={getLinkProps}
          filters={filters}
          map={map}
          rest={rest}
        />
      </Fragment>
    )
  }
}

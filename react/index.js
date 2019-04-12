import React, { Component } from 'react'

import SearchResultContainer from './components/SearchResultContainer'
import { SORT_OPTIONS } from './OrderBy'
import LocalQuery from './components/LocalQuery'
import { LAYOUT_MODE } from './components/LayoutModeSwitcher'
import GapPaddingTypes, {
  getGapPaddingNames,
  getGapPaddingValues,
} from './constants/paddingEnum'

const PAGINATION_TYPES = ['show-more', 'infinite-scroll']
const DEFAULT_MAX_ITEMS_PER_PAGE = 10

/**
 * Search Result Query Loader Component.
 * This Component queries the search if the search-result doesn't receive it already
 */
export default class SearchResultQueryLoader extends Component {
  static defaultProps = {
    orderBy: SORT_OPTIONS[0].value,
    gap: GapPaddingTypes.SMALL.value,
  }

  static uiSchema = {
    maxItemsPerLine: {
      'ui:widget': 'radio',
      'ui:options': {
        inline: true,
      },
    },
  }

  render() {
    const { querySchema } = this.props
    return !this.props.searchQuery ||
      (querySchema && querySchema.enableCustomQuery) ? (
      <LocalQuery
        {...this.props}
        {...querySchema}
        render={props => <SearchResultContainer {...props} />}
      />
    ) : (
      <SearchResultContainer {...this.props} />
    )
  }
}

SearchResultQueryLoader.getSchema = props => {
  const querySchema = !props.searchQuery
    ? {
        querySchema: {
          title: 'editor.search-result.query',
          description: 'editor.search-result.query.description',
          type: 'object',
          properties: {
            maxItemsPerPage: {
              title: 'editor.search-result.query.maxItemsPerPage',
              type: 'number',
              default: DEFAULT_MAX_ITEMS_PER_PAGE,
            },
            queryField: {
              title: 'Query',
              type: 'string',
            },
            mapField: {
              title: 'Map',
              type: 'string',
            },
            orderByField: {
              title: 'Order by field',
              type: 'string',
              default: SORT_OPTIONS[1].value,
              enum: SORT_OPTIONS.map(opt => opt.value),
              enumNames: SORT_OPTIONS.map(opt => opt.label),
            },
          },
        },
      }
    : {}

  return {
    title: 'editor.search-result.title',
    description: 'editor.search-result.description',
    type: 'object',
    properties: {
      ...querySchema,
      mobileLayout: {
        title: 'editor.search-result.mobileLayout',
        type: 'object',
        isLayout: true,
        properties: {
          mode1: {
            title: 'editor.search-result.mobileLayout.mode1',
            type: 'string',
            default: LAYOUT_MODE[0].value,
            enum: LAYOUT_MODE.map(opt => opt.value),
            enumNames: LAYOUT_MODE.map(opt => opt.label),
            isLayout: true,
          },
          mode2: {
            title: 'editor.search-result.mobileLayout.mode2',
            type: 'string',
            default: LAYOUT_MODE[1].value,
            enum: LAYOUT_MODE.map(opt => opt.value),
            enumNames: LAYOUT_MODE.map(opt => opt.label),
            isLayout: true,
          },
        },
      },
      hiddenFacets: {
        title: 'editor.search-result.hiddenFacets',
        type: 'object',
        isLayout: true,
        properties: {
          brands: {
            title: 'editor.search-result.hiddenFacets.brands',
            type: 'boolean',
            isLayout: true,
          },
          categories: {
            title: 'editor.search-result.hiddenFacets.categories',
            type: 'boolean',
            isLayout: true,
          },
          priceRange: {
            title: 'editor.search-result.hiddenFacets.priceRange',
            type: 'boolean',
            isLayout: true,
          },
          specificationFilters: {
            title: 'editor.search-result.hiddenFacets.specificationFilters',
            type: 'object',
            isLayout: true,
            properties: {
              hideAll: {
                title:
                  'editor.search-result.hiddenFacets.specificationFilters.hideAll',
                type: 'boolean',
                isLayout: true,
              },
              hiddenFilters: {
                type: 'array',
                isLayout: true,
                items: {
                  title:
                    'editor.search-result.hiddenFacets.specificationFilters.hiddenFilter',
                  type: 'object',
                  isLayout: true,
                  properties: {
                    name: {
                      title:
                        'editor.search-result.hiddenFacets.specificationFilters.hiddenFilter.name',
                      type: 'string',
                      isLayout: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      gap: {
        title: 'editor.search-result.gap.title',
        type: 'string',
        enum: getGapPaddingValues(),
        enumNames: getGapPaddingNames(),
        default: GapPaddingTypes.SMALL.value,
        isLayout: true,
      },
      pagination: {
        type: 'string',
        title: 'editor.search-result.pagination.title',
        default: 'infinity-scroll',
        enum: PAGINATION_TYPES,
        enumNames: [
          'editor.search-result.pagination.show-more',
          'editor.search-result.pagination.infinite-scroll',
        ],
      },
    },
  }
}

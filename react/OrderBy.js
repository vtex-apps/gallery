import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import SelectionListOrderBy from './components/SelectionListOrderBy'

import searchResult from './searchResult.css'

export const SORT_OPTIONS = [
  {
    value: '',
    label: 'ordenation.sort-by',
  },
  {
    value: 'OrderByTopSaleDESC',
    label: 'ordenation.sales',
  },
  {
    value: 'OrderByReleaseDateDESC',
    label: 'ordenation.release.date',
  },
  {
    value: 'OrderByBestDiscountDESC',
    label: 'ordenation.discount',
  },
  {
    value: 'OrderByPriceDESC',
    label: 'ordenation.price.descending',
  },
  {
    value: 'OrderByPriceASC',
    label: 'ordenation.price.ascending',
  },
  {
    value: 'OrderByNameASC',
    label: 'ordenation.name.ascending',
  },
  {
    value: 'OrderByNameDESC',
    label: 'ordenation.name.descending',
  },
]

const OrderBy = ({ orderBy, intl }) => {
  const sortingOptions = useMemo(() => {
    return SORT_OPTIONS.map(({ value, label }) => {
      return {
        value: value,
        label: intl.formatMessage({ id: label }),
      }
    })
  }, [intl])

  return (
    <div className={searchResult.orderBy}>
      <SelectionListOrderBy orderBy={orderBy} options={sortingOptions} />
    </div>
  )
}

OrderBy.propTypes = {
  /** Which sorting option is selected. */
  orderBy: PropTypes.string,
  /** Intl instance. */
  intl: intlShape,
}

export default injectIntl(OrderBy)

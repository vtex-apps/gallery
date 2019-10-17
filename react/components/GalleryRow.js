import React, { useRef, useEffect, memo } from 'react'
import { useInView } from 'react-intersection-observer'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import classNames from 'classnames'

import GalleryItem from './GalleryItem'
import { normalizeProduct } from '../constants/productHelpers'

import searchResult from '../searchResult.css'
import { useQuery } from './QueryContext'

const useProductImpression = (
  products,
  inView,
  { rowIndex, itemsPerRow, widthAvailable }
) => {
  const viewed = useRef(false)
  const { push } = usePixel()
  const { query, map } = useQuery()

  // This hook checks if the query and map has changed
  useEffect(() => {
    if (query && map) {
      viewed.current = false
    }
  }, [map, query])

  useEffect(() => {
    if (!products || viewed.current || !inView || !widthAvailable) {
      return
    }
    const normalizedProducts = products.map(normalizeProduct)
    const impressions = normalizedProducts.map((product, index) => ({
      product,
      position: rowIndex * itemsPerRow + index + 1,
    }))
    push({
      event: 'productImpression',
      list: 'Search result',
      impressions,
    })
    viewed.current = true
  }, [push, products, inView, viewed, rowIndex, itemsPerRow, widthAvailable])
}

const GalleryRow = ({
  products,
  summary,
  displayMode,
  rowIndex,
  widthAvailable,
  itemsPerRow,
  maxItemWidth,
}) => {
  const [ref, inView] = useInView({
    // inView will be true when at least 10% of the row is viewed by user
    threshold: 0.1,
  })
  useProductImpression(products, inView, {
    rowIndex,
    itemsPerRow,
    widthAvailable,
  })
  const style = {
    flexBasis: `${100 / itemsPerRow}%`,
    maxWidth: `${maxItemWidth}px`,
  }
  return products.map(product => {
    return (
      <div
        key={product.productId}
        style={style}
        className={classNames(searchResult.galleryItem, 'pa4')}
        ref={ref}
      >
        <GalleryItem
          item={product}
          summary={summary}
          displayMode={displayMode}
        />
      </div>
    )
  })
}

export default memo(GalleryRow)

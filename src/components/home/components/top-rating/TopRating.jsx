import React from 'react'
import ProductsItem from '@/common-components/products/ProductsItem'
import topRating from '@/assets/images/top-rating.png'

const TopRating = () => {
  return (
      <ProductsItem
        sectionClassName=""
        title="Top Rating"
        bannerImage={topRating}
      />
  )
}

export default TopRating

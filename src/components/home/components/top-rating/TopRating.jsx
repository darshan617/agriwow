import React from 'react'
import ProductsItem from '@/common-components/products/ProductsItem'
import topRating from '@/assets/images/top-rating.png'

const TopRating = ({ topRatedData }) => {
  return (
      <ProductsItem
        sectionClassName=""
        title="Top Rating"
        bannerImage={topRating}
        agricultureProductsData={topRatedData}
      />
  )
}

export default TopRating

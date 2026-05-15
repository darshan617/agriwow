import React from 'react'
import Image from 'next/image'
import ProductsItem from '@/common-components/products/ProductsItem'
import bannerImage from '@/assets/images/selling.png'

const BestSelling = () => {
  return (
    <ProductsItem
      sectionClassName=""
      title="Best Selling"
      bannerImage={bannerImage}
      
    />
  )
}

export default BestSelling

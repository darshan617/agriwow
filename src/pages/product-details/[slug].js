import ProductDetailsComponent from '@/components/product-details/ProductDetailsComponent'
import { useGetProductDetailsQuery } from '@/redux/apis/productApi'
import { useRouter } from 'next/router'
import React from 'react'

const ProductDetails = () => {
  const router = useRouter()
  const slug = router?.query?.slug
  const { data: productDetails } = useGetProductDetailsQuery({
    slug: slug,
  }, {skip: !slug})

  console.log(productDetails, 'productDetails');
  
  return (
    <div>
        <ProductDetailsComponent productDetails={productDetails} />
    </div>
  )
}

export default ProductDetails
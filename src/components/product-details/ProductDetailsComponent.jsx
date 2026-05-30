import React from 'react'
import ItemDetail from './components/item-detail/ItemDetail'
import Layout from '../layout/Layout'
import Breadcrumb from './components/breadcrumb/Breadcrumb'
import DeliveryDetail from './components/delivery-detail/deliveryDetails'
import SimilarProduct from './components/similar-product/SimilarProduct'
import { useGetHomeDataQuery } from '@/redux/apis/homeApi'
import ReviewsRating from './components/reviews-rating/ReviewsRating'
import Faqs from './components/faqs/Faqs'
import Detail from '../home/components/detail/Detail'
import OrderInformation from '../product-category/components/order-information/OrderInformation'
const ProductDetailsComponent = () => {
  const { data: homeData } = useGetHomeDataQuery()
  const categoriesData = homeData?.data?.categories
  return (
    <Layout>
      <Breadcrumb />
      <div className="container row">
        <div className="col-lg-9 col-md-12 p-0">
          <ItemDetail />
        </div>
        <div className="col-lg-3  p-0">
          <DeliveryDetail />
        </div>
      </div>
      <SimilarProduct categoriesData={categoriesData} />
      <ReviewsRating />
      <Faqs />
      <OrderInformation />
    </Layout> 
  )
}

export default ProductDetailsComponent
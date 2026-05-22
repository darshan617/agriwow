import React from 'react'
import Layout from '@/components/layout/Layout'
import { useGetHomeDataQuery } from '@/redux/apis/homeApi'
import ProductCategoryList from './components/breadcrumb/Breadcrumb'
import OrderInformation from './components/order-information/OrderInformation'

const ProductCategoryComponent = () => {
  const { data: homeData } = useGetHomeDataQuery()
  const categoriesData = homeData?.data?.categories

  return (
    <Layout >
      <ProductCategoryList />
      <OrderInformation />
    </Layout>
  ) 
}

export default ProductCategoryComponent

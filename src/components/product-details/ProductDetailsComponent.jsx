import React from 'react'
import ItemDetail from './components/item-detail/ItemDetail'
import Layout from '../layout/Layout'
import Breadcrumb from './components/breadcrumb/Breadcrumb'

const ProductDetailsComponent = () => {
  return (
    <Layout>
      <Breadcrumb />
      <ItemDetail />
    </Layout>
  )
}

export default ProductDetailsComponent
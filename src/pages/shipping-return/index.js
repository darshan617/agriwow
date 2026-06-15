import Layout from '@/components/layout/Layout'
import ShippingReturn from '@/components/shipping-return/ShippingReturn'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'
import React from 'react'

const ShippingReturnPage = () => {
  return (
    <Layout>
        <ShippingReturn />
        <OrderInformation />
    </Layout>
  )
}

export default ShippingReturnPage
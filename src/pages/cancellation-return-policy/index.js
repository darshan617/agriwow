import React from 'react'
import Layout from '@/components/layout/Layout'
import CancellationReturn from '@/components/cancellation-return/CancellationReturn'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'

const CancellationReturnPolicy = () => {
  return (
    <Layout>
        <CancellationReturn />
        <OrderInformation />
    </Layout>
  )
}

export default CancellationReturnPolicy
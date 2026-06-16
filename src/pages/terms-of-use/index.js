import Layout from '@/components/layout/Layout'
import React from 'react'
import TermUse from '@/components/term-use/TermUse'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'
const TermAndUse = () => {
  return (
    <Layout>
        <TermUse />
        <OrderInformation />
    </Layout>
  )
}

export default TermAndUse
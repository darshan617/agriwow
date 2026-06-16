import React from 'react'
import Layout from '@/components/layout/Layout'
import PrivacyPolicy from '@/components/privacy-policy/PrivacyPolicy'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'

const ProivacyPolicyPage = () => {
  return (
    <Layout>
      <PrivacyPolicy />
      <OrderInformation />
    </Layout>
  )
}

export default ProivacyPolicyPage
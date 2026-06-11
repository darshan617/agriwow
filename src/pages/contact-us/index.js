import ContactUs from '@/components/contact-us/ContactUs'
import Layout from '@/components/layout/Layout'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'
import DeliveryDetails from '@/components/product-details/components/delivery-detail/deliveryDetails'
import React from 'react'

const Contact = () => {
  return (
    <Layout>
        <ContactUs />
        <OrderInformation />
    </Layout>
  )
}

export default Contact
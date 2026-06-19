import ContactUs from '@/components/contact-us/ContactUs'
import Layout from '@/components/layout/Layout'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'
import React from 'react'
import { useGetContactDetailsQuery } from '@/redux/apis/contactApi'

const Contact = () => {
  const { data: contactDetailsData } = useGetContactDetailsQuery()

  return (
    <Layout>
        <ContactUs contactDetailsData={contactDetailsData} />
        <OrderInformation />
    </Layout>
  )
}

export default Contact
import Layout from '@/components/layout/Layout'
import React from 'react'
import CartDetails from '@/components/cart-details/product-info/cartDetails'
import CartSummery from '@/components/cart-details/cart-summery/CartSummery'
import OrderInformation from '@/components/product-category/components/order-information/OrderInformation'
const cart = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-12">
            <CartDetails />
          </div>
          <div className="col-xl-4 col-12">
            <CartSummery />
          </div>
        </div>
      </div>
      <OrderInformation />      
    </Layout>
  )
}

export default cart
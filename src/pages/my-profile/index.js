import DeliveryAddress from "@/components/checkout/delivery-address/DeliveryAddress";
import Layout from "@/components/layout/Layout";
import MyProfileComponent from "@/components/my-profile/MyProfileComponent";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import CustomerInfo from "@/components/wish-list/customer-info/CustomerInfo";
import React, { useState } from "react";

const MyProfile = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [cartData, setCartData] = useState(null);

  const handleUpdateCart = (id, quantity, address_id = null) => {
    setCartData({ id, quantity, address_id });
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <CustomerInfo />
          <div className="col-xl-9 col-md-12">
            <MyProfileComponent />
            <DeliveryAddress
              handleUpdateCart={handleUpdateCart}
              cartData={cartData}
              setShowAddressForm={setShowAddressForm}
              showAddressForm={showAddressForm}
              type="my-profile"
            />
          </div>
        </div>
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default MyProfile;

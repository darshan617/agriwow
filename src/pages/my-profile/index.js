import DeliveryAddress from "@/components/checkout/delivery-address/DeliveryAddress";
import Layout from "@/components/layout/Layout";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import CustomerInfo from "@/components/wish-list/customer-info/CustomerInfo";
import {
  useLoginPopup,
} from "@/custom-hooks/login-popup/LoginPopupProvider";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const DynamicMyProfileComponent = dynamic(
  () => import("@/components/my-profile/MyProfileComponent"),
  {
    ssr: false,
  },
);
const MyProfile = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [cartData, setCartData] = useState(null);

  const handleUpdateCart = (id, quantity, address_id = null) => {
    setCartData({ id, quantity, address_id });
  };
  const { openLoginPopup, isLoggedIn } = useLoginPopup();
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <CustomerInfo />
          {isLoggedIn ? (
            <div className="col-xl-9 col-md-12 mt-auto mb-auto">
              <DynamicMyProfileComponent />
              <DeliveryAddress
                handleUpdateCart={handleUpdateCart}
                cartData={cartData}
                setShowAddressForm={setShowAddressForm}
                showAddressForm={showAddressForm}
                type="my-profile"
              />
            </div>
          ) : (
            <div className="col-xl-9 col-md-12 mt-auto mb-auto">
              <div className="alert alert-danger">
                Please login or signup to access this page
              </div>
              <button
                style={{
                  width: "fit-content",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#258139",
                  color: "#fff",
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => openLoginPopup()}
              >
                Login / Signup
              </button>
            </div>
          )}
        </div>
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default MyProfile;

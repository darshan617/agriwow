"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useMemo, useState } from "react";
import CheckoutStepper from "@/components/checkout/checkout-stepper/CheckoutStepper";
import CartSummery from "@/components/cart-details/cart-summery/CartSummery";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
} from "@/redux/apis/addToCartApi";

const Payments = () => {
  const [canFetchCart, setCanFetchCart] = useState(false);

  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
  }, []);

  const { data: cartData } = useGetCartDataQuery(undefined, {
    skip: !canFetchCart,
  });

  const cartItems = Array.isArray(cartData?.data) ? cartData.data : [];

  const cartItemsWithQuantities = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        quantity: item.quantity,
      })),
    [cartItems],
  );

  return (
    <Layout>
      <div className="container">
        <CheckoutStepper activeStep={2} />
        <div className="row">
          <div className="col-lg-8">
            <div className="py-4">
              <p className="mb-0 fw-semibold text-secondary">
                Select Payment Method
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <CartSummery
              cartItems={cartItemsWithQuantities}
              cartData={cartData}
              hideCoupon
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;

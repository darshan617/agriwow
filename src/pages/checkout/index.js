"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useMemo, useState } from "react";
import DeliveryAddress from "@/components/checkout/delivery-address/DeliveryAddress";
import CartDetails from "@/components/cart-details/product-info/cartDetails";
import CartSummery from "@/components/cart-details/cart-summery/CartSummery";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
} from "@/redux/apis/addToCartApi";

const Checkout = () => {
  const [canFetchCart, setCanFetchCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
  }, []);

  const { data: cartData, isLoading } = useGetCartDataQuery(undefined, {
    skip: !canFetchCart,
  });

  const cartItems = Array.isArray(cartData?.data) ? cartData.data : [];

  const getQuantity = (item) => quantities[item.id] ?? item.quantity;

  const cartItemsWithQuantities = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        quantity: getQuantity(item),
      })),
    [cartItems, quantities]
  );

  const handleIncrease = (id, currentQty) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? currentQty) + 1,
    }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      setQuantities((prev) => ({
        ...prev,
        [id]: currentQty - 1,
      }));
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <DeliveryAddress />
            <CartDetails
              hideBreadcrumb
              hideCheckoutButton
              cartItems={cartItems}
              isLoading={isLoading}
              getQuantity={getQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={() => setAppliedCoupon(null)}
            />
          </div>
          <div className="col-lg-4">
            <CartSummery
              cartItems={cartItemsWithQuantities}
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

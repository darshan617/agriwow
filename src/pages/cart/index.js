"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useMemo, useState } from "react";
import CartDetails from "@/components/cart-details/product-info/cartDetails";
import CartSummery from "@/components/cart-details/cart-summery/CartSummery";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
} from "@/redux/apis/addToCartApi";

const Cart = () => {
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
          <div className={`${cartItems.length > 0 ? 'col-xl-8' : 'col-xl-12' }  col-12`}>
            <CartDetails
              cartItems={cartItems}
              isLoading={isLoading}
              getQuantity={getQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={() => setAppliedCoupon(null)}
            />
          </div>
          {cartItems.length > 0 && (
            <div className="col-xl-4 col-12">
              <CartSummery
                cartItems={cartItemsWithQuantities}
                appliedCoupon={appliedCoupon}
                setAppliedCoupon={setAppliedCoupon}
              />
            </div>
          )}
        </div>
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default Cart;

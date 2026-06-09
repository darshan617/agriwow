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
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const Cart = () => {
  const { showToast } = useToast();
  const [canFetchCart, setCanFetchCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [updateCart, { isLoading: isUpdateCartLoading }] =
    useUpdateCartMutation();

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
    [cartItems, quantities],
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

  const handleUpdateCart = async (id, quantity) => {
    try {
      const res = await updateCart({
        body: {
          cart_id: id,
          quantity: quantity,
          coupon_code: couponCode,
        },
      });
      if (res?.data?.success || res?.data?.status) {
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message, "error");
    }
  };

  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div
            className={`${cartItems.length > 0 ? "col-xl-8" : "col-xl-12"}  col-12`}
          >
            <CartDetails
              cartItems={cartItems}
              isLoading={isLoading}
              getQuantity={getQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={() => {
                setAppliedCoupon(null);
                setCouponCode("");
              }}
              handleUpdateCart={handleUpdateCart}
            />
          </div>
          {cartItems.length > 0 && (
            <div className="col-xl-4 col-12">
              <CartSummery
                cartItems={cartItemsWithQuantities}
                appliedCoupon={appliedCoupon}
                setAppliedCoupon={setAppliedCoupon}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                handleUpdateCart={handleUpdateCart}
                cartData={cartData}
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

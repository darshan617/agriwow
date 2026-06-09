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
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const Checkout = () => {
  const { showToast } = useToast();
  const [canFetchCart, setCanFetchCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [updateCart, { isLoading: isUpdateCartLoading }] =
    useUpdateCartMutation();
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

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <DeliveryAddress />
            <div className="mt-4">
              <CartDetails
                // hideBreadcrumb
                // hideCheckoutButton
                cartItems={cartItems}
                isLoading={isLoading}
                getQuantity={getQuantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                appliedCoupon={appliedCoupon}
                onRemoveCoupon={() => setAppliedCoupon(null)}
                handleUpdateCart={handleUpdateCart}
              />
            </div>
          </div>
          <div className="col-lg-4">
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
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

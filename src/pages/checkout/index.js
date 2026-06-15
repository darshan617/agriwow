"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CheckoutStepper from "@/components/checkout/checkout-stepper/CheckoutStepper";
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
import {
  clearBuyNowAddPending,
  isBuyNowAddPending,
  useBuyProductMutation,
  useGetBuyNowDataQuery,
} from "@/redux/apis/buyProductApi";
import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [canFetchCart, setCanFetchCart] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [updateCart, { isLoading: isUpdateCartLoading }] =
    useUpdateCartMutation();
  const [buyProduct, { isLoading: isBuyProductLoading }] =
    useBuyProductMutation();
  const buyNowAddedRef = useRef(false);
  const [buyNowSynced, setBuyNowSynced] = useState(false);

  const shouldAddBuyNowProduct = useMemo(
    () =>
      Boolean(
        router?.isReady &&
          router?.query?.productId &&
          router?.query?.quantity &&
          router?.query?.userId,
      ),
    [
      router?.isReady,
      router?.query?.productId,
      router?.query?.quantity,
      router?.query?.userId,
    ],
  );

  const isBuyNowFlow = useMemo(
    () =>
      Boolean(
        router?.isReady &&
          (router?.query?.productId ||
            router?.query?.quantity ||
            router?.query?.userId),
      ),
    [
      router?.isReady,
      router?.query?.productId,
      router?.query?.quantity,
      router?.query?.userId,
    ],
  );

  const {
    data: cartData,
    isLoading,
    refetch: refetchCartData,
  } = useGetCartDataQuery(undefined, {
    skip: !router?.isReady || !canFetchCart || isBuyNowFlow,
  });
  const {
    data: buyNowData,
    isLoading: isBuyNowLoading,
    refetch: refetchBuyNowData,
  } = useGetBuyNowDataQuery(undefined, {
    skip:
      !router?.isReady ||
      !canFetchCart ||
      !isBuyNowFlow ||
      (shouldAddBuyNowProduct && !buyNowSynced),
  });

  const activeCartData = isBuyNowFlow ? buyNowData : cartData;
  const isCartLoading = isBuyNowFlow ? isBuyNowLoading : isLoading;

  const [cartItems, setCartItems] = useState([]);

  const getItemKey = (item) => item?.buy_now_id ?? item?.id;

  const handleUpdateCart = async (id, quantity, address_id = null) => {
    try {
      const res = await updateCart({
        body: {
          cart_id: id,
          quantity: quantity,
          coupon_code: couponCode,
          address_id: address_id,
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

  const handleBuyProduct = async () => {
    try {
      const res = await buyProduct({
        body: {
          user_id: router?.query?.userId,
          product_id: router?.query?.productId,
          quantity: router?.query?.quantity,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        clearBuyNowAddPending();
        setBuyNowSynced(true);
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message, "error");
    }
  };

  const getQuantity = (item) =>
    quantities[getItemKey(item)] ?? item.quantity;

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
    setQuantities((prev) => {
      const nextQty = (prev[id] ?? currentQty) - 1;
      if (nextQty < 1) return prev;
      return { ...prev, [id]: nextQty };
    });
  };

  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
  }, []);

  useEffect(() => {
    if (router?.isReady && isBuyNowFlow && !shouldAddBuyNowProduct) {
      setBuyNowSynced(true);
    }
  }, [router?.isReady, isBuyNowFlow, shouldAddBuyNowProduct]);

  useEffect(() => {
    if (isBuyNowFlow) {
      if (buyNowData?.data) {
        const items = Array.isArray(buyNowData.data)
          ? buyNowData.data
          : [buyNowData.data];
        setCartItems(items);
      }
      return;
    }
    if (cartData?.data) {
      setCartItems(Array.isArray(cartData?.data) ? cartData.data : []);
    }
  }, [cartData?.data, buyNowData?.data, isBuyNowFlow]);

  useEffect(() => {
    if (!router?.isReady || !canFetchCart || !shouldAddBuyNowProduct) {
      return;
    }

    if (!isBuyNowAddPending(router.query)) {
      setBuyNowSynced(true);
      return;
    }

    if (buyNowAddedRef.current) {
      return;
    }

    buyNowAddedRef.current = true;
    handleBuyProduct();
  }, [router?.isReady, canFetchCart, shouldAddBuyNowProduct, router.query]);

  return (
    <Layout>
      <div className="container">
        <CheckoutStepper activeStep={1} />
        <div className="row">
          <div
            className={`${
              cartItems.length > 0 ? "col-lg-8 col-md-8" : "col-lg-12 col-md-12"
            } col-12`}
          >
            {cartItemsWithQuantities?.length > 0 && (
            <DeliveryAddress
              handleUpdateCart={handleUpdateCart}
              cartData={activeCartData}
              setShowAddressForm={setShowAddressForm}
                showAddressForm={showAddressForm}
                refetchCartData={isBuyNowFlow ? refetchBuyNowData : refetchCartData}
              />
            )}
            <div className="mt-4">
              <CartDetails
                cartData={activeCartData}
                setShowAddressForm={setShowAddressForm}
                // hideBreadcrumb
                // hideCheckoutButton
                cartItems={cartItems}
                isLoading={isCartLoading || isBuyProductLoading}
                getQuantity={getQuantity}
                getItemKey={getItemKey}
                isBuyNowFlow={isBuyNowFlow}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                appliedCoupon={appliedCoupon}
                onRemoveCoupon={() => setAppliedCoupon(null)}
                handleUpdateCart={handleUpdateCart}
              />
            </div>
          </div>
          {cartItems.length > 0 && (
          <div className="col-lg-4 col-md-4 col-12">
            {cartItemsWithQuantities?.length > 0 && (
            <CartSummery
              cartItems={cartItemsWithQuantities}
              appliedCoupon={appliedCoupon}
              setAppliedCoupon={setAppliedCoupon}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              handleUpdateCart={handleUpdateCart}
              cartData={activeCartData}
            />
            )}
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CartDetails from "@/components/cart-details/product-info/cartDetails";
import CartSummery from "@/components/cart-details/cart-summery/CartSummery";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import styles from "@/components/cart-details/cart-summery/CartSummery.module.css";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import "swiper/css";
import { trackViewCart } from "@/utils/gtm";
import dynamic from "next/dynamic";

const CartRecommendations = dynamic(
  () => import("@/components/cart-details/CartRecommendations"),
  { ssr: false },
);

const Cart = () => {
  const { showToast } = useToast();
  const [canFetchCart, setCanFetchCart] = useState(false);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const cartViewed = useRef(false);

  const [updateCart, { isLoading: isUpdateCartLoading }] =
    useUpdateCartMutation();

  const { data: cartData, isLoading: isCartLoading } = useGetCartDataQuery(
    undefined,
    {
      skip: !canFetchCart,
    },
  );
  const [cachedTrendingProducts, setCachedTrendingProducts] = useState([]);
  const hasCartTrendingProducts = cartData?.trending_products?.length > 0;
  const shouldFetchHomeFallback =
    isCartInitialized &&
    !(canFetchCart && isCartLoading) &&
    !hasCartTrendingProducts &&
    cachedTrendingProducts.length === 0;
  const { data: homeData } = useGetHomeDataQuery(undefined, {
    skip: !shouldFetchHomeFallback,
  });

  const cartItems = Array.isArray(cartData?.data) ? cartData.data : [];
  useEffect(() => {
    if (!cartItems.length || cartViewed.current) return;

    cartViewed.current = true;

    const cartValue =
      cartData?.cart_summary?.grand_total ??
      cartData?.cart_summary?.subtotal ??
      cartData?.grand_total ??
      cartData?.total;

    trackViewCart(cartItems, cartValue);
  }, [cartData, cartItems]);
  useEffect(() => {
    if (cartData?.trending_products?.length > 0) {
      setCachedTrendingProducts(cartData.trending_products);
    }
  }, [cartData?.trending_products]);

  const homeTrendingFallback =
    homeData?.data?.products?.best_selling ??
    homeData?.data?.products?.top_rated ??
    [];

  const trending_products =
    cartData?.trending_products?.length > 0
      ? cartData.trending_products
      : cachedTrendingProducts.length > 0
        ? cachedTrendingProducts
        : homeTrendingFallback;

  const getQuantity = (item) => quantities[item?.id] ?? item?.quantity;

  const cartItemsWithQuantities = useMemo(
    () =>
      cartItems?.map((item) => ({
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

  const handleUpdateCart = async (
    id,
    quantity,
    address_id = null,
    coupon_code,
  ) => {
    try {
      const res = await updateCart({
        body: {
          cart_id: id,
          quantity: quantity,
          coupon_code: coupon_code !== undefined ? coupon_code : couponCode,
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

  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
    setIsCartInitialized(true);
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div
            className={
              cartItems?.length === 0
                ? "col-lg-12"
                : "col-xl-8 col-md-12 col-12"
            }
          >
            <CartDetails
              cartData={cartData}
              cartItems={cartItems}
              getQuantity={getQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={() => {
                setAppliedCoupon(null);
                setCouponCode("");
              }}
              handleUpdateCart={handleUpdateCart}
              isLoadingData={!isCartInitialized || isCartLoading}
            />
          </div>
          {cartItems?.length > 0 && (
            <div className="col-xl-4 col-md-12 col-12">
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

        {trending_products?.length > 0 && (
          <CartRecommendations products={trending_products} />
        )}
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default Cart;

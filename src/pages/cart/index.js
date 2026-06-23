"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useMemo, useState } from "react";
import CartDetails from "@/components/cart-details/product-info/cartDetails";
import CartSummery from "@/components/cart-details/cart-summery/CartSummery";
import OrderInformation from "@/components/product-category/components/order-information/OrderInformation";
import styles from "@/components/cart-details/cart-summery/CartSummery.module.css"
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import ProductCard from "@/common-components/product-card/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

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
  const { data: homeData } = useGetHomeDataQuery();
  const [cachedTrendingProducts, setCachedTrendingProducts] = useState([]);

  const cartItems = Array.isArray(cartData?.data) ? cartData.data : [];

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
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h2 className={styles.swiperTitle}>Trending Products</h2>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".swiper-btn-prev",
                nextEl: ".swiper-btn-next",
              }}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                425: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                575: {
                  slidesPerView: 3,
                  spaceBetween: 14,
                },
                767: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              className="swiper-wrapper"
            >
              {trending_products.map((item) => (
                <SwiperSlide key={item?.id}>
                  <ProductCard
                    image={item?.gallery?.[0]}
                    imageHover={item?.gallery?.[1]}
                    discount={item?.discount}
                    isBestSeller={item?.is_best_selling}
                    name={item?.name}
                    price={item?.selling_price}
                    oldPrice={item?.price}
                    reviews={item?.total_reviews}
                    average_rating={item?.average_rating}
                    isTrending={item?.is_trending}
                    isFeatured={item?.is_featured}
                    isTopRated={item?.is_top_rated}
                    slug={item?.slug}
                    productId={item?.id}
                    isWishlist={item?.is_wishlist}
                    similarProductData={item}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      <OrderInformation />
    </Layout>
  );
};

export default Cart;

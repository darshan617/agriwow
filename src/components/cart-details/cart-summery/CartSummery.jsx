import React, { useEffect, useState } from "react";
import NoCoupon from '@/assets/icon/No-coupon.png'
import styles from "@/components/cart-details/cart-summery/CartSummery.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
} from "@/redux/apis/addToCartApi";

const CartSummery = ({ cartItems: cartItemsProp }) => {
  const [canFetchCart, setCanFetchCart] = useState(false);

  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
  }, []);

  const { data: cartData } = useGetCartDataQuery(undefined, {
    skip: !canFetchCart || cartItemsProp !== undefined,
  });

  const cartItems = cartItemsProp ?? (Array.isArray(cartData?.data) ? cartData.data : []);
  return (
    <div className={`${styles.cartSummaryWrapper} py-5`}>
      <div className={`${styles.summaryCard}`}>
        <div className={`${styles.summaryHeader}`}>
          <h3>Cart Summary</h3>
        </div>

        <div className={`${styles.summaryBody}`}>
          <div className={`${styles.summaryRow}`}>
            <span>Subtotal</span>
            <span>₹ {cartItems.reduce((acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 0), 0)} </span>
          </div>

          <div className={`${styles.summaryRow}`}>
            <span>GST</span>
            <span>₹ {cartItems.reduce((acc, item) => acc + (item?.product?.gst ?? 0) * (item?.quantity ?? 0), 0)}</span>
          </div>

          <div className={`${styles.summaryRow}`}>
            <span>Discount (AGRIWOW10)</span>
            <span className={`${styles.discount}`}>₹ {cartItems.reduce((acc, item) => acc + (item?.product?.discount ?? 0) * (item?.quantity ?? 0), 0)}</span>
          </div>

          <div className={`${styles.summaryRow}`}>
            <span>Shipping</span>
            <span>₹ {cartItems.reduce((acc, item) => acc + (item?.product?.shipping ?? 0) * (item?.quantity ?? 0), 0)}</span>
          </div>

          <div className={`${styles.freeShipping}`}>Free shipping</div>

          <hr className={`${styles.divider}`} />

          <div className={`${styles.totalRow}`}>
            <div>
              <h4>Total Amount</h4>
              <p>(Inclusive of all taxes)</p>
            </div>

            <h4>₹ {cartItems.reduce((acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 0), 0)}</h4>
          </div>

          <div className={`${styles.saveText}`}>
            You save ₹ {cartItems.reduce((acc, item) => acc + (item?.product?.discount ?? 0) * (item?.quantity ?? 0), 0)} on this order
          </div>
        </div>
      </div>
      <div className={`${styles.couponCard}`}>
        <h3 className={`${styles.couponTitle}`}>Apply Coupon</h3>

        <div className={`${styles.couponForm}`}>
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className={`${styles.couponInput}`}
          />

          <button className={`${styles.applyBtn}`}>Apply</button>
        </div>

        <div className={`${styles.emptyCouponBox}`}>
          <Image
            src={NoCoupon}
            alt="product-img"
            className={`${styles.productImg}`}
          />

          <p>No coupon & Offer available now</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummery;

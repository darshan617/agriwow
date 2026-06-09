import React, { useEffect, useState } from "react";
import NoCoupon from "@/assets/icon/No-coupon.png";
import styles from "@/components/cart-details/cart-summery/CartSummery.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useApplyCouponMutation,
  useGetAvailableCouponsQuery,
  useGetCartDataQuery,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { FaCopy } from "react-icons/fa";

const CartSummery = ({
  cartItems: cartItemsProp,
  appliedCoupon,
  setAppliedCoupon,
  couponCode,
  setCouponCode,
  handleUpdateCart,
}) => {
  const [canFetchCart, setCanFetchCart] = useState(false);
  const { showToast } = useToast();

  const { data: cartData } = useGetCartDataQuery(undefined, {
    skip: !canFetchCart || cartItemsProp !== undefined,
  });

  const [applyCoupon, { isLoading }] = useApplyCouponMutation();

  const cartItems =
    cartItemsProp ?? (Array.isArray(cartData?.data) ? cartData.data : []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 0),
    0,
  );

  const { data: availableCoupons } = useGetAvailableCouponsQuery();
  console.log(availableCoupons);

  const discountAmount = appliedCoupon?.discount_amount ?? 0;
  const discountedSubtotal = subtotal - discountAmount;
  const gstAmount = subtotal * 0.18;
  const shippingAmount = cartItems.reduce(
    (acc, item) => acc + (item?.product?.shipping ?? 0) * (item?.quantity ?? 0),
    0,
  );
  const totalAmount = discountedSubtotal + gstAmount + shippingAmount;
  const productSavings = cartItems.reduce(
    (acc, item) => acc + (item?.product?.discount ?? 0) * (item?.quantity ?? 0),
    0,
  );

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      showToast("Please enter a coupon code", "warning");
      return;
    }

    const res = await applyCoupon({
      body: {
        coupon_code: couponCode.trim(),
        subtotal,
      },
    });

    if (res.error) {
      showToast(res.error?.data?.message || "Failed to apply coupon", "error");
      return;
    }

    if (res?.data?.status) {
      setAppliedCoupon({
        coupon: res.data.coupon,
        discount_amount: res.data.discount_amount,
        grand_total: res.data.grand_total,
      });
      showToast(res?.data?.message || "Coupon applied", "success");
      handleUpdateCart();
    } else {
      showToast(res?.data?.message || "Failed to apply coupon", "error");
    }
  };
  useEffect(() => {
    setCanFetchCart(Boolean(Cookies.get("userToken") || getCartSessionId()));
  }, []);
  return (
    <div className={`${styles.cartSummaryWrapper} py-5`}>
      <div className={`${styles.summaryCard}`}>
        <div className={`${styles.summaryHeader}`}>
          <h3>Cart Summary</h3>
        </div>

        <div className={`${styles.summaryBody}`}>
          <div className={`${styles.summaryRow}`}>
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className={`${styles.summaryRow}`}>
            <span>GST(18%)</span>
            <span>₹ {gstAmount.toFixed(2)}</span>
          </div>

          <div className={`${styles.summaryRow}`}>
            <span>Discount</span>
            <span className={`${styles.discount}`}>
              {appliedCoupon
                ? appliedCoupon.coupon?.type === "percentage"
                  ? `${appliedCoupon.coupon?.value ?? 0}% (₹${discountAmount})`
                  : `₹ -${discountAmount}`
                : "-"}
            </span>
          </div>

          <div className={`${styles.summaryRow}`}>
            <span>Shipping</span>
            <span>₹ {shippingAmount}</span>
          </div>
          {shippingAmount > 0 && (
            <div className={`${styles.freeShipping}`}>Free shipping</div>
          )}

          <hr className={`${styles.divider}`} />

          <div className={`${styles.totalRow}`}>
            <div>
              <h4>Total Amount</h4>
              <p>(Inclusive of all taxes)</p>
            </div>
            <h4>₹ {totalAmount.toFixed(2)}</h4>
          </div>

          <div className={`${styles.saveText}`}>
            {productSavings + discountAmount > 0 && (
              <span>You save ₹ {productSavings + discountAmount} on this order</span>
            )}
          </div>
        </div>
      </div>
      <div className={`${styles.couponCard}`}>
        <h3 className={`${styles.couponTitle} `}>Apply Coupon</h3>

        <div className={`${styles.couponForm}`}>
          <input
            type="text"
            placeholder="Enter Coupon Code"
            className={`${styles.couponInput}`}
            value={couponCode}
            onChange={(e) => setCouponCode(e?.target?.value)}
          />

          <button
            className={`${styles.applyBtn}`}
            onClick={handleApplyCoupon}
            disabled={isLoading}
          >
            {isLoading ? "Applying..." : "Apply"}
          </button>
        </div>

        {availableCoupons?.data?.length > 0 ? (
          availableCoupons?.data?.map((coupon) => (
            <div key={coupon?.id} className={`${styles.couponItem}`}>
              <p>{coupon?.code}</p>
              <button
                onClick={() => setCouponCode(coupon?.code)}
                className={`${styles.applyBtn}`}
              >
                Copy Code <FaCopy />
              </button>
            </div>
          ))
        ) : (
          <div className={`${styles.emptyCouponBox}`}>
            <Image
              src={NoCoupon}
              alt="product-img"
              className={`${styles.productImg}`}
            />
          </div>
        )}

        {/* <button type="button" className={`${styles.viewAllBtn} `}>
          View All Coupons & Offers
        </button> */}
      </div>
    </div>
  );
};

export default CartSummery;

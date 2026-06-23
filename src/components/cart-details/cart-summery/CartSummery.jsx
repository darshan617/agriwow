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
  useRemoveCouponMutation,
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { FaCopy } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  usePlaceOrderMutation,
  useUpdateBuyNowMutation,
  useVerifyPaymentMutation,
} from "@/redux/apis/buyProductApi";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CustomPopup from "@/components/custom-popup/CustomPopup";

const CartSummery = ({
  cartItems: cartItemsProp,
  appliedCoupon,
  setAppliedCoupon,
  couponCode,
  setCouponCode,
  handleUpdateCart,
  cartData,
  hideCoupon = false,
}) => {
  console.log(cartData, "cartData");
  const router = useRouter();
  const { showToast } = useToast();
  const [showPopup, setShowPopup] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("full");

  const [applyCoupon, { isLoading }] = useApplyCouponMutation();
  const { data: availableCoupons } = useGetAvailableCouponsQuery();
  const [updateCart, { isLoading: isUpdateCartLoading }] =
    useUpdateCartMutation();
  const [updateBuyNow, { isLoading: isUpdateBuyNowLoading }] =
    useUpdateBuyNowMutation();
  const { openLoginPopup, getIsLoggedIn } = useLoginPopup();
  const [placeOrder, { isLoading: isPlaceOrderLoading }] =
    usePlaceOrderMutation();
  const [verifyPayment, { isLoading: isVerifyPaymentLoading }] =
    useVerifyPaymentMutation();
  const [removeCoupon, { isLoading: isRemoveCouponLoading }] =
    useRemoveCouponMutation();

  const cartItems =
    cartItemsProp ?? (Array.isArray(cartData?.data) ? cartData.data : []);
  const cartSummary = cartData?.cart_summary ?? {};
  const calculatedSubtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item?.product?.selling_price ?? 0) * (item?.quantity ?? 0),
    0,
  );
  const subtotal = cartSummary.subtotal ?? calculatedSubtotal;
  const discountAmount =
    cartSummary.discount_amount ??
    appliedCoupon?.discount_amount ??
    cartData?.coupon?.discount_amount ??
    0;

  console.log(discountAmount, "discountAmount");
  const gstAmount =
    cartSummary.gst_amount ?? cartSummary.gst ?? subtotal * 0.18;
  const shippingAmount =
    cartSummary.shipping_charge ?? cartData?.summary?.shipping_charge ?? 0;
  // const totalAmount = subtotal + gstAmount + shippingAmount - discountAmount;
  const totalAmount = subtotal - discountAmount;
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
      if (router?.pathname === "/checkout" && router?.query?.productId) {
        const res = await updateBuyNow({
          body: {
            buy_now_id: router.query.buy_now_id,
            coupon_code: couponCode.trim(),
          },
        });
      } else {
        handleUpdateCart();
      }
    } else {
      showToast(res?.data?.message || "Failed to apply coupon", "error");
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      setCouponCode("");
      setAppliedCoupon(null);
      const res = await removeCoupon({
        body: {
          source: router?.query?.productId ? "buy_now" : "cart",
        },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message || "Coupon removed", "success");
        if (router?.pathname === "/checkout" && router?.query?.productId) {
          await updateBuyNow({
            body: {
              buy_now_id: router.query.buy_now_id,
              coupon_code: "",
            },
          });
        } else {
          handleUpdateCart(null, null, null, "");
        }
      } else {
        showToast(res?.data?.message || "Failed to remove coupon", "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message || "Failed to remove coupon", "error");
    }
  };

  const handlePlaceOrder = async (source, type, address_id = null) => {
    try {
      const res = await placeOrder({
        body: {
          source: source,
          payment_type: type,
          address_id: address_id,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        const razorpay = res?.data?.razorpay;

        const options = {
          key: razorpay.key,
          amount: razorpay.amount,
          currency: razorpay.currency,
          name: razorpay.name,
          description: razorpay.description,
          order_id: razorpay.order_id,
          prefill: razorpay.prefill,
          handler: async function (response) {
            setShowPopup("payment");
            const verifyPaymentRes = await verifyPayment({
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                order_id: res?.data?.order_id,
                razorpay_order_id: razorpay.order_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (
              verifyPaymentRes?.data?.success ||
              verifyPaymentRes?.data?.status
            ) {
              showToast(
                "Payment Successful" || verifyPaymentRes?.data?.message,
                "success",
              );
              router.push("/my-order");
            } else {
              showToast(
                "Payment Failed" || verifyPaymentRes?.data?.message,
                "error",
              );
            }
          },

          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", function (response) {
          showToast(response.error.description, "error");
        });

        rzp.open();
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message, "error");
    }
  };

  // useEffect(() => {
  //   if (cartData?.coupon?.code) {
  //     setCouponCode(cartData?.coupon?.code);
  //   }
  // }, []);
  useEffect(() => {
    if (!cartData) return;
    if (cartData.coupon?.code) {
      setCouponCode(cartData.coupon.code);
    } else {
      setCouponCode("");
    }
  }, [cartData?.coupon?.code, cartData]);

  return (
    <div className={`${styles.cartSummaryWrapper} pt-5 pb-5`}>
      <div className={`${styles.summaryCard}`}>
        <div className={`${styles.summaryHeader}`}>
          <h3>Cart Summary</h3>
        </div>

        <div className={`${styles.summaryBody}`}>
          <div className={`${styles.summaryRow}`}>
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          {/* <div className={`${styles.summaryRow}`}>
            <span>GST(18%)</span>
            <span>₹ {gstAmount.toFixed(2)}</span>
          </div> */}
          {(discountAmount || cartData?.coupon?.discount_amount) > 0 && (
            <div className={`${styles.summaryRow}`}>
              <span>Discount</span>
              <span
                className={`${styles.discount}`}
                style={{
                  color:
                    (discountAmount || cartData?.coupon?.discount_amount) > 0
                      ? "#2c9a43"
                      : "black",
                }}
              >
                {appliedCoupon
                  ? appliedCoupon.coupon?.type === "percentage"
                    ? `${appliedCoupon.coupon?.value ?? 0}% (₹${discountAmount.toFixed(2)})`
                    : `₹ -${discountAmount.toFixed(2)}`
                  : cartData?.coupon?.type === "percentage"
                    ? `${cartData?.coupon?.value ?? 0}% (₹${cartData?.coupon?.discount_amount.toFixed(2) ?? 0})`
                    : `₹ -${cartData?.coupon?.discount_amount.toFixed(2) ?? 0}`}
              </span>
            </div>
          )}
          {/* <div className={`${styles.summaryRow}`}>
            <span>Shipping</span>
            <span>₹ {shippingAmount.toFixed(2)}</span>
          </div> */}
          {shippingAmount < 0 && (
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
              <span>
                You save ₹ {productSavings + discountAmount} on this order
              </span>
            )}
          </div>

          {router?.pathname === "/checkout" && (
            <>
              <hr className={`${styles.divider}`} />
              <div>
                <p className="mb-0 fw-semibold fs-14 mb-2">Payment Method</p>
                <div
                  className={
                    selectedPaymentMethod === "partial"
                      ? styles.paymentWrapper
                      : styles.paymentWrapperTransparent
                  }
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="partial-payment"
                      checked={selectedPaymentMethod === "partial"}
                      onChange={() => setSelectedPaymentMethod("partial")}
                    />
                    <label
                      htmlFor="partial-payment"
                      className="w-100"
                      style={{ cursor: "pointer" }}
                    >
                      Partial Payment (30%)
                    </label>
                  </div>
                  {selectedPaymentMethod === "partial" && (
                    <>
                      <span className={`${styles.paymentWrapperText}`}>
                        Balance 70% Cash on Delivery
                      </span>
                    </>
                  )}
                </div>
                <div
                  className={
                    selectedPaymentMethod === "full"
                      ? styles.paymentWrapper
                      : styles.paymentWrapperTransparent
                  }
                >
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="full-payment"
                      checked={selectedPaymentMethod === "full"}
                      onChange={() => setSelectedPaymentMethod("full")}
                    />
                    <label
                      htmlFor="full-payment"
                      className="w-100"
                      style={{ cursor: "pointer" }}
                    >
                      Full Payment (5% OFF)
                    </label>
                  </div>
                  {selectedPaymentMethod === "full" && (
                    <>
                      <span className={`${styles.paymentWrapperText}`}>
                        Full Payment of ₹{" "}
                        {(totalAmount - totalAmount * 0.05).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
                {selectedPaymentMethod === "partial" && (
                  <button
                    type="button"
                    className={styles.checkoutBtn}
                    onClick={() =>
                      handlePlaceOrder(
                        router?.query?.productId ? "buy_now" : "cart",
                        "partial",
                        cartData?.selected_address?.id,
                      )
                    }
                  >
                    <div>
                      <div>
                        <p className="mb-0 fs-6 fw-semibold text-start text-white">
                          Proceed to Payment
                        </p>
                      </div>
                    </div>
                    {/* <span className={styles.arrow}>
                      <MdOutlineKeyboardArrowRight size={30} />
                    </span> */}
                  </button>
                )}
                {selectedPaymentMethod === "full" && (
                  <button
                    type="button"
                    className={`${styles.checkoutBtn} text-white`}
                    onClick={() =>
                      handlePlaceOrder(
                        router?.query?.productId ? "buy_now" : "cart",
                        "full",
                        cartData?.selected_address?.id,
                      )
                    }
                  >
                    <div>
                      <div>
                        <p className="mb-0 fs-6 fw-semibold text-start text-white">
                          Proceed to Payment
                        </p>
                        {/* <p>₹ {cartTotal}</p> */}
                      </div>
                    </div>
                    {/* <span className={styles.arrow}>
                      <MdOutlineKeyboardArrowRight size={30} />
                    </span> */}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {!hideCoupon && (
        <div className={`${styles.couponCard}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className={`${styles.couponTitle} `}>Apply Coupon</h3>
            {appliedCoupon && (
              <button
                onClick={() => handleRemoveCoupon()}
                className={`${styles.removeCouponBtn}`}
              >
                Remove Coupon
              </button>
            )}
          </div>
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
              onClick={() => {
                if (!getIsLoggedIn()) {
                  openLoginPopup();
                  return;
                }
                handleApplyCoupon();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Applying..." : "Apply"}
            </button>
            {/* <button
            className={`${styles.removeCouponBtn}`}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </button> */}
          </div>

          {availableCoupons?.data?.length > 0 ? (
            availableCoupons?.data?.map((coupon) => (
              <div key={coupon?.id} className={`${styles.couponItem}`}>
                <div>
                  <p className="m-0">{coupon?.code}</p>
                  <p
                    className="fs-12 text-muted small"
                    style={{ fontSize: "12px", fontWeight: "400" }}
                  >
                    {coupon?.applicability?.apply_on_text}
                  </p>
                </div>
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
      )}
      {showPopup === "payment" && (
        <CustomPopup onclose={() => setShowPopup("")} closeIcon={false}>
          <div>
            <div className="d-flex justify-content-center mb-3">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">
                  Verifying Your Payment...
                </span>
              </div>
            </div>
            <p className="text-center m-0 fs-4">
              {" "}
              Verifying Your Payment. Please wait...{" "}
            </p>
          </div>
        </CustomPopup>
      )}
    </div>
  );
};

export default CartSummery;

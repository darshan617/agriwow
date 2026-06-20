import React, { useEffect, useState } from "react";
import styles from "@/components/cart-details/product-info/cartDetails.module.css";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { ImBin } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useMergeCartMutation,
} from "@/redux/apis/addToCartApi";
import { useRemoveFromCartMutation } from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { useAuthMutation, useVerifyOtpMutation } from "@/redux/apis/authApi";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import Login from "@/components/auth/login/Login";
import VerifyOtp from "@/components/auth/verify-otp/VerifyOtp";
import emptyCartImg from "@/assets/images/empty-cart.jpg";
import { useRouter } from "next/router";
import {
  usePlaceOrderMutation,
  useRemoveBuyNowMutation,
  useUpdateBuyNowMutation,
  useVerifyPaymentMutation,
} from "@/redux/apis/buyProductApi";
import ProductCard from "@/common-components/product-card/ProductCard";

const CartDetails = ({
  cartItems = [],
  isLoading = false,
  getQuantity,
  getItemKey = (item) => item?.buy_now_id ?? item?.id,
  isBuyNowFlow = false,
  onIncrease,
  onDecrease,
  appliedCoupon = null,
  onRemoveCoupon,
  hideBreadcrumb = false,
  hideCheckoutButton = false,
  handleUpdateCart = () => {},
  onBuyNowRemoved = () => {},
  cartData = {},
  setShowAddressForm = () => {},
}) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPopup, setShowPopup] = useState("");
  const [phone, setPhone] = useState("");
  const [removeFromCart] = useRemoveFromCartMutation();
  const [mergeCart] = useMergeCartMutation();
  const [auth, { isLoading: isAuthLoading }] = useAuthMutation();
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [updateBuyNow, { isLoading: isUpdateBuyNowLoading }] =
    useUpdateBuyNowMutation();

  const [removeBuyNow, { isLoading: isRemoveBuyNowLoading }] =
    useRemoveBuyNowMutation();

  const getIsLoggedIn = () => {
    const cookie = Cookies?.get("userData");
    if (!cookie) return false;
    try {
      const data = JSON.parse(decodeURIComponent(cookie));
      return Object.keys(data).length > 0;
    } catch {
      return false;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn);

  const isCartPage = router?.pathname === "/cart";
  const isCheckoutPage = router?.pathname === "/checkout";
  const hasSelectedAddress = Boolean(cartData?.selected_address?.id);

  const cartTotal = cartItems?.reduce(
    (acc, item) =>
      acc + (item?.product?.selling_price ?? 0) * (item?.quantity ?? 0),
    0,
  );

  const handleLogin = async () => {
    try {
      const res = await auth({
        body: {
          phone: phone,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        setShowPopup("verify-otp");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleVerify = async (otp) => {
    try {
      const res = await verifyOtp({
        body: {
          otp: otp,
          phone: phone,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        if (res?.data?.token) {
          Cookies.set("userData", JSON.stringify(res?.data?.user));
          Cookies.set("userToken", res?.data?.token);

          const sessionId = getCartSessionId();
          if (sessionId) {
            try {
              await mergeCart({
                body: { session_id: sessionId },
              }).unwrap();
            } catch (mergeError) {
              console.error("Cart merge failed", mergeError);
            }
          }

          showToast(res?.data?.message, "success");
          setIsLoggedIn(true);
          setShowPopup("");
          setPhone("");
          if (isCartPage) {
            router.push("/checkout");
          }
        } else {
          console.error("OTP verification failed", res?.error);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleRemoveFromCart = async (cartId) => {
    const res = await removeFromCart({
      body: {
        cart_id: cartId,
      },
    });
    console.log(res, "res");
    if (res?.data?.success || res?.data?.status) {
      showToast(res?.data?.message, "success");
    } else {
      showToast(res?.data?.message, "error");
    }
  };

  const handleUpdateCartForBuyNow = async (id, quantity) => {
    try {
      const res = await updateBuyNow({
        body: {
          buy_now_id: id,
          quantity: quantity,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        // showToast(res?.data?.message, "success");
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message, "error");
    }
  };

  const handleRemoveBuyNow = async (buyNowId) => {
    try {
      const res = await removeBuyNow({
        body: {
          buy_now_id: buyNowId,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        onBuyNowRemoved(buyNowId);
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.data?.message, "error");
    }
  };

  useEffect(() => {
    if (cartItems.length > 0 && !router.query.buy_now_id) {
      const itemKey = getItemKey(cartItems[0]);

      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            buy_now_id: itemKey,
          },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [cartItems, router]);
  return (
    <>
      <div className={styles.productInfo}>
        {/* {appliedCoupon && (
          <div className={styles.coupon}>
            <FaCircleCheck size={30} color="#239c3d" />

            <div className={styles.couponDetails}>
              <span className={styles.couponText}>Coupon applied</span>

              <p>
                You saved ₹{appliedCoupon.discount_amount ?? 0} with coupon "
                {appliedCoupon.coupon?.code ?? ""}"
              </p>
            </div>

            <button
              type="button"
              className={`${styles.couponArrow} d-inline-flex justify-content-end`}
              onClick={onRemoveCoupon}
              aria-label="Remove coupon"
            >
              <RxCross2 size={20} />
            </button>
          </div>
        )} */}

        {cartItems?.length === 0 && (
          <div className={styles.emptySection}>
            <div className={styles.emptyVisual}>
              <Image
                src={emptyCartImg}
                alt=""
                className={styles.emptyImage}
                width={420}
                height={320}
                priority
              />
            </div>

            <div className={styles.emptyContent}>
              <h2 className={styles.emptyTitle}>Your Cart is empty!</h2>
              <p className={styles.emptyText}>Add product and proceed</p>
              <Link
                href="/product-category/agriculture-sprayers"
                className={styles.shopBtn}
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        )}

        {cartItems?.length > 0 && (
          <div className={styles.productCartHeader}>
            <div>PRODUCT</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>
        )}

        {cartItems?.map((item) => {
          const itemKey = getItemKey(item);
          const qty = getQuantity ? getQuantity(item) : item.quantity;

          return (
            <div className={styles.productCartWrapper} key={itemKey}>
              <div className={styles.productCartRow}>
                <div className={styles.productCartInfo}>
                  <Image
                    src={item.product.thumbnail}
                    alt="product-img"
                    className={styles.productImg}
                    width={62}
                    height={62}
                  />

                  <div className={styles.productCartContent}>
                    <h4 className={styles.productCartName}>
                      <Link href={`/product-details/${item?.product?.slug}`}>
                        {item?.product?.name}
                      </Link>{" "}
                    </h4>
                    <span>SKU: {item?.product?.sku}</span>
                    {item?.coupon_applicable && (
                      <p
                        className="fs-12 small"
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#2d8d2f",
                        }}
                      >
                        {item?.coupon_code} (You save ₹ {item?.coupon_discount}{" "}
                        on this product)
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.productCartPrice}>
                  ₹ {item?.product?.selling_price}
                </div>

                <div className={styles.productCartQuantity}>
                  {qty === 1 ? (
                    <button
                      className={styles.productCartDelete}
                      onClick={() =>
                        isBuyNowFlow
                          ? handleRemoveBuyNow(itemKey)
                          : handleRemoveFromCart(item.id)
                      }
                    >
                      <ImBin />
                    </button>
                  ) : (
                    <button
                      className={styles.productCartDelete}
                      onClick={() => {
                        onDecrease(itemKey, qty);
                        if (isBuyNowFlow) {
                          handleUpdateCartForBuyNow(itemKey, qty - 1);
                        } else {
                          handleUpdateCart(
                            item?.id || item?.product?.id,
                            qty - 1,
                          );
                        }
                      }}
                    >
                      -
                    </button>
                  )}

                  <span className={styles.productCartCount}>{qty}</span>

                  <button
                    className={styles.productCartPlus}
                    onClick={() => {
                      onIncrease(itemKey, qty);
                      if (isBuyNowFlow) {
                        handleUpdateCartForBuyNow(itemKey, qty + 1);
                      } else {
                        handleUpdateCart(
                          item?.id || item?.product?.id,
                          qty + 1,
                        );
                      }
                    }}
                  >
                    +
                  </button>
                </div>

                <div className={styles.productCartSubtotal}>
                  <h5>₹ {item?.product?.selling_price * qty}</h5>
                  {item?.product?.discount > 0 && (
                    <span>You save ₹ {item?.product?.discount * qty}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {cartItems?.length > 0 && !hideCheckoutButton && (
          <>
            {isLoggedIn && isCheckoutPage && !hasSelectedAddress ? (
              <div className="w-100 d-flex justify-content-end mt-3">
                <button
                  type="button"
                  className={styles.checkoutBtn + " p-3"}
                  onClick={() => setShowAddressForm(true)}
                >
                  <span>Add Delivery Address To Proceed</span>
                  <span className={styles.arrow}>
                    <MdOutlineKeyboardArrowRight size={20} />
                  </span>
                </button>
              </div>
            ) : !isLoggedIn ? (
              <div className={styles.checkoutSection}>
                <button
                  type="button"
                  className={styles.checkoutBtn}
                  onClick={() => setShowPopup("login")}
                >
                  <div>
                    <div>
                      <span>PROCEED TO CHECKOUT</span>
                      <p>₹ {cartTotal}</p>
                    </div>
                  </div>
                  <span className={styles.arrow}>
                    <MdOutlineKeyboardArrowRight size={30} />
                  </span>
                </button>
              </div>
            ) : isCartPage ? (
              <Link href="/checkout" className={styles.checkoutSection}>
                <button type="button" className={styles.checkoutBtn}>
                  <div>
                    <div>
                      <span>PROCEED TO CHECKOUT</span>
                      <p>₹ {cartTotal}</p>
                    </div>
                  </div>
                  <span className={styles.arrow}>
                    <MdOutlineKeyboardArrowRight size={30} />
                  </span>
                </button>
              </Link>
            ) : (
              ""
              // <div className="d-flex justify-content-end mt-3 gap-3">
              //   <button
              //     type="button"
              //     className={styles.checkoutBtn}
              //     onClick={() =>
              //       handlePlaceOrder(
              //         router?.query?.productId ? "buy_now" : "cart",
              //         "partial",
              //         cartData?.selected_address?.id,
              //       )
              //     }
              //   >
              //     <div>
              //       <div>
              //         <span>Partial Payment (30%)</span>
              //         {/* <p>₹ {(cartTotal * 0.3).toFixed(2)}</p> */}
              //       </div>
              //     </div>
              //     <span className={styles.arrow}>
              //       <MdOutlineKeyboardArrowRight size={30} />
              //     </span>
              //   </button>

              //   <button
              //     type="button"
              //     className={styles.checkoutBtn}
              //     onClick={() =>
              //       handlePlaceOrder(
              //         router?.query?.productId ? "buy_now" : "cart",
              //         "full",
              //         cartData?.selected_address?.id,
              //       )
              //     }
              //   >
              //     <div>
              //       <div>
              //         <span> Full Payment</span>
              //         {/* <p>₹ {cartTotal}</p> */}
              //       </div>
              //     </div>
              //     <span className={styles.arrow}>
              //       <MdOutlineKeyboardArrowRight size={30} />
              //     </span>
              //   </button>
              // </div>
            )}
          </>
        )}
      </div>
      {showPopup === "login" && (
        <CustomPopup onclose={() => setShowPopup("")}>
          <Login
            handleLogin={handleLogin}
            phone={phone}
            setPhone={setPhone}
            isAuthLoading={isAuthLoading}
          />
        </CustomPopup>
      )}
      {showPopup === "verify-otp" && (
        <CustomPopup onclose={() => setShowPopup("")}>
          <VerifyOtp
            handleVerify={handleVerify}
            phone={phone}
            isLoading={isVerifyOtpLoading}
          />
        </CustomPopup>
      )}
      {/* {showPopup === "payment" && (
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
      )} */}
    </>
  );
};

export default CartDetails;

import React from "react";
import styles from "@/components/cart-details/product-info/cartDetails.module.css";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { LuTag } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { ImBin } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  getCartSessionId,
  useGetCartDataQuery,
} from "@/redux/apis/addToCartApi";
import { useRemoveFromCartMutation } from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const CartDetails = ({
  cartItems = [],
  isLoading = false,
  getQuantity,
  onIncrease,
  onDecrease,
}) => {
  const [removeFromCart] = useRemoveFromCartMutation();
  const { showToast } = useToast();

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

  return (
    <>
      <div className={`${styles.breadcrumb}`}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/">Shop</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li className={styles.breadcrumbItem1}>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.productInfo}>
        <div className={styles.coupon}>
          <FaCircleCheck size={30} color="#239c3d" />

          <div className={styles.couponDetails}>
            <span className={styles.couponText}>Coupon applieda</span>
            <p>You saved ₹327.87 with coupon "AGRIWOW10"</p>
          </div>

          <span
            className={`${styles.couponArrow} d-inline-flex justify-content-end`}
          >
            <RxCross2 size={20} />
          </span>
        </div>

        {!isLoading && cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.length > 0 && (
        <div className={styles.productCartHeader}>
          <div>PRODUCT</div>
          <div>Price</div>
          <div>Quantity</div>
            <div>Subtotal</div>
          </div>
        )}

        {cartItems.map((item) => {
          const qty = getQuantity(item);

          return (
            <div className={styles.productCartWrapper} key={item.id}>
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
                    <h4>{item?.product?.name}</h4>
                    <span>SKU: {item?.product?.sku}</span>
                  </div>
                </div>

                <div className={styles.productCartPrice}>
                  ₹ {item?.product?.price}
                </div>

                <div className={styles.productCartQuantity}>
                  {qty === 1 ? (
                    <button
                      className={styles.productCartDelete}
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <ImBin />
                    </button>
                  ) : (
                    <button
                      className={styles.productCartDelete}
                      onClick={() => onDecrease(item.id, qty)}
                    >
                      -
                    </button>
                  )}

                  <span className={styles.productCartCount}>{qty}</span>

                  <button
                    className={styles.productCartPlus}
                    onClick={() => onIncrease(item.id, qty)}
                  >
                    +
                  </button>
                </div>

                <div className={styles.productCartSubtotal}>
                  <h5>₹ {item?.product?.price * qty}</h5>
                  <span>You save ₹ {item?.product?.discount}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className={styles.coupon2}>
          <div className={styles.couponLeft}>
            <LuTag size={18} />

            <span className={styles.couponText2}>
              <strong>AGRIWOW10</strong> coupon applied. You saved ₹ 327.87 on
              this order.
            </span>
          </div>

          <button className={styles.removeCoupon}>Remove Coupon</button>
        </div> */}


        {cartItems.length > 0 && (
          <div className={styles.checkoutSection}>
            <button className={styles.checkoutBtn}>
              <div>
                <span>PROCEED TO CHECKOUT</span>
                <p>₹ {cartItems.reduce((acc, item) => acc + (item?.product?.price ?? 0) * (item?.quantity ?? 0), 0)}</p> 
              </div>

              <span className={styles.arrow}>
                <MdOutlineKeyboardArrowRight size={30} />
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDetails;

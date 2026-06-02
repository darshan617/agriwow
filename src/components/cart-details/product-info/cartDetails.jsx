import React, { useState } from "react";
import styles from "@/components/cart-details/product-info/cartDetails.module.css";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { LuTag } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { ImBin } from "react-icons/im";
import productImage from "@/assets/products/item4.jpg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

const cartDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
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

        <div className={styles.productCartWrapper}>
          <div className={styles.productCartHeader}>
            <div>PRODUCT</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>

          <div className={styles.productCartRow}>
            <div className={styles.productCartInfo}>
              <Image
                src={productImage}
                alt="product-img"
                className={styles.productImg}
              />

              <div className={styles.productCartContent}>
                <h4>
                  Kisankraft Mini 1 Inch Petrol | 1HP | Heavy
                  <br />
                  Duty | Head
                  <br />
                  Variable 7-21m | Spray Nozzle with Hose
                  <br />
                  Connector |...
                </h4>

                <span>SKU: KK-PWP-001</span>
              </div>
            </div>

            <div className={styles.productCartPrice}>₹ 2,160.00</div>

            <div className={styles.productCartQuantity}>
              {quantity === 1 ? (
                <button
                  className={styles.productCartDelete}
                >
                  <ImBin />
                </button>
              ) : (
                <button
                  className={styles.productCartDelete}
                  onClick={handleDecrease}
                >
                  -
                </button>
              )}

              <span className={styles.productCartCount}>
                {quantity}
              </span>

              <button
                className={styles.productCartPlus}
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <div className={styles.productCartSubtotal}>
              <h5>₹ 2,160.00</h5>
              <span>You save ₹ 327.87</span>
            </div>
          </div>
        </div>

        <div className={styles.coupon2}>
          <div className={styles.couponLeft}>
            <LuTag size={18} />

            <span className={styles.couponText2}>
              <strong>AGRIWOW10</strong> coupon applied. You saved ₹ 327.87 on
              this order.
            </span>
          </div>

          <button className={styles.removeCoupon}>
            Remove Coupon
          </button>
        </div>

        <div className={styles.checkoutSection}>
          <button className={styles.checkoutBtn}>
            <div>
              <span>PROCEED TO CHECKOUT</span>
              <p>₹ 1,832.13</p>
            </div>

            <span className={styles.arrow}>
              <MdOutlineKeyboardArrowRight size={30} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default cartDetails;
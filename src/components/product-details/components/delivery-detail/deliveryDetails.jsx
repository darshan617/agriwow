import { useState } from "react";
import styles from "@/components/product-details/components/delivery-detail/deliveryDetails.module.css";
import discountIcon from "@/assets/icon/discount.png";
import secureIcon from "@/assets/icon/padloc.png";
import noEntry from "@/assets/icon/no-entry.png";
import truck from "@/assets/icon/free-shipping.png";
import stock from "@/assets/icon/ready-stock.png";
import cod from "@/assets/icon/cash-on-delivery.png";
import returns from "@/assets/icon/return.png";
import Image from "next/image";
import { useAddToCartMutation } from "@/redux/apis/addToCartApi";
import { markBuyNowAddPending } from "@/redux/apis/buyProductApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getIsLoggedIn } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { FaWhatsapp } from "react-icons/fa";
import { useCheckPincodeMutation } from "@/redux/apis/pincodeApi";

const deliveryIcons = {
  pincode: <Image src={noEntry} alt="no entry" width={20} height={20} />,
  freeDelivery: <Image src={truck} alt="truck" width={20} height={20} />,
  delivery: <Image src={stock} alt="stock" width={20} height={20} />,
  cod: <Image src={cod} alt="cod" width={20} height={20} />,
  returns: <Image src={returns} alt="returns" width={20} height={20} />,
};

const infoItems = (deliveryData) => [
  // {
  //   icon: deliveryIcons.pincode,
  //   title: "Pincode is not eligible for 24 hours delivery",
  //   desc: null,
  //   colorClass: "dd-info-title--red",
  // },
  {
    icon: deliveryIcons.delivery,
    title: `Delivery available at ${deliveryData?.pincode} till ${deliveryData?.estimated_delivery_date_formatted}`,
    desc: null,
    colorClass: "dd-info-title--dark",
  },
  {
    icon: deliveryIcons.freeDelivery,
    title: "Free Delivery",
    desc: "No shipping charge on this order",
    colorClass: "dd-info-title--green",
  },
  {
    icon: deliveryIcons.cod,
    title: deliveryData?.cod_available ? "COD Available" : "COD Not Available",
    desc: deliveryData?.cod_available ? "You can pay at the time of delivery" : "You cannot pay at the time of delivery",
    colorClass: "dd-info-title--dark",
  },
  {
    icon: deliveryIcons.returns,
    title: "2 Days Free Return",
    desc: null,
    colorClass: "dd-info-title--dark",
  },
];

export default function DeliveryDetails({ productDetails }) {
  const router = useRouter();
  const userData = Cookies.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies.get("userData")))
    : null;
  const [pincodeData, setPincodeData] = useState(null);
  console.log(pincodeData, "pincodeData");
  const [inputVal, setInputVal] = useState(null);
  const [qty, setQty] = useState(1);
  const [addToCart] = useAddToCartMutation();
  const { showToast } = useToast();
  const { openLoginPopup } = useLoginPopup();
  const handleAddToCart = async (productId) => {
    try {
      const res = await addToCart({
        body: {
          product_id: productId,
          quantity: qty,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      showToast(error?.data?.message || "Failed to add to cart", "error");
    }
  };

  const unitPrice = Number(productDetails?.data?.price || 0);
  const unitSellingPrice = Number(productDetails?.data?.selling_price || 0);

  const totalPrice = unitPrice * qty;
  const totalSellingPrice = unitSellingPrice * qty;
  const totalSaving = (unitSellingPrice - unitPrice) * qty;
  const gstAmount = (totalSellingPrice * 0.18).toFixed(2);

  const [checkPincode, { isLoading: isCheckPincodeLoading }] =
    useCheckPincodeMutation();
  const handleCheckPincode = async () => {
    try {
      const res = await checkPincode({
        body: {
          pincode: inputVal,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        // console.log(res, "res");
        setPincodeData(res?.data?.data);
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.ddCard}>
      <div className={styles.ddPriceSection}>
        <div className={styles.ddPriceInfo}>
          {productDetails?.data?.discount > 0 && (
            <div className={styles.ddBadge}>
              {productDetails?.data?.discount > 0 && (
                <span>{productDetails?.data?.discount || 0}% OFF</span>
              )}
            </div>
          )}

          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>
              ₹ {totalSellingPrice.toLocaleString()}
              {/* <span className={styles.gsttPriceSmall}>
                {" "}
                +₹{gstAmount.toLocaleString()} GST
              </span> */}
              <span className={styles.oldPrice}>
                {" "}
                ₹ {totalPrice.toLocaleString()}
              </span>
              <div className={`${styles.discountRow}`}>
                {unitPrice > 0 && unitSellingPrice < unitPrice && (
                  <>
                    <span className={`${styles.discountText}`}>
                      {`${Math.round(((unitPrice - unitSellingPrice) / unitPrice) * 100)}% OFF`}
                    </span>
                    {/* <span>
                  Save ₹ {(totalPrice - totalSellingPrice).toLocaleString()}
                </span> */}
                  </>
                )}
              </div>
            </span>

            {/* <span className={styles.mrpText}>
              <div className={`${styles.discountRow}`}>
                {unitPrice > 0 && unitSellingPrice < unitPrice && (
                  <>
                    <span className={`${styles.discountText}`}>
                      {`${Math.round(((unitPrice - unitSellingPrice) / unitPrice) * 100)}% OFF`}
                    </span>
                  </>
                )}
              </div>
            </span> */}
          </div>
          {productDetails?.data?.discount > 0 && (
            <div className={styles.discountRow}>
              <Image src={discountIcon} alt="discount" width={16} height={16} />
              <span>Save ₹ {totalSaving.toLocaleString()}</span>
            </div>
          )}

          {/* <div className={`${styles.discountRow}`}>
            {unitPrice > 0 && unitSellingPrice < unitPrice && (
              <>
                <span className={`${styles.discountText}`}>
                  {`${Math.round(((unitPrice - unitSellingPrice) / unitPrice) * 100)}% OFF`}
                </span>
                <span>
                  Save ₹ {(totalPrice - totalSellingPrice).toLocaleString()}
                </span>
              </>
            )}
          </div> */}
          <div className={styles.ddQtyRow} style={{ marginTop: "20px" }}>
            <span className={styles.ddQtyLabel}>Update Qty</span>

            <div className={styles.ddQtyControl}>
              <button
                type="button"
                className={styles.ddQtyBtn}
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>

              <span className={styles.ddQtyValue}>{qty}</span>

              <button
                type="button"
                className={styles.ddQtyBtn}
                onClick={() => setQty((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.ddStickyActions}>
          <button
            className={styles.ddBtnCart}
            onClick={() => handleAddToCart(productDetails?.data?.id)}
          >
            Add to Cart
          </button>

          <button
            className={styles.ddBtnBuy}
            onClick={() => {
              if (!getIsLoggedIn()) {
                openLoginPopup();
                return;
              }
              markBuyNowAddPending({
                productId: productDetails?.data?.id,
                quantity: qty,
                userId: userData?.id,
              });
              router?.push({
                pathname: `/checkout`,
                query: {
                  productId: productDetails?.data?.id,
                  quantity: qty,
                  userId: userData?.id,
                },
              });
            }}
          >
            Buy Now
          </button>
        </div>

        <button
          className={`${styles.ddBtnWhatsapp} ${styles.ddMobileHidden}`}
          onClick={() => {
            const phoneNumber = "919082681149";
            const productName = productDetails?.data?.name || "Product";
            const text = encodeURIComponent(
              `Hi, I'm interested in ordering: ${productName}`,
            );
            window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
          }}
        >
          <FaWhatsapp className={styles.ddWhatsappIcon} />
          <span className={styles.ddWhatsappText}>Order on WhatsApp</span>
        </button>

        <div
          className={`${styles.ddSecureIcon} ${styles.ddMobileHidden} d-flex gap-2`}
        >
          <Image
            src={secureIcon}
            alt="secure"
            width={12}
            height={12}
            className={styles.ddSecureIconImg}
          />

          <div className={styles.ddSecure}>
            All transactions are secure and encrypted
          </div>
        </div>
      </div>

      <div className={styles.ddDeliveryPanel}>
        <h2>Delivery Details</h2>

        <div className={styles.ddPincodeRow}>
          <div className={styles.ddPincodeInputWrap}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                fill="#38a169"
              />
            </svg>

            <input
              className={styles.ddPincodeInput}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              maxLength={6}
              placeholder="Enter Pincode"
            />
          </div>

          <button
            className={styles.ddUpdateBtn}
            onClick={handleCheckPincode}
            disabled={isCheckPincodeLoading}
          >
            {isCheckPincodeLoading ? "Checking..." : "Check"}
          </button>
        </div>

          
        <div className={styles.ddPincodeHint}>
          {pincodeData ? `Pincode: ${pincodeData?.pincode} is serviceable at your location` : "Check serviceable at your location"}
        </div>

          
          {pincodeData && infoItems( pincodeData).map((item, index) => (
            <div key={index} className={styles.ddInfoItem}>
              <div className={styles.ddInfoIcon}>{item.icon}</div>

              <div>
                <div
                  className={`${styles.ddInfoTitle} ${styles[item.colorClass]}`}
                >
                  {item.title}
                </div>

                {item.desc && (
                  <div className={styles.ddInfoDesc}>{item.desc}</div>
                )}
              </div>
            </div>
            ))}  
        </div>
    </div>
  );
}

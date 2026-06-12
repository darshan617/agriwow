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

const deliveryIcons = {
  pincode: <Image src={noEntry} alt="no entry" width={20} height={20} />,
  freeDelivery: <Image src={truck} alt="truck" width={20} height={20} />,
  delivery: <Image src={stock} alt="stock" width={20} height={20} />,
  cod: <Image src={cod} alt="cod" width={20} height={20} />,
  returns: <Image src={returns} alt="returns" width={20} height={20} />,
};

const infoItems = (pincode) => [
  {
    icon: deliveryIcons.pincode,
    title: "Pincode is not eligible for 24 hours delivery",
    desc: null,
    colorClass: "dd-info-title--red",
  },
  {
    icon: deliveryIcons.freeDelivery,
    title: "Free Delivery",
    desc: "No shipping charge on this order",
    colorClass: "dd-info-title--green",
  },
  {
    icon: deliveryIcons.delivery,
    title: `Delivery available at ${pincode} in 4 day(s)`,
    desc: null,
    colorClass: "dd-info-title--dark",
  },
  {
    icon: deliveryIcons.cod,
    title: "COD Available",
    desc: "You can pay at the time of delivery",
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
  const [pincode, setPincode] = useState("226016");
  const [inputVal, setInputVal] = useState("226016");
  const [qty, setQty] = useState(1);
  const [addToCart] = useAddToCartMutation();
  const { showToast } = useToast();

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

  return (
    <div className={styles.ddCard}>
      <div className={styles.ddPriceSection}>
        {productDetails?.data?.discount > 0 && (
          <div className={styles.ddBadge}>
            {productDetails?.data?.discount > 0 && (
              <span>{productDetails?.data?.discount || 0}% OFF</span>
            )}
          </div>
        )}

        <p className={styles.priceRow}>
          <span className={styles.currentPrice}>
            ₹ {totalSellingPrice.toLocaleString()}
          </span>

          <span className={styles.oldPrice}>
            ₹ {totalPrice.toLocaleString()}
          </span>
        </p>

        <div className={styles.discountRow}>
          {productDetails?.data?.discount > 0 && (
            <Image src={discountIcon} alt="discount" width={16} height={16} />
          )}
          {productDetails?.data?.discount > 0 && (
            <span>Save ₹ {totalSaving.toLocaleString()}</span>
          )}
        </div>

        <div className={styles.ddQtyRow}>
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

        <button
          className={styles.ddBtnCart}
          onClick={() => handleAddToCart(productDetails?.data?.id)}
        >
          Add to Cart
        </button>

        <button
          className={styles.ddBtnBuy}
          onClick={() => {
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

        <button
          className={styles.ddBtnWhatsapp}
          onClick={() => {
            const phoneNumber = "919082681149";
            const productName = productDetails?.data?.name || "Product";
            const text = encodeURIComponent(
              `Hi, I'm interested in ordering: ${productName}`,
            );
            window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
          }}
        >
          <svg width="20" height="20" viewBox="0 0 32 32" fill="#000000">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.703-1.813A12.94 12.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a10.94 10.94 0 0 1-5.438-1.453l-.39-.234-4.57 1.074 1.098-4.453-.258-.406A9.956 9.956 0 0 1 6 15c0-5.523 4.477-10 10-10zm-2.758 5.5c-.2 0-.523.074-.797.375-.273.3-1.047 1.02-1.047 2.488s1.07 2.887 1.22 3.086c.147.2 2.073 3.168 5.073 4.316 2.504.988 3.015.793 3.558.742.543-.05 1.754-.715 2.004-1.406.25-.691.25-1.281.175-1.406-.074-.125-.273-.2-.572-.35-.3-.149-1.754-.867-2.027-.965-.273-.098-.473-.149-.672.15-.2.3-.773.965-.946 1.164-.172.2-.347.222-.645.074-.299-.148-1.261-.465-2.402-1.484-.888-.793-1.488-1.77-1.66-2.07-.172-.3-.018-.461.129-.61.133-.132.299-.347.448-.52.15-.172.2-.298.3-.497.098-.199.05-.373-.025-.523-.075-.148-.668-1.617-.914-2.21-.238-.574-.48-.497-.672-.506l-.573-.012z" />
          </svg>
          Order on WhatsApp
        </button>

        <div className={`${styles.ddSecureIcon} d-flex gap-2`}>
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
            />
          </div>

          <button
            className={styles.ddUpdateBtn}
            onClick={() => setPincode(inputVal)}
          >
            UPDATE
          </button>
        </div>

        <div className={styles.ddPincodeHint}>
          Check serviceable at your location
        </div>

        {infoItems(pincode).map((item, index) => (
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

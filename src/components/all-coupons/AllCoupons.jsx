import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import NoCoupon from "@/assets/icon/No-coupon.png";
import { BiSolidCoupon, BiSolidOffer, BiSolidFile   } from "react-icons/bi";
// import { useGetAvailableCouponsQuery } from "@/redux/apis/addToCartApi";
import { useGetProductDetailsQuery } from "@/redux/apis/productApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import styles from "@/components/all-coupons/AllCoupons.module.css";
import logo from "@/assets/images/logo.png";
const otherOffers = [
  {
    id: 1,
    title: "GST Invoice",
    icon: <BiSolidFile   size={20} />,
    description: <>
    <Image src={logo} alt="GST Invoice" width={100} height={40} className={styles.logo} />
    <ul>
      <li>Create your free Agriwow user account with us.</li>
      <li>Add the products in your cart and proceed to checkout.</li>
      <li>During Checkout, select 'Use GSTIN for Business Purchase' checkbox.</li>
      <li>Add your shipping and billing details in the address section.</li>
      <li>Complete the order and you shall receive business(GST) invoice along with your delivered orders.</li>
      <li>Your billing details will be saved with us for quicker checkout for your next purchase.</li>
      <li>You can edit the billing details any time later for your next purchase.</li>
      <li>Please note that currently GST is mandatory for getting business Invoices.</li>
      <li>Kindly provide correct billing details during checkout.</li>
      <li>Agriwow is not responsible if the customer has entered incorrect billing details resulting in customer not receiving the input tax credit while filing returns.</li>
    </ul>
    </>,
  }
];

const AllCoupons = ({ open, onClose }) => {
  const router = useRouter();
  const slug = router?.query?.slug;
  const { showToast } = useToast();
  const [openOffer, setOpenOffer] = useState(null);

  const { data: productDetails, isFetching } = useGetProductDetailsQuery(
    { slug },
    { skip: !open || !slug }
  );

  const coupons = productDetails?.data?.available_coupons ?? [];

  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.width = prevWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast("Coupon code copied", "success");
    } catch {
      showToast("Failed to copy coupon code", "error");
    }
  };

  const toggleOffer = (id) => {
    setOpenOffer((prev) => (prev === id ? null : id));
  };

  if (!open) return null;

  return createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} role="presentation" />

      <aside
        className={`${styles.drawer} ${styles.open}`}
        aria-label="Coupons drawer"
      >
        <div className={styles.drawerHeader}>
          <h3 className={styles.drawerTitle}>All Coupons & Offers</h3>

          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label="Close coupons"
          >
            <IoClose size={26} />
          </button>
        </div>

        <div className={styles.couponTitle}>
          <BiSolidCoupon size={20} />
          <h4 className={styles.couponTitleText}>Available Coupons</h4>
          <span className={styles.couponTitleText}>({coupons.length})</span>
        </div>

        <div className={styles.drawerBody}>
          {isFetching ? (
            <p className={styles.statusText}>Loading coupons...</p>
          ) : coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div
                key={coupon?.id ?? coupon?.code}
                className={styles.couponCard}
              >
                <div className={styles.couponCodeRow}>
                  <span className={styles.couponCode}>{coupon?.code}</span>
                <div className={styles.couponDescription}>
                  <p>{coupon?.applicability?.label}</p>
                </div>
                </div>

                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={() => handleCopy(coupon?.code)}
                >
                  Copy
                </button>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <Image
                src={NoCoupon}
                alt="No coupons"
                width={130}
                height={130}
              />
              <p>No coupons available right now.</p>
            </div>
          )}

          <div className={styles.offerTitle}>
            <BiSolidOffer size={20} />
            <h4 className={styles.offerTitleText}>
              Other Offers ({otherOffers.length})
            </h4>
          </div>

          {otherOffers.map((offer) => (
            <div key={offer.id} className={styles.offerCard}>
              <button
                type="button"
                className={styles.faqQuestion}
                onClick={() => toggleOffer(offer.id)}
              >
                {offer.icon}
                <span className={styles.faqQuestionText}>
                  {offer.title}
                </span>

                <span className={styles.faqIcon}>
                  {openOffer === offer.id ? "−" : "+"}
                </span>
              </button>

              {openOffer === offer.id && (
                <div className={styles.faqAnswer}>
                  {offer.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>,
    document.body
  );
};

export default AllCoupons;
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import NoCoupon from "@/assets/icon/No-coupon.png";
import { useGetAvailableCouponsQuery } from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import styles from "@/components/all-coupons/AllCoupons.module.css";

const AllCoupons = ({ open, onClose }) => {
  const { showToast } = useToast();
  const { data: couponsResponse, isFetching } = useGetAvailableCouponsQuery(
    undefined,
    { skip: !open },
  );

  const coupons = couponsResponse?.data ?? [];

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

  if (!open) return null;

  return createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} role="presentation" />
      <aside
        className={`${styles.drawer} ${styles.open}`}
        aria-label="Coupons drawer"
      >
        <div className={styles.drawerHeader}>
          <h3 className={styles.drawerTitle}>All Coupons &amp; Offers</h3>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label="Close coupons"
          >
            <IoClose size={26} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          {isFetching ? (
            <p className={styles.statusText}>Loading coupons...</p>
          ) : coupons?.length > 0 ? (
            coupons?.map((coupon) => (
              <div
                key={coupon?.id ?? coupon?.code}
                className={styles.couponCard}
              >
                <div className={styles.couponCodeRow}>
                  <span className={styles.couponCode}>{coupon?.code}</span>
                  
                </div>
                <button
                    type="button"
                    className={styles.copyButton}
                    onClick={() => handleCopy(coupon?.code)}
                    aria-label="Copy coupon code"
                  >
                    <span>Apply</span>
                  </button>


              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <Image src={NoCoupon} alt="No coupons" width={130} height={130} />
              <p>No coupons available right now.</p>
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body,
  );
};

export default AllCoupons;

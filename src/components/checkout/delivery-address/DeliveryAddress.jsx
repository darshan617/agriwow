import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import AddressForm from "@/components/checkout/address-form/AddressForm";
import styles from "@/components/checkout/delivery-address/DeliveryAddress.module.css";

const DEFAULT_ADDRESS = {
  name: "saif shaikh",
  address:
    "Aranya - The Park | Malad West, Mumbai, Mumbai, Maharashtra, INDIA - 400095",
  mobile: "9082681149",
};

const formatAddressLine = (form) => {
  const parts = [
    form.flat,
    form.area,
    form.landmark,
    form.city,
    form.state,
    form.country,
    form.pincode ? `- ${form.pincode}` : "",
  ].filter(Boolean);

  return parts.join(", ");
};

const DeliveryAddress = ({ cartItems }) => {
  const [gstInvoice, setGstInvoice] = useState(false);
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    const raw = Cookies.get("userData");
    if (!raw) return;

    try {
      const userData = JSON.parse(decodeURIComponent(raw));
      setAddress((prev) => ({
        ...prev,
        name: userData?.name || prev.name,
        mobile: userData?.phone || prev.mobile,
      }));
    } catch {    }
  }, []);

  return (
    <section className={styles.checkoutSection}>
      <div className={styles.stepper}>
        <div className={styles.stepperInner}>
          <div className={styles.stepLabels}>
            <span className={styles.stepLabelActive}>
              Address &amp; Product Summary
            </span>
            <span className={styles.stepLabelInactive}>Payment</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} />
            <span className={styles.progressDot} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* <label className={styles.gstCard}>
          <input
            type="checkbox"
            className={styles.gstCheckbox}
            checked={gstInvoice}
            onChange={(e) => setGstInvoice(e.target.checked)}
          />
          <div className={styles.gstContent}>
            <p className={styles.gstTitle}>Get GST Invoice</p>
            <p className={styles.gstSubtext}>
              Claim input tax credit on your purchase.
            </p>
          </div>
        </label> */}

        <p className={styles.sectionLabel}>Delivery Address (1)</p>
        <div className={styles.addressCard}>
          <p className={styles.addressName}>{address.name}</p>
          <p className={styles.addressLine}>{address.address}</p>
          <p className={styles.addressMobile}>Mobile : {address.mobile}</p>

          <div className={styles.addressActions}>
            <button type="button" className={styles.changeBtn} onClick={() => setShowAddressForm(true)}>
              Change Delivery Address
            </button>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => setShowAddressForm(true)}
            >
              + Add New Delivery Address
            </button>
          </div>
        </div>
      </div>

      {showAddressForm && (
        <CustomPopup wide onclose={() => setShowAddressForm(false)}>
          <AddressForm
            onClose={() => setShowAddressForm(false)}
            onSave={(form) => {
              setAddress({
                name: form.name,
                address: formatAddressLine(form),
                mobile: form.phone,
              });
            }}
          />
        </CustomPopup>
      )}
    </section>
  );
};

export default DeliveryAddress;

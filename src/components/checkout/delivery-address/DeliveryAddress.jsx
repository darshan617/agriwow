import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import AddressForm from "@/components/checkout/address-form/AddressForm";
import styles from "@/components/checkout/delivery-address/DeliveryAddress.module.css";
import { useGetAllDeliveryAddressesQuery } from "@/redux/apis/addToCartApi";

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

const formatApiAddressLine = (addr) => {
  const streetPart = [addr.flat, addr.area, addr.landmark]
    .filter(Boolean)
    .join(" | ");
  const locationPart = [addr.city, addr.state, addr.country]
    .filter(Boolean)
    .join(", ");

  let line = [streetPart, locationPart].filter(Boolean).join(", ");
  if (addr.pincode) line += ` - ${addr.pincode}`;
  return line;
};

const DeliveryAddress = ({ cartItems }) => {
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  const {
    data: allAddresses,
    isLoading: isAllAddressesLoading,
    refetch: refetchAllAddresses,
  } = useGetAllDeliveryAddressesQuery();

  const addressCount = allAddresses?.data?.length ?? 0;

  const handleChangeDeliveryAddress = () => {
    if (addressCount > 0) {
      refetchAllAddresses();
      setShowAllAddresses(true);
    }
  };

  const handleDeliverHere = (addr) => {
    setAddress({
      name: addr.name,
      address: formatApiAddressLine(addr),
      mobile: addr.phone,
    });
    setSelectedAddressId(addr.id);
    setShowAllAddresses(false);
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setShowAllAddresses(false);
    setShowAddressForm(true);
  };

  useEffect(() => {
    if (!allAddresses?.data?.length) return;

    const defaultAddr =
      allAddresses.data.find((item) => item.is_default === 1) ||
      allAddresses.data[0];

    setAddress({
      name: defaultAddr.name,
      address: formatApiAddressLine(defaultAddr),
      mobile: defaultAddr.phone,
    });
    setSelectedAddressId(defaultAddr.id);
  }, [allAddresses]);

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
    } catch (error) {
      console.log(error, "error");
    }
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
        <p className={styles.sectionLabel}>
          Delivery Address ({addressCount || 1})
        </p>
        <div className={styles.addressCard}>
          <p className={styles.addressName}>{address.name}</p>
          <p className={styles.addressLine}>{address.address}</p>
          <p className={styles.addressMobile}>Mobile : {address.mobile}</p>

          <div className={styles.addressActions}>
            <button
              type="button"
              className={styles.changeBtn}
              onClick={() => handleChangeDeliveryAddress()}
            >
              Change Delivery Address
            </button>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                setEditingAddress(null);
                setShowAddressForm(true);
              }}
            >
              + Add New Delivery Address
            </button>
          </div>
        </div>
      </div>

      {showAddressForm && (
        <CustomPopup
          wide
          onclose={() => {
            setShowAddressForm(false);
            setEditingAddress(null);
          }}
        >
          <AddressForm
            initialValues={editingAddress}
            title={
              editingAddress ? "Edit Delivery Address" : "Add Delivery Address"
            }
            onClose={() => {
              setShowAddressForm(false);
              setEditingAddress(null);
            }}
            onSave={(form) => {
              setAddress({
                name: form.name,
                address: formatAddressLine(form),
                mobile: form.phone,
              });
              refetchAllAddresses();
            }}
            isEditing={true}
            addressId={editingAddress?.id}
          />
        </CustomPopup>
      )}
      {showAllAddresses && (
        <CustomPopup wide onclose={() => setShowAllAddresses(false)}>
          <div className={styles.addressesPopup}>
            <h2 className={styles.addressesPopupTitle}>
              Select Delivery Address
            </h2>

            {isAllAddressesLoading ? (
              <p className={styles.addressesLoading}>Loading addresses...</p>
            ) : (
              <div className={styles.addressList}>
                {allAddresses?.data?.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;

                  return (
                    <div
                      key={addr.id}
                      className={`${styles.selectAddressCard} ${
                        isSelected ? styles.selectAddressCardActive : ""
                      }`}
                      onClick={() => setSelectedAddressId(addr.id)}
                    >
                      <label
                        className={styles.selectAddressHeader}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="radio"
                          name="deliveryAddress"
                          className={styles.selectAddressRadio}
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(addr.id)}
                        />
                        <span className={styles.selectAddressName}>
                          {addr.name}
                        </span>
                      </label>

                      <p className={styles.selectAddressLine}>
                        {formatApiAddressLine(addr)}
                      </p>
                      <p className={styles.selectAddressMobile}>
                        Mobile : {addr.phone}
                      </p>

                      {isSelected && (
                        <div
                          className={styles.selectAddressActions}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className={styles.deliverHereBtn}
                            onClick={() => handleDeliverHere(addr)}
                          >
                            DELIVER HERE
                          </button>
                          <button
                            type="button"
                            className={styles.editAddressBtn}
                            onClick={() => handleEditAddress(addr)}
                          >
                            EDIT
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CustomPopup>
      )}
    </section>
  );
};

export default DeliveryAddress;

import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { MdMyLocation } from "react-icons/md";
import styles from "./AddressForm.module.css";
import {
  useAddDeliveryAddressMutation,
  useUpdateDeliveryAddressMutation,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  alternate_phone: "",
  flat: "",
  area: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  country: "INDIA",
};

const AddressForm = ({
  onClose,
  onSave,
  initialValues = null,
  title,
  isEditing = false,
  addressId = null,
}) => {
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const [addDeliveryAddress, { isLoading: isAddDeliveryAddressLoading }] =
    useAddDeliveryAddressMutation();
  const [updateDeliveryAddress, { isLoading: isUpdateDeliveryAddressLoading }] =
    useUpdateDeliveryAddressMutation();

  const handleAddDeliveryAddress = async () => {
    try {
      const res = await addDeliveryAddress({ body: form });
      if (res?.data?.success || res?.data?.status) {
        showToast(res.data.message, "success");
      }
      console.log(res, "res");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleUpdateDeliveryAddress = async () => {
    try {
      const res = await updateDeliveryAddress({
        body: { ...form, id: addressId },
      });
      if (res?.data?.success || res?.data?.status) {
        showToast(res.data.message, "success");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        alternate_phone: initialValues.alternate_phone || "",
        flat: initialValues.flat || "",
        area: initialValues.area || "",
        landmark: initialValues.landmark || "",
        pincode: initialValues.pincode || "",
        city: initialValues.city || "",
        state: initialValues.state || "",
        country: initialValues.country || "INDIA",
      });
      if (initialValues.phone) setIsPhoneVerified(true);
      return;
    }

    const raw = Cookies.get("userData");
    if (!raw) return;

    try {
      const userData = JSON.parse(decodeURIComponent(raw));
      setForm((prev) => ({
        ...prev,
        name: userData?.name || prev.name,
        email: userData?.email || prev.email,
        phone: userData?.phone || prev.phone,
      }));
      if (userData?.phone) setIsPhoneVerified(true);
    } catch {
      console.log("error");
    }
  }, [initialValues]);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.flat.trim() &&
      form.pincode.trim() &&
      form.city.trim() &&
      form.state.trim() &&
      form.country.trim()
    );
  }, [form]);

  // const handleUseLocation = () => {
  //   if (!navigator.geolocation) return;

  //   setIsLocating(true);
  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       try {
  //         const { latitude, longitude } = position.coords;
  //         const res = await fetch(
  //           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
  //         );
  //         const data = await res.json();
  //         const addr = data?.address || {};

  //         setForm((prev) => ({
  //           ...prev,
  //           area:
  //             [addr.road, addr.suburb, addr.neighbourhood]
  //               .filter(Boolean)
  //               .join(", ") || prev.area,
  //           city:
  //             addr.city ||
  //             addr.town ||
  //             addr.village ||
  //             addr.county ||
  //             prev.city,
  //           state: addr.state || prev.state,
  //           pincode: addr.postcode || prev.pincode,
  //           country: (addr.country || prev.country).toUpperCase(),
  //         }));
  //       } catch {
  //         /* location reverse-geocode failed */
  //       } finally {
  //         setIsLocating(false);
  //       }
  //     },
  //     () => setIsLocating(false),
  //   );
  // };
  const handleUseLocation = () => {
    console.log("use location");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSave?.(form);
    onClose?.();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{title || "Add Delivery Address"}</h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <input
            id="address-name"
            className={styles.input}
            value={form.name}
            onChange={updateField("name")}
            required
          />
          <label htmlFor="address-name" className={styles.label}>
            Name*
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-email"
            type="email"
            className={styles.input}
            value={form.email}
            onChange={updateField("email")}
            required
          />
          <label htmlFor="address-email" className={styles.label}>
            Email Id*
          </label>
        </div>

        <div className={`${styles.field} ${styles.phoneField}`}>
          <input
            id="address-phone"
            type="tel"
            className={styles.input}
            value={form.phone}
            onChange={updateField("phone")}
            maxLength={10}
            required
          />
          <label htmlFor="address-phone" className={styles.label}>
            Phone Number*
          </label>
          {isPhoneVerified && (
            <span className={styles.verifiedBadge}>VERIFIED</span>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="address-alt-phone"
            type="tel"
            className={styles.input}
            placeholder="Enter Alternate Phone Number"
            value={form.alternate_phone}
            onChange={updateField("alternate_phone")}
            maxLength={10}
          />
        </div>

        <button
          type="button"
          className={styles.locationBtn}
          onClick={handleUseLocation}
          disabled={isLocating}
        >
          <MdMyLocation size={18} />
          {isLocating ? "LOCATING..." : "USE MY LOCATION"}
        </button>

        <div className={styles.field}>
          <input
            id="address-flat"
            className={styles.input}
            placeholder="Flat, House No., Building, Company*"
            value={form.flat}
            onChange={updateField("flat")}
            required
          />
        </div>

        <div className={styles.field}>
          <input
            id="address-area"
            className={styles.input}
            placeholder="Area, Street, Sector, Village"
            value={form.area}
            onChange={updateField("area")}
          />
        </div>

        <div className={styles.field}>
          <input
            id="address-landmark"
            className={styles.input}
            placeholder="Landmark"
            value={form.landmark}
            onChange={updateField("landmark")}
          />
        </div>

        <div className={styles.field}>
          <input
            id="address-pincode"
            className={styles.input}
            placeholder="Pincode*"
            value={form.pincode}
            onChange={updateField("pincode")}
            maxLength={6}
            required
          />
        </div>

        <div className={styles.field}>
          <input
            id="address-city"
            className={styles.input}
            placeholder="City/District/Town*"
            value={form.city}
            onChange={updateField("city")}
            required
          />
        </div>

        <div className={styles.field}>
          <input
            id="address-state"
            className={styles.input}
            placeholder="State*"
            value={form.state}
            onChange={updateField("state")}
            required
          />
        </div>

        <div className={styles.field}>
          <input
            id="address-country"
            className={styles.input}
            value={form.country}
            onChange={updateField("country")}
            required
          />
          <label htmlFor="address-country" className={styles.label}>
            Country*
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onClose}>
          CANCEL
        </button>
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={!isFormValid}
          onClick={
            isEditing ? handleUpdateDeliveryAddress : handleAddDeliveryAddress
          }
        >
          {isAddDeliveryAddressLoading || isUpdateDeliveryAddressLoading
            ? isEditing
              ? "UPDATING..."
              : "ADDING..."
            : isEditing
              ? "UPDATE"
              : "SAVE ADDRESS"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;

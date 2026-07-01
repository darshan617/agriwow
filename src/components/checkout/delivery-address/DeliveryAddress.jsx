import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import AddressForm from "@/components/checkout/address-form/AddressForm";
import styles from "@/components/checkout/delivery-address/DeliveryAddress.module.css";
import {
  useDeleteDeliveryAddressMutation,
  useGetAllDeliveryAddressesQuery,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUpdateBuyNowMutation } from "@/redux/apis/buyProductApi";

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
    .join(", ");
  const locationPart = [addr.city, addr.state, addr.country]
    .filter(Boolean)
    .join(", ");

  let line = [streetPart, locationPart].filter(Boolean).join(", ");
  if (addr.pincode) line += ` - ${addr.pincode}`;
  return line;
};

const getBuyNowId = (router, cartData) => {
  if (router.query.buy_now_id) return router.query.buy_now_id;
  const raw = cartData?.data;
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
  return items[0]?.buy_now_id;
};

const DeliveryAddress = ({
  handleUpdateCart,
  cartData,
  setShowAddressForm,
  showAddressForm,
  refetchCartData,
  isBuyNowFlow = false,
  type = "cart",
}) => {
  const [address, setAddress] = useState({});
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const { showToast } = useToast();
  const router = useRouter();
  const {
    data: allAddresses,
    isLoading: isAllAddressesLoading,
    refetch: refetchAllAddresses,
  } = useGetAllDeliveryAddressesQuery();

  const [deleteDeliveryAddress, { isLoading: isDeleteDeliveryAddressLoading }] =
    useDeleteDeliveryAddressMutation();
  const [updateBuyNow, { isLoading: isUpdateBuyNowLoading }] =
    useUpdateBuyNowMutation();

  const addressCount = allAddresses?.data?.length ?? 0;

  const handleChangeDeliveryAddress = () => {
    if (addressCount > 0) {
      refetchAllAddresses();
      setShowAllAddresses(true);
    }
  };

  const handleDeliverHere = async (addr, flowType) => {
    if (flowType === "buy_now") {
      await updateBuyNow({
        body: {
          buy_now_id: getBuyNowId(router, cartData),
          address_id: addr.id,
        },
      });
    } else {
      handleUpdateCart(null, null, addr.id);
    }

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

  const handleDeleteAddress = async (addr) => {
    try {
      const res = await deleteDeliveryAddress({ body: { id: addr?.id } });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        refetchAllAddresses();
        refetchCartData?.();
      } else {
        showToast(res?.data?.message, "error");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (!allAddresses?.data?.length) {
      setAddress({});
      setSelectedAddressId(null);
      return;
    }
    const defaultAddr =
      allAddresses.data.find(
        (item) => item?.id === cartData?.selected_address?.id,
      ) || allAddresses.data[0];

    setAddress({
      name: defaultAddr.name,
      address: formatApiAddressLine(defaultAddr),
      mobile: defaultAddr.phone,
    });
    setSelectedAddressId(defaultAddr.id);
  }, [allAddresses, cartData]);

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
      {type === "cart" && (
        <div className={styles.content}>
          <p className={styles.sectionLabel}>
            Delivery Address ({addressCount || 0})
          </p>
          <div className={styles.addressCard}>
            {address?.address ? (
              <>
                <p className={styles.addressName}>{address?.name}</p>
                <p className={styles.addressLine}>{address?.address}</p>
                <p className={styles.addressMobile}>
                  Mobile : {address?.mobile}
                </p>
              </>
            ) : (
              <p className="m-0 small">
                No Address Found. Please add a new address.
              </p>
            )}

            <div className={styles.addressActions}>
              <button
                type="button"
                className={styles.changeBtn}
                onClick={() => handleChangeDeliveryAddress()}
                disabled={!address?.address}
                style={{
                  opacity: !address?.address ? 0.5 : 1,
                  cursor: !address?.address ? "not-allowed" : "pointer",
                }}
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
      )}
      {type === "my-profile" && (
        <div className={styles.content}>
          <div className="d-flex justify-content-between align-items-center">
            <p className={styles.sectionLabel}>
              Delivery Address ({addressCount || 0})
            </p>
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
          <div className={styles.addressList}>
            {addressCount > 0 ? (
              allAddresses.data.map((addr) => {
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
                          className={styles.editAddressBtn}
                          onClick={() => handleEditAddress(addr)}
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          className={styles.deleteAddressBtn}
                          onClick={() => handleDeleteAddress(addr)}
                          disabled={isDeleteDeliveryAddressLoading}
                          style={{
                            opacity: isDeleteDeliveryAddressLoading ? 0.5 : 1,
                            cursor: isDeleteDeliveryAddressLoading
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="m-0 small">
                No Address Found. Please add a new address.
              </p>
            )}
          </div>
        </div>
      )}

      {showAddressForm && (
        <CustomPopup
          wide
          onclose={() => {
            setShowAddressForm(false);
            setEditingAddress(null);
          }}
          maxWidth="700px"
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
            onSave={async (savedAddress) => {
              if (savedAddress?.id) {
                if (isBuyNowFlow) {
                  await updateBuyNow({
                    body: {
                      buy_now_id: getBuyNowId(router, cartData),
                      address_id: savedAddress.id,
                    },
                  });
                } else {
                  handleUpdateCart(null, null, savedAddress.id);
                }
                setSelectedAddressId(savedAddress.id);
              }
              setAddress({
                name: savedAddress.name,
                address: savedAddress.flat
                  ? formatApiAddressLine(savedAddress)
                  : formatAddressLine(savedAddress),
                mobile: savedAddress.phone,
              });
              refetchAllAddresses();
            }}
            isEditing={!!editingAddress}
            addressId={editingAddress?.id}
            refetchCartData={refetchCartData}
          />
        </CustomPopup>
      )}
      {showAllAddresses && (
        <CustomPopup
          wide
          onclose={() => setShowAllAddresses(false)}
          maxWidth="700px"
        >
          <div className={styles.addressesPopup}>
            <h2 className={styles.addressesPopupTitle}>
              Select Delivery Address
            </h2>

            {isAllAddressesLoading ? (
              <p className={styles.addressesLoading}>Loading addresses...</p>
            ) : (
              <div className={styles.addressList}>
                {allAddresses?.data?.length > 0 ? (
                  allAddresses?.data?.map((addr) => {
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
                              onClick={() =>
                                handleDeliverHere(
                                  addr,
                                  router.query.productId ? "buy_now" : "cart",
                                )
                              }
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
                            <button
                              type="button"
                              className={styles.deleteAddressBtn}
                              onClick={() => handleDeleteAddress(addr)}
                              disabled={isDeleteDeliveryAddressLoading}
                              style={{
                                opacity: isDeleteDeliveryAddressLoading
                                  ? 0.5
                                  : 1,
                                cursor: isDeleteDeliveryAddressLoading
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <p className="m-0 small">
                      No Address Found. Please add a new address.
                    </p>
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
                  </>
                )}
              </div>
            )}
          </div>
        </CustomPopup>
      )}
    </section>
  );
};

export default DeliveryAddress;

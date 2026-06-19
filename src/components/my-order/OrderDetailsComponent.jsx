import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomerInfo from "../wish-list/customer-info/CustomerInfo";
import historyStyles from "@/components/my-order/OrderHistory.module.css";
import styles from "@/components/my-order/OrderDetails.module.css";
import { useViewOrderDetailsQuery } from "@/redux/apis/orderHistory";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

const formatPrice = (price) => {
  const num = Number(price);
  if (Number.isNaN(num)) return price;
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatStatus = (status) => {
  if (!status) return "—";
  return String(status)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getPaymentStatusClass = (status) => {
  const key = String(status ?? "").toLowerCase();
  const map = {
    paid: historyStyles.paymentPaid,
    partial: historyStyles.paymentPartial,
    pending: historyStyles.paymentPending,
    failed: historyStyles.paymentFailed,
    refunded: historyStyles.paymentRefunded,
  };
  return `${historyStyles.statusBadge} ${map[key] ?? historyStyles.paymentDefault}`;
};

const formatAddress = (address) => {
  if (!address) return "—";
  const parts = [
    address.address,
    address.city,
    address.state,
    address.country,
    address.pincode,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
};

const OrderDetailsComponent = ({ orderId }) => {
  const {
    data: orderDetails,
    isLoading,
    isFetching,
    isError,
  } = useViewOrderDetailsQuery({ orderId }, { skip: !orderId });

  const order = orderDetails?.data;
  const products = useMemo(
    () => (Array.isArray(order?.products) ? order.products : []),
    [order?.products],
  );
  const address = order?.delivery_address;
  const isLoadingState = (isLoading || isFetching) && !order;
  const showNotFound = !isLoadingState && (isError || !order);

  return (
    <div className="container">
      <div className="row">
        <CustomerInfo />
        <div className="col-xl-9 col-md-12">
          <section className={historyStyles.orderPanel}>
            <div className={historyStyles.pageHeader}>
              <h1 className={historyStyles.pageTitle}>Order Details</h1>
            </div>

            <div className={styles.detailsSection}>
              <Link href="/my-order" className={styles.backLink}>
                <IoArrowBack size={16} />
                Back to My Orders
              </Link>

              {isLoadingState && (
                <div className={styles.loadingState}>
                  <p className={styles.loadingText}>Loading order details...</p>
                </div>
              )}

              {showNotFound && (
                <div className={styles.emptyState}>
                  <h2 className={styles.emptyTitle}>Order not found</h2>
                  <p className={styles.emptyText}>
                    We couldn&apos;t find details for this order. It may have
                    been removed or the link is incorrect.
                  </p>
                  <Link href="/my-order" className={styles.shopBtn}>
                    VIEW MY ORDERS
                  </Link>
                </div>
              )}

              {order && (
                <>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderHeaderMeta}>
                      <p className={styles.orderId}>Order #{order.order_id}</p>
                      <p className={styles.orderSubtext}>
                        Customer: {order.user_name || "—"}
                      </p>
                    </div>
                    <div className={styles.headerActions}>
                      <span
                        className={getPaymentStatusClass(order.payment_status)}
                      >
                        Payment: {formatStatus(order.payment_status)}
                      </span>
                      {order.invoice_url ? (
                        <Link
                          href={order.invoice_url}
                          target="_blank"
                          className={styles.invoiceBtn}
                          download
                        >
                          Download Invoice
                          <MdOutlineFileDownload size={18} />
                        </Link>
                      ) : (
                        <p className={styles.invoicePending}>
                          Invoice will be available once generated
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                      <h2 className={styles.infoCardTitle}>Delivery Address</h2>
                      <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>Name</span>
                        <span className={styles.infoValue}>
                          {address?.name || order.user_name || "—"}
                        </span>
                      </p>
                      <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>Phone</span>
                        <span className={styles.infoValue}>
                          {address?.phone || order.contact_number || "—"}
                        </span>
                      </p>
                      <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>Address</span>
                        <span className={styles.infoValue}>
                          {formatAddress(address)}
                        </span>
                      </p>
                    </div>

                    <div className={styles.infoCard}>
                      <h2 className={styles.infoCardTitle}>
                        Order Information
                      </h2>
                      <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>Contact</span>
                        <span className={styles.infoValue}>
                          {order.contact_number || "—"}
                        </span>
                      </p>
                      <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>Payment</span>
                        <span className={styles.infoValue}>
                          {formatStatus(order.payment_method)}
                        </span>
                      </p>
                      <p className={styles.infoRow}>
                        <span className={styles.infoLabel}>Delivery</span>
                        <span className={styles.infoValue}>
                          {order.delivery_date || "Not scheduled yet"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className={styles.productsSection}>
                    <h2 className={styles.productsSectionTitle}>
                      Products ({products.length})
                    </h2>

                    {products.length > 0 ? (
                      <div className={styles.productsTable}>
                        <div className={styles.productsTableHead}>
                          <span>Product</span>
                          <span>Price</span>
                          <span>Qty</span>
                          <span>Total</span>
                        </div>

                        {products.map((product, index) => (
                          <div
                            key={`${product?.slug}-${index}`}
                            className={styles.productRow}
                          >
                            <div className={styles.productInfo}>
                              {product?.product_image ? (
                                <Image
                                  src={product.product_image}
                                  alt={product.product_name || "Product"}
                                  width={62}
                                  height={62}
                                  className={styles.productImage}
                                />
                              ) : (
                                <div
                                  className={`${styles.productImage} ${styles.productImagePlaceholder}`}
                                >
                                  No Image
                                </div>
                              )}
                              <h3 className={styles.productName}>
                                {product?.slug ? (
                                  <Link
                                    href={`/product-details/${product.slug}`}
                                  >
                                    {product.product_name}
                                  </Link>
                                ) : (
                                  product?.product_name || "—"
                                )}
                              </h3>
                            </div>

                            <div>
                              <span className={styles.mobileLabel}>Price</span>
                              <span className={styles.cellText}>
                                ₹ {formatPrice(product?.price)}
                              </span>
                            </div>

                            <div>
                              <span className={styles.mobileLabel}>Qty</span>
                              <span className={styles.cellText}>
                                {product?.quantity ?? "—"}
                              </span>
                            </div>

                            <div>
                              <span className={styles.mobileLabel}>Total</span>
                              <span className={styles.cellTotal}>
                                ₹ {formatPrice(product?.total)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.emptyState}>
                        <p className={styles.emptyText}>
                          No products found for this order.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={styles.summaryCard}>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>
                        Payment Method
                      </span>
                      <span className={styles.summaryValue}>
                        {formatStatus(order.payment_method)}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>
                        Payment Status
                      </span>
                      <span className={styles.summaryValue}>
                        {formatStatus(order.payment_status)}
                      </span>
                    </div>
                    <div
                      className={`${styles.summaryRow} ${styles.grandTotalRow}`}
                    >
                      <span className={styles.grandTotalLabel}>
                        Grand Total
                      </span>
                      <span className={styles.grandTotalValue}>
                        ₹ {formatPrice(order.grand_total)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;

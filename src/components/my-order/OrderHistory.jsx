import React, { useMemo } from "react";
import Link from "next/link";
import CustomerInfo from "../wish-list/customer-info/CustomerInfo";
import { useGetOrderHistoryQuery } from "@/redux/apis/orderHistory";
import styles from "@/components/my-order/OrderHistory.module.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { useRouter } from "next/router";
import { FaEye } from "react-icons/fa";

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

const getOrderStatusClass = (status) => {
  const key = String(status ?? "").toLowerCase();
  const map = {
    processing: styles.statusProcessing,
    pending: styles.statusPending,
    shipped: styles.statusShipped,
    delivered: styles.statusDelivered,
    completed: styles.statusDelivered,
    cancelled: styles.statusCancelled,
    canceled: styles.statusCancelled,
  };
  return `${styles.statusBadge} ${map[key] ?? styles.statusDefault}`;
};

const getPaymentStatusClass = (status) => {
  const key = String(status ?? "").toLowerCase();
  const map = {
    paid: styles.paymentPaid,
    partial: styles.paymentPartial,
    pending: styles.paymentPending,
    failed: styles.paymentFailed,
    refunded: styles.paymentRefunded,
  };
  return `${styles.statusBadge} ${map[key] ?? styles.paymentDefault}`;
};

const OrderHistory = () => {
  const router = useRouter();
  const {
    data: orderHistory,
    isLoading,
    isFetching,
  } = useGetOrderHistoryQuery();

  const orders = useMemo(
    () => (Array.isArray(orderHistory?.data) ? orderHistory?.data : []),
    [orderHistory],
  );

  const orderCount = orders?.length;
  const orderLabel = orderCount === 1 ? "Order" : "Orders";
  const showEmpty = !isLoading && !isFetching && orderCount === 0;

  return (
    <div className="container">
      <div className="row">
        <CustomerInfo />
        <div className="col-xl-9 col-md-12">
          <section className={styles.orderPanel}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>
                My Orders ({orderCount} {orderLabel})
              </h1>
            </div>

            {(isLoading || isFetching) && orderCount === 0 && (
              <div className={styles.loadingState}>
                <p className={styles.loadingText}>Loading your orders...</p>
              </div>
            )}

            {showEmpty && (
              <div className={styles.emptyState}>
                <h2 className={styles.emptyTitle}>No orders yet</h2>
                <p className={styles.emptyText}>
                  You haven&apos;t placed any orders. Browse our products and
                  find something you love.
                </p>
                <Link href="/" className={styles.shopBtn}>
                  START SHOPPING
                </Link>
              </div>
            )}

            {orderCount > 0 && (
              <div className={styles.ordersSection}>
                {orders.map((order) => (
                  <article key={order?.order_id} className={styles.orderCard}>
                    <div className={styles.orderCardHeader}>
                      <div className={styles.orderMeta}>
                        <p className={styles.orderId}>
                          Order #{order?.order_id}
                        </p>
                        <p className={styles.orderDate}>
                          Placed on <span>{order?.order_date}</span>
                        </p>
                      </div>
                      <div className={styles.statusGroup}>
                        <span
                          className={getOrderStatusClass(order?.order_status)}
                        >
                          Order Status: {formatStatus(order?.order_status)}
                        </span>
                        <span
                          className={getPaymentStatusClass(
                            order?.payment_status,
                          )}
                        >
                          Payment Status: {formatStatus(order?.payment_status)}
                        </span>
                        {/* <div className={styles.summaryRow}>
                          <Link
                            href={order?.invoice_url}
                            target="_blank"
                            className={styles.invoiceDownload}
                            download
                          >
                            <MdOutlineFileDownload size={20} />
                          </Link>
                        </div> */}
                      </div>
                    </div>

                    <div className={styles.orderCardBody}>
                      <div className={styles.orderSummary}>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>
                            Grand Total
                          </span>
                          <span className={styles.orderTotal}>
                            ₹ {formatPrice(order?.grand_total)}
                          </span>
                        </div>
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            onClick={() =>
                              router.push(`/my-order/${order?.order_id}`)
                            }
                            className={styles.invoiceDownload}
                          >
                            View Order
                            <FaEye size={18} className="ms-2" />
                          </button>
                          {order?.invoice_url ? (
                            <div className={styles.summaryRow}>
                              <Link
                                href={order?.invoice_url}
                                target="_blank"
                                className={styles.invoiceDownload}
                                download
                              >
                                Download Invoice
                                <MdOutlineFileDownload size={20} />
                              </Link>
                            </div>
                          ) : (
                            <p className={styles.invoicePending}>
                              Invoice will be available once generated
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

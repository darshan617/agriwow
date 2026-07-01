import React, { useMemo, useState } from "react";
import CustomerInfo from "../wish-list/customer-info/CustomerInfo";
import styles from "./TrackOrder.module.css";
import historyStyles from "@/components/my-order/OrderHistory.module.css";
import { FaShippingFast } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { useGetTrackOrderQuery } from "@/redux/apis/trackOrderApi";
import { IoArrowBack } from "react-icons/io5";

const DELHIVERY_TRACK_URL = "https://www.delhivery.com/track/package";

const DELIVERY_STATUS_BADGE = {
  manifested: styles.badgeManifested,
  processing: styles.badgeProcessing,
  shipped: styles.badgeShipped,
  delivered: styles.badgeDelivered,
  "in transit": styles.badgeShipped,
  dispatched: styles.badgeShipped,
  "out for delivery": styles.badgeShipped,
};

const ORDER_STATUS_BADGE = {
  processing: styles.badgeProcessing,
  shipped: styles.badgeShipped,
  delivered: styles.badgeDelivered,
};

const formatStatusLabel = (status) => {
  if (!status) return "—";
  return String(status)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getBadgeClass = (status, map) => {
  const key = String(status ?? "").toLowerCase();
  return `${styles.statusBadge} ${map[key] ?? styles.badgeDefault}`;
};

const formatEstimatedDelivery = (dateStr) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatLastSynced = (dateStr) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatTimelineTimestamp = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart}, ${timePart}`;
};

const mapTrackOrderResponse = (response) => {
  if (!response || response.status !== true || !response.order) return null;

  const { order, tracking } = response;
  const awb = tracking?.awb ?? order?.tracking_id;
  const scans = Array.isArray(tracking?.scans) ? [...tracking.scans].reverse() : [];

  return {
    courier: "Delhivery",
    orderStatus: order.order_status,
    deliveryStatus: tracking?.status,
    awb,
    trackingUrl: awb ? `${DELHIVERY_TRACK_URL}/${awb}` : null,
    estimatedDelivery: formatEstimatedDelivery(
      tracking?.expected_delivery_date ?? tracking?.promised_delivery_date,
    ),
    lastSynced: formatLastSynced(tracking?.status_date_time),
    timeline: scans.map((scan, index) => ({
      id: `${scan.status_date_time}-${index}`,
      title: scan.status,
      location: scan.location,
      detail: scan.instructions,
      timestamp: formatTimelineTimestamp(scan.status_date_time),
    })),
  };
};

const TrackOrder = ({ orderId }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useGetTrackOrderQuery({ orderId }, { skip: !orderId });

  const order = useMemo(() => mapTrackOrderResponse(data), [data]);
  const isLoadingState = (isLoading || isFetching) && !order;
  const showNotFound =
    !isLoadingState && (!orderId || isError || data?.status === false || !order);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <div className="container">
      <div className="row">
        <CustomerInfo />
        <div className="col-xl-9 col-md-12">
          {isLoadingState && (
            <div className={historyStyles.loadingState}>
              <p className={historyStyles.loadingText}>Loading tracking details...</p>
            </div>
          )}

          {showNotFound && (
            <div className={historyStyles.emptyState}>
              <h2 className={historyStyles.emptyTitle}>Order not found</h2>
              <p className={historyStyles.emptyText}>
                {data?.message ??
                  "We couldn't find tracking for this order. It may not be shipped yet or the link is incorrect."}
              </p>
              <Link href="/my-order" className={historyStyles.shopBtn} prefetch={true}>
                VIEW MY ORDERS
              </Link>
            </div>
          )}

          {order && (
          <section className={styles.panel}>
            <header className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>
                <FaShippingFast
                  className={styles.cardTitleIcon}
                  size={20}
                  aria-hidden
                />
                Delhivery Tracking
              </h1>
              <button
                type="button"
                className={styles.refreshBtn}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <HiOutlineRefresh
                  size={18}
                  className={isRefreshing ? styles.refreshIconSpin : undefined}
                  aria-hidden
                />
                Refresh from Delhivery
              </button>
            </header>

            <Link href="/my-order" className={styles.backLink} prefetch={true}>
                    <IoArrowBack size={16} />
                    Back to My Orders
                </Link>

            <div className={styles.summaryGrid}>
                
              <div>
                <span className={styles.fieldLabel}>Courier</span>
                <p className={styles.fieldValue}>{order?.courier}</p>
              </div>

              <div>
                <span className={styles.fieldLabel}>AWB / Tracking ID</span>
                {order?.trackingUrl ? (
                  <Link
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trackingLink}
                    prefetch={true}
                  >
                    {order.awb}
                    <FiExternalLink size={14} aria-hidden />
                  </Link>
                ) : (
                  <p className={styles.fieldValue}>{order?.awb ?? "—"}</p>
                )}
              </div>

              <div>
                <span className={styles.fieldLabel}>Order Status</span>
                <span
                  className={getBadgeClass(
                    order?.orderStatus,
                    ORDER_STATUS_BADGE,
                  )}
                >
                  {formatStatusLabel(order?.orderStatus)}
                </span>
              </div>

              <div>
                <span className={styles.fieldLabel}>Delivery Status</span>
                <span
                  className={getBadgeClass(
                    order?.deliveryStatus,
                    DELIVERY_STATUS_BADGE,
                  )}
                >
                  {formatStatusLabel(order?.deliveryStatus)}
                </span>
              </div>

              <div>
                <span className={styles.fieldLabel}>Estimated Delivery</span>
                <p className={styles.fieldValue}>
                  {order?.estimatedDelivery}
                </p>
              </div>

              <div>
                <span className={styles.fieldLabel}>Last Synced</span>
                <p className={`${styles.fieldValue} ${styles.fieldValueMuted}`}>
                  {order?.lastSynced}
                </p>
              </div>
            </div>

            <div className={styles.timelineSection}>
              <h2 className={styles.timelineHeading}>Tracking Timeline</h2>
              {order.timeline.length > 0 ? (
                <ol className={styles.timelineList}>
                  {order.timeline.map((event) => (
                    <li key={event.id} className={styles.timelineItem}>
                      <span className={styles.timelineDot} aria-hidden />
                      <p className={styles.eventTitle}>{event.title}</p>
                      {event.location && (
                        <p className={styles.eventMeta}>{event.location}</p>
                      )}
                      {event.detail && (
                        <p className={styles.eventMeta}>{event.detail}</p>
                      )}
                      {event.timestamp && (
                        <p className={styles.eventTime}>{event.timestamp}</p>
                      )}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={styles.eventMeta}>No tracking events yet.</p>
              )}
            </div>
          </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

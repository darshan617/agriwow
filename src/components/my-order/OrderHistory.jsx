import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomerInfo from "../wish-list/customer-info/CustomerInfo";
import { useGetOrderHistoryQuery } from "@/redux/apis/orderHistory";
import styles from "@/components/my-order/OrderHistory.module.css";

const formatPrice = (price) => {
  const num = Number(price);
  if (Number.isNaN(num)) return price;
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const OrderHistory = () => {
  const { data: orderHistory, isLoading, isFetching } =
    useGetOrderHistoryQuery();

  const orders = useMemo(
    () => (Array.isArray(orderHistory?.data) ? orderHistory.data : []),
    [orderHistory]
  );

  const orderCount = orders.length;
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
                  <article
                    key={`${order?.order_id}-${order?.product_id}`}
                    className={styles.orderCard}
                  >
                    <div className={styles.orderCardHeader}>
                      <div className={styles.orderMeta}>
                        <p className={styles.orderId}>
                          Order ID: #{order?.order_id}
                        </p>
                        <p className={styles.orderDate}>
                          Placed on{" "}
                          <span>{order?.order_date}</span>
                        </p>
                      </div>
                    </div>

                    <div className={styles.orderCardBody}>
                      <div className={styles.productImageWrap}>
                        {order?.image ? (
                          <Image
                            src={order.image}
                            alt={order?.name ?? "Product"}
                            width={88}
                            height={88}
                            className={styles.productImage}
                          />
                        ) : null}
                      </div>

                      <div className={styles.productDetails}>
                        <h2 className={styles.productName}>
                          {order?.name}
                        </h2>
                        {order?.product_id ? (
                          <p className={styles.productId}>
                            Product ID: {order.product_id}
                          </p>
                        ) : null}
                      </div>

                      <p className={styles.orderPrice}>
                        ₹ {formatPrice(order?.price)}
                      </p>
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

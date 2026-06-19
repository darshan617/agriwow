import React from "react";
import CustomerInfo from "../wish-list/customer-info/CustomerInfo";
import styles from "@/components/my-order/OrderHistory.module.css";
import { useViewOrderDetailsQuery } from "@/redux/apis/orderHistory";

const OrderDetailsComponent = ({ orderId }) => {
  const { data: orderDetails } = useViewOrderDetailsQuery(
    {
      orderId: orderId,
    },
    {
      skip: !orderId,
    },
  );
  console.log(orderDetails);
  return (
    <div className="container">
      <div className="row">
        <CustomerInfo />
        <div className="col-xl-9 col-md-12">
          <section className={styles.orderPanel}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>Order Details</h1>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsComponent;

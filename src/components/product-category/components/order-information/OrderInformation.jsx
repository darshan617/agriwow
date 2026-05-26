import React from "react";
import styles from "@/components/product-category/components/order-information/OrderInformation.module.css";
import shield from "@/assets/icon/shield2.png";
import { FaShippingFast, FaUndo } from "react-icons/fa";
import shipping from "@/assets/icon/truck.png";
import returnIcon from "@/assets/icon/undo.png";
import Image from "next/image";

const OrderInformation = () => {
  return (
    <div>
      <section className={`${styles.orderInformation}`}>
        <div className="container">
          <div className="detail-section">
            <div className="row">
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <Image src={shipping} alt="Shipping" width={60} height={60} />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Free Shipping on Orders Over Rs.00</h2>
                    <p>
                      Enjoy free standard shipping when you spend Rs.00 or{" "}
                      <br />
                      more. No hidden fees — just more value with every order.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <Image src={returnIcon} alt="Return" width={60} height={60} />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Easy 30-day Returns</h2>
                    <p>
                      Changed your mind? No problem. You have 30 days <br />
                      to return your item, no questions asked.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <Image src={shield} alt="Shield" width={60} height={60} />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Payment Security</h2>
                    <p>
                      Your security is our priority. All payments are encrypted{" "}
                      <br />
                      and processed securely — we never store your payment{" "}
                      <br />
                      details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderInformation;

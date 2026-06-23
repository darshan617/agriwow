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
                    <h2>Free Shipping</h2>
                    <p>
                      Enjoy free standard shipping on all orders. <br /> No hidden fees — just more value with every order.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`${styles.orderInformationContent}`}>
                  <Image src={returnIcon} alt="Return" width={60} height={60} />
                  <div className={`${styles.orderInformationContentText}`}>
                    <h2>Easy Returns Policy</h2>
                    <p>
                    Changed your mind? Returns are quick and hassle-free. <br />Shop with confidence and enjoy easy returns.
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

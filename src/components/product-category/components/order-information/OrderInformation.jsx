import React from "react";
import styles from "@/components/product-category/components/order-information/OrderInformation.module.css";
import Image from "next/image";
import { useGetOrderInfoQuery } from "@/redux/apis/orderInfoApi";

const OrderInformation = () => {
  const { data: orderInfoData } = useGetOrderInfoQuery();
  const orderInfo = orderInfoData?.data || [];
  return (
    <div>
      <section className={`${styles.orderInformation}`}>
        <div className="container">
          <div className="detail-section">
            <div className="row">
              {orderInfo?.map((item) => (
                <div key={item?.id} className="col-md-4">
                    <div className={`${styles.orderInformationContent}`}>
                      <Image
                        src={item?.icon}
                        alt="Shipping"
                        width={60}
                        height={60}
                      />
                      <div className={`${styles.orderInformationContentText}`}>
                        <h2>{item?.title}</h2>
                        <p>{item?.content}</p>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderInformation;

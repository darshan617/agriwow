import React from "react";
import styles from "@/components/shipping-return/ShippingReturn.module.css";
import Link from "next/link";
import { useGetShippingReturnQuery } from "@/redux/apis/shippingReturnApi";
const ShippingReturn = () => {


  const { data: shippingReturnData } = useGetShippingReturnQuery()
  const shippingReturn = shippingReturnData?.data?.content || [];
  return (
    <div className="container">
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/" prefetch={true}>Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/shipping-return" prefetch={true}>Shipping & Returns</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.shippingReturnContainer} `}>
        <div className={`${styles.shippingReturnHeading} text-center`}>
          <h1>Shipping & Returns</h1>
        </div>
        <div className={`${styles.shippingReturnContent} `}>
          {shippingReturn?.length > 0 && (
            <ol>
              {shippingReturn.map((item) => (
                <li key={item?.id} className={styles.shippingReturnContentItem}>
                  <p>{item?.content}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingReturn;

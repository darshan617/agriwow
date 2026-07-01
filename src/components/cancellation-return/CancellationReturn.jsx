import React from "react";
import styles from "@/components/cancellation-return/CancellationReturn.module.css";
import Link from "next/link";
import { useGetReturnPolicyQuery } from "@/redux/apis/returnPolicyApi";

const CancellationReturn = () => {
  const { data: returnPolicyData } = useGetReturnPolicyQuery();
  const returnPolicy = returnPolicyData?.data?.content || [];
  
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
              <Link href="/cancellation-return-policy" prefetch={true}>
                Cancellation & Return Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.cancellationReturnContainer} `}>
        <div className={`${styles.cancellationReturnHeading} text-center`}>
          <h1>Cancellation / Return Policy</h1>
        </div>
        <div className={`${styles.cancellationReturnContent} `}>
          <div className={`${styles.cancellationReturnContentItem} `}>
            {returnPolicy?.length > 0 && (
              <ul>
                {returnPolicy.map((item) => (
                  <li key={item?.id} >
                    <p>{item?.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationReturn;

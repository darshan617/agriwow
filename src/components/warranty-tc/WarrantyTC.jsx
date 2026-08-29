import React from "react";
import styles from "./WarrantyTC.module.css";
import Link from "next/link";
import { useWarrantyTermsQuery } from "@/redux/apis/warrantyTermsApi";

const WarrantyTC = () => {
  const { data: warrantyTerms, isLoading } = useWarrantyTermsQuery();
  console.log("warrantyTerms", warrantyTerms);

  return (
    <div className={`${styles.page} container`}>
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/" prefetch={true}>
                Home
              </Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/warranty-terms-and-conditions" prefetch={true}>
                Warranty terms and conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.body}>
        <h2 className="text-center mt-3 mb-5">Warranty Terms and Conditions</h2>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          warrantyTerms?.data?.content?.map((para, idx) => {
            return (
              <div dangerouslySetInnerHTML={{ __html: para?.content }}></div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WarrantyTC;

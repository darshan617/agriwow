import React from "react";
import Link from "next/link";
import styles from "@/components/privacy-policy/PrivacyPolicy.module.css";
import { useGetPrivacyPolicyQuery } from "@/redux/apis/privacyPolicyApi";
const PrivacyPolicy = () => {
  const { data: privacyPolicyData } = useGetPrivacyPolicyQuery();
  const privacyPolicy = privacyPolicyData?.data?.content || [];
  
  return (
    <div className="container">
      <div className={`${styles.breadcrumb} `}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.privacyPolicyContainer} `}>
        <div className={`${styles.privacyPolicyHeading} text-center`}>
          <h1>Privacy Policy</h1>
        </div>
        <div className={`${styles.privacyPolicyContent} `}>
          <div className={`${styles.privacyPolicyContentItem} `}>
            {privacyPolicy?.length > 0 && (
              <ul>
                {privacyPolicy.map((item) => (
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

export default PrivacyPolicy;

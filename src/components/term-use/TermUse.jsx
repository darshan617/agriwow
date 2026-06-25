import React from "react";
import Link from "next/link";
import styles from "@/components/term-use/TermUse.module.css";
import { useGetTermUseQuery } from "@/redux/apis/termUseApi";

const TermUse = () => {
  const { data: termUseData } = useGetTermUseQuery();
  const termUse = termUseData?.data?.sections?.[0]?.paragraphs || [];
  console.log(termUse,'termUse');
  
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
              <Link href="/terms-use">Terms of Use</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${styles.termUseContainer} `}>
        <div className={`${styles.termUseHeading} text-center`}>
          <h1>Terms of Use</h1>
        </div>
        <div className={`${styles.termUseContent} `}>
          <div className={`${styles.termUseContentItem} `}>
            {termUse?.length > 0 && (
              <ol>
                {termUse.map((item) => (
                  <li key={item?.id} >
                    <p>{item?.text}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermUse;

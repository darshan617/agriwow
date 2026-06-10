"use client";

import React, { useState, useEffect } from "react";
import styles from "@/components/product-details/components/faqs/Faqs.module.css";

const Faqs = ({ productData }) => {
  const faqList = productData?.faqs || [];
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (faqList.length > 0) {
      setOpenId(faqList[0].id);
    }
  }, [faqList]);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`${styles.faqSection} container mt-4 mb-5`}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

        <div className={styles.faqList}>
          {faqList.length === 0 ? (
            <div className={styles.noFaqAvailable}>No FAQ available</div>
          ) : (
            faqList.map((faq) => {
              const isOpen = openId === faq?.id;
              return (
                <div className={styles.faqItem} key={faq?.id}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggle(faq?.id)}
                  >
                    <span className={styles.faqQuestionText}>
                      {faq?.question}
                    </span>
                    <span className={styles.faqIcon}>{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div
                      className={styles.faqAnswer}
                      dangerouslySetInnerHTML={{ __html: faq?.answer }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className={styles.faqFooter}>
          <p className={styles.faqFooterText}>
            If you need more information or additional features, please fill out
            the "Ask a Question" form below.
          </p>
        </div>
        <div className={styles.faqFooterButton}>
          <button className={styles.bannerBtn}>Ask a Question?</button>
        </div>
      </div>
    </div>
  );
};

export default Faqs;

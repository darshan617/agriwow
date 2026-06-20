"use client";

import React, { useState, useEffect } from "react";
import styles from "@/components/product-details/components/faqs/Faqs.module.css";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import { useAskQuestionMutation } from "@/redux/apis/faqApi";
import Cookies from "js-cookie";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const Faqs = ({ productData, productId }) => {
  const faqList = productData?.faqs || [];
  const [openId, setOpenId] = useState(null);
  const [showAskQuestionPopup, setShowAskQuestionPopup] = useState(false);
  useEffect(() => {
    if (faqList.length > 0) {
      setOpenId(faqList[0].id);
    }
  }, [faqList]);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const [askQuestion, { isLoading: isAskQuestionLoading }] =
    useAskQuestionMutation();
  const { showToast } = useToast();
  const [question, setQuestion] = useState("");
  const userData = Cookies.get("userData")
    ? JSON.parse(decodeURIComponent(Cookies.get("userData")))
    : null;
  const handleAskQuestion = async () => {
    try {
      const res = await askQuestion({
        body: {
          product_id: productId,
          question: question,
          user_id: userData?.id,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        setShowAskQuestionPopup(false);
        setQuestion("");
        showToast(res?.data?.message, "success");
      } else {
        showToast(res?.error?.data?.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error, "error");
    }
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
                      dangerouslySetInnerHTML={{ __html: faq?.answer || "-" }}
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
          <button
            className={styles.bannerBtn}
            onClick={() => setShowAskQuestionPopup(true)}
          >
            Ask a Question?
          </button>
          {showAskQuestionPopup && (
            <CustomPopup
              onclose={() => setShowAskQuestionPopup(false)}
              maxWidth="460px"
            >
              <div className={styles.askQuestionPopupContent}>
                <div className={styles.popupHeader}>
                  <div>
                    <h3>Ask a question</h3>
                    <p className={styles.popupSubtitle}>
                      We'll get back to you shortly
                    </p>
                  </div>
                </div>

                <div className={styles.popupDivider} />

                <div className={styles.popupBody}>
                  {/* <div className={styles.formGroup}>
                    <label htmlFor="name">Your name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </div> */}
                  {/* <div className={styles.formGroup}>
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                    />
                  </div> */}
                  <div className={styles.formGroup}>
                    <label htmlFor="question">Your question</label>
                    <textarea
                      id="question"
                      rows={4}
                      placeholder="Type your question here..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>

                  <div className={styles.popupActions}>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => setShowAskQuestionPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles.submitBtn}
                      onClick={handleAskQuestion}
                      disabled={isAskQuestionLoading}
                    >
                      {isAskQuestionLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </CustomPopup>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faqs;

import React from "react";
import styles from "@/components/checkout/checkout-stepper/CheckoutStepper.module.css";

const CheckoutStepper = ({ activeStep = 1 }) => {
  const isPaymentStep = activeStep === 2;

  return (
    <div className={styles.stepper}>
      <div className={styles.stepperInner}>
        <div className={styles.stepLabels}>
          <span
            className={
              isPaymentStep ? styles.stepLabelCompleted : styles.stepLabelActive
            }
          >
            Address &amp; Product Summary
          </span>
          <span
            className={
              isPaymentStep ? styles.stepLabelActive : styles.stepLabelInactive
            }
          >
            Payment
          </span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: isPaymentStep ? "100%" : "50%" }}
          />
          <span
            className={styles.progressDot}
            style={{ left: isPaymentStep ? "100%" : "50%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;

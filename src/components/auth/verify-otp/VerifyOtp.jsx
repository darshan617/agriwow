import React, { useRef, useState } from "react";
import styles from "./VerifyOtp.module.css";

const VerifyOtp = () => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (val, i) => {
    const digit = val.replace(/[^0-9]/g, "").slice(-1);
    const updated = [...otp];
    updated[i] = digit;
    setOtp(updated);
    if (digit && i < length - 1) inputRefs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const updated = [...otp];
        updated[i] = "";
        setOtp(updated);
      } else if (i > 0) {
        inputRefs.current[i - 1].focus();
      }
    }
    if (e.key === "ArrowLeft" && i > 0) inputRefs.current[i - 1].focus();
    if (e.key === "ArrowRight" && i < length - 1) inputRefs.current[i + 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    const updated = Array(length).fill("");
    pasted.split("").forEach((ch, j) => (updated[j] = ch));
    setOtp(updated);
    const next = Math.min(pasted.length, length - 1);
    inputRefs.current[next].focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < length) return alert("Please enter all 6 digits.");
    alert(`OTP Submitted: ${code}`);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <h2 className={styles.leftHeading}>
            Login for a better
            <span className={styles.highlight}> shopping experience</span>
          </h2>
          <p className={styles.leftSubtext}>
            Find the right farming &amp; <br /> gardening tools, <br /> faster and easier.
          </p>
        </div>
        <div className={styles.illustrationWrapper} />
      </div>

      <div className={styles.rightPanel}>
        <h3 className={styles.formTitle}>Enter 6 digit OTP for verification</h3>
        <p className={styles.formSubtitle}>One Time Password sent to +919082681149</p>

        <div className={styles.otpRow}>
          {otp.map((digit, i) => (
            <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            className={`${styles.otpInput} ${digit ? styles.filled : ""}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            placeholder="—"
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
          ))}
        </div>
        <div className={styles.resendRow}>
          <span className={styles.resendLeft}>
            Didn't receive the code? <br />
            <strong>Resend in 00:00</strong>
          </span>
          <button className={`${styles.resendBtn}`}>RESEND OTP</button>
        </div>
        <div className={`${styles.orRow}`}>
            <div className={`${styles.orLine}`} />
            <span className={`${styles.orText}`}>or</span>
            <div className={`${styles.orLine}`} />
          </div>

        <button className={`${styles.pwBtn}`}>LOGIN WITH PASSWORD</button>
      </div>
    </div>
  );
};

export default VerifyOtp;
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import { getCartSessionId } from "@/redux/apis/addToCartApi";
import Link from "next/link";
import { useSignupMutation } from "@/redux/apis/authApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { useLoginPopup } from "@/custom-hooks/login-popup/LoginPopupProvider";
import CustomPopup from "@/components/custom-popup/CustomPopup";

const Login = ({ handleLogin, phone, setPhone, isAuthLoading }) => {
  const { goToVerifyOtp } = useLoginPopup();
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const { showToast } = useToast();
  const [countryCode, setCountryCode] = useState("+91");
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const sessionId = getCartSessionId();

  const handleSubmit = async () => {
    if (mode === "signup") {
      await handleSignup();
    } else {
       await handleLogin();

    }
  };
  const handleSignup = async () => {
    const body = {
      name,
      email,
      phone,
    };
    const response = await signup({ body });
    console.log(response, "response");
    if (response?.data?.success || response?.data?.status) {
      goToVerifyOtp();
    } else {
      showToast(response?.error?.data?.message, "error");
    }
  };

  return (
    <div className={`${styles.root} `} role="dialog" aria-modal="true">
      <div className={`${styles.modal}`}>
        <div className={`${styles.leftPanel}`}>
          <div className={`${styles.leftContent}`}>
            {mode === "login" && (
              <div>
                <h2 className={`${styles.leftHeading}`}>
                  Login for a better
                  <span className={`${styles.highlight}`}>
                    {" "}
                    shopping experience
                  </span>
                </h2>
                <p className={`${styles.leftSubtext}`}>
                  Find the right farming &amp; <br /> gardening tools, <br />{" "}
                  faster and easier.
                </p>
              </div>
            )}
            {mode === "signup" && (
              <div>
                <h2 className={`${styles.leftHeading}`}>
                  Sign up for a better
                  <span className={`${styles.highlight}`}>
                    {" "}
                    shopping experience
                  </span>
                </h2>
                <div>
                  <p className={`${styles.leftSubtext}`}>
                    Find the right farming &amp; <br /> gardening tools, <br />{" "}
                    faster and easier.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={`${styles.illustrationWrapper}`}></div>
        </div>
        <div className={`${styles.rightPanel}`}>
          <div>
            {/* Toggle */}
            <div className={styles.toggleRow}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${
                  mode === "login" ? styles.toggleActive : ""
                }`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${
                  mode === "signup" ? styles.toggleActive : ""
                }`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div>
            {mode === "login" && (
              <h3 className={`${styles.formTitle}`}>Welcome Back 👋</h3>
            )}
            {mode === "signup" && (
              <>
                <label className={`${styles.label}`}>Full name</label>
                <div className={styles.inputRow}>
                  <input
                    className={styles.textInput}
                    type="text" 
                    pattern="[a-zA-Z]+"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                      setName(value);
                    }}  
                  />
                </div>

                <label className={`${styles.label}`}>Email address</label>
                <div className={styles.inputRow}>
                  <input
                    className={styles.textInput}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            <label className={`${styles.label}`}>Enter mobile number</label>
            <div className={`${styles.phoneRow}`}>
              <select
                className={`${styles.countrySelect}`}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">+91</option>
              </select>
              <div className={`${styles.divider}`} />
              <input
                className={`${styles.phoneInput}`}
                type="tel"
                placeholder=""
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                maxLength={10}
              />
            </div>
          </div>

          <div>
            <button
              className={`${styles.continueBtn}`}
              onClick={handleSubmit}
              disabled={isAuthLoading}
            >
              {isAuthLoading
                ? "LOADING..."
                : mode === "login"
                  ? "CONTINUE"
                  : "SIGN UP"}
            </button>

            <p className={`${styles.terms}`}>
              By continuing, you agree to our{" "}
              <Link
                href="/terms-of-use"
                className={`${styles.link}`}
                prefetch={true}
              >
                Terms of Use
              </Link>{" "}
              &amp;{" "}
              <Link
                href="/privacy-policy"
                className={`${styles.link}`}
                prefetch={true}
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useAuthMutation, useVerifyOtpMutation } from "@/redux/apis/authApi";
import {
  getCartSessionId,
  useMergeCartMutation,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginBtn from "@/components/google-login-btn/GoogleLoginBtn";
import Link from "next/link";
const Login = ({ handleLogin, phone, setPhone, isAuthLoading }) => {
  const router = useRouter();

  const [countryCode, setCountryCode] = useState("+91");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const sessionId = getCartSessionId();
  const handleContinue = () => {
    router.push(`/auth/verify-otp`);
  };

  return (
    <div className={`${styles.root} `} role="dialog" aria-modal="true">
      <div className={`${styles.modal}`}>
        <div className={`${styles.leftPanel}`}>
          <div className={`${styles.leftContent}`}>
            <h2 className={`${styles.leftHeading}`}>
              Login for a better
              <span className={`${styles.highlight}`}>
                {" "}
                shopping experience
              </span>
            </h2>
            <p className={`${styles.leftSubtext}`}>
              Find the right farming &amp; <br /> gardening tools, <br /> faster
              and easier.
            </p>
          </div>
          <div className={`${styles.illustrationWrapper}`}></div>
        </div>
        <div className={`${styles.rightPanel}`}>
          <div>
            <h3 className={`${styles.formTitle}`}>Login / Sign Up</h3>
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
          <button
            className={`${styles.continueBtn}`}
            onClick={handleLogin}
            disabled={isAuthLoading}
          >
            {isAuthLoading ? "LOADING..." : "CONTINUE"}
          </button>

          {/* <div className={`${styles.orRow}`}>
            <div className={`${styles.orLine}`} />
            <span className={`${styles.orText}`}>or</span>
            <div className={`${styles.orLine}`} />
          </div> */}

          {/* <button className={`${styles.socialBtn}`} style={{ marginTop: 12 }}>
            <FcGoogle size={18} style={{ marginRight: 8 }} />
            Continue with Google
          </button> */}
          {/* <h1>
            <GoogleLoginBtn />
          </h1> */}

          <p className={`${styles.terms}`}>
            By continuing, you agree to our{" "}
            <Link href="/terms-of-use" className={`${styles.link}`}>
              Terms of Use
            </Link>{" "}
            &amp;{" "}
            <Link href="/privacy-policy" className={`${styles.link}`}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

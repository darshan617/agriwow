import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import Login from "@/components/auth/login/Login";
import VerifyOtp from "@/components/auth/verify-otp/VerifyOtp";
import { useAuthMutation, useVerifyOtpMutation } from "@/redux/apis/authApi";
import {
  getCartSessionId,
  useMergeCartMutation,
} from "@/redux/apis/addToCartApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const LoginPopupContext = createContext();

export const getIsLoggedIn = () => {
  const cookie = Cookies?.get("userData");
  if (!cookie) return false;
  try {
    const data = JSON.parse(decodeURIComponent(cookie));
    return Object.keys(data).length > 0;
  } catch {
    return false;
  }
};

export const LoginPopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, { isLoading: isAuthLoading }] = useAuthMutation();
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [mergeCart] = useMergeCartMutation();
  const { showToast } = useToast();

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);

  const openLoginPopup = () => setShowPopup("login");

  const closeLoginPopup = () => {
    setShowPopup("");
    setPhone("");
  };

  const handleLogin = async () => {
    try {
      const res = await auth({
        body: {
          phone: phone,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        setShowPopup("verify-otp");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleVerify = async (otp) => {
    try {
      const res = await verifyOtp({
        body: {
          otp: otp,
          phone: phone,
        },
      });
      if (res?.data?.success || res?.data?.status) {
        if (res?.data?.token) {
          Cookies.set("userData", JSON.stringify(res?.data?.user));
          Cookies.set("userToken", res?.data?.token);

          const sessionId = getCartSessionId();
          if (sessionId) {
            try {
              await mergeCart({
                body: { session_id: sessionId },
              }).unwrap();
            } catch (mergeError) {
              console.error("Cart merge failed", mergeError);
            }
          }

          showToast(res?.data?.message, "success");
          setIsLoggedIn(true);
          closeLoginPopup();
        } else {
          console.error("OTP verification failed", res?.error);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <LoginPopupContext.Provider
      value={{ openLoginPopup, getIsLoggedIn, isLoggedIn }}
    >
      {children}
      {showPopup === "login" && (
        <CustomPopup onclose={closeLoginPopup} maxWidth="740px">
          <Login
            handleLogin={handleLogin}
            phone={phone}
            setPhone={setPhone}
            isAuthLoading={isAuthLoading}
          />
        </CustomPopup>
      )}
      {showPopup === "verify-otp" && (
        <CustomPopup onclose={closeLoginPopup}>
          <VerifyOtp
            handleVerify={handleVerify}
            phone={phone}
            isLoading={isVerifyOtpLoading}
          />
        </CustomPopup>
      )}
    </LoginPopupContext.Provider>
  );
};

export const useLoginPopup = () => useContext(LoginPopupContext);

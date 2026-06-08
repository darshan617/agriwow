import { useGoogleLoginMutation } from "@/redux/apis/authApi";
import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const GoogleLoginBtn = () => {
  const router = useRouter();
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();
  const { showToast } = useToast();
  const handleLoginSignup = async (credentialResponse) => {
    try {
      const response = await googleLogin({
        body: {
          id_token: credentialResponse.credential,
        },
      });

      if (response?.data?.status) {
        showToast("Login successful!", "success");
        Cookies.set("userData", JSON.stringify(response?.data?.user));
        Cookies.set("userToken", response?.data?.token);
        router?.reload();
      } else {
        showToast("Login failed", "error");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };
  return (
    <div>
      {!isLoading ? (
        <GoogleLogin
          onSuccess={handleLoginSignup}
          onError={() => {
            showToast("Login Failed", "error");
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
          }}
        >
          <div className="spinner-border spinner-border-sm" role="status"></div>
          <p style={{ fontSize: "12px", color: "#666" }} className="m-0">
            Loading...
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginBtn;

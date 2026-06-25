import { storeWrapper } from "@/redux/store";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastProvider } from "@/custom-hooks/toast/ToastProvider";
import { LoginPopupProvider } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";
import { useRouter } from "next/router";
import ProgressBar from "@/custom-hooks/progress-bar/ProgressBar";
import { FaArrowUp } from "react-icons/fa";

function AppContent({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <Component {...pageProps} />;
}
export default function App({ Component, pageProps, ...rest }) {
  const { store } = storeWrapper.useWrappedStore(rest);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ToastProvider>
          <LoginPopupProvider>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <ProgressBar />
            <AppContent Component={Component} pageProps={pageProps} />
          {/* Back To Top Button */}
          <style jsx global>{`
            .back-to-top-btn {
              position: fixed;
              bottom: 32px;
              right: 32px;
              z-index: 9999;
              background: #2d8d2f;
              color: #fff;
              border: none;
              outline: none;
              padding: 12px 16px;
              border-radius: 50%;
              box-shadow: 0 2px 10px rgba(0,0,0,0.15);
              cursor: pointer;
              transition: background 0.2s;
              font-size: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 50px;
              height: 50px;
            }
            .back-to-top-btn:hover {
              background: #236622;
            }
            @media (max-width: 500px) {
              .back-to-top-btn {
                bottom: 18px;
                right: 18px;
                padding: 10px 13px;
                font-size: 20px;
              }
            }
          `}</style>
          {typeof window !== "undefined" && (() => {
            // Use a React custom hook here, but must be declared inside component
            const { useState, useEffect } = require('react');
            function BackToTop() {
              const [show, setShow] = useState(false);
              useEffect(() => {
                const onScroll = () => {
                  setShow(window.scrollY > 300);
                };
                window.addEventListener("scroll", onScroll);
                return () => window.removeEventListener("scroll", onScroll);
              }, []);
              const handleClick = () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              };
              return show ? (
                <button
                  className="back-to-top-btn"
                  onClick={handleClick}
                  aria-label="Back to Top"
                >
                  <FaArrowUp />
                </button>
              ) : null;
            }
            return <BackToTop />;
          })()}
  







          </LoginPopupProvider>
        </ToastProvider>
      </Provider>
    </GoogleOAuthProvider>



  );
}

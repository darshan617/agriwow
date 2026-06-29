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
import ProgressBar from "@/custom-hooks/progress-bar/ProgressBar";
import { FaArrowUp } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

function AppContent({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <Component {...pageProps} />;
}

const whatsappHref = `https://wa.me/919229297668?text=${encodeURIComponent(
  "Hello! I want to know more about Agriwow.",
)}`;

const whatsappBtnStyle = {
  position: "fixed",
  zIndex: 9999,
  background: "#25d366",
  color: "#fff",
  border: "none",
  outline: "none",
  borderRadius: "50%",
  boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function FloatingWhatsAppButton() {
  return (
    <Link
      href={whatsappHref}
      style={whatsappBtnStyle}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float-btn"
    >
      <FaWhatsapp className="whatsapp-float-btn-icon" />
    </Link>
  );
}

function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <button
      className="back-to-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to Top"
    >
      <FaArrowUp />
    </button>
  );
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

            {/* <style jsx global>{`
              .whatsapp-float-btn {
                bottom: 100px;
                right: 32px;
                padding: 13px;
                font-size: 28px;
                width: 50px;
                height: 50px;
              }
              @media (max-width: 500px) {
                .whatsapp-float-btn {
                  bottom: 80px;
                  right: 18px;
                  padding: 10px 13px;
                  font-size: 20px;
                  width: 45px;
                  height: 45px;
                }
              }
            `}</style>
            <FloatingWhatsAppButton /> */}

            <style jsx global>{`
              .back-to-top-btn {
                position: fixed;
                bottom: 32px;
                right: 32px;
                z-index: 9999;
                background: black;
                color: #fff;
                border: none;
                outline: none;
                padding: 12px 16px;
                border-radius: 50%;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
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
                  height: 45px;
                  width: 45px;
                }
              }
            `}</style>
            <BackToTopButton />
          </LoginPopupProvider>
        </ToastProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

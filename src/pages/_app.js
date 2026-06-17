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
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const start = () => setLoading(true);
  //   const end = () => setLoading(false);

  //   router.events.on("routeChangeStart", start);
  //   router.events.on("routeChangeComplete", end);
  //   router.events.on("routeChangeError", end);

  //   return () => {
  //     router.events.off("routeChangeStart", start);
  //     router.events.off("routeChangeComplete", end);
  //     router.events.off("routeChangeError", end);
  //   };
  // }, []);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ToastProvider>
          <LoginPopupProvider>
            {/* {loading && <div className="loading-bar"></div>} */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <ProgressBar />
            <AppContent Component={Component} pageProps={pageProps} />
          </LoginPopupProvider>
        </ToastProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

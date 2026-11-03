import { storeWrapper } from "@/redux/store";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { getStaticSeoForPath } from "@/config/seo";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Sora } from "next/font/google";
import { ToastProvider } from "@/custom-hooks/toast/ToastProvider";
import { LoginPopupProvider } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProgressBar from "@/custom-hooks/progress-bar/ProgressBar";
import Link from "next/link";
import ComingSoonPage from "@/components/coming-soon/ComingSoonPage";
import { trackPageView, trackUserData } from "@/utils/gtm";
import { useUtmStoreMutation } from "@/redux/apis/utmApi";
import {
  getPathnameFromAsPath,
  markListingPageRestorePath,
  markRouteNavType,
} from "@/utils/listingPaginationMemory";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const [storeUtm] = useUtmStoreMutation();
  const lastStoredPage = useRef("");

  useEffect(() => {
    trackUserData();
  }, []);

  useEffect(() => {
    let popped = false;
    let lastPath = router.asPath;

    const onPopState = () => {
      const targetPath = window.location.pathname;
      markListingPageRestorePath(
        getPathnameFromAsPath(lastPath).startsWith("/product-details/") &&
          targetPath.startsWith("/product-category/")
          ? targetPath
          : "",
      );
      popped = true;
      markRouteNavType(true);
    };

    const onRouteChangeStart = () => {
      if (!popped) markListingPageRestorePath("");
      markRouteNavType(popped);
      popped = false;
    };

    const onRouteChangeComplete = (url) => {
      lastPath = url;
    };

    window.addEventListener("popstate", onPopState);
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      window.removeEventListener("popstate", onPopState);
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (!router.isReady) return;

    const url = new URL(
      typeof window !== "undefined" ? window.location.href : router.asPath,
      window.location.origin,
    );
    const savedParams = new URLSearchParams(
      window.sessionStorage.getItem("agriwow:utm-params") || "",
    );

    url.searchParams.forEach((value, key) => {
      if (
        key.startsWith("utm_") ||
        ["campaign_id", "gclid", "referral", "landing_page"].includes(key)
      ) {
        savedParams.set(key, value);
      }
    });

    window.sessionStorage.setItem("agriwow:utm-params", savedParams.toString());
    savedParams.forEach((value, key) => {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    });

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (nextUrl !== router.asPath) {
      router.replace(nextUrl, undefined, { shallow: true, scroll: false });
      return;
    }

    if (lastStoredPage.current === router.asPath) return;
    lastStoredPage.current = router.asPath;

    storeUtm({
      body: {
        utm_source: savedParams.get("utm_source") || "",
        utm_medium: savedParams.get("utm_medium") || "",
        utm_campaign: savedParams.get("utm_campaign") || "",
        utm_term: savedParams.get("utm_term") || "",
        utm_content: savedParams.get("utm_content") || "",
        utm_id: savedParams.get("utm_id") || "",
        utm_referrer: savedParams.get("utm_referrer") || "",
        utm_page_url: savedParams.get("utm_page_url") || "",
        gclid: savedParams.get("gclid") || "",
        referral: savedParams.get("referral") || "",
        landing_page: savedParams.get("landing_page") || "",
        full_url: nextUrl,
      },
    })
      .unwrap()
      .catch((error) => console.error("Failed to store UTM page visit", error));
  }, [router, router.asPath, router.isReady, storeUtm]);

  // useEffect(() => {
  //   const initAos = async () => {
  //     await import("aos/dist/aos.css");
  //     const Aos = (await import("aos")).default;
  //     Aos.init({
  //       duration: 1000,
  //       once: true,
  //     });
  //   };

  //   if (typeof window !== "undefined" && "requestIdleCallback" in window) {
  //     const id = window.requestIdleCallback(
  //       () => {
  //         void initAos();
  //       },
  //       { timeout: 2000 },
  //     );
  //     return () => window.cancelIdleCallback(id);
  //   }

  //   const timer = window.setTimeout(() => {
  //     void initAos();
  //   }, 1);
  //   return () => window.clearTimeout(timer);
  // }, []);
  useEffect(() => {
    let cancelled = false;
    let aosInstance;

    const initAos = async () => {
      try {
        const Aos = (await import("aos")).default;

        if (cancelled) return;

        aosInstance = Aos;

        Aos.init({
          duration: 600,
          once: true,
          disableMutationObserver: true,
        });

        Aos.refreshHard();
      } catch (error) {
        console.error("AOS initialization failed:", error);
      }
    };

    let timer;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(initAos, { timeout: 3000 });

      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    timer = window.setTimeout(initAos, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const sendPageView = (url) => {
      trackPageView({
        page_path: url,
        page_title:
          typeof document !== "undefined" ? document.title : undefined,
        page_location:
          typeof window !== "undefined"
            ? window.location.origin + url
            : undefined,
      });
    };

    sendPageView(router.asPath);

    router.events.on("routeChangeComplete", sendPageView);
    return () => {
      router.events.off("routeChangeComplete", sendPageView);
    };
    // Initial page_view + SPA navigations only; avoid re-binding on asPath changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return <Component {...pageProps} />;
}

const whatsappHref = `https://wa.me/+919238300367?text=${encodeURIComponent(
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
      prefetch={true}
      style={whatsappBtnStyle}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float-btn"
    >
      <svg
        viewBox="0 0 24 24"
        width="25"
        height="25"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.16 1.6 5.98L0 24l6.22-1.63a11.9 11.9 0 0 0 5.83 1.48h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.5-8.41Zm-8.46 18.34h-.01a9.95 9.95 0 0 1-5.07-1.39l-.36-.21-3.69.97.99-3.6-.23-.37a9.93 9.93 0 0 1-1.53-5.26c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.05 2.92 9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.47 9.97-9.96 9.97Zm5.47-7.46c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.11.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
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
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}

export default function App({ Component, pageProps, ...rest }) {
  const { store } = storeWrapper.useWrappedStore(rest);
  const router = useRouter();
  const staticSeo = getStaticSeoForPath(router.pathname);
  const seo = { ...staticSeo, ...pageProps.seo };
  const isComingSoonMode = process.env.NEXT_PUBLIC_COMING_SOON_MODE === "true";
  const fontClassName = `${sora.variable} ${sora.className}`;

  if (isComingSoonMode) {
    return (
      <div className={fontClassName}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <ComingSoonPage />
      </div>
    );
  }

  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <div className={fontClassName}>
      <Script id="gtm-base" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}</Script>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <SeoHead {...seo} />
          <ToastProvider>
            <LoginPopupProvider>
              <ProgressBar />
              <AppContent Component={Component} pageProps={pageProps} />

              <style jsx global>{`
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
              <FloatingWhatsAppButton />

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
    </div>
  );
}

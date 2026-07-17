import { storeWrapper } from "@/redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { getStaticSeoForPath } from "@/config/seo";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { Sora } from "next/font/google";
import { ToastProvider } from "@/custom-hooks/toast/ToastProvider";
import { LoginPopupProvider } from "@/custom-hooks/login-popup/LoginPopupProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProgressBar from "@/custom-hooks/progress-bar/ProgressBar";
import { FaArrowUp } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import ComingSoonPage from "@/components/coming-soon/ComingSoonPage";
import { buildPageTitle } from "@/utils/seo";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

function AppContent({ Component, pageProps }) {
  useEffect(() => {
    const initAos = async () => {
      await import("aos/dist/aos.css");
      const Aos = (await import("aos")).default;
      Aos.init({
        duration: 1000,
        once: true,
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(
        () => {
          void initAos();
        },
        { timeout: 2000 },
      );
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => {
      void initAos();
    }, 1);
    return () => window.clearTimeout(timer);
  }, []);

  return <Component {...pageProps} />;
}

const whatsappHref = `https://wa.me/+919770501981?text=${encodeURIComponent(
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

  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-T374B69C";
  return (
    <div className={fontClassName}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
            {/* <title>{buildPageTitle(seo.title)}</title> */}
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

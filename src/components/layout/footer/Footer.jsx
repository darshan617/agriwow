import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import styles from "@/components/layout/footer/Footer.module.css";
import { CiMail } from "react-icons/ci";
import { FaArrowRightLong, FaXTwitter } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import maestro from "@/assets/icon/Maestro_logo.png";
import visa from "@/assets/icon/Visa.png";
import paypal from "@/assets/icon/paypal.png";
import mastercard from "@/assets/icon/smartcard.png";
import { useSubscribeEmailMutation } from "@/redux/apis/subscribeEmailApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import {
  getIsLoggedIn,
  useLoginPopup,
} from "@/custom-hooks/login-popup/LoginPopupProvider";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscribeEmail, { isLoading: isSubscribeEmailLoading }] =
    useSubscribeEmailMutation();
  const { showToast } = useToast();

  const { openLoginPopup } = useLoginPopup();

  const handleSubscribe = async () => {
    if (isSubscribeEmailLoading) return;
    if (!email) return showToast("Please enter your email", "error");
    try {
      const res = await subscribeEmail({ body: { email } });
      if (res?.data?.success || res?.data?.status) {
        showToast(res?.data?.message, "success");
        setEmail("");
      } else {
        showToast(res?.error?.data?.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error, "error");
      showToast(error?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);

  return (
    <footer className={`${styles.footer}`}>
      <div className="container">
        <div className={`${styles.footerTop}`}>
          <div className="row">
            <div className="col-md-6">
              <div className="newsletter">
                <p className={`${styles.footerPara}`}>Newsletter Signup</p>
                <h2 className={`${styles.footerText}`}>
                  Join Our Exclusive Community
                </h2>
                <p className={`${styles.footerShortPara}`}>
                  Get exclusive offers, early access, and inspiration.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`${styles.footerForm}`}>
                <form style={{ position: "relative", width: "100%" }}>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      paddingLeft: "40px",
                    }}
                    className={`${styles.footerFormInput}`}
                  />
                  <span className={`${styles.footerFormIconWrapper}`}>
                    <CiMail size={20} className={`${styles.footerFormIcon}`} />
                  </span>
                  <button
                    className={`${styles.inputIconRight}`}
                    onClick={handleSubscribe}
                    type="button"
                    disabled={isSubscribeEmailLoading}
                    style={{
                      opacity: isSubscribeEmailLoading ? 0.5 : 1,
                      cursor: isSubscribeEmailLoading
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    <FaArrowRightLong
                      color="#fff"
                      className={`${styles.footerFormButtonIcon}`}
                    />
                  </button>
                </form>
                <p className={`${styles.footerFormPara}`}>
                  By subscribing you agree to the{" "}
                  <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
                  <Link href="/terms-of-use">Terms and Conditions.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.footerBottom}`}>
          <div className={`${styles.footerMain}`}>
            <div className={styles.footerMainGrid}>
              <div className={`${styles.footerBrand} `}>
                <Link href="/" className={styles.footerLogoLink}>
                  <Image src={logo} alt="Agriwow" width={170} priority />
                </Link>
                <p className={`${styles.footerBrandText}`}>
                  Get top-quality agricultural machinery at <br /> unbeatable
                  prices. Shop smart, farm better with Agriwow.
                </p>
                <p className={`${styles.footerPhone}`}>
                  <IoCallOutline
                    className={styles.footerPhoneIcon}
                    aria-hidden
                  />
                  <Link
                    href="tel:+919229297668"
                    className={styles.footerPhoneLink}
                  >
                    +91 9229297668
                  </Link>
                </p>
              </div>
              <div className={styles.footerNavGroup}>
                <nav className={styles.footerNavCol} aria-label="Agriwow">
                  <h3 className={styles.footerNavHeading}>Agriwow</h3>
                  <ul className={styles.footerNavList}>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    {isLoggedIn ? (
                      <li>
                        <Link href="/my-profile">My Profile</Link>
                      </li>
                    ) : (
                      <li onClick={openLoginPopup}>
                        <button className={styles.footerNavBtn}>
                          My Profile
                        </button>
                      </li>
                    )}
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.youtube.com/@agriwow"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Videos
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog?category=all">Blog</Link>
                    </li>
                  </ul>
                </nav>
                <nav className={styles.footerNavCol} aria-label="Help">
                  <h3 className={styles.footerNavHeading}>Help</h3>
                  <ul className={styles.footerNavList}>
                    <li>
                      <Link href="/contact-us">Contact Us</Link>
                    </li>

                    <li>
                      <Link href="/my-order">Track My Order</Link>
                    </li>
                    <li>
                      <Link href="#">Buying Guide</Link>
                    </li>
                  </ul>
                </nav>
                <nav className={styles.footerNavCol} aria-label="FAQs">
                  <h3 className={styles.footerNavHeading}>Customer Service</h3>
                  <ul className={styles.footerNavList}>
                    <li>
                      <Link href="#">Order Tracking</Link>
                    </li>
                    <li>
                      <Link href="/cancellation-return-policy">
                        Cancellation and Return
                      </Link>
                    </li>
                    <li>{/* <Link href="#">Refund</Link> */}</li>
                    <li>{/* <Link href="#">Payment Option</Link> */}</li>
                  </ul>
                </nav>
              </div>
              <div className={styles.footerAside}>
                <div className={styles.footerSocialWrap}>
                  <div className={styles.footerSocial}>
                    <Link
                      href="https://www.instagram.com/agriwow_"
                      className={styles.footerSocialBtn}
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      href="https://www.facebook.com/share/1D562vca71/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerSocialBtn}
                      aria-label="Facebook"
                    >
                      <FaFacebookF />
                    </Link>
                    <Link
                      href=" https://www.youtube.com/@agriwow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerSocialBtn}
                      aria-label="YouTube"
                    >
                      <FaYoutube />
                    </Link>
                  </div>
                </div>
                <div className={styles.footerPayments} aria-hidden>
                  <span className={styles.footerPaymentMaestro} title="Maestro">
                    <Image src={maestro} alt="Maestro" width={35} priority />
                  </span>
                  <Image src={visa} alt="Visa" width={38} priority />
                  <Image src={paypal} alt="PayPal" width={38} priority />
                  <Image
                    src={mastercard}
                    alt="Mastercard"
                    width={38}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`row align-items-center ${styles.footerBottomRow}`}>
            <div className="col-lg-6">
              <p className={`${styles.footerCopyright}`}>
                Copyright © 2026 AGRIWOW. All rights reserved. Designed by{" "}
                <Link
                  href="https://goyalinfotech.com"
                  target="_blank"
                  className={styles.footerCredit}
                >
                  Goyal Infotech
                </Link>
              </p>
            </div>
            <div className="col-lg-6">
              <nav className={`${styles.footerLegal}`} aria-label="Legal">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-of-use">Terms of Use</Link>
                <Link href="/shipping-return">
                  Shipping &amp; Delivery Policy
                </Link>
                <Link href="/cancellation-return-policy">
                  Cancellation / Return Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

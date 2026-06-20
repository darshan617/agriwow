import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "@/components/layout/top-header/TopHeader.module.css";
import { getIsLoggedIn } from "@/custom-hooks/login-popup/LoginPopupProvider";

export const TopHeaderLeftLinks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);
  return (
    <div className={styles.topHeaderLeft}>
      <ul className="d-flex gap-3">
        <li>
          <Link href="#">About</Link>
        </li>
        <li>
          <Link href="/shipping-return">Shipping & Returns</Link>
        </li>
        <li>
          <Link href="/my-profile">My Profile</Link>
        </li>
      </ul>
    </div>
  );
};
export const TopHeaderHelp = () => (
  <div className={styles.topHeaderRight}>
    <h2>Need Help?</h2>
    <Link href="tel:+91 9229297668">+91 9229297668</Link>
  </div>
);

export const TopHeaderSocial = () => (
  <div className={`${styles.socialIcons} d-flex flex-row gap-1`}>
    <Link
      href="https://www.instagram.com/agriwow_"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram className={styles.topHeaderRightIcon} />
    </Link>
    <Link
      href="https://www.facebook.com/share/1D562vca71/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaFacebookF className={styles.topHeaderRightIcon} />
    </Link>
    <Link href="#">
      <FaXTwitter className={styles.topHeaderRightIcon} />
    </Link>
    <Link
      href=" https://www.youtube.com/@agriwow"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaYoutube className={styles.topHeaderRightIcon} />
    </Link>
  </div>
);

const TopHeaderExtras = ({ variant = "bar" }) => (
  <div className={variant === "drawer" ? styles.drawerExtras : undefined}>
    <TopHeaderLeftLinks />
    <TopHeaderHelp />
    <TopHeaderSocial />
  </div>
);

export default TopHeaderExtras;

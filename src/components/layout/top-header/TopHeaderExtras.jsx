import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "@/components/layout/top-header/TopHeader.module.css";
import {
  useLoginPopup,
} from "@/custom-hooks/login-popup/LoginPopupProvider";

export const TopHeaderLeftLinks = () => {
  const { openLoginPopup, isLoggedIn } = useLoginPopup();
  return (
    <div className={styles.topHeaderLeft}>
      <ul className="d-flex gap-3">
        <li>
          <Link href="/about-us" prefetch={true}>About</Link>
        </li>
        <li>
          <Link href="/shipping-return" prefetch={true}>Shipping & Returns</Link>
        </li>
        {!isLoggedIn && (
          <li onClick={openLoginPopup}>
            <Link href="#" prefetch={true}>My Profile</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link href="/my-profile" prefetch={true}>My Profile</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
export const TopHeaderHelp = () => (
  <div className={styles.topHeaderRight}>
    <h2>Need Help?</h2>
    <Link
      href="https://wa.me/+919770501981?text=I'm%20interested%20in%20your%20products"
      target="_blank"
      rel="noopener noreferrer"
      prefetch={true}
    >
      +91 97705 01981
    </Link>
  </div>
);

export const TopHeaderSocial = () => (
  <div className={`${styles.socialIcons} d-flex flex-row gap-1`}>
    <Link
      href="https://www.instagram.com/agriwow_"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      prefetch={true}
    >
      <FaInstagram className={styles.topHeaderRightIcon} aria-hidden />
    </Link>
    <Link
      href="https://www.facebook.com/share/1D562vca71/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      prefetch={true}
    >
      <FaFacebookF className={styles.topHeaderRightIcon} aria-hidden />
    </Link>
    <Link
      href="https://www.youtube.com/@agriwow"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      prefetch={true}
    >
      <FaYoutube className={styles.topHeaderRightIcon} aria-hidden />
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

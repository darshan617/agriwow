import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "@/components/layout/top-header/TopHeader.module.css";

export const TopHeaderLeftLinks = () => (
  <div className={styles.topHeaderLeft}>
    <ul className="d-flex gap-3">
      <li><Link href="#">About</Link></li>
      <li><Link href="#">Shipping & Returns</Link></li>
      <li><Link href="/my-profile">My Profile</Link></li>
    </ul>
  </div>
);

export const TopHeaderHelp = () => (
  <div className={styles.topHeaderRight}>
    <h2>Need Help?</h2>
    <Link href="tel:+91 9229297668">+91 9229297668</Link>
  </div>
);

export const TopHeaderSocial = () => (
  <div className={`${styles.socialIcons} d-flex flex-row gap-1`}>
    <FaFacebookF className={styles.topHeaderRightIcon} />
    <FaXTwitter className={styles.topHeaderRightIcon} />
    <FaInstagram className={styles.topHeaderRightIcon} />
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

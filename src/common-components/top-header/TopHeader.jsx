import Link from "next/link";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import styles from "@/common-components/top-header/TopHeader.module.css";

const TopHeader = () => {
  return (
    <div className={`${styles.topHeaderBar}`}>
      <div className="container">
        <div className={`${styles.TopHeader}`}>
        <div className="col-md-4">
          <div className={`${styles.topHeaderLeft} d-flex flex-row`}>
            <ul className="d-flex gap-3">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Shipping & Returns</Link></li>
              <li><Link href="#">My Account</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-row">
          <div className={`${styles.topHeaderCenter} d-flex flex-row gap-2`}>
              <div className={`${styles.topHeaderTicker}`}>
                <p className="text-center m-0 ">
                  Sale Up to <span>60% Off</span> on Everything*
                </p>
              </div>
            <button className={`${styles.shopNowButton}`}>Shop Now</button>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-row justify-content-end gap-3">
          <div className={`${styles.topHeaderRight}`}>
            <h2>Need Help?</h2>
            <Link href="tel:+91 9229297668">+91 9229297668</Link>
          </div>
          <div className={`${styles.socialIcons} d-flex flex-row gap-1`}>
            <FaFacebookF className={`${styles.topHeaderRightIcon}`} />
            <FaXTwitter className={`${styles.topHeaderRightIcon}`} />
            <FaInstagram className={`${styles.topHeaderRightIcon}`} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
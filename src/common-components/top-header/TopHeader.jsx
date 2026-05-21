import React, { useEffect, useState } from "react";
import {
  TopHeaderLeftLinks,
  TopHeaderHelp,
  TopHeaderSocial,
} from "@/common-components/top-header/TopHeaderExtras";
import styles from "@/common-components/top-header/TopHeader.module.css";

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.topHeaderBar} ${scrolled ? styles.hidden : ""}`}>
      <div className="container">
        <div className={styles.TopHeader}>
          <div className="col-md-4">
            <div className={`${styles.topHeaderBarExtras} d-flex flex-row`}>
              <TopHeaderLeftLinks />
            </div>
          </div>
          <div className="col-md-4 d-flex flex-row">
            <div className={`${styles.topHeaderCenter} d-flex flex-row gap-2`}>
              <div className={styles.topHeaderTicker}>
                <p className="text-center m-0 ">
                  Sale Up to <span>60% Off</span> on Everything*
                </p>
              </div>
              <button className={styles.shopNowButton}>Shop Now</button>
            </div>
          </div>
          <div className={`col-md-4 d-flex flex-row justify-content-end gap-3 ${styles.topHeaderBarExtras}`}>
            <TopHeaderHelp />
            <TopHeaderSocial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;


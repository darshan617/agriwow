import React, { useEffect, useState } from "react";
import Header from "@/components/layout/header/Header";
import {
  TopHeaderLeftLinks,
  TopHeaderHelp,
  TopHeaderSocial,
} from "@/components/layout/top-header/TopHeaderExtras";
import styles from "@/components/layout/top-header/TopHeader.module.css";

const SCROLL_THRESHOLD = 20;

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.siteHeader}>
      <div className={`${styles.topHeaderBar} ${scrolled ? styles.collapsed : ""}`}>
        <div className="container">
          <div className={styles.TopHeader}>
            <div className="col-md-4">
              <div className={`${styles.topHeaderBarExtras} d-flex flex-row`}>
                <TopHeaderLeftLinks />
              </div>
            </div>
            <div className="col-md-4 d-flex flex-row justify-content-center">
              <div className={`${styles.topHeaderCenter} d-flex flex-row gap-2`}>
                <div className={styles.topHeaderTicker}>
                  <p className="text-center m-0 ">
                    Sale Up to <span>60% Off</span> on Everything*
                  </p>
                </div>
                <button className={styles.shopNowButton}>Shop Now</button>
              </div>
            </div>
            <div
              className={`col-md-4 d-flex flex-row justify-content-end gap-3 ${styles.topHeaderBarExtras}`}
            >
              <TopHeaderHelp />
              <TopHeaderSocial />
            </div>
          </div>
        </div>
      </div>
      <Header scrolled={scrolled} />
    </div>
  );
};

export default TopHeader;

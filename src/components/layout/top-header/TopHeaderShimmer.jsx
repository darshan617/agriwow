import React from "react";
import styles from "@/components/layout/top-header/TopHeaderShimmer.module.css";

const TopHeaderShimmer = () => {
  return (
    <div className={styles.topHeaderBar}>
      <div className="container">
        <div className={styles.topHeaderInner}>
          <div className={styles.leftGroup}>
            <div className={`${styles.linkBar} shimmerEffect`} />
            <div className={`${styles.linkBar} shimmerEffect`} />
            <div className={`${styles.linkBar} shimmerEffect`} />
          </div>
          <div className={styles.centerGroup}>
            <div className={`${styles.tickerBar} shimmerEffect`} />
            <div className={`${styles.shopBtnBar} shimmerEffect`} />
          </div>
          <div className={styles.rightGroup}>
            <div className={`${styles.helpBar} shimmerEffect`} />
            <div className={styles.socialGroup}>
              <div className={`${styles.socialIcon} shimmerEffect`} />
              <div className={`${styles.socialIcon} shimmerEffect`} />
              <div className={`${styles.socialIcon} shimmerEffect`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeaderShimmer;

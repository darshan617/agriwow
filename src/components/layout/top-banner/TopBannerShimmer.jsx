import React from "react";
import styles from "@/components/layout/top-banner/TopBannerShimmer.module.css";

const CATEGORY_PLACEHOLDERS = 6;

const TopBannerShimmer = () => {
  return (
    <div className="container">
      <div className={styles.topBannerWrapper}>
        <div className={styles.categoriesRow}>
          {Array.from({ length: CATEGORY_PLACEHOLDERS }).map((_, index) => (
            <div key={index} className={styles.categoryItem}>
              <div className={`${styles.categoryImg} shimmerEffect`}></div>
              <div className={`${styles.categoryLabel} shimmerEffect`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBannerShimmer;

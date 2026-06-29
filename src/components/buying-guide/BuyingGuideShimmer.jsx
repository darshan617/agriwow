import React from "react";
import styles from "@/components/buying-guide/BuyingGuide.module.css";

const PLACEHOLDER_COUNT = 24;

const BuyingGuideShimmer = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
        <div
          key={index}
          className={`${styles.shimmerTile} shimmerEffect`}
          aria-hidden
        />
      ))}
    </div>
  );
};

export default BuyingGuideShimmer;

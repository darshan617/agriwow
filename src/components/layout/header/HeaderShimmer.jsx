import React from "react";
import styles from "@/components/layout/header/HeaderShimmer.module.css";

const NAV_PLACEHOLDERS = 4;

const HeaderShimmer = () => {
  return (
    <header className={styles.headerOuter}>
      <div className="container">
        <div className={styles.headerContainer}>
          <div className={`${styles.logoBar} shimmerEffect`} />
          <div className={styles.navGroup}>
            {Array.from({ length: NAV_PLACEHOLDERS }).map((_, index) => (
              <div key={index} className={`${styles.navBar} shimmerEffect`} />
            ))}
          </div>
          <div className={`${styles.searchBar} shimmerEffect`} />
          <div className={`${styles.searchIcon} shimmerEffect`} />
          <div className={styles.actions}>
            <div className={`${styles.iconCircle} shimmerEffect`} />
            <div className={`${styles.iconCircle} shimmerEffect`} />
            <div className={`${styles.iconCircle} shimmerEffect`} />
            <div className={`${styles.menuToggle} shimmerEffect`} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderShimmer;

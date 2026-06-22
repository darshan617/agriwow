import React from "react";
import styles from "@/components/blog-listing/trending-blog/TrendingBlogShimmer.module.css";

const TrendingBlogShimmer = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.card}>
          <div className={`${styles.header} shimmerEffect`}></div>
          <div className={styles.list}>
            <div className={`${styles.listItem} shimmerEffect`}></div>
            <div className={`${styles.listItem} shimmerEffect`}></div>
            <div className={`${styles.listItem} shimmerEffect`}></div>
          </div>
        </div>

        <div className={styles.newsletterCard}>
          <div className={styles.illustration}>
            <div className={`${styles.illustrationImage} shimmerEffect`}></div>
          </div>
          <div className={`${styles.newsletterHeading} shimmerEffect`}></div>
          <div className={`${styles.subheading} shimmerEffect`}></div>
          <div className={`${styles.form} shimmerEffect`}></div>
          <div className={`${styles.subscribeBtn} shimmerEffect`}></div>
          <div className={`${styles.disclaimer} shimmerEffect`}></div>
        </div>
      </div>
    </>
  );
};

export default TrendingBlogShimmer;

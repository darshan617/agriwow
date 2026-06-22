import React from "react";
import styles from "@/components/blog-listing/latest-blog/LatestBlogShimmer.module.css";

const LatestBlogShimmer = () => {
  return (
    <>
      <div className={`${styles.heading} shimmerEffect`}></div>
      <div className={`${styles.breadcrumb} shimmerEffect`}></div>
      <div className={`${styles.heroContent} shimmerEffect`}>
        <div className={`${styles.searchForm} shimmerEffect`}></div>
      </div>
      <div className={styles.categoryNav}>
        <ul className={`${styles.categoryList}`}>
          <li>
            <button
              type="button"
              className={`${styles.categoryBtn} shimmerEffect`}
            ></button>
            <button
              type="button"
              className={`${styles.categoryBtnMid} shimmerEffect`}
            ></button>
            <button
              type="button"
              className={`${styles.categoryBtnLast} shimmerEffect`}
            ></button>
          </li>
        </ul>
      </div>
      <div className="container ">
        <div className={styles.featuredCard}>
          <div className={`${styles.featuredMedia} shimmerEffect`}></div>
          <div className={styles.featuredBody}>
            <div className={`${styles.featuredCategory} shimmerEffect`}></div>
            <div className={`${styles.featuredTitle} shimmerEffect`}></div>
            <div className={`${styles.featuredExcerpt} shimmerEffect`}></div>
            <div className={styles.featuredFooter}>
              <div className={`${styles.readMoreBtn} shimmerEffect`}></div>
            </div>
          </div>
        </div>

        <div className={styles.blogList}>
          <div className={styles.blogListGrid}>
            <div className={styles.blogCard}>
              <div className={`${styles.blogCardMedia} shimmerEffect`}></div>
              <div className={styles.blogCardBody}>
                <div className={`${styles.blogCardTitle} shimmerEffect`}></div>
                <div
                  className={`${styles.blogCardExcerpt} shimmerEffect`}
                ></div>
                {/* <div className={`${styles.blogCardMeta} shimmerEffect`}></div> */}
                <div
                  className={`${styles.blogCardReadMore} shimmerEffect`}
                ></div>
              </div>
            </div>
            <div className={styles.blogCard}>
              <div className={`${styles.blogCardMedia} shimmerEffect`}></div>
              <div className={styles.blogCardBody}>
                <div className={`${styles.blogCardTitle} shimmerEffect`}></div>
                <div
                  className={`${styles.blogCardExcerpt} shimmerEffect`}
                ></div>
                {/* <div className={`${styles.blogCardMeta} shimmerEffect`}></div> */}
                <div
                  className={`${styles.blogCardReadMore} shimmerEffect`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestBlogShimmer;

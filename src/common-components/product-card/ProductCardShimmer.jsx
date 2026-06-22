import React from "react";
import styles from "@/common-components/product-card/ProductCardShimmer.module.css";

const ProductCardShimmer = () => {
  return (
    <div>
      <div className={styles.productCard}>
        <div className={`${styles.cardTags} shimmerEffect`}></div>
        <div className={`${styles.imageWrap} shimmerEffect`}></div>
        <div className={`${styles.productName} shimmerEffect`}></div>
        <div className={styles.priceRow}>
          <div className={`${styles.currentPrice} shimmerEffect`}></div>
          <div className={`${styles.oldPrice} shimmerEffect`}></div>
        </div>
        <div className={styles.cardActions}>
          <div className={`${styles.addToCartBtn} shimmerEffect`}></div>
          <div className={`${styles.buyNowBtn} shimmerEffect`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;

import React from "react";
import postHarvestBanner from "@/assets/images/post-harvest.png";
import ProductsItem from "@/common-components/products/ProductsItem";
import styles from "@/components/home/components/post-harvast/PostHarvest.module.css";

const PostHarvest = ({ postHarvestData, viewAllLink = "/product-category/post-harvest" }) => {
  return (
    <div>
      <ProductsItem
        sectionClassName=""
        title="Post Harvest"
        bannerImage={postHarvestBanner}
        viewAllLink={viewAllLink}
        agricultureProductsData={postHarvestData}
        overlayVariant="postHarvest"  
        viewAllLink="/product-category/post-harvest"
        overlayHeading={
          <>
            <p className={styles.overlayAccent}>
              <span className={styles.overlayAccentText}>Powering</span>
              <span> Your</span>
              <br />
            </p>
            <p className={styles.overlayAccent}>Post Harvest Process</p>
       
          </>
        } 
      />
    </div>
  );
};

export default PostHarvest;

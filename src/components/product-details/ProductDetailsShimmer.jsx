import React from "react";
import Layout from "@/components/layout/Layout";
import styles from "@/components/product-details/ProductDetailsShimmer.module.css";

const THUMB_PLACEHOLDERS = 4;
const FEATURE_LINES = 3;
const SPEC_ROWS = 3;
const DELIVERY_INFO_LINES = 5;
const POLICY_ITEMS = 4;

const ProductDetailsShimmer = () => {
  return (
    <Layout>
      <div className="container">
        <div className={`${styles.breadcrumb} shimmerEffect`} />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-12 p-0">
            <div className={`${styles.itemDetail} container`}>
              <div className="row">
                <div className={`${styles.imageDetail} col-lg-5`}>
                  <div className={`${styles.mainImage} shimmerEffect`} />
                  <div className={styles.thumbRow}>
                    {Array.from({ length: THUMB_PLACEHOLDERS }).map((_, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbItem} shimmerEffect`}
                      />
                    ))}
                  </div>
                </div>

                <div className={`${styles.productInfo} col-lg-5`}>
                  <div className={`${styles.productTitle} shimmerEffect`} />
                  <div className={`${styles.productTitleShort} shimmerEffect`} />

                  <div className={styles.priceSection}>
                    <div className={styles.priceLeft}>
                      <div className={`${styles.currentPrice} shimmerEffect`} />
                      <div className={`${styles.mrpLine} shimmerEffect`} />
                      <div className={`${styles.discountBadge} shimmerEffect`} />
                      <div className={`${styles.boughtRow} shimmerEffect`} />
                    </div>
                    <div className={`${styles.stockBadge} shimmerEffect`} />
                  </div>

                  <div className={`${styles.couponBar} shimmerEffect`} />

                  <div className={styles.aboutSection}>
                    <div className={`${styles.sectionHeading} shimmerEffect`} />
                    <div className={`${styles.subHeading} shimmerEffect`} />
                    <div className={styles.featureList}>
                      {Array.from({ length: FEATURE_LINES }).map((_, index) => (
                        <div
                          key={index}
                          className={`${styles.featureLine} shimmerEffect`}
                        />
                      ))}
                    </div>

                    <div className={`${styles.subHeading} shimmerEffect`} />
                    <div className={styles.specTable}>
                      {Array.from({ length: SPEC_ROWS }).map((_, index) => (
                        <div key={index} className={styles.specRow}>
                          <div
                            className={`${styles.specLabel} shimmerEffect`}
                          />
                          <div
                            className={`${styles.specValue} shimmerEffect`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className={`${styles.subHeading} shimmerEffect`} />
                    <div className={`${styles.descriptionLine} shimmerEffect`} />
                    <div
                      className={`${styles.descriptionLineShort} shimmerEffect`}
                    />
                    <div
                      className={`${styles.readMoreBtn} shimmerEffect`}
                    />
                  </div>

                  <div className={styles.policiesGrid}>
                    {Array.from({ length: POLICY_ITEMS }).map((_, index) => (
                      <div key={index} className={styles.policyItem}>
                        <div
                          className={`${styles.policyIcon} shimmerEffect`}
                        />
                        <div
                          className={`${styles.policyLabel} shimmerEffect`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className={styles.deliveryCard}>
              <div className={styles.deliveryPriceSection}>
                <div className={`${styles.ddBadge} shimmerEffect`} />
                <div className={`${styles.ddPrice} shimmerEffect`} />
                <div className={`${styles.ddSaveLine} shimmerEffect`} />
                <div className={styles.ddQtyRow}>
                  <div className={`${styles.ddQtyLabel} shimmerEffect`} />
                  <div className={`${styles.ddQtyControl} shimmerEffect`} />
                </div>
                <div className={`${styles.ddBtn} shimmerEffect`} />
                <div className={`${styles.ddBtn} shimmerEffect`} />
                <div className={`${styles.ddBtn} shimmerEffect`} />
                <div className={`${styles.ddSecure} shimmerEffect`} />
              </div>

              <div className={styles.deliveryPanel}>
                <div className={`${styles.ddPanelTitle} shimmerEffect`} />
                <div className={styles.ddPincodeRow}>
                  <div className={`${styles.ddPincodeInput} shimmerEffect`} />
                  <div className={`${styles.ddUpdateBtn} shimmerEffect`} />
                </div>
                <div className={styles.ddInfoList}>
                  {Array.from({ length: DELIVERY_INFO_LINES }).map(
                    (_, index) => (
                      <div key={index} className={styles.ddInfoItem}>
                        <div
                          className={`${styles.ddInfoIcon} shimmerEffect`}
                        />
                        <div className={styles.ddInfoText}>
                          <div
                            className={`${styles.ddInfoTitle} shimmerEffect`}
                          />
                          {index === 1 && (
                            <div
                              className={`${styles.ddInfoDesc} shimmerEffect`}
                            />
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobileStickyActions}>
        <div className={`${styles.mobileStickyBtn} shimmerEffect`} />
        <div className={`${styles.mobileStickyBtn} shimmerEffect`} />
      </div>
    </Layout>
  );
};

export default ProductDetailsShimmer;

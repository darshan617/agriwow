import React from 'react'
import ProductsItem from '../common-components/products/ProductsItem'
import topRating from '@/assets/images/top-rating.png'
import styles from '@/components/top-rating/TopRating.module.css'

const TopRating = () => {
  return (
    <div>
      <ProductsItem
        sectionClassName=""
        title="Top Rating"
        bannerImage={topRating}
        promoCardClassName={`${styles.industrialPromoCard}`}
        promoImageClassName={`${styles.industrialPromoImage}`}
        promoOverlayClassName={`${styles.industrialPromoOverlay}`}
        promoTitleClassName={`${styles.promoTitleReset}`}
        promoTitle={
          <div className={`${styles.industrialPromoStack}`}>
            <span className={`${styles.ribbon}`}>Newest</span>
            <span className={`${styles.titleIndustrial}`}>Industrial</span>
            <span className={`${styles.titleProducts}`}>Products</span>
            <p className={`${styles.tagline}`}>
              Boost Your Efficiency &amp; Productivity
            </p>
            <button type="button" className={`${styles.ctaBtn}`}>
              Explore More
            </button>
            <div className={`${styles.productLabels}`}>
              <span className={`${styles.productLabel}`}>
                Backpack <br /> Leaf Blower
              </span>
              <span className={`${styles.productLabel}`}>
                High Pressure <br /> Car Washer
              </span>
            </div>
          </div>
        }
        promoSubtitle={null}
        promoFooter={
          <span className={`${styles.footerText}`}>
            New Arrivals • Latest Technology
          </span>
        }
        promoFooterClassName={`${styles.industrialPromoFooter}`}
      />
    </div>
  )
}

export default TopRating

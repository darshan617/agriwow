import React from 'react'
import ProductsItem from '@/common-components/products/ProductsItem'
import topRating from '@/assets/images/top-rating.png'
import styles from './TopRating.module.css'

const TopRating = ({ topRatedData }) => {
  return (
      <ProductsItem
        sectionClassName=""
        title="Top Rating"
        bannerImage={topRating}
        bannerImageProps={{
          className: styles.topRatingPromoImage,
        }}
        agricultureProductsData={topRatedData}
        customOverlay={
          <div className={styles.topRatingOverlay}>
            <div className={styles.topRatingBoost}>
              Boost Your Efficiency &amp; Productivity
            </div>
            <div className={styles.topRatingExplore}>Explore now</div>
          </div>
        }
        viewAllLink="/product-category/top-rated"
      />
  )
}

export default TopRating

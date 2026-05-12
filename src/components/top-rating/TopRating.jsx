import React from 'react'
import ProductsItem from '../common-components/products/ProductsItem'
import topRating from '@/assets/images/top-rating.png'
import styles from '@/components/top-rating/TopRating.module.css'

const TopRating = () => {
  return (
    <div>
        <ProductsItem 
        title="Top Rating"
        bannerImage={topRating}
        promoTitle={<div className={`${styles.industrialPromoTitle} `}><span>Powering</span> Your <br />
          Post Harvest Process</div>}
        promoSubtitle={<div className={`${styles.industrialPromoSubtitle} display-none`}></div>}
      />

    </div>
  )
}

export default TopRating
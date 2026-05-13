import React from 'react'
import postHarvestBanner from '@/assets/images/post-harvest.png'
import ProductsItem from '../common-components/products/ProductsItem'
import styles from '@/components/post-harvast/PostHarvest.module.css'

const PostHarvest = () => {
  return (
    <div>
      <ProductsItem
        sectionClassName=""
        title="Post Harvest"
        bannerImage={postHarvestBanner}
        promoTitle={<div className={`${styles.industrialPromoTitle} `}><span>Powering</span> Your <br />
          Post Harvest Process</div>}
        promoSubtitle={<div className={`${styles.industrialPromoSubtitle} display-none`}></div>}
      />
    </div>
  )
}

export default PostHarvest
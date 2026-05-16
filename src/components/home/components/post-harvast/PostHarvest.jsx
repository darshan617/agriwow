import React from 'react'
import postHarvestBanner from '@/assets/images/post-harvest.png'
import ProductsItem from '@/common-components/products/ProductsItem'
import styles from '@/components/home/components/post-harvast/PostHarvest.module.css'

const PostHarvest = ({ postHarvestData }) => {
  return (
    <div>
      <ProductsItem
        sectionClassName=""
        title="Post Harvest"
        bannerImage={postHarvestBanner}
        promoTitle={<div className={`${styles.industrialPromoTitle} `}><span>Powering</span> Your <br />
          Post Harvest Process</div>}
        promoSubtitle={<div className={`${styles.industrialPromoSubtitle} display-none`}></div>}
        agricultureProductsData={postHarvestData}
      />
    </div>
  )
}

export default PostHarvest
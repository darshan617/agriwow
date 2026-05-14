import React from 'react'
import postHarvestBanner from '@/assets/images/post-harvest.png'
import ProductsItem from '@/common-components/products/ProductsItem'
import styles from '@/components/home/components/post-harvast/PostHarvest.module.css'

const PostHarvest = () => {
  return (
    <div>
      <ProductsItem
        sectionClassName=""
        title="Post Harvest"
        bannerImage={postHarvestBanner}
        productTitle={<div className={`${styles.industrialproductTitle} `}><span>Powering</span> Your <br />
          Post Harvest Process</div>}
        productSubtitle={<div className={`${styles.industrialproductSubtitle} display-none`}></div>}
      />
    </div>
  )
}

export default PostHarvest
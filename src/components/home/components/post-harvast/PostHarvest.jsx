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
        agricultureProductsData={postHarvestData}
      />
    </div>
  )
}

export default PostHarvest
import React from 'react'
import ProductsItem from '../common-components/products/ProductsItem'
import industrialBanner from '@/assets/images/industrial-bd.png'
import styles from '@/components/industrial-product/IndustrialProduct.module.css'


const IndustrialProduct = () => {
    return (
        <ProductsItem
            title="Industrial Products"
            bannerImage={industrialBanner}
            promoTitle={<div className={`${styles.industrialPromoTitle} `}>Built for Power Engineered</div>}
            promoSubtitle={<div className={`${styles.industrialPromoSubtitle}`}>for Performance</div>}
       
        />
    )
}

export default IndustrialProduct
import React from 'react'
import ProductsItem from '@/common-components/products/ProductsItem'
import industrialBanner from '@/assets/images/industrial-bd.png'
import styles from '@/components/home/components/industrial-product/IndustrialProduct.module.css'


const IndustrialProduct = () => {
    return (
        <ProductsItem
            title="Industrial Products"
            bannerImage={industrialBanner}
            productTitle={<div className={`${styles.industrialproductTitle} `}>Built for Power Engineered</div>}
            productSubtitle={<div className={`${styles.industrialproductSubtitle}`}>for Performance</div>}
       
        />
    )
}

export default IndustrialProduct
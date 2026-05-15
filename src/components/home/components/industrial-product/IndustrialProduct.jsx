import React from 'react'
import ProductsItem from '@/common-components/products/ProductsItem'
import industrialBanner from '@/assets/images/industrial-bd.png'


const IndustrialProduct = () => {
    return (
        <ProductsItem
            title="Industrial Products"
            bannerImage={industrialBanner}

        />
    )
}

export default IndustrialProduct
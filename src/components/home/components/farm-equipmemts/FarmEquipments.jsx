import React from 'react'
import Image from 'next/image'
import farmEquipments from '@/assets/images/agri-equipments.jpg'
import farmEquipmentsItem from '@/assets/images/farm-eqip.png'
import styles from '@/components/home/components/farm-equipmemts/FarmEqipments.module.css'
import ProductsItem from '@/common-components/products/ProductsItem'

const FarmEquipments = ({
    bannerImage = farmEquipments,
    equipmentImage = farmEquipmentsItem,
    leftImage = null,
    title = "Farm Equipment's",
    bannerAlt = 'Farm Equipments',
    equipmentAlt = 'Equipment',
    leftAlt = '',
    leftImageClassName = '',
    leftImageWrapperClassName = '',
}) => {
    return (
        <section className="sectionSpace" data-aos="zoom-in">
            <div className="container">
                <div className={`${styles.card}`}>
                    <Image
                        src={bannerImage}
                        alt={bannerAlt}
                        className={`${styles.bannerImage}`}
                        priority
                    />

                    <div className={`${styles.content}`}>
                        <h2 className={`${styles.title}`}>
                            {title}
                        </h2>

                        <button type="button" className={`${styles.bannerBtn}`}>
                            Explore Products
                        </button>
                    </div>
                </div>
                <div className={`${styles.productsWrapper}`}>
                    <ProductsItem
                        variant="equipment"
                        sectionClassName=""
                        productsSectionClassName={`${styles.farmProductsSection}`}
                    />
                </div>
            </div>
        </section>
    )
}

export default FarmEquipments
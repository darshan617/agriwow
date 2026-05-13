import React from 'react'
import Image from 'next/image'
import farmEquipments from '@/assets/images/agri-equipments.jpg'
import farmEquipmentsItem from '@/assets/images/farm-eqip.png'
import styles from '@/components/farm-equipmemts/FarmEqipments.module.css'
import ProductsItem from '../common-components/products/ProductsItem'

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
        <section className="sectionSpace">
            <div className="container">
                <div className={`${styles.card}`}>
                    <Image
                        src={bannerImage}
                        alt={bannerAlt}
                        className={`${styles.bannerImage}`}
                        priority
                    />

                    {leftImage ? (
                        <div
                            className={`${styles.leftImageWrapper} ${leftImageWrapperClassName}`}
                        >
                            <Image
                                src={leftImage}
                                alt={leftAlt || equipmentAlt}
                                className={`${styles.leftImage} ${leftImageClassName}`}
                            />
                        </div>
                    ) : null}

                    {equipmentImage ? (
                        <div className={`${styles.farmEquipmentsItem}`}>
                            <Image
                                src={equipmentImage}
                                alt={equipmentAlt}
                                className={`${styles.equipmentImage}`}
                            />
                        </div>
                    ) : null}

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
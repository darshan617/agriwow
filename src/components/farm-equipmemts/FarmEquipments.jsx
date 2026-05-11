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
    className = '',
    bannerAlt = 'Farm Equipments',
    equipmentAlt = 'Equipment',
    leftAlt = '',
    leftImageClassName = '',
    leftImageWrapperClassName = '',
}) => {
    return (
    <section className={styles.wrapper}>
            <div className="container">
                <div className={styles.card}>
                    <Image
                        src={bannerImage}
                        alt={bannerAlt}
                        className={styles.bannerImage}
                        priority
                    />

                    {leftImage ? (
                        <div
                            className={`${styles.leftImageWrapper} ${leftImageWrapperClassName}`.trim()}
                        >
                            <Image
                                src={leftImage}
                                alt={leftAlt || equipmentAlt}
                                className={`${styles.leftImage} ${leftImageClassName}`.trim()}
                            />
                        </div>
                    ) : null}

                    {equipmentImage ? (
                        <div className={styles.farmEquipmentsItem}>
                            <Image
                                src={equipmentImage}
                                alt={equipmentAlt}
                                className={styles.equipmentImage}
                            />
                        </div>
                    ) : null}

                    <div className={styles.content}>
                        <h2 className={`${styles.title} ${className}`.trim()}>
                            {title}
                        </h2>

                        <button
                            type="button"
                            className={styles.btn}
                        >
                            Explore Products
                        </button>
                    </div>
                </div>
                <div className={styles.productsWrapper}>
                    <ProductsItem variant="equipment" />
                </div>
            </div>
        </section>
    )
}

export default FarmEquipments
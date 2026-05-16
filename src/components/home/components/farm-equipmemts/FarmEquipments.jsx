import React from 'react'
import Image from 'next/image'
import farmEquipments from '@/assets/images/agri-equipments.jpg'
import styles from '@/components/home/components/farm-equipmemts/FarmEqipments.module.css'
import ProductsItem from '@/common-components/products/ProductsItem'
import ProductCard from '@/common-components/product-card/ProductCard'

const FarmEquipments = ({
    farmEquipmentsData,
    bannerImage = farmEquipments,
    title = "Farm Equipment's",
    bannerAlt = 'Farm Equipments',
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
                    {farmEquipmentsData?.map((item) => (
                        <ProductCard key={item?.id}
                        image={item?.gallery[0]}
                        imageHover={item?.gallery[1]}
                        discount={item?.discount}
                        isBestSeller={item?.isBestSeller}
                        name={item?.name}
                        price={item?.selling_price}
                        oldPrice={item?.price}
                        reviews={item?.total_reviews}
                        rating={item?.rating}
                    />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FarmEquipments
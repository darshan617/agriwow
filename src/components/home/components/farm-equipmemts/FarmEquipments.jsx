import React from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import farmEquipments from '@/assets/images/agri-equipments.jpg'
import styles from '@/components/home/components/farm-equipmemts/FarmEqipments.module.css'
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
                    <div className={styles.swiperWrapper}>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            navigation={{
                                prevEl: '.farm-equipments-btn-prev',
                                nextEl: '.farm-equipments-btn-next',
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={20}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                375: { slidesPerView: 1 },
                                575: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                                1200: { slidesPerView: 4 },
                                1366: { slidesPerView: 5 },
                            }}
                            className={styles.productsSwiper}
                        >
                            {farmEquipmentsData?.map((item) => (
                                <SwiperSlide key={item?.id}>
                                    <ProductCard
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
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* <div className={styles.swiperNav}>
                            <button
                                type="button"
                                className={`farm-equipments-btn-prev ${styles.swiperNavBtn}`}
                                aria-label="Previous products"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                type="button"
                                className={`farm-equipments-btn-next ${styles.swiperNavBtn}`}
                                aria-label="Next products"
                            >
                                <FiChevronRight />
                            </button>
                        </div> */}
                    </div>

                    <div className={styles.viewAllBtnWrapper}>
                        <button type="button" className={styles.viewAllBtn}>
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FarmEquipments
